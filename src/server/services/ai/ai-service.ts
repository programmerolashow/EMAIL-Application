import "server-only";
import OpenAI from "openai";
import { env } from "@/env";
import { EmailService } from "@/server/services/email-service";
import { AIContextBuilder } from "./context-builder";

export interface AISummaryResponse {
  threadId: string;
  summary: string;
}

export interface AIDraftResponse {
  subject: string;
  body: string;
}

export class AIService {
  private static getOpenAIClient(): OpenAI | null {
    if (!env.OPENAI_API_KEY) {
      return null;
    }
    return new OpenAI({ apiKey: env.OPENAI_API_KEY });
  }

  /**
   * Summarizes an email thread using OpenAI GPT.
   */
  static async summarizeThread(
    userId: string,
    threadId: string,
    accountId?: string
  ): Promise<AISummaryResponse> {
    const thread = await EmailService.getThread(userId, threadId, accountId);
    const { system, user } = AIContextBuilder.buildSummaryPrompt(thread);

    const openai = this.getOpenAIClient();

    if (!openai) {
      // Fallback summary response if OpenAI API Key is not set in environment
      return {
        threadId,
        summary: `• Summary for "${thread.subject}": Contains ${thread.metadata.messageCount} messages.\n• Latest activity on ${thread.lastActivity}.\n• Configure OPENAI_API_KEY for live AI summaries.`,
      };
    }

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: system },
        { role: "user", content: user },
      ],
      temperature: 0.3,
    });

    const summary = response.choices[0]?.message?.content ?? "No summary generated.";

    return {
      threadId,
      summary,
    };
  }

  /**
   * Generates a smart email draft response based on user instructions and optional thread context.
   */
  static async generateDraft(
    userId: string,
    instruction: string,
    threadId?: string,
    accountId?: string
  ): Promise<AIDraftResponse> {
    const thread = threadId
      ? await EmailService.getThread(userId, threadId, accountId)
      : null;

    const { system, user } = AIContextBuilder.buildDraftPrompt(thread, instruction);
    const openai = this.getOpenAIClient();

    const subjectPrefix = thread?.subject
      ? thread.subject.toLowerCase().startsWith("re:")
        ? thread.subject
        : `Re: ${thread.subject}`
      : "Draft Subject";

    if (!openai) {
      return {
        subject: subjectPrefix,
        body: `Hi,\n\n${instruction}\n\n[Configure OPENAI_API_KEY for automated GPT draft generation.]`,
      };
    }

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: system },
        { role: "user", content: user },
      ],
      temperature: 0.7,
    });

    const body = response.choices[0]?.message?.content ?? "";

    return {
      subject: subjectPrefix,
      body,
    };
  }
}
