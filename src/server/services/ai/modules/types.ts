import "server-only";

export interface EmailSummaryResult {
  summary: string;
  keyPoints: string[];
  actionItems: string[];
  importantDates: string[];
  peopleMentioned: string[];
  suggestedNextStep: string;
}

export interface TimelineEvent {
  time: string;
  event: string;
}

export interface WhoOwesWhatItem {
  person: string;
  task: string;
}

export interface ThreadIntelligenceResult {
  overview: string;
  timeline: TimelineEvent[];
  decisions: string[];
  outstandingQuestions: string[];
  actionItems: string[];
  whoOwesWhat: WhoOwesWhatItem[];
  nextRecommendedAction: string;
}

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

export interface ExtractedActionItem {
  task: string;
  owner: string;
  deadline: string;
  priority: "High" | "Medium" | "Low";
  sourceEmailId?: string;
}
