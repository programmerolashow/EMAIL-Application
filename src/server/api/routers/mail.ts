import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { EmailService } from "@/server/services/email-service";

const emailAddressSchema = z.object({
  name: z.string().optional(),
  address: z.string().email(),
});

const draftSchema = z.object({
  id: z.string().optional(),
  subject: z.string().optional(),
  to: z.array(emailAddressSchema),
  cc: z.array(emailAddressSchema).optional(),
  bcc: z.array(emailAddressSchema).optional(),
  body: z.string(),
});

const listParamsSchema = z.object({
  accountId: z.string().optional(),
  pageToken: z.string().optional(),
  limit: z.number().min(1).max(100).optional(),
  folderId: z.string().optional(),
});

export const mailRouter = createTRPCRouter({
  getInbox: protectedProcedure
    .input(listParamsSchema.optional())
    .query(async ({ ctx, input }) => {
      return EmailService.getInbox(ctx.auth.userId, input?.accountId, input);
    }),

  getMessage: protectedProcedure
    .input(z.object({ messageId: z.string(), accountId: z.string().optional() }))
    .query(async ({ ctx, input }) => {
      return EmailService.getMessage(ctx.auth.userId, input.messageId, input.accountId);
    }),

  getThread: protectedProcedure
    .input(z.object({ threadId: z.string(), accountId: z.string().optional() }))
    .query(async ({ ctx, input }) => {
      return EmailService.getThread(ctx.auth.userId, input.threadId, input.accountId);
    }),

  searchEmails: protectedProcedure
    .input(
      listParamsSchema.extend({
        query: z.string().min(1),
      })
    )
    .query(async ({ ctx, input }) => {
      return EmailService.searchEmails(ctx.auth.userId, input.query, input.accountId, input);
    }),

  sendEmail: protectedProcedure
    .input(
      z.object({
        accountId: z.string().optional(),
        draft: draftSchema,
      })
    )
    .mutation(async ({ ctx, input }) => {
      return EmailService.sendEmail(ctx.auth.userId, input.draft, input.accountId);
    }),

  createDraft: protectedProcedure
    .input(
      z.object({
        accountId: z.string().optional(),
        draft: draftSchema,
      })
    )
    .mutation(async ({ ctx, input }) => {
      return EmailService.createDraft(ctx.auth.userId, input.draft, input.accountId);
    }),

  updateDraft: protectedProcedure
    .input(
      z.object({
        draftId: z.string(),
        accountId: z.string().optional(),
        draft: draftSchema,
      })
    )
    .mutation(async ({ ctx, input }) => {
      return EmailService.updateDraft(ctx.auth.userId, input.draftId, input.draft, input.accountId);
    }),

  deleteDraft: protectedProcedure
    .input(z.object({ draftId: z.string(), accountId: z.string().optional() }))
    .mutation(async ({ ctx, input }) => {
      return EmailService.deleteDraft(ctx.auth.userId, input.draftId, input.accountId);
    }),

  markRead: protectedProcedure
    .input(
      z.object({
        messageId: z.string(),
        isRead: z.boolean(),
        accountId: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return EmailService.markRead(ctx.auth.userId, input.messageId, input.isRead, input.accountId);
    }),

  archive: protectedProcedure
    .input(z.object({ messageId: z.string(), accountId: z.string().optional() }))
    .mutation(async ({ ctx, input }) => {
      return EmailService.archive(ctx.auth.userId, input.messageId, input.accountId);
    }),
});
