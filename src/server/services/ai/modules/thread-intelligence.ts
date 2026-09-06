import "server-only";
import OpenAI from "openai";
import { env } from "@/env";
import { EmailService } from "@/server/services/email-service";
import type { EmailThread } from "@/lib/email-normalizer";
import { AIContextBuilder } from "../context-builder";
import type { ThreadIntelligenceResult } from "./types";

export class ThreadIntelligenceService {
  public static async getThreadIntelligence(
    userId: string,
    threadId: string,
    accountId?: string
  ): Promise<ThreadIntelligenceResult> {
    const thread = await EmailService.getThread(userId, threadId, accountId);
    const openai = env.OPENAI_API_KEY ? new OpenAI({ apiKey: env.OPENAI_API_KEY }) : null;
    return this.analyze(thread, openai);
  }

  public static async analyze(
    thread: EmailThread,
    openai: OpenAI | null
  ): Promise<ThreadIntelligenceResult> {
    const context = AIContextBuilder.buildThreadContext(thread);

    if (!openai) {
      return {
        overview: `Thread Intelligence for "${thread.subject}": ${thread.metadata.messageCount} messages exchanged.`,
        timeline: thread.messages.map((m) => ({ time: m.receivedAt, event: `Message from ${m.from.name ?? m.from.address}` })),
        decisions: ["None recorded in offline mode"],
        outstandingQuestions: ["Review thread status"],
        actionItems: ["Follow up with participants"],
        whoOwesWhat: thread.participants.map((p) => ({ person: p.name ?? p.address, task: "Review & respond" })),
        nextRecommendedAction: "Reply to latest message",
      };
    }

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

    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: context },
        ],
        temperature: 0.2,
      });

      const text = response.choices[0]?.message?.content ?? "";
      const jsonStart = text.indexOf("{");
      const jsonEnd = text.lastIndexOf("}");

      if (jsonStart !== -1 && jsonEnd !== -1) {
        const parsed = JSON.parse(text.slice(jsonStart, jsonEnd + 1)) as Partial<ThreadIntelligenceResult>;
        return {
          overview: parsed.overview ?? `Thread overview for ${thread.subject}`,
          timeline: Array.isArray(parsed.timeline) ? parsed.timeline : [],
          decisions: Array.isArray(parsed.decisions) ? parsed.decisions : [],
          outstandingQuestions: Array.isArray(parsed.outstandingQuestions) ? parsed.outstandingQuestions : [],
          actionItems: Array.isArray(parsed.actionItems) ? parsed.actionItems : [],
          whoOwesWhat: Array.isArray(parsed.whoOwesWhat) ? parsed.whoOwesWhat : [],
          nextRecommendedAction: parsed.nextRecommendedAction ?? "Review and respond.",
        };
      }
    } catch (err) {
      console.error("ThreadIntelligenceService GPT error:", err);
    }

    return {
      overview: `Thread overview for "${thread.subject}".`,
      timeline: [],
      decisions: [],
      outstandingQuestions: [],
      actionItems: [],
      whoOwesWhat: [],
      nextRecommendedAction: "Follow up on thread.",
    };
  }
}
