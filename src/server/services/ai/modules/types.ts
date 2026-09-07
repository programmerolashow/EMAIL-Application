import "server-only";
import { z } from "zod";

/**
 * Email Summary Zod Schema
 * Accepts executiveSummary / summary and suggestedNextSteps / suggestedNextStep
 * and transforms them into standardized, normalized fields.
 */
export const emailSummarySchema = z
  .object({
    executiveSummary: z.string().optional(),
    summary: z.string().optional(),
    keyPoints: z.array(z.string()).default([]),
    actionItems: z.array(z.string()).default([]),
    importantDates: z.array(z.string()).default([]),
    peopleMentioned: z.array(z.string()).default([]),
    suggestedNextSteps: z.array(z.string()).optional(),
    suggestedNextStep: z.string().optional(),
  })
  .transform((data) => {
    const mainSummary = data.executiveSummary ?? data.summary ?? "No summary generated.";
    const mainNextStep =
      data.suggestedNextStep ??
      (data.suggestedNextSteps && data.suggestedNextSteps.length > 0
        ? data.suggestedNextSteps[0]
        : "Follow up as appropriate.");

    return {
      executiveSummary: mainSummary,
      summary: mainSummary,
      keyPoints: data.keyPoints,
      actionItems: data.actionItems,
      importantDates: data.importantDates,
      peopleMentioned: data.peopleMentioned,
      suggestedNextStep: mainNextStep,
      suggestedNextSteps: data.suggestedNextSteps ?? [mainNextStep],
    };
  });

export type EmailSummaryResult = z.infer<typeof emailSummarySchema>;

export const timelineEventSchema = z.object({
  time: z.string().default("Unknown Date"),
  speaker: z.string().default("Unknown / Unspecified"),
  event: z.string().default("Event details unrecorded"),
});

export type TimelineEvent = z.infer<typeof timelineEventSchema>;

export const deliverableItemSchema = z.object({
  item: z.string().default("Unspecified deliverable"),
  owner: z.string().default("Unknown / Unassigned"),
  deadline: z.string().default("Unspecified"),
  status: z.string().default("Pending"),
});

export type DeliverableItem = z.infer<typeof deliverableItemSchema>;

export const whoOwesWhatSchema = z.object({
  person: z.string().default("Unknown Person"),
  task: z.string().default("Unspecified task"),
});

export type WhoOwesWhatItem = z.infer<typeof whoOwesWhatSchema>;

export const threadIntelligenceSchema = z
  .object({
    conversationOverview: z.string().optional(),
    overview: z.string().optional(),
    timeline: z.array(timelineEventSchema).default([]),
    keyDecisions: z.array(z.string()).default([]),
    decisions: z.array(z.string()).default([]),
    outstandingQuestions: z.array(z.string()).default([]),
    deliverables: z.array(deliverableItemSchema).default([]),
    whoOwesWhat: z.array(whoOwesWhatSchema).default([]),
    actionItems: z.array(z.string()).default([]),
    recommendedNextActions: z.array(z.string()).default([]),
    nextRecommendedAction: z.string().optional(),
  })
  .transform((data) => {
    const overviewText = data.conversationOverview ?? data.overview ?? "No overview generated.";
    const allDecisions = data.keyDecisions.length > 0 ? data.keyDecisions : data.decisions;
    const nextAction =
      data.nextRecommendedAction ??
      (data.recommendedNextActions.length > 0 ? data.recommendedNextActions[0] : "Review thread status.");
    const nextActionsList =
      data.recommendedNextActions.length > 0 ? data.recommendedNextActions : [nextAction];

    // Build whoOwesWhat mapping from deliverables if whoOwesWhat is empty
    const mappedWhoOwesWhat: WhoOwesWhatItem[] =
      data.whoOwesWhat.length > 0
        ? data.whoOwesWhat
        : data.deliverables.map((d) => ({
            person: d.owner,
            task: d.item,
          }));

    const mappedActionItems: string[] =
      data.actionItems.length > 0
        ? data.actionItems
        : data.deliverables.map((d) => `${d.item} (${d.owner})`);

    return {
      conversationOverview: overviewText,
      overview: overviewText,
      timeline: data.timeline,
      keyDecisions: allDecisions,
      decisions: allDecisions,
      outstandingQuestions: data.outstandingQuestions,
      deliverables: data.deliverables,
      whoOwesWhat: mappedWhoOwesWhat,
      actionItems: mappedActionItems,
      recommendedNextActions: nextActionsList,
      nextRecommendedAction: nextAction,
    };
  });

export type ThreadIntelligenceResult = z.infer<typeof threadIntelligenceSchema>;

export type ReplyTone =
  | "Professional"
  | "Friendly"
  | "Concise"
  | "Detailed"
  | "Formal"
  | "Apologetic"
  | "Persuasive";

export type RewriteOption =
  | "Make it more professional"
  | "Make it shorter"
  | "Make it friendlier"
  | "Fix grammar"
  | "Make it persuasive"
  | "Simplify it";

export const extractedActionItemSchema = z.object({
  task: z.string().default("Unspecified task"),
  owner: z.string().default("User"),
  deadline: z.string().default("TBD"),
  priority: z.enum(["High", "Medium", "Low"]).default("Medium"),
  sourceEmailId: z.string().optional(),
});

export const extractedActionItemsSchema = z.array(extractedActionItemSchema);

export type ExtractedActionItem = z.infer<typeof extractedActionItemSchema>;
