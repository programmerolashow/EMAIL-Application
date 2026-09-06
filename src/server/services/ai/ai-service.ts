import "server-only";
import OpenAI from "openai";
import { env } from "@/env";
import { EmailService } from "@/server/services/email-service";
import { AIContextBuilder } from "./context-builder";
import { EmailSummarizer } from "./modules/email-summarizer";
import { ThreadIntelligenceService } from "./modules/thread-intelligence";
import { ReplyGenerator } from "./modules/reply-generator";
import { DraftRewriter } from "./modules/draft-rewriter";
import { ActionItemExtractor } from "./modules/action-item-extractor";
import type {
  EmailSummaryResult,
  ThreadIntelligenceResult,
  ReplyTone,
  RewriteOption,
  ExtractedActionItem,
} from "./modules/types";

export interface AISummaryResponse {
  threadId: string;
  summary: string;
}

export interface AIDraftResponse {
  subject: string;
  body: string;
}

export interface AIQueryResponse {
  answer: string;
  resolvedEntity?: string;
  messagesIncludedCount: number;
}

export class AIService {
  private static getOpenAIClient(): OpenAI | null {
    if (!env.OPENAI_API_KEY) {
      return null;
    }
    return new OpenAI({ apiKey: env.OPENAI_API_KEY });
  }

  /**
   * Processes a natural language AI query (e.g. "Summarize my recent conversations with John")
   * using the privacy-aware AIContextBuilder pipeline to ensure only minimum necessary data reaches OpenAI.
   */
  static async askAI(
    userId: string,
    prompt: string,
    accountId?: string
  ): Promise<AIQueryResponse> {
    const { systemPrompt, userPrompt, resolvedEntity, messagesIncludedCount } =
      await AIContextBuilder.buildFilteredContextForPrompt(userId, prompt, accountId);

    const openai = this.getOpenAIClient();

    if (!openai) {
      return {
        answer: `[AI Privacy Engine]: Resolved entity "${resolvedEntity ?? "General Inbox"}". Retained ${messagesIncludedCount} relevant minimal message context(s). Configure OPENAI_API_KEY for live GPT completions.`,
        resolvedEntity,
        messagesIncludedCount,
      };
    }

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      temperature: 0.3,
    });

    const answer = response.choices[0]?.message?.content ?? "No response generated.";

    return {
      answer,
      resolvedEntity,
      messagesIncludedCount,
    };
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

  /**
   * Subtask 7.1: Single email summarization.
   */
  static async summarizeEmail(
    userId: string,
    messageId: string,
    accountId?: string
  ): Promise<EmailSummaryResult> {
    return EmailSummarizer.summarizeEmail(userId, messageId, accountId);
  }

  /**
   * Subtask 7.2: Deep thread intelligence and analysis.
   */
  static async getThreadIntelligence(
    userId: string,
    threadId: string,
    accountId?: string
  ): Promise<ThreadIntelligenceResult> {
    return ThreadIntelligenceService.getThreadIntelligence(userId, threadId, accountId);
  }

  /**
   * Subtask 7.3: Tone-guided reply generation.
   * Note: The generated draft is returned to the caller for editing and review.
   * Never auto-sent without explicit user action.
   */
  static async generateReply(
    userId: string,
    messageId: string,
    tone: ReplyTone,
    prompt?: string,
    accountId?: string
  ): Promise<AIDraftResponse> {
    return ReplyGenerator.generateReply(userId, messageId, tone, prompt, accountId);
  }

  /**
   * Subtask 7.4: Draft rewriter and style transformer.
   */
  static async rewriteDraft(
    draftText: string,
    option: RewriteOption,
    customPrompt?: string
  ): Promise<string> {
    return DraftRewriter.rewriteDraft(draftText, option, customPrompt);
  }

  /**
   * Subtask 7.5: Action-item extraction from an email or thread.
   */
  static async extractActionItems(
    userId: string,
    emailOrThreadId: string,
    isThread = false,
    accountId?: string
  ): Promise<ExtractedActionItem[]> {
    return ActionItemExtractor.extractActionItems(userId, emailOrThreadId, isThread, accountId);
  }
}

