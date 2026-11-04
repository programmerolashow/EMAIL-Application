import "server-only";
import OpenAI from "openai";
import type { z } from "zod";
import { env } from "@/env";
import { db } from "@/server/db";
import type { Prisma } from "@prisma/client";
import { UserFacingError } from "@/server/lib/errors";
import { UsageLimits, type AiFeature } from "@/server/services/usage-limits";
import { MailService } from "@/server/services/mail-service";
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
  /** OPENAI_MODEL from the environment (defaults to gpt-4o-mini in src/env.js). */
  private static get DEFAULT_MODEL() {
    return env.OPENAI_MODEL;
  }
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

    void fallbackText; // Placeholder text is never shown as if it were an AI result.
    const openai = this.getOpenAIClient();
    if (!openai) {
      throw new UserFacingError(
        "AI is not set up on the server: OPENAI_API_KEY is missing. Add it to the environment variables and redeploy.",
        "PRECONDITION_FAILED"
      );
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

      const content = response.choices[0]?.message?.content?.trim();
      if (!content) {
        throw new UserFacingError("The AI returned an empty response. Try again.", "BAD_GATEWAY");
      }
      return content;
    } catch (error: unknown) {
      const duration = Date.now() - startTime;
      if (error instanceof UserFacingError) throw error;
      if (controller.signal.aborted || (error instanceof Error && error.name === "AbortError")) {
        console.error(`❌ [AIService] OpenAI Call Timed Out after ${duration}ms.`);
        throw new UserFacingError(
          `The AI took longer than ${Math.round(timeoutMs / 1000)} seconds to respond. Try again.`,
          "TIMEOUT"
        );
      }
      console.error(`❌ [AIService] OpenAI Call Failed after ${duration}ms:`, error);
      throw describeOpenAIError(error);
    } finally {
      clearTimeout(timeoutId);
    }
  }

  /**
   * Central Gateway Structured JSON Completion Engine.
   * Parses JSON responses and validates against Zod schema with graceful fallback parsing.
   */
  static async completeStructured<T, TInput = unknown>(
    options: AIGatewayOptions,
    fallbackValue: T,
    schema?: z.ZodType<T, TInput>
  ): Promise<T> {
    void fallbackValue; // Never substitute invented results for a failed AI call.
    const rawContent = await this.complete(options);

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

      const parsed: unknown = JSON.parse(jsonStr);

      if (schema) {
        const validationResult = schema.safeParse(parsed);
        if (!validationResult.success) {
          console.error("⚠️ [AIService] Structured response failed Zod schema validation:", validationResult.error.format());
          throw new UserFacingError("The AI returned an incomplete answer. Try again.", "BAD_GATEWAY");
        }
        return validationResult.data;
      }

      return parsed as T;
    } catch (parseErr) {
      if (parseErr instanceof UserFacingError) throw parseErr;
      console.error("⚠️ [AIService] Failed to parse structured JSON response from OpenAI:", parseErr);
      throw new UserFacingError("The AI returned an answer in an unreadable format. Try again.", "BAD_GATEWAY");
    }
  }

  /**
   * Saved-result features (summary, intelligence, action items).
   *  - Opening an item shows the saved result; nothing is generated or counted.
   *  - The first result for an item, or a refresh because new mail arrived in it (version
   *    changed), is generated once and saved. It does not use the weekly allowance.
   *  - An explicit rerun ("Regenerate") always generates and counts 1 of 5 uses per 7 days.
   */
  private static async withSavedResult<T>(
    userId: string,
    feature: AiFeature,
    targetKey: string,
    version: string | undefined,
    regenerate: boolean,
    generate: () => Promise<T>
  ): Promise<T> {
    const where = { userId_feature_targetKey: { userId, feature, targetKey } };
    if (!regenerate) {
      const saved = await db.aiResult.findUnique({ where });
      if (saved && (!version || !saved.version || saved.version === version)) {
        return saved.result as T;
      }
    }
    const produce = async () => {
      const result = await generate();
      await db.aiResult.upsert({
        where,
        create: { userId, feature, targetKey, version: version ?? null, result: result as Prisma.InputJsonValue },
        update: { version: version ?? null, result: result as Prisma.InputJsonValue },
      });
      return result;
    };
    return regenerate ? UsageLimits.consumeAi(userId, feature, produce) : produce();
  }

  /** Remaining weekly allowance for every AI feature. */
  static getQuota(userId: string) {
    return UsageLimits.aiStatus(userId);
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
    return UsageLimits.consumeAi(userId, "ask", async () => {
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
    });
  }

  /**
   * Summarizes an email thread using OpenAI GPT.
   */
  static async summarizeThread(
    userId: string,
    threadId: string,
    accountId?: string,
    opts: { version?: string; regenerate?: boolean } = {}
  ): Promise<EmailSummaryResult> {
    return this.withSavedResult(
      userId,
      "summarize",
      `thread:${accountId ?? "default"}:${threadId}`,
      opts.version,
      Boolean(opts.regenerate),
      async () => EmailSummarizer.summarize(await MailService.getThread(userId, threadId, accountId))
    );
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
    return UsageLimits.consumeAi(userId, "compose", async () => {
    const thread = threadId
      ? await MailService.getThread(userId, threadId, accountId)
      : null;

    const { system, user } = AIContextBuilder.buildDraftPrompt(thread, instruction);

    const subjectPrefix = thread?.subject
      ? thread.subject.toLowerCase().startsWith("re:")
        ? thread.subject
        : `Re: ${thread.subject}`
      : "";

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
    });
  }

  /**
   * Subtask 7.1: Single email summarization.
   */
  static async summarizeEmail(
    userId: string,
    messageId: string,
    accountId?: string,
    opts: { regenerate?: boolean } = {}
  ): Promise<EmailSummaryResult> {
    return this.withSavedResult(
      userId,
      "summarize",
      `message:${accountId ?? "default"}:${messageId}`,
      messageId,
      Boolean(opts.regenerate),
      () => EmailSummarizer.summarizeEmail(userId, messageId, accountId)
    );
  }

  /**
   * Subtask 7.2: Deep thread intelligence and analysis.
   */
  static async getThreadIntelligence(
    userId: string,
    threadId: string,
    accountId?: string,
    opts: { version?: string; regenerate?: boolean } = {}
  ): Promise<ThreadIntelligenceResult> {
    return this.withSavedResult(
      userId,
      "intelligence",
      `thread:${accountId ?? "default"}:${threadId}`,
      opts.version,
      Boolean(opts.regenerate),
      () => ThreadIntelligenceService.getThreadIntelligence(userId, threadId, accountId)
    );
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
    return UsageLimits.consumeAi(userId, "reply", () =>
      ReplyGenerator.generateReply(userId, messageId, tone, prompt, accountId)
    );
  }

  /**
   * Subtask 7.4: Draft rewriter and style transformer.
   */
  static async rewriteDraft(
    userId: string,
    draftText: string,
    option: RewriteOption,
    customPrompt?: string
  ): Promise<string> {
    return UsageLimits.consumeAi(userId, "rewrite", () =>
      DraftRewriter.rewriteDraft(draftText, option, customPrompt)
    );
  }

  /**
   * Subtask 7.5: Action-item extraction from an email or thread.
   */
  static async extractActionItems(
    userId: string,
    emailOrThreadId: string,
    isThread = false,
    accountId?: string,
    opts: { version?: string; regenerate?: boolean } = {}
  ): Promise<ExtractedActionItem[]> {
    return this.withSavedResult(
      userId,
      "action-items",
      `${isThread ? "thread" : "message"}:${accountId ?? "default"}:${emailOrThreadId}`,
      opts.version ?? (isThread ? undefined : emailOrThreadId),
      Boolean(opts.regenerate),
      () => ActionItemExtractor.extractActionItems(userId, emailOrThreadId, isThread, accountId)
    );
  }
}

/** Turns an OpenAI SDK error into a user-facing message that includes OpenAI's own text. */
function describeOpenAIError(error: unknown): UserFacingError {
  const status = typeof error === "object" && error !== null && "status" in error ? Number(error.status) : 0;
  const raw = error instanceof Error ? error.message : String(error);
  const detail = `(OpenAI: ${raw})`;
  if (status === 401) {
    return new UserFacingError(`OpenAI rejected the server's API key. Check OPENAI_API_KEY. ${detail}`, "PRECONDITION_FAILED");
  }
  if (status === 429) {
    return new UserFacingError(`OpenAI's rate limit or billing quota was reached. Try again later. ${detail}`, "TOO_MANY_REQUESTS");
  }
  if (status === 404) {
    return new UserFacingError(`The configured OpenAI model isn't available. Check OPENAI_MODEL. ${detail}`, "PRECONDITION_FAILED");
  }
  if (status >= 500) {
    return new UserFacingError(`OpenAI is having problems right now. Try again shortly. ${detail}`, "BAD_GATEWAY");
  }
  return new UserFacingError(`The AI request failed. ${detail}`, "BAD_GATEWAY");
}
