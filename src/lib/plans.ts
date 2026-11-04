/**
 * Plan catalogue shared by the server (limit enforcement) and the plans page.
 * Tier structure and pricing follow the Qorelly plans page. Prices are in Naira per month.
 * Features list only what the app actually provides; the AI allowance (5 runs per feature per
 * 7 days) is the same on every plan.
 */
export interface PlanDefinition {
  id: "free" | "pro" | "growth" | "scale";
  name: string;
  tagline: string;
  /** Monthly price in Naira; 0 = free. */
  priceNgn: number;
  /** Linked mailboxes allowed; null = unlimited. */
  maxMailboxes: number | null;
  features: string[];
  popular?: boolean;
}

const AI_FEATURE = "AI Copilot: 5 runs per feature, every week";

export const PLAN_LIST: PlanDefinition[] = [
  {
    id: "free",
    name: "Free",
    tagline: "Everything you need to run one inbox smarter. Free forever.",
    priceNgn: 0,
    maxMailboxes: 1,
    features: [
      "1 linked mailbox",
      "Gmail, Microsoft 365 or Outlook",
      "Every folder and label, live sync",
      AI_FEATURE,
      "Drafts, archive and search",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    tagline: "For professionals juggling a few inboxes.",
    priceNgn: 25_000,
    maxMailboxes: 3,
    features: [
      "Up to 3 linked mailboxes",
      "Unified inbox across mailboxes",
      "Send from any linked mailbox",
      "Every folder and label, live sync",
      AI_FEATURE,
    ],
  },
  {
    id: "growth",
    name: "Growth",
    tagline: "For teams and founders running many inboxes.",
    priceNgn: 50_000,
    maxMailboxes: 10,
    popular: true,
    features: [
      "Up to 10 linked mailboxes",
      "Everything in Pro",
      "Unified inbox across mailboxes",
      "Send from any linked mailbox",
      AI_FEATURE,
    ],
  },
  {
    id: "scale",
    name: "Scale",
    tagline: "For agencies and operators with no mailbox ceiling.",
    priceNgn: 90_000,
    maxMailboxes: null,
    features: [
      "Unlimited linked mailboxes",
      "Everything in Growth",
      "Unified inbox across mailboxes",
      "Send from any linked mailbox",
      AI_FEATURE,
    ],
  },
];

export const PLANS: Record<string, PlanDefinition> = Object.fromEntries(PLAN_LIST.map((p) => [p.id, p]));

export const DEFAULT_PLAN_ID = "free";

export function planFor(planId: string | null | undefined): PlanDefinition {
  return PLANS[planId ?? DEFAULT_PLAN_ID] ?? PLANS[DEFAULT_PLAN_ID]!;
}

export const formatNaira = (amount: number) => `₦${amount.toLocaleString("en-NG")}`;
