import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { MailService } from "@/server/services/mail-service";

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

const paginationParamsSchema = z.object({
  accountId: z.string().optional(),
  cursor: z.string().optional(),
  limit: z.number().min(1).max(50).default(15),
  folderId: z.string().optional(),
});

export const mailRouter = createTRPCRouter({
  getInbox: protectedProcedure
    .input(paginationParamsSchema.optional())
    .query(async ({ ctx, input }) => {
      const pageToken = input?.cursor;
      const limit = input?.limit ?? 15;
      return MailService.getInbox(ctx.auth.userId, input?.accountId, {
        pageToken,
        limit,
        folderId: input?.folderId,
      });
    }),

  getMessage: protectedProcedure
    .input(z.object({ messageId: z.string(), accountId: z.string().optional() }))
    .query(async ({ ctx, input }) => {
      return MailService.getMessage(ctx.auth.userId, input.messageId, input.accountId);
    }),

  getThread: protectedProcedure
    .input(z.object({ threadId: z.string(), accountId: z.string().optional() }))
    .query(async ({ ctx, input }) => {
      return MailService.getThread(ctx.auth.userId, input.threadId, input.accountId);
    }),

  searchEmails: protectedProcedure
    .input(
      paginationParamsSchema.extend({
        query: z.string().min(1),
      })
    )
    .query(async ({ ctx, input }) => {
      const pageToken = input?.cursor;
      const limit = input?.limit ?? 15;
      return MailService.searchMail(ctx.auth.userId, input.query, input.accountId, {
        pageToken,
        limit,
      });
    }),

  sendEmail: protectedProcedure
    .input(
      z.object({
        accountId: z.string().optional(),
        draft: draftSchema,
      })
    )
    .mutation(async ({ ctx, input }) => {
      return MailService.sendMail(ctx.auth.userId, input.draft, input.accountId);
    }),

  createDraft: protectedProcedure
    .input(
      z.object({
        accountId: z.string().optional(),
        draft: draftSchema,
      })
    )
    .mutation(async ({ ctx, input }) => {
      return MailService.createDraft(ctx.auth.userId, input.draft, input.accountId);
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
      return MailService.updateDraft(ctx.auth.userId, input.draftId, input.draft, input.accountId);
    }),

  deleteDraft: protectedProcedure
    .input(z.object({ draftId: z.string(), accountId: z.string().optional() }))
    .mutation(async ({ ctx, input }) => {
      return MailService.deleteDraft(ctx.auth.userId, input.draftId, input.accountId);
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
      return MailService.markAsRead(ctx.auth.userId, input.messageId, input.isRead, input.accountId);
    }),

  archive: protectedProcedure
    .input(z.object({ messageId: z.string(), accountId: z.string().optional() }))
    .mutation(async ({ ctx, input }) => {
      return MailService.archiveMessage(ctx.auth.userId, input.messageId, input.accountId);
    }),
});
