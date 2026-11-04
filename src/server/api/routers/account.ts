import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { MailService } from "@/server/services/mail-service";
import { getNylasAuthUrl } from "@/lib/nylas";
import { assertCanLinkMailbox, getMailboxAllowance } from "@/server/services/plans";

export const accountRouter = createTRPCRouter({
  /**
   * Returns all connected accounts for the authenticated user without exposing access/refresh tokens.
   */
  getAccounts: protectedProcedure.query(async ({ ctx }) => {
    return MailService.getUserAccounts(ctx.auth.userId);
  }),

  /**
   * Generates a secure Nylas OAuth authorization URL for Google or Office365.
   */
  getAuthUrl: protectedProcedure
    .input(z.object({ serviceType: z.enum(["Google", "Office365"]) }))
    .mutation(async ({ ctx, input }) => {
      await assertCanLinkMailbox(ctx.auth.userId);
      return getNylasAuthUrl(input.serviceType);
    }),

  /** Current plan and how many mailboxes it allows (for the UI). */
  getPlan: protectedProcedure.query(async ({ ctx }) => {
    const a = await getMailboxAllowance(ctx.auth.userId);
    return {
      planId: a.plan.id,
      planName: a.plan.name,
      maxMailboxes: a.plan.maxMailboxes,
      linked: a.linked,
      canLinkAnother: a.canLinkAnother,
    };
  }),

  /**
   * Unlinks a mailbox from this app (e.g. a stale row Nylas no longer recognises). Only the
   * user's own row is touched; mail stays untouched at Google / Microsoft.
   */
  removeAccount: protectedProcedure
    .input(z.object({ accountId: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      return MailService.removeAccount(ctx.auth.userId, input.accountId);
    }),
});
