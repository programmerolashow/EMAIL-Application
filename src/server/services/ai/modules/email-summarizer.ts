import "server-only";
import { EmailService } from "@/server/services/email-service";
import type { NormalizedMessage, EmailThread } from "@/lib/email-normalizer";
import { AIContextBuilder } from "../context-builder";
import { AIService } from "../ai-service";
import type { EmailSummaryResult } from "./types";

export class EmailSummarizer {
  public static async summarizeEmail(
    userId: string,
    messageId: string,
    accountId?: string
  ): Promise<EmailSummaryResult> {
    const message = await EmailService.getMessage(userId, messageId, accountId);
    return this.summarize(message);
  }

  public static async summarize(
    target: NormalizedMessage | EmailThread
  ): Promise<EmailSummaryResult> {
    const isThread = "messages" in target;
    const subject = target.subject;
    const bodyContext = isThread
      ? AIContextBuilder.buildThreadContext(target)
      : `SUBJECT: ${target.subject}\nFROM: ${target.from.name ?? target.from.address}\nDATE: ${target.receivedAt}\n\n${AIContextBuilder.sanitizeText(target.body, 1200)}`;

    const fallback: EmailSummaryResult = {
      summary: `Summary for "${subject}": Contains key points and messages.`,
      keyPoints: [`Subject: ${subject}`, `Messages evaluated: ${isThread ? target.metadata.messageCount : 1}`],
      actionItems: ["Review email content", "Respond if necessary"],
      importantDates: ["None detected"],
      peopleMentioned: isThread ? target.participants.map((p) => p.name ?? p.address) : [target.from.name ?? target.from.address],
      suggestedNextStep: "Read full details or respond to sender.",
    };

    const systemPrompt = `You are an executive email assistant. Analyze the email/thread provided and output JSON with the following schema:
{
  "summary": "Brief 2-3 sentence overview",
  "keyPoints": ["Point 1", "Point 2"],
  "actionItems": ["Action 1", "Action 2"],
  "importantDates": ["Date 1 or None"],
  "peopleMentioned": ["Person 1", "Person 2"],
  "suggestedNextStep": "Recommended next action"
}`;

    const parsed = await AIService.completeStructured<Partial<EmailSummaryResult>>(
      {
        systemPrompt,
        userPrompt: bodyContext,
        temperature: 0.2,
      },
      fallback
    );

    return {
      summary: parsed.summary ?? `Summary for "${subject}".`,
      keyPoints: Array.isArray(parsed.keyPoints) ? parsed.keyPoints : fallback.keyPoints,
      actionItems: Array.isArray(parsed.actionItems) ? parsed.actionItems : fallback.actionItems,
      importantDates: Array.isArray(parsed.importantDates) ? parsed.importantDates : fallback.importantDates,
      peopleMentioned: Array.isArray(parsed.peopleMentioned) ? parsed.peopleMentioned : fallback.peopleMentioned,
      suggestedNextStep: parsed.suggestedNextStep ?? fallback.suggestedNextStep,
    };
  }
}
