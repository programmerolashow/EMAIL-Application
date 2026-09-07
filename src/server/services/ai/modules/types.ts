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
  event: z.string().default("Event details unrecorded"),
});

export type TimelineEvent = z.infer<typeof timelineEventSchema>;

export const whoOwesWhatSchema = z.object({
  person: z.string().default("Unknown Person"),
  task: z.string().default("Unspecified task"),
});

export type WhoOwesWhatItem = z.infer<typeof whoOwesWhatSchema>;

export const threadIntelligenceSchema = z.object({
  overview: z.string().default("No overview generated."),
  timeline: z.array(timelineEventSchema).default([]),
  decisions: z.array(z.string()).default([]),
  outstandingQuestions: z.array(z.string()).default([]),
  actionItems: z.array(z.string()).default([]),
  whoOwesWhat: z.array(whoOwesWhatSchema).default([]),
  nextRecommendedAction: z.string().default("Review thread status."),
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
