import "server-only";
import { EmailService } from "@/server/services/email-service";
import type { EmailThread } from "@/lib/email-normalizer";
import { AIContextBuilder } from "../context-builder";
import { AIService } from "../ai-service";
import type { ThreadIntelligenceResult } from "./types";

export class ThreadIntelligenceService {
  public static async getThreadIntelligence(
    userId: string,
    threadId: string,
    accountId?: string
  ): Promise<ThreadIntelligenceResult> {
    const thread = await EmailService.getThread(userId, threadId, accountId);
    return this.analyze(thread);
  }

  public static async analyze(
    thread: EmailThread
  ): Promise<ThreadIntelligenceResult> {
    const context = AIContextBuilder.buildThreadContext(thread);

    const fallback: ThreadIntelligenceResult = {
      overview: `Thread Intelligence for "${thread.subject}": ${thread.metadata.messageCount} messages exchanged.`,
      timeline: thread.messages.map((m) => ({ time: m.receivedAt, event: `Message from ${m.from.name ?? m.from.address}` })),
      decisions: ["None recorded in offline mode"],
      outstandingQuestions: ["Review thread status"],
      actionItems: ["Follow up with participants"],
      whoOwesWhat: thread.participants.map((p) => ({ person: p.name ?? p.address, task: "Review & respond" })),
      nextRecommendedAction: "Reply to latest message",
    };

    const systemPrompt = `You are a conversation intelligence engine. Analyze the email thread and output JSON with schema:
{
  "overview": "High-level summary of discussion",
  "timeline": [{"time": "ISO Date or description", "event": "Key event or message point"}],
  "decisions": ["Decision 1", "Decision 2"],
  "outstandingQuestions": ["Question 1", "Question 2"],
  "actionItems": ["Task 1", "Task 2"],
  "whoOwesWhat": [{"person": "Name/Email", "task": "Pending deliverable or task"}],
  "nextRecommendedAction": "Single most impactful next step"
}`;

    const parsed = await AIService.completeStructured<Partial<ThreadIntelligenceResult>>(
      {
        systemPrompt,
        userPrompt: context,
        temperature: 0.2,
      },
      fallback
    );

    return {
      overview: parsed.overview ?? `Thread overview for ${thread.subject}`,
      timeline: Array.isArray(parsed.timeline) ? parsed.timeline : fallback.timeline,
      decisions: Array.isArray(parsed.decisions) ? parsed.decisions : fallback.decisions,
      outstandingQuestions: Array.isArray(parsed.outstandingQuestions) ? parsed.outstandingQuestions : fallback.outstandingQuestions,
      actionItems: Array.isArray(parsed.actionItems) ? parsed.actionItems : fallback.actionItems,
      whoOwesWhat: Array.isArray(parsed.whoOwesWhat) ? parsed.whoOwesWhat : fallback.whoOwesWhat,
      nextRecommendedAction: parsed.nextRecommendedAction ?? fallback.nextRecommendedAction,
    };
  }
}
