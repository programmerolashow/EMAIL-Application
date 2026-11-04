import "server-only";
import { db } from "@/server/db";
import { MailService } from "@/server/services/mail-service";

/** Nylas retries failed deliveries for up to ~72h; keep idempotency records a little longer. */
const EVENT_RETENTION_MS = 7 * 24 * 60 * 60 * 1000;

export interface ProcessWebhookParams {
  eventId: string;
  provider: string;
  eventType: string;
  accountId?: string | null;
  payload: Record<string, unknown>;
  handler?: (payload: Record<string, unknown>) => Promise<void>;
}

export interface WebhookProcessingResult {
  received: boolean;
  success: boolean;
  duplicate: boolean;
  status: "PROCESSED" | "PROCESSING" | "PENDING" | "FAILED";
  message?: string;
}

export class WebhookService {
  /**
   * Main Idempotency Strategy Entrypoint.
   *
   * Flow:
   * 1. Check if eventId has already been processed or is currently in flight.
   *    If processed -> return immediate success without executing side effects.
   * 2. Reserve / Register event state as "PROCESSING".
   * 3. Execute domain processing logic (using idempotent upserts).
   * 4. Mark event status as "PROCESSED".
   * 5. If failure occurs, mark status as "FAILED" so provider retry systems can re-attempt.
   */
  static async processEvent({
    eventId,
    provider,
    eventType,
    accountId,
    payload,
    handler,
  }: ProcessWebhookParams): Promise<WebhookProcessingResult> {
    if (!eventId) {
      throw new Error("Missing unique eventId for webhook processing.");
    }

    // Step 1: Idempotency Check - Query stored unique event identifier
    const existingEvent = await db.webhookEvent.findUnique({
      where: { eventId },
    });

    if (existingEvent) {
      if (existingEvent.status === "PROCESSED") {
        console.log(`ℹ️ [WebhookService] Duplicate event [eventId=${eventId}] skipped: Already PROCESSED.`);
        return {
          received: true,
          success: true,
          duplicate: true,
          status: "PROCESSED",
          message: "Event already processed.",
        };
      }

      if (existingEvent.status === "PROCESSING") {
        console.log(`ℹ️ [WebhookService] Duplicate event [eventId=${eventId}] skipped: Currently PROCESSING by concurrent task.`);
        return {
          received: true,
          success: true,
          duplicate: true,
          status: "PROCESSING",
          message: "Event currently processing.",
        };
      }
    }

    // Step 2: Atomic State Registration (Concurrency Guard)
    try {
      if (existingEvent) {
        await db.webhookEvent.update({
          where: { eventId },
          data: { status: "PROCESSING", updatedAt: new Date() },
        });
      } else {
        await db.webhookEvent.create({
          data: {
            eventId,
            provider,
            eventType,
            accountId: accountId ?? null,
            // Email content is never stored (payloads carry full message bodies); only the
            // event id / type / status needed for idempotency.
            status: "PROCESSING",
          },
        });
      }
    } catch (err: unknown) {
      // Prisma error code P2002 indicates a unique constraint violation (concurrent insertion of eventId)
      if (typeof err === "object" && err !== null && "code" in err && err.code === "P2002") {
        console.log(`ℹ️ [WebhookService] Unique constraint race condition caught for [eventId=${eventId}]. Skipping duplicate execution.`);
        return {
          received: true,
          success: true,
          duplicate: true,
          status: "PROCESSING",
          message: "Concurrent duplicate event execution detected.",
        };
      }
      throw err;
    }

    // Step 3: Domain Event Processing
    try {
      if (handler) {
        await handler(payload);
      } else {
        await this.defaultEventHandler(eventType, accountId, provider);
      }

      // Step 4: Mark Processed
      await db.webhookEvent.update({
        where: { eventId },
        data: {
          status: "PROCESSED",
          updatedAt: new Date(),
        },
      });

      console.log(`✅ [WebhookService] Successfully processed webhook event [eventId=${eventId}, type=${eventType}]`);
      // Occasional cleanup keeps the table small without a separate cron job.
      if (Math.random() < 0.02) void this.pruneOldEvents().catch(() => null);
      return {
        received: true,
        success: true,
        duplicate: false,
        status: "PROCESSED",
      };
    } catch (error) {
      console.error(`❌ [WebhookService] Event processing failed [eventId=${eventId}]:`, error);

      // Mark event as FAILED for retry visibility
      await db.webhookEvent
        .update({
          where: { eventId },
          data: {
            status: "FAILED",
            updatedAt: new Date(),
          },
        })
        .catch((dbErr) => {
          console.error(`⚠️ Failed to update WebhookEvent status to FAILED [eventId=${eventId}]:`, dbErr);
        });

      throw error;
    }
  }

  /** Only Nylas events are accepted; anything else is recorded and ignored. */
  private static async defaultEventHandler(
    eventType: string,
    accountId: string | null | undefined,
    provider?: string
  ): Promise<void> {
    if (provider === "Nylas") {
      await this.handleNylasEvent(eventType, accountId);
      return;
    }
    console.log(`ℹ️ [WebhookService] Ignoring event [${eventType}] from unsupported provider ${provider ?? "unknown"}.`);
  }

  /** Webhook bookkeeping only needs to cover Nylas' retry window; older rows are deleted. */
  private static async pruneOldEvents(): Promise<void> {
    const cutoff = new Date(Date.now() - EVENT_RETENTION_MS);
    await db.webhookEvent.deleteMany({ where: { createdAt: { lt: cutoff } } });
  }

  /**
   * Nylas v3 events (message.created, message.updated, thread.replied, folder.*, grant.*).
   *
   * Mail is read live from Nylas, not mirrored, so the only job here is to bump the account's
   * `updatedAt`. Clients poll `mail.getSyncState` and refetch that account's mail when it moves.
   */
  private static async handleNylasEvent(
    eventType: string,
    grantId: string | null | undefined
  ): Promise<void> {
    if (!grantId) {
      console.log(`ℹ️ [WebhookService] Nylas event [${eventType}] has no grant id; nothing to refresh.`);
      return;
    }

    const relevant =
      eventType.startsWith("message.") ||
      eventType.startsWith("thread.") ||
      eventType.startsWith("folder.") ||
      eventType.startsWith("grant.");
    if (!relevant) {
      console.log(`ℹ️ [WebhookService] Unhandled Nylas event type [${eventType}], event recorded.`);
      return;
    }

    if (eventType.startsWith("grant.") || eventType.startsWith("folder.")) {
      // Grant status / folder list changed: drop cached health and folders for this grant.
      MailService.forgetGrant(grantId);
    }

    if (eventType === "grant.expired" || eventType === "grant.deleted") {
      console.warn(`⚠️ [WebhookService] Nylas grant ${grantId} is ${eventType.split(".")[1]}; the user must reconnect it.`);
    }

    const updated = await db.account.updateMany({
      where: { OR: [{ id: grantId }, { providerAccountId: grantId }] },
      data: { updatedAt: new Date() },
    });
    if (updated.count === 0) {
      console.warn(`⚠️ [WebhookService] Nylas event for unknown grant ${grantId}.`);
    }
  }
}
