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
import { EmailTranslator, type EmailTranslationResult } from "./modules/email-translator";
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

/** Bump when prompts change so saved results are regenerated once (free) with the new prompt. */
const SAVED_RESULT_VERSION = "v2";

export class AIService {
  /** OPENAI_MODEL from the environment (defaults to gpt-4o-mini in src/env.js). */
  private static get DEFAULT_MODEL() {
    return env.OPENAI_MODEL;
  }
  private static readonly DEFAULT_TIMEOUT_MS = 25000;
  /** Speech-to-text model; OPENAI_TRANSCRIBE_MODEL overrides it. */
  private static get TRANSCRIBE_MODEL() {
    return env.OPENAI_TRANSCRIBE_MODEL;
  }

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
   * Tries OpenAI first; if OpenAI is not configured or fails (outage, rate limit, billing,
   * timeout), retries the same prompt on Google Gemini when GEMINI_API_KEY is set.
   * Users only ever see plain-language messages; provider details go to the server log.
   */
  static async complete(options: AIGatewayOptions, fallbackText?: string): Promise<string> {
    if (!options.systemPrompt || !options.userPrompt) {
      throw new Error("[AIService] Both systemPrompt and userPrompt are required.");
    }
    void fallbackText; // Placeholder text is never shown as if it were an AI result.

    const hasOpenAI = Boolean(env.OPENAI_API_KEY);
    const hasGemini = Boolean(env.GEMINI_API_KEY);
    if (!hasOpenAI && !hasGemini) {
      console.error("❌ [AIService] No AI provider configured (set OPENAI_API_KEY and/or GEMINI_API_KEY).");
      throw new UserFacingError(AI_MESSAGES.unavailable, "PRECONDITION_FAILED");
    }

    let openAIFailure: ProviderFailure | null = null;
    if (hasOpenAI) {
      try {
        return await this.completeWithOpenAI(options);
      } catch (error) {
        openAIFailure = toProviderFailure("OpenAI", error);
        if (!hasGemini) throw openAIFailure.userError;
        console.warn(`↪️ [AIService] OpenAI failed (${openAIFailure.reason}); retrying on Gemini.`);
      }
    }

    try {
      return await this.completeWithGemini(options);
    } catch (error) {
      const geminiFailure = toProviderFailure("Gemini", error);
      throw (openAIFailure ?? geminiFailure).userError;
    }
  }

  private static async completeWithOpenAI(options: AIGatewayOptions): Promise<string> {
    const openai = this.getOpenAIClient();
    if (!openai) throw new Error("OPENAI_API_KEY is not set");
    const {
      model = this.DEFAULT_MODEL,
      systemPrompt,
      userPrompt,
      temperature = 0.3,
      maxTokens,
      timeoutMs = this.DEFAULT_TIMEOUT_MS,
    } = options;

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
      const totalTokens = response.usage?.total_tokens !== undefined ? String(response.usage.total_tokens) : "unknown";
      console.log(
        `⚡ [AIService] OpenAI Call Succeeded [model=${model}, duration=${Date.now() - startTime}ms, tokens=${totalTokens}]`
      );
      const content = response.choices[0]?.message?.content?.trim();
      if (!content) throw new EmptyAIResponse();
      return content;
    } catch (error) {
      if (controller.signal.aborted) throw new AITimeout(timeoutMs);
      throw error;
    } finally {
      clearTimeout(timeoutId);
    }
  }

  /**
   * Google Gemini via its REST API (no extra SDK). Requires GEMINI_API_KEY from Google AI Studio.
   * GEMINI_MODEL may list several models (comma-separated); the next one is tried when a model
   * is overloaded (503) or rate-limited (429).
   */
  private static async completeWithGemini(options: AIGatewayOptions): Promise<string> {
    const models = env.GEMINI_MODEL.split(",").map((m) => m.trim()).filter(Boolean);
    let lastError: unknown = new Error("GEMINI_MODEL is empty");
    for (const model of models) {
      try {
        return await this.completeWithGeminiModel(model, options);
      } catch (error) {
        lastError = error;
        const retryable = error instanceof ProviderHttpError && (error.status === 503 || error.status === 429);
        if (!retryable) throw error;
        console.warn(`↪️ [AIService] Gemini ${model} unavailable (${error.status}); trying next model.`);
      }
    }
    throw lastError;
  }

  private static async completeWithGeminiModel(model: string, options: AIGatewayOptions): Promise<string> {
    const apiKey = env.GEMINI_API_KEY;
    if (!apiKey) throw new Error("GEMINI_API_KEY is not set");
    // No maxOutputTokens: Gemini's thinking models spend that budget on reasoning and can
    // return an empty answer when it is tight.
    const { systemPrompt, userPrompt, temperature = 0.3, timeoutMs = this.DEFAULT_TIMEOUT_MS } = options;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
    const startTime = Date.now();
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json", "x-goog-api-key": apiKey },
          body: JSON.stringify({
            systemInstruction: { parts: [{ text: systemPrompt }] },
            contents: [{ role: "user", parts: [{ text: userPrompt }] }],
            generationConfig: { temperature },
          }),
          signal: controller.signal,
        }
      );
      if (!response.ok) {
        const body = await response.text().catch(() => "");
        throw new ProviderHttpError(response.status, body.slice(0, 500));
      }
      const data = (await response.json()) as {
        candidates?: { content?: { parts?: { text?: string }[] } }[];
        usageMetadata?: { totalTokenCount?: number };
      };
      console.log(
        `⚡ [AIService] Gemini Call Succeeded [model=${model}, duration=${Date.now() - startTime}ms, tokens=${data.usageMetadata?.totalTokenCount ?? "unknown"}]`
      );
      const content = data.candidates?.[0]?.content?.parts
        ?.map((part) => part.text ?? "")
        .join("")
        .trim();
      if (!content) throw new EmptyAIResponse();
      return content;
    } catch (error) {
      if (controller.signal.aborted) throw new AITimeout(timeoutMs);
      throw error;
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
          throw new UserFacingError(AI_MESSAGES.badAnswer, "BAD_GATEWAY");
        }
        return validationResult.data;
      }

      return parsed as T;
    } catch (parseErr) {
      if (parseErr instanceof UserFacingError) throw parseErr;
      console.error("⚠️ [AIService] Failed to parse structured JSON response from OpenAI:", parseErr);
      throw new UserFacingError(AI_MESSAGES.badAnswer, "BAD_GATEWAY");
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
    const where = {
      userId_feature_targetKey: { userId, feature, targetKey: `${SAVED_RESULT_VERSION}:${targetKey}` },
    };
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
   * Translates one received email into the chosen language. A saved translation (same message,
   * same language) is returned without spending the weekly allowance; a new one counts 1 use.
   */
  static async translateEmail(
    userId: string,
    messageId: string,
    targetLanguage: string,
    accountId?: string
  ): Promise<EmailTranslationResult> {
    const where = {
      userId_feature_targetKey: {
        userId,
        feature: "translate",
        targetKey: `message:${accountId ?? "default"}:${messageId}:${targetLanguage}`,
      },
    };
    const saved = await db.aiResult.findUnique({ where });
    if (saved) return saved.result as unknown as EmailTranslationResult;

    return UsageLimits.consumeAi(userId, "translate", async () => {
      const message = await MailService.getMessage(userId, messageId, accountId);
      const result = await EmailTranslator.translate(message, targetLanguage);
      await db.aiResult.upsert({
        where,
        create: {
          ...where.userId_feature_targetKey,
          version: messageId,
          result: result as unknown as Prisma.InputJsonValue,
        },
        update: { result: result as unknown as Prisma.InputJsonValue },
      });
      return result;
    });
  }

  /**
   * Speech-to-text for dictation. `audio` is the recorded clip; counts 1 use per clip.
   */
  static async transcribeAudio(userId: string, audio: Buffer, mimeType: string): Promise<string> {
    const openai = this.getOpenAIClient();
    if (!openai) {
      console.error("❌ [AIService] Transcription needs OPENAI_API_KEY.");
      throw new UserFacingError("Voice input isn't available right now. Please type your message instead.", "PRECONDITION_FAILED");
    }
    const extension = mimeType.includes("mp4") ? "mp4" : mimeType.includes("ogg") ? "ogg" : "webm";
    const file = new File([new Uint8Array(audio)], `dictation.${extension}`, { type: mimeType });

    return UsageLimits.consumeAi(userId, "transcribe", async () => {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 60_000);
      const startTime = Date.now();
      try {
        const response = await openai.audio.transcriptions.create(
          { file, model: this.TRANSCRIBE_MODEL },
          { signal: controller.signal }
        );
        console.log(
          `⚡ [AIService] Transcription Succeeded [model=${this.TRANSCRIBE_MODEL}, bytes=${audio.length}, duration=${Date.now() - startTime}ms]`
        );
        const text = response.text?.trim();
        if (!text) {
          throw new UserFacingError("We couldn't hear any speech in that recording. Please try again.", "BAD_REQUEST");
        }
        return text;
      } catch (error: unknown) {
        if (error instanceof UserFacingError) throw error;
        if (controller.signal.aborted) {
          throw new UserFacingError("Transcription took too long. Please try a shorter recording.", "TIMEOUT");
        }
        throw toProviderFailure("OpenAI transcription", error).userError;
      } finally {
        clearTimeout(timeoutId);
      }
    });
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

/** Messages shown to users. Technical details are logged on the server, never shown. */
const AI_MESSAGES = {
  unavailable: "AI features aren't available right now. Please try again later.",
  busy: "The AI assistant is very busy right now. Please wait a few minutes and try again.",
  timeout: "The AI assistant took too long to respond. Please try again.",
  badAnswer: "The AI assistant couldn't produce a proper answer this time. Please try again.",
  failed: "The AI assistant couldn't complete this request. Please try again in a moment.",
} as const;

class EmptyAIResponse extends Error {
  constructor() {
    super("Empty AI response");
  }
}

class AITimeout extends Error {
  constructor(readonly timeoutMs: number) {
    super(`Timed out after ${timeoutMs}ms`);
  }
}

class ProviderHttpError extends Error {
  constructor(
    readonly status: number,
    readonly body: string
  ) {
    super(`HTTP ${status}: ${body}`);
  }
}

interface ProviderFailure {
  reason: string;
  userError: UserFacingError;
}

/** Logs the provider's real error and maps it to a plain-language message for the user. */
function toProviderFailure(provider: string, error: unknown): ProviderFailure {
  if (error instanceof UserFacingError) return { reason: error.message, userError: error };
  if (error instanceof AITimeout) {
    console.error(`❌ [AIService] ${provider} timed out after ${error.timeoutMs}ms.`);
    return { reason: "timeout", userError: new UserFacingError(AI_MESSAGES.timeout, "TIMEOUT") };
  }
  if (error instanceof EmptyAIResponse) {
    console.error(`❌ [AIService] ${provider} returned an empty response.`);
    return { reason: "empty response", userError: new UserFacingError(AI_MESSAGES.badAnswer, "BAD_GATEWAY") };
  }

  const status =
    error instanceof ProviderHttpError
      ? error.status
      : typeof error === "object" && error !== null && "status" in error
        ? Number(error.status)
        : 0;
  console.error(`❌ [AIService] ${provider} call failed [status=${status || "n/a"}]:`, error);

  if (status === 401 || status === 403) {
    console.error(`❌ [AIService] ${provider} rejected the API key. Check the server's API key.`);
    return { reason: `${status} auth`, userError: new UserFacingError(AI_MESSAGES.unavailable, "PRECONDITION_FAILED") };
  }
  if (status === 404) {
    console.error(`❌ [AIService] ${provider} model not found. Check the configured model name.`);
    return { reason: "404 model", userError: new UserFacingError(AI_MESSAGES.unavailable, "PRECONDITION_FAILED") };
  }
  if (status === 429) {
    return { reason: "429 rate limit / quota", userError: new UserFacingError(AI_MESSAGES.busy, "TOO_MANY_REQUESTS") };
  }
  return {
    reason: status ? `HTTP ${status}` : "network error",
    userError: new UserFacingError(AI_MESSAGES.failed, "BAD_GATEWAY"),
  };
}
