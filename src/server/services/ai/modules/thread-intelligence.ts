import "server-only";
import { EmailService } from "@/server/services/email-service";
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
    const thread = await EmailService.getThread(userId, threadId, accountId);
    return this.analyze(thread);
  }

  public static async analyze(
    thread: EmailThread
  ): Promise<ThreadIntelligenceResult> {
    const context = AIContextBuilder.buildThreadContext(thread);

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

    const systemPrompt = `You are a conversation intelligence engine for executive email threads.
Analyze the normalized email thread and output JSON matching the exact schema below:

{
  "conversationOverview": "High-level summary of discussion",
  "timeline": [
    { "time": "Date/Time string", "speaker": "Name or Email of who said what", "event": "Key point or proposal made" }
  ],
  "keyDecisions": [
    "Confirmed decision 1",
    "Agreed point 2"
  ],
  "outstandingQuestions": [
    "Unresolved question 1",
    "Open issue 2"
  ],
  "deliverables": [
    { "item": "Task or deliverable", "owner": "Assigned Person", "deadline": "Explicit Date or Unspecified", "status": "Pending" }
  ],
  "recommendedNextActions": [
    "Recommended next step 1"
  ]
}

STRICT ANTI-FABRICATION POLICY:
1. Identify who said what (timeline with speaker and event).
2. Identify what decisions were explicitly agreed upon.
3. Identify unresolved questions or outstanding open items.
4. Identify who owes what deliverables.
5. NEVER fabricate or invent responsibilities, task owners, or completion deadlines.
6. If task ownership is ambiguous, explicitly represent owner as "Unknown / Unassigned".
7. If a deadline is not explicitly mentioned in the text, explicitly represent deadline as "Unspecified".`;

    return AIService.completeStructured<ThreadIntelligenceResult>(
      {
        systemPrompt,
        userPrompt: context,
        temperature: 0.2,
      },
      fallback,
      threadIntelligenceSchema
    );
  }
}
