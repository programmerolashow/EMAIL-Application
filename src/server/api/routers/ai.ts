import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { AIService } from "@/server/services/ai/ai-service";

const replyToneEnum = z.enum([
  "Professional",
  "Friendly",
  "Concise",
  "Detailed",
  "Formal",
  "Apologetic",
  "Persuasive",
]);

const rewriteOptionEnum = z.enum([
  "Make professional",
  "Make it more professional",
  "Make shorter",
  "Make it shorter",
  "Make friendlier",
  "Make it friendlier",
  "Fix grammar",
  "Make persuasive",
  "Make it persuasive",
  "Simplify",
  "Simplify it",
]);

/** Newest message id the cached result should reflect; a different value refreshes it once. */
const versionSchema = z.string().max(512).optional();

export const aiRouter = createTRPCRouter({
  /** Remaining weekly allowance (5 per feature per 7 days) for every AI feature. */
  getQuota: protectedProcedure.query(async ({ ctx }) => {
    return AIService.getQuota(ctx.auth.userId);
  }),

  /**
   * Explicit rerun of a saved-result feature. This is the only path that spends the weekly
   * allowance for summaries, intelligence and action items.
   */
  regenerate: protectedProcedure
    .input(
      z.discriminatedUnion("feature", [
        z.object({
          feature: z.literal("summarize-thread"),
          threadId: z.string(),
          accountId: z.string().optional(),
          version: versionSchema,
        }),
        z.object({
          feature: z.literal("summarize-email"),
          messageId: z.string(),
          accountId: z.string().optional(),
        }),
        z.object({
          feature: z.literal("intelligence"),
          threadId: z.string(),
          accountId: z.string().optional(),
          version: versionSchema,
        }),
        z.object({
          feature: z.literal("action-items"),
          emailOrThreadId: z.string(),
          isThread: z.boolean(),
          accountId: z.string().optional(),
          version: versionSchema,
        }),
      ])
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.auth.userId;
      switch (input.feature) {
        case "summarize-thread":
          return {
            feature: input.feature,
            data: await AIService.summarizeThread(userId, input.threadId, input.accountId, {
              version: input.version,
              regenerate: true,
            }),
          } as const;
        case "summarize-email":
          return {
            feature: input.feature,
            data: await AIService.summarizeEmail(userId, input.messageId, input.accountId, {
              regenerate: true,
            }),
          } as const;
        case "intelligence":
          return {
            feature: input.feature,
            data: await AIService.getThreadIntelligence(userId, input.threadId, input.accountId, {
              version: input.version,
              regenerate: true,
            }),
          } as const;
        case "action-items":
          return {
            feature: input.feature,
            data: await AIService.extractActionItems(
              userId,
              input.emailOrThreadId,
              input.isThread,
              input.accountId,
              { version: input.version, regenerate: true }
            ),
          } as const;
      }
    }),

  /**
   * Processes a natural language prompt (e.g. "Summarize my recent conversations with John")
   * through the privacy-preserving AIContextBuilder pipeline.
   */
  askAI: protectedProcedure
    .input(
      z.object({
        prompt: z.string().min(1),
        accountId: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return AIService.askAI(ctx.auth.userId, input.prompt, input.accountId);
    }),

  /**
   * Summarizes a specific email thread using OpenAI GPT models.
   */
  summarizeThread: protectedProcedure
    .input(
      z.object({
        threadId: z.string(),
        accountId: z.string().optional(),
        version: versionSchema,
      })
    )
    .query(async ({ ctx, input }) => {
      return AIService.summarizeThread(ctx.auth.userId, input.threadId, input.accountId, {
        version: input.version,
      });
    }),

  /**
   * Generates a smart email draft / response given user instructions and optional thread context.
   */
  generateDraft: protectedProcedure
    .input(
      z.object({
        instruction: z.string().min(1),
        threadId: z.string().optional(),
        accountId: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return AIService.generateDraft(ctx.auth.userId, input.instruction, input.threadId, input.accountId);
    }),

  /**
   * Subtask 7.1: Single email summarization.
   */
  summarizeEmail: protectedProcedure
    .input(
      z.object({
        messageId: z.string(),
        accountId: z.string().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      return AIService.summarizeEmail(ctx.auth.userId, input.messageId, input.accountId);
    }),

  /**
   * Subtask 7.2: Thread intelligence analysis.
   */
  getThreadIntelligence: protectedProcedure
    .input(
      z.object({
        threadId: z.string(),
        accountId: z.string().optional(),
        version: versionSchema,
      })
    )
    .query(async ({ ctx, input }) => {
      return AIService.getThreadIntelligence(ctx.auth.userId, input.threadId, input.accountId, {
        version: input.version,
      });
    }),

  /**
   * Subtask 7.3: Tone-guided reply generation.
   * User can review/edit generated draft before explicit send.
   */
  generateReply: protectedProcedure
    .input(
      z.object({
        messageId: z.string(),
        tone: replyToneEnum,
        prompt: z.string().optional(),
        accountId: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return AIService.generateReply(
        ctx.auth.userId,
        input.messageId,
        input.tone,
        input.prompt,
        input.accountId
      );
    }),

  /**
   * Subtask 7.4: Draft rewriter.
   */
  rewriteDraft: protectedProcedure
    .input(
      z.object({
        draftText: z.string().min(1),
        option: rewriteOptionEnum,
        customPrompt: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return AIService.rewriteDraft(ctx.auth.userId, input.draftText, input.option, input.customPrompt);
    }),

  /**
   * Subtask 7.5: Action-item extraction from an email or thread.
   */
  extractActionItems: protectedProcedure
    .input(
      z.object({
        emailOrThreadId: z.string(),
        isThread: z.boolean().default(false),
        accountId: z.string().optional(),
        version: versionSchema,
      })
    )
    .query(async ({ ctx, input }) => {
      return AIService.extractActionItems(
        ctx.auth.userId,
        input.emailOrThreadId,
        input.isThread,
        input.accountId,
        { version: input.version }
      );
    }),
});
