import "server-only";
import { EmailService } from "@/server/services/email-service";
import type { NormalizedMessage, EmailThread } from "@/lib/email-normalizer";
import { AIContextBuilder } from "../context-builder";
import { AIService } from "../ai-service";
import { emailSummarySchema, type EmailSummaryResult } from "./types";

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
    const subject = target.subject || "No Subject";
    const bodyContext = isThread
      ? AIContextBuilder.buildThreadContext(target)
      : `SUBJECT: ${target.subject}\nFROM: ${target.from.name ?? target.from.address}\nDATE: ${target.receivedAt}\n\n${AIContextBuilder.sanitizeText(target.body, 1200)}`;

    const mainSummary = `Summary for "${subject}": Contains key points and messages.`;
    const fallback: EmailSummaryResult = {
      executiveSummary: mainSummary,
      summary: mainSummary,
      keyPoints: [`Subject: ${subject}`, `Messages evaluated: ${isThread ? target.metadata.messageCount : 1}`],
      actionItems: ["Review email content", "Respond if necessary"],
      importantDates: ["None detected"],
      peopleMentioned: isThread ? target.participants.map((p) => p.name ?? p.address) : [target.from.name ?? target.from.address],
      suggestedNextStep: "Read full details or respond to sender.",
      suggestedNextSteps: ["Read full details or respond to sender."],
    };

    const systemPrompt = `You are an executive email assistant. Analyze the email/thread provided and output JSON with the following schema:
{
  "executiveSummary": "Brief 2-3 sentence overview",
  "keyPoints": ["Point 1", "Point 2"],
  "actionItems": ["Action 1", "Action 2"],
  "importantDates": ["Date 1 or None"],
  "peopleMentioned": ["Person 1", "Person 2"],
  "suggestedNextSteps": ["Recommended next action"]
}`;

    return AIService.completeStructured<EmailSummaryResult>(
      {
        systemPrompt,
        userPrompt: bodyContext,
        temperature: 0.2,
      },
      fallback,
      emailSummarySchema
    );
  }
}
