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

export const aiRouter = createTRPCRouter({
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
      })
    )
    .query(async ({ ctx, input }) => {
      return AIService.summarizeThread(ctx.auth.userId, input.threadId, input.accountId);
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
      })
    )
    .query(async ({ ctx, input }) => {
      return AIService.getThreadIntelligence(ctx.auth.userId, input.threadId, input.accountId);
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
    .mutation(async ({ input }) => {
      return AIService.rewriteDraft(input.draftText, input.option, input.customPrompt);
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
      })
    )
    .query(async ({ ctx, input }) => {
      return AIService.extractActionItems(
        ctx.auth.userId,
        input.emailOrThreadId,
        input.isThread,
        input.accountId
      );
    }),
});
