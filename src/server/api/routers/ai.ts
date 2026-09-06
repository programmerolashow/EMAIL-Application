import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { AIService } from "@/server/services/ai/ai-service";

export const aiRouter = createTRPCRouter({
  /**
   * Summarizes an email thread using OpenAI GPT models.
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
});
