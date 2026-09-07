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

export interface AIGatewayOptions {
  model?: string;
  systemPrompt: string;
  userPrompt: string;
  temperature?: number;
  maxTokens?: number;
  timeoutMs?: number;
}

export class AIService {
  private static readonly DEFAULT_MODEL = "gpt-4o-mini";
  private static readonly DEFAULT_TIMEOUT_MS = 25000;

  /**
   * Private helper to obtain initialized OpenAI client (or null if OPENAI_API_KEY is unset).
   */
  private static getOpenAIClient(): OpenAI | null {
    if (!env.OPENAI_API_KEY) {
      return null;
    }
    return new OpenAI({ apiKey: env.OPENAI_API_KEY });
  }

  /**
   * Central Gateway Completion Engine.
   * Handles client instantiation, timeouts (AbortController), request validation,
   * error handling, logging, token efficiency, and fallback logic.
   */
  static async complete(options: AIGatewayOptions, fallbackText?: string): Promise<string> {
    const {
      model = this.DEFAULT_MODEL,
      systemPrompt,
      userPrompt,
      temperature = 0.3,
      maxTokens,
      timeoutMs = this.DEFAULT_TIMEOUT_MS,
    } = options;

    if (!systemPrompt || !userPrompt) {
      throw new Error("[AIService] Both systemPrompt and userPrompt are required.");
    }

    const openai = this.getOpenAIClient();
    if (!openai) {
      console.log("ℹ️ [AIService] OpenAI API key not configured. Returning fallback response.");
      return fallbackText ?? "OPENAI_API_KEY is not configured in server environment.";
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
    const startTime = Date.now();

    try {
      const response = await openai.chat.completions.create(
        {
          model,
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt },
          ],
          temperature,
          ...(maxTokens ? { max_tokens: maxTokens } : {}),
        },
        { signal: controller.signal }
      );

      const duration = Date.now() - startTime;
      const totalTokens = response.usage?.total_tokens !== undefined ? String(response.usage.total_tokens) : "unknown";
      console.log(
        `⚡ [AIService] OpenAI Call Succeeded [model=${model}, duration=${duration}ms, tokens=${totalTokens}]`
      );

      return response.choices[0]?.message?.content ?? fallbackText ?? "";
    } catch (error: unknown) {
      const duration = Date.now() - startTime;
      if (error instanceof Error && error.name === "AbortError") {
        console.error(`❌ [AIService] OpenAI Call Timed Out after ${duration}ms.`);
      } else {
        console.error(`❌ [AIService] OpenAI Call Failed after ${duration}ms:`, error);
      }
      return fallbackText ?? "";
    } finally {
      clearTimeout(timeoutId);
    }
  }

  /**
   * Central Gateway Structured JSON Completion Engine.
   * Parses JSON responses with graceful fallback parsing.
   */
  static async completeStructured<T>(
    options: AIGatewayOptions,
    fallbackValue: T
  ): Promise<T> {
    const rawContent = await this.complete(options, "");
    if (!rawContent) return fallbackValue;

    try {
      const jsonStart = rawContent.indexOf("{");
      const jsonEnd = rawContent.lastIndexOf("}");
      const arrStart = rawContent.indexOf("[");
      const arrEnd = rawContent.lastIndexOf("]");

      let jsonStr = rawContent;
      if (jsonStart !== -1 && jsonEnd !== -1 && (arrStart === -1 || jsonStart < arrStart)) {
        jsonStr = rawContent.slice(jsonStart, jsonEnd + 1);
      } else if (arrStart !== -1 && arrEnd !== -1) {
        jsonStr = rawContent.slice(arrStart, arrEnd + 1);
      }

      return JSON.parse(jsonStr) as T;
    } catch (parseErr) {
      console.error("⚠️ [AIService] Failed to parse structured JSON response from OpenAI:", parseErr);
      return fallbackValue;
    }
  }

  /**
   * Processes a natural language AI query (e.g. "Summarize my recent conversations with John")
   * using the privacy-aware AIContextBuilder pipeline.
   */
  static async askAI(
    userId: string,
    prompt: string,
    accountId?: string
  ): Promise<AIQueryResponse> {
    const { systemPrompt, userPrompt, resolvedEntity, messagesIncludedCount } =
      await AIContextBuilder.buildFilteredContextForPrompt(userId, prompt, accountId);

    const fallbackAnswer = `[AI Privacy Engine]: Resolved entity "${resolvedEntity ?? "General Inbox"}". Retained ${messagesIncludedCount} relevant minimal message context(s). Configure OPENAI_API_KEY for live GPT completions.`;

    const answer = await this.complete(
      {
        systemPrompt,
        userPrompt,
        temperature: 0.3,
      },
      fallbackAnswer
    );

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

    const fallbackSummary = `• Summary for "${thread.subject}": Contains ${thread.metadata.messageCount} messages.\n• Latest activity on ${thread.lastActivity}.\n• Configure OPENAI_API_KEY for live AI summaries.`;

    const summary = await this.complete(
      {
        systemPrompt: system,
        userPrompt: user,
        temperature: 0.3,
      },
      fallbackSummary
    );

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

    const subjectPrefix = thread?.subject
      ? thread.subject.toLowerCase().startsWith("re:")
        ? thread.subject
        : `Re: ${thread.subject}`
      : "Draft Subject";

    const fallbackBody = `Hi,\n\n${instruction}\n\n[Configure OPENAI_API_KEY for automated GPT draft generation.]`;

    const body = await this.complete(
      {
        systemPrompt: system,
        userPrompt: user,
        temperature: 0.7,
      },
      fallbackBody
    );

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
