import "server-only";
import { MailService } from "@/server/services/mail-service";
import type { EmailThread } from "@/lib/email-normalizer";
import { AIContextBuilder } from "../context-builder";
import { AIService } from "../ai-service";
import { threadIntelligenceSchema, type ThreadIntelligenceResult } from "./types";

export class ThreadIntelligenceService {
  public static async getThreadIntelligence(
    userId: string,
    threadId: string,
    accountId?: string
  ): Promise<ThreadIntelligenceResult> {
    const thread = await MailService.getThread(userId, threadId, accountId);
    return this.analyze(thread);
  }

  public static async analyze(
    thread: EmailThread
  ): Promise<ThreadIntelligenceResult> {
    const context = AIContextBuilder.buildThreadContext(thread, {
      maxMessages: 15,
      perMessageChars: 3000,
      totalChars: 20000,
    });

    const fallbackOverview = `Thread Intelligence for "${thread.subject}": ${thread.metadata.messageCount} messages exchanged.`;
    const fallbackNextAction = "Review thread and follow up with participants.";
    const fallbackDeliverables = thread.participants.map((p) => ({
      item: "Review & respond to thread",
      owner: p.name ?? p.address,
      deadline: "Unspecified",
      status: "Pending",
    }));

    const fallback: ThreadIntelligenceResult = {
      conversationOverview: fallbackOverview,
      overview: fallbackOverview,
      timeline: thread.messages.map((m) => ({
        time: m.receivedAt || "Recent",
        speaker: m.from.name ?? m.from.address,
        event: `Sent message in thread`,
      })),
      keyDecisions: ["None recorded in current thread history"],
      decisions: ["None recorded in current thread history"],
      outstandingQuestions: ["Review thread status"],
      deliverables: fallbackDeliverables,
      whoOwesWhat: fallbackDeliverables.map((d) => ({ person: d.owner, task: d.item })),
      actionItems: fallbackDeliverables.map((d) => `${d.item} (${d.owner})`),
      recommendedNextActions: [fallbackNextAction],
      nextRecommendedAction: fallbackNextAction,
    };

    const systemPrompt = `You are a conversation analyst. Explain an email thread to a busy person who has not read it, so they understand the whole story and what to do next.
Be specific: use the real names, organisations, amounts, dates and topics from the thread.

Return ONLY a JSON object with this exact shape:
{
  "conversationOverview": "5-8 sentences: what the conversation is about and why it started, who the main participants are and what each wants, how the discussion developed, what has been settled, and where things stand right now (who is waiting on whom).",
  "timeline": [
    { "time": "Date/time of the message", "speaker": "Name of the sender", "event": "One or two sentences on what this person said, asked, proposed or agreed in that message" }
  ],
  "keyDecisions": ["Each decision or agreement that was explicitly reached, as a full sentence that says who agreed to what. Empty array if none."],
  "outstandingQuestions": ["Each question or issue still unanswered, and who needs to answer it. Empty array if none."],
  "deliverables": [
    { "item": "The task or deliverable, described specifically", "owner": "Person responsible", "deadline": "Explicit date or Unspecified", "status": "Pending, In progress, Done, or Blocked, based on the thread" }
  ],
  "recommendedNextActions": ["2-4 practical next steps for the reader, most important first"]
}

STRICT RULES:
1. The timeline has one entry per message, in chronological order.
2. Use only what is in the thread. NEVER invent decisions, owners, deadlines, amounts or facts.
3. If ownership is unclear, use "Unknown / Unassigned". If no deadline is stated, use "Unspecified".
4. Write in plain, clear English, even if the thread is in another language.`;

    return AIService.completeStructured<ThreadIntelligenceResult>(
      {
        systemPrompt,
        userPrompt: context,
        temperature: 0.2,
        maxTokens: 2500,
        timeoutMs: 50_000,
      },
      fallback,
      threadIntelligenceSchema
    );
  }
}
