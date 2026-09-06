import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { MailService } from "@/server/services/mail-service";
import { getAurinkoAuthUrl } from "@/lib/aurinko";

export const accountRouter = createTRPCRouter({
  /**
   * Returns all connected accounts for the authenticated user without exposing access/refresh tokens.
   */
  getAccounts: protectedProcedure.query(async ({ ctx }) => {
    return MailService.getUserAccounts(ctx.auth.userId);
  }),

  /**
   * Generates a secure Aurinko OAuth authorization URL for Google or Office365.
   */
  getAuthUrl: protectedProcedure
    .input(z.object({ serviceType: z.enum(["Google", "Office365"]) }))
    .mutation(async ({ input }) => {
      return getAurinkoAuthUrl(input.serviceType);
    }),
});
