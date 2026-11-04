import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { MailService } from "@/server/services/mail-service";
import { getNylasAuthUrl } from "@/lib/nylas";

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
    .mutation(async ({ input }) => {
      return getNylasAuthUrl(input.serviceType);
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
