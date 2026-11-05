import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { MailService } from "@/server/services/mail-service";
import { getNylasAuthUrl } from "@/lib/nylas";
import { assertCanLinkMailbox, getMailboxAllowance } from "@/server/services/plans";
import { db } from "@/server/db";
import { COUNTRY_CODES, currencyForCountry } from "@/lib/countries";
import { getNairaRates } from "@/server/services/exchange-rates";

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
   * The user's country, the currency they pay in, and today's Naira → currency rate, used to
   * show plan prices in their currency. `rate` is null for Naira or if rates are unavailable.
   */
  getBillingProfile: protectedProcedure.query(async ({ ctx }) => {
    const user = await db.user.findUnique({ where: { id: ctx.auth.userId }, select: { country: true } });
    const country = user?.country ?? null;
    const currency = currencyForCountry(country);
    const rates = currency === "NGN" ? null : await getNairaRates();
    const rate = rates?.rates[currency] ?? null;
    return { country, currency, rate, ratesUpdatedAt: rate ? rates!.updatedAt : null };
  }),

  /** Saves the user's country (from the dashboard prompt or the plans page). */
  setCountry: protectedProcedure
    .input(z.object({ country: z.enum(COUNTRY_CODES) }))
    .mutation(async ({ ctx, input }) => {
      await db.user.update({ where: { id: ctx.auth.userId }, data: { country: input.country } });
      return { country: input.country, currency: currencyForCountry(input.country) };
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
