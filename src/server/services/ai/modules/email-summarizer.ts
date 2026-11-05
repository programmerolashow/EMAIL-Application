import "server-only";
import { MailService } from "@/server/services/mail-service";
import type { NormalizedMessage, EmailThread } from "@/lib/email-normalizer";
import { AIContextBuilder } from "../context-builder";
import { AIService } from "../ai-service";
import { emailSummarySchema, type EmailSummaryResult } from "./types";

/** Summaries see much more of the email than other features so they can be descriptive. */
const SUMMARY_CONTEXT_BUDGET = { maxMessages: 12, perMessageChars: 4000, totalChars: 16000 };

export class EmailSummarizer {
  public static async summarizeEmail(
    userId: string,
    messageId: string,
    accountId?: string
  ): Promise<EmailSummaryResult> {
    const message = await MailService.getMessage(userId, messageId, accountId);
    return this.summarize(message);
  }

  public static async summarize(
    target: NormalizedMessage | EmailThread
  ): Promise<EmailSummaryResult> {
    const isThread = "messages" in target;
    const subject = target.subject || "No Subject";
    const bodyContext = isThread
      ? AIContextBuilder.buildThreadContext(target, SUMMARY_CONTEXT_BUDGET)
      : `SUBJECT: ${target.subject}
FROM: ${AIContextBuilder.formatParticipant(target.from)}
TO: ${target.to.map((p) => AIContextBuilder.formatParticipant(p)).join(", ")}
DATE: ${target.receivedAt}

${AIContextBuilder.sanitizeText(target.body, SUMMARY_CONTEXT_BUDGET.perMessageChars)}`;

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

    const systemPrompt = `You are an email assistant helping a busy person understand an email ${isThread ? "conversation" : "message"} without reading it.
Write for someone who has never seen this email. Be specific: name the people, organisations, products, amounts, dates and places that appear in it.

Return ONLY a JSON object with this shape:
{
  "executiveSummary": "4-6 sentences. Sentence 1: who sent it and what kind of email it is (e.g. invoice, meeting request, job offer, newsletter, complaint, follow-up). Then: what it is about in concrete terms, the important details (figures, deadlines, requests, conditions), and what the sender wants from the reader. For a conversation, also explain how it developed and where it stands now.",
  "keyPoints": ["3-6 specific facts or details from the email, each a full sentence"],
  "actionItems": ["Things the reader is asked or expected to do, with any deadline. Empty array if none."],
  "importantDates": ["Each date/time mentioned with what it is for, e.g. 'Fri 14 Nov, 10:00 - project review meeting'. Empty array if none."],
  "peopleMentioned": ["Name (role or organisation, if stated)"],
  "suggestedNextSteps": ["1-3 practical next steps for the reader"]
}

RULES:
- Use only information in the email. Never invent names, amounts, dates or requests.
- Write in plain, clear English, even if the email is in another language.
- If the email is promotional or automated (newsletter, notification, receipt), say so and summarise what it is announcing or confirming.`;

    return AIService.completeStructured<EmailSummaryResult>(
      {
        systemPrompt,
        userPrompt: bodyContext,
        temperature: 0.2,
        maxTokens: 1500,
        timeoutMs: 45_000,
      },
      fallback,
      emailSummarySchema
    );
  }
}
