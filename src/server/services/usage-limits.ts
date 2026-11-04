import "server-only";
import { db } from "@/server/db";
import { UserFacingError } from "@/server/lib/errors";

const DAY_MS = 24 * 60 * 60 * 1000;

/** Every AI feature has its own allowance: 5 uses per rolling 7 days, per user. */
export const AI_FEATURES = {
  summarize: "AI summary",
  intelligence: "thread intelligence",
  "action-items": "action item extraction",
  reply: "smart reply",
  rewrite: "rewrite",
  compose: "AI draft generation",
  ask: "Ask AI",
} as const;
export type AiFeature = keyof typeof AI_FEATURES;

export const AI_LIMIT = 5;
export const AI_WINDOW_MS = 7 * DAY_MS;

/** Non-AI abuse guard: outgoing mail per user per day. */
const SEND_LIMIT = 200;
const SEND_WINDOW_MS = DAY_MS;

interface Rule {
  key: string;
  limit: number;
  windowMs: number;
  label: string;
}

const aiRule = (feature: AiFeature): Rule => ({
  key: `ai:${feature}`,
  limit: AI_LIMIT,
  windowMs: AI_WINDOW_MS,
  label: AI_FEATURES[feature],
});
const sendRule: Rule = { key: "mail:send", limit: SEND_LIMIT, windowMs: SEND_WINDOW_MS, label: "sent emails" };

export interface QuotaStatus {
  limit: number;
  used: number;
  remaining: number;
  /** When the next use becomes available again (oldest use + window); null if none used. */
  resetsAt: string | null;
}

async function statusFor(userId: string, rule: Rule): Promise<QuotaStatus> {
  const since = new Date(Date.now() - rule.windowMs);
  const events = await db.usageEvent.findMany({
    where: { userId, key: rule.key, createdAt: { gte: since } },
    orderBy: { createdAt: "asc" },
    select: { createdAt: true },
  });
  const used = events.length;
  return {
    limit: rule.limit,
    used,
    remaining: Math.max(0, rule.limit - used),
    resetsAt: events[0] ? new Date(events[0].createdAt.getTime() + rule.windowMs).toISOString() : null,
  };
}

const formatDate = (iso: string) =>
  new Date(iso).toLocaleString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "UTC",
    timeZoneName: "short",
  });

/**
 * Reserves one use, then runs `work`. The reservation is taken under a per-user/per-key
 * Postgres advisory lock, so concurrent requests can never exceed the limit. If `work` fails
 * the use is refunded: the user only pays for results they actually received.
 */
async function withQuota<T>(userId: string, rule: Rule, work: () => Promise<T>): Promise<T> {
  const reservationId = await db.$transaction(async (tx) => {
    await tx.$executeRaw`SELECT pg_advisory_xact_lock(hashtext(${`${userId}:${rule.key}`}))`;
    const since = new Date(Date.now() - rule.windowMs);
    const used = await tx.usageEvent.count({
      where: { userId, key: rule.key, createdAt: { gte: since } },
    });
    if (used >= rule.limit) {
      const oldest = await tx.usageEvent.findFirst({
        where: { userId, key: rule.key, createdAt: { gte: since } },
        orderBy: { createdAt: "asc" },
        select: { createdAt: true },
      });
      const resetsAt = oldest
        ? formatDate(new Date(oldest.createdAt.getTime() + rule.windowMs).toISOString())
        : "later";
      throw new UserFacingError(
        `You've used all ${rule.limit} ${rule.label} runs for this week. Your next one is available on ${resetsAt}.`,
        "TOO_MANY_REQUESTS"
      );
    }
    const created = await tx.usageEvent.create({ data: { userId, key: rule.key }, select: { id: true } });
    return created.id;
  });

  try {
    return await work();
  } catch (err) {
    await db.usageEvent.delete({ where: { id: reservationId } }).catch(() => null);
    throw err;
  }
}

export const UsageLimits = {
  /** Remaining allowance for every AI feature (for the UI counters). */
  async aiStatus(userId: string): Promise<Record<AiFeature, QuotaStatus>> {
    const entries = await Promise.all(
      (Object.keys(AI_FEATURES) as AiFeature[]).map(
        async (f) => [f, await statusFor(userId, aiRule(f))] as const
      )
    );
    return Object.fromEntries(entries) as Record<AiFeature, QuotaStatus>;
  },

  /** Runs one counted use of an AI feature (5 per feature per 7 days). */
  consumeAi<T>(userId: string, feature: AiFeature, work: () => Promise<T>): Promise<T> {
    return withQuota(userId, aiRule(feature), work);
  },

  /** Runs one counted outgoing send (abuse guard). */
  consumeSend<T>(userId: string, work: () => Promise<T>): Promise<T> {
    return withQuota(userId, sendRule, work);
  },

  /** Deletes usage rows that no longer count toward any window. */
  async prune(): Promise<void> {
    const cutoff = new Date(Date.now() - Math.max(AI_WINDOW_MS, SEND_WINDOW_MS) - DAY_MS);
    await db.usageEvent.deleteMany({ where: { createdAt: { lt: cutoff } } });
  },
};
