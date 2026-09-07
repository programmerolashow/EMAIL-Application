import "server-only";
import { db } from "@/server/db";
import type { Prisma } from "../../../generated/prisma";

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
            payload: payload as unknown as Prisma.InputJsonValue,
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
        await this.defaultEventHandler(eventType, accountId, payload);
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

  /**
   * Default idempotent domain event handler.
   * Guarantees zero duplicate emails, threads, or notifications in local database storage.
   */
  private static async defaultEventHandler(
    eventType: string,
    accountId: string | null | undefined,
    payload: Record<string, unknown>
  ): Promise<void> {
    const data = (typeof payload.data === "object" && payload.data !== null
      ? payload.data
      : payload) as Record<string, unknown>;

    switch (eventType) {
      case "email.created":
      case "email.updated":
      case "message.new":
      case "message.updated": {
        await this.handleEmailWebhook(accountId, data);
        break;
      }

      case "thread.updated": {
        await this.handleThreadWebhook(accountId, data);
        break;
      }

      case "account.updated":
      case "account.sync": {
        await this.handleAccountWebhook(accountId, data);
        break;
      }

      default: {
        console.log(`ℹ️ [WebhookService] Unhandled event type [${eventType}], event recorded.`);
        break;
      }
    }
  }

  /**
   * Idempotently upserts email message data.
   */
  private static async handleEmailWebhook(
    accountId: string | null | undefined,
    data: Record<string, unknown>
  ): Promise<void> {
    const messageId = typeof data.id === "string" ? data.id : typeof data.messageId === "string" ? data.messageId : null;
    const threadId = typeof data.threadId === "string" ? data.threadId : null;

    if (!messageId || !accountId) {
      console.log(`ℹ️ [WebhookService] Skipping email sync - missing messageId or accountId.`);
      return;
    }

    const account = await db.account.findUnique({
      where: { id: accountId },
    });

    if (!account) {
      console.warn(`⚠️ [WebhookService] Cannot sync email: Account ${accountId} not found.`);
      return;
    }

    // Ensure parent Thread exists idempotently
    const effectiveThreadId = threadId ?? `thread-${messageId}`;
    await db.thread.upsert({
      where: { id: effectiveThreadId },
      create: {
        id: effectiveThreadId,
        userId: account.userId,
        accountId: account.id,
        subject: typeof data.subject === "string" ? data.subject : "No Subject",
        lastMessageDate: new Date(),
        unread: Boolean(data.unread ?? data.isRead === false),
      },
      update: {
        lastMessageDate: new Date(),
        updatedAt: new Date(),
      },
    });

    // Idempotent Email Upsert - prevents duplicate records
    await db.email.upsert({
      where: { id: messageId },
      create: {
        id: messageId,
        threadId: effectiveThreadId,
        userId: account.userId,
        accountId: account.id,
        subject: typeof data.subject === "string" ? data.subject : null,
        from: (data.from as Prisma.InputJsonValue) ?? {},
        to: (data.to as Prisma.InputJsonValue) ?? [],
        cc: (data.cc as Prisma.InputJsonValue) ?? null,
        bcc: (data.bcc as Prisma.InputJsonValue) ?? null,
        sentAt: data.sentAt ? new Date(data.sentAt as string) : new Date(),
        receivedAt: data.receivedAt ? new Date(data.receivedAt as string) : new Date(),
        body: typeof data.body === "string" ? data.body : null,
        bodySnippet: typeof data.snippet === "string" ? data.snippet : null,
        isRead: Boolean(data.isRead ?? !data.unread),
      },
      update: {
        subject: typeof data.subject === "string" ? data.subject : undefined,
        isRead: typeof data.isRead === "boolean" ? data.isRead : undefined,
        bodySnippet: typeof data.snippet === "string" ? data.snippet : undefined,
        updatedAt: new Date(),
      },
    });
  }

  /**
   * Idempotently upserts thread metadata.
   */
  private static async handleThreadWebhook(
    accountId: string | null | undefined,
    data: Record<string, unknown>
  ): Promise<void> {
    const threadId = typeof data.id === "string" ? data.id : typeof data.threadId === "string" ? data.threadId : null;

    if (!threadId || !accountId) return;

    const account = await db.account.findUnique({
      where: { id: accountId },
    });

    if (!account) return;

    await db.thread.upsert({
      where: { id: threadId },
      create: {
        id: threadId,
        userId: account.userId,
        accountId: account.id,
        subject: typeof data.subject === "string" ? data.subject : null,
        unread: Boolean(data.unread),
        lastMessageDate: new Date(),
      },
      update: {
        unread: typeof data.unread === "boolean" ? data.unread : undefined,
        subject: typeof data.subject === "string" ? data.subject : undefined,
        updatedAt: new Date(),
      },
    });
  }

  /**
   * Idempotently updates account status.
   */
  private static async handleAccountWebhook(
    accountId: string | null | undefined,
    data: Record<string, unknown>
  ): Promise<void> {
    if (!accountId) return;

    await db.account
      .update({
        where: { id: accountId },
        data: {
          updatedAt: new Date(),
          ...(typeof data.name === "string" ? { name: data.name } : {}),
        },
      })
      .catch(() => null);
  }
}
