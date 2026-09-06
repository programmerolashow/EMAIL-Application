import "server-only";
import OpenAI from "openai";
import { env } from "@/env";
import { EmailService } from "@/server/services/email-service";
import type { NormalizedMessage, EmailThread } from "@/lib/email-normalizer";
import { AIContextBuilder } from "../context-builder";
import type { EmailSummaryResult } from "./types";

export class EmailSummarizer {
  public static async summarizeEmail(
    userId: string,
    messageId: string,
    accountId?: string
  ): Promise<EmailSummaryResult> {
    const message = await EmailService.getMessage(userId, messageId, accountId);
    const openai = env.OPENAI_API_KEY ? new OpenAI({ apiKey: env.OPENAI_API_KEY }) : null;
    return this.summarize(message, openai);
  }

  public static async summarize(
    target: NormalizedMessage | EmailThread,
    openai: OpenAI | null
  ): Promise<EmailSummaryResult> {
    const isThread = "messages" in target;
    const subject = target.subject;
    const bodyContext = isThread
      ? AIContextBuilder.buildThreadContext(target)
      : `SUBJECT: ${target.subject}\nFROM: ${target.from.name ?? target.from.address}\nDATE: ${target.receivedAt}\n\n${AIContextBuilder.sanitizeText(target.body, 1200)}`;

    if (!openai) {
      return {
        summary: `Summary for "${subject}": Contains key points and messages.`,
        keyPoints: [`Subject: ${subject}`, `Messages evaluated: ${isThread ? target.metadata.messageCount : 1}`],
        actionItems: ["Review email content", "Respond if necessary"],
        importantDates: ["None detected"],
        peopleMentioned: isThread ? target.participants.map((p) => p.name ?? p.address) : [target.from.name ?? target.from.address],
        suggestedNextStep: "Read full details or respond to sender.",
      };
    }

    const systemPrompt = `You are an executive email assistant. Analyze the email/thread provided and output JSON with the following schema:
{
  "summary": "Brief 2-3 sentence overview",
  "keyPoints": ["Point 1", "Point 2"],
  "actionItems": ["Action 1", "Action 2"],
  "importantDates": ["Date 1 or None"],
  "peopleMentioned": ["Person 1", "Person 2"],
  "suggestedNextStep": "Recommended next action"
}`;

    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: bodyContext },
        ],
        temperature: 0.2,
      });

      const text = response.choices[0]?.message?.content ?? "";
      const jsonStart = text.indexOf("{");
      const jsonEnd = text.lastIndexOf("}");

      if (jsonStart !== -1 && jsonEnd !== -1) {
        const parsed = JSON.parse(text.slice(jsonStart, jsonEnd + 1)) as Partial<EmailSummaryResult>;
        return {
          summary: parsed.summary ?? `Summary for ${subject}`,
          keyPoints: Array.isArray(parsed.keyPoints) ? parsed.keyPoints : [],
          actionItems: Array.isArray(parsed.actionItems) ? parsed.actionItems : [],
          importantDates: Array.isArray(parsed.importantDates) ? parsed.importantDates : [],
          peopleMentioned: Array.isArray(parsed.peopleMentioned) ? parsed.peopleMentioned : [],
          suggestedNextStep: parsed.suggestedNextStep ?? "Follow up as appropriate.",
        };
      }
    } catch (err) {
      console.error("EmailSummarizer GPT error:", err);
    }

    return {
      summary: `Summary for "${subject}".`,
      keyPoints: [`Subject: ${subject}`],
      actionItems: ["Follow up on email"],
      importantDates: [],
      peopleMentioned: [],
      suggestedNextStep: "Review email content.",
    };
  }
}
