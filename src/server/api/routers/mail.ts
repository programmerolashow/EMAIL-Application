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

const listParamsSchema = z.object({
  accountId: z.string().optional(),
  pageToken: z.string().optional(),
  limit: z.number().min(1).max(100).optional(),
  folderId: z.string().optional(),
});

export const mailRouter = createTRPCRouter({
  listMessages: protectedProcedure
    .input(listParamsSchema.optional())
    .query(async ({ ctx, input }) => {
      return MailService.listMessages(ctx.auth.userId, input?.accountId, input);
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

  searchMessages: protectedProcedure
    .input(
      listParamsSchema.extend({
        query: z.string().min(1),
      })
    )
    .query(async ({ ctx, input }) => {
      return MailService.searchMessages(ctx.auth.userId, input.query, input.accountId, input);
    }),

  sendMessage: protectedProcedure
    .input(
      z.object({
        accountId: z.string().optional(),
        draft: draftSchema,
      })
    )
    .mutation(async ({ ctx, input }) => {
      return MailService.sendMessage(ctx.auth.userId, input.draft, input.accountId);
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

  listContacts: protectedProcedure
    .input(listParamsSchema.optional())
    .query(async ({ ctx, input }) => {
      return MailService.listContacts(ctx.auth.userId, input?.accountId, input);
    }),

  listCalendarEvents: protectedProcedure
    .input(listParamsSchema.optional())
    .query(async ({ ctx, input }) => {
      return MailService.listCalendarEvents(ctx.auth.userId, input?.accountId, input);
    }),
});
