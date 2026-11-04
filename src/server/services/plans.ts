import "server-only";
import { db } from "@/server/db";
import { UserFacingError } from "@/server/lib/errors";

import { planFor, type PlanDefinition } from "@/lib/plans";

/** The plan a user is on lives in `User.plan` (DB). Paid tiers are display-only until payments exist. */
export interface MailboxAllowance {
  plan: PlanDefinition;
  linked: number;
  /** True when one more mailbox may be linked. */
  canLinkAnother: boolean;
}

export async function getMailboxAllowance(userId: string): Promise<MailboxAllowance> {
  const [user, linked] = await Promise.all([
    db.user.findUnique({ where: { id: userId }, select: { plan: true } }),
    db.account.count({ where: { userId } }),
  ]);
  const plan = planFor(user?.plan);
  return {
    plan,
    linked,
    canLinkAnother: plan.maxMailboxes === null || linked < plan.maxMailboxes,
  };
}

export function mailboxLimitMessage(allowance: MailboxAllowance): string {
  const max = allowance.plan.maxMailboxes ?? 0;
  return `Your ${allowance.plan.name} plan includes ${max} linked mailbox${max === 1 ? "" : "es"}, and you already have ${allowance.linked}. Disconnect one or upgrade your plan to link another.`;
}

/**
 * Blocks starting a new mailbox connection when the plan limit is reached. Existing mailboxes
 * above the limit (e.g. linked before plans existed) keep working; only new links are blocked.
 */
export async function assertCanLinkMailbox(userId: string): Promise<void> {
  const allowance = await getMailboxAllowance(userId);
  if (!allowance.canLinkAnother) {
    throw new UserFacingError(mailboxLimitMessage(allowance), "FORBIDDEN");
  }
}
