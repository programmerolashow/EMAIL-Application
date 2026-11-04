import { deleteGrant, exchangeCodeForAccessToken, getAccount } from "@/lib/nylas";
import { db } from "@/server/db";
import { createClient } from "@/lib/supabase/server";
import { syncSupabaseUserToDatabase } from "@/lib/supabase/user-sync";
import { MailService } from "@/server/services/mail-service";
import { getMailboxAllowance, mailboxLimitMessage } from "@/server/services/plans";
import { type NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  // Ensure user is idempotently synced to PostgreSQL
  await syncSupabaseUserToDatabase(user).catch(() => null);

  const userId = user.id;
  const searchParams = req.nextUrl.searchParams;
  const code = searchParams.get("code");

  // Every outcome lands back on the dashboard so the user never sees a raw JSON page.
  const backToDashboard = (params: Record<string, string>) => {
    const url = new URL("/dashboard", req.url);
    for (const [k, v] of Object.entries(params)) url.searchParams.set(k, v);
    return NextResponse.redirect(url);
  };

  const providerError = searchParams.get("error_description") ?? searchParams.get("error");
  if (providerError) {
    return backToDashboard({ connect_error: `Connection cancelled: ${providerError}` });
  }

  if (!code) {
    return backToDashboard({ connect_error: "The provider did not return an authorization code." });
  }

  try {
    const token = await exchangeCodeForAccessToken(code);

    // The grant id is the durable handle for the mailbox. All mail calls use
    // /v3/grants/{grantId} with the API key, so the short-lived access token is not relied on.
    if (!token.grantId) {
      return backToDashboard({ connect_error: "Nylas did not return a grant id. Please try again." });
    }

    const account = await getAccount(token.grantId);
    const accountId = token.grantId;

    if (!account.email) {
      return backToDashboard({ connect_error: "Nylas returned no email address for this mailbox." });
    }

    // Refuse to silently move a mailbox that is already linked to a different user.
    const existing = await db.account.findUnique({
      where: { id: accountId },
      select: { userId: true },
    });
    if (existing && existing.userId !== userId) {
      return backToDashboard({ connect_error: "This mailbox is already linked to another user." });
    }

    // Plan limit (authoritative check). Reconnecting a mailbox that is already linked is always
    // allowed; a new one over the limit is refused and its fresh grant revoked at Nylas so it
    // doesn't sync or count toward billing.
    if (!existing) {
      const allowance = await getMailboxAllowance(userId);
      if (!allowance.canLinkAnother) {
        await deleteGrant(accountId).catch((err: unknown) =>
          console.error("Failed to revoke over-limit Nylas grant:", err)
        );
        return backToDashboard({ connect_error: mailboxLimitMessage(allowance) });
      }
    }

    await db.account.upsert({
      where: { id: accountId },
      update: {
        // No token is stored: mail is accessed through the grant id + server API key.
        accessToken: "",
        refreshToken: null,
        email: account.email,
        name: account.name,
        expiresAt: null,
        provider: "Nylas",
        providerAccountId: accountId,
      },
      create: {
        id: accountId,
        userId,
        accessToken: "",
        refreshToken: null,
        email: account.email,
        name: account.name,
        providerAccountId: accountId,
        expiresAt: null,
        provider: "Nylas",
      },
    });

    // Reconnecting reuses the same grant id; clear anything cached about its old state.
    MailService.forgetGrant(accountId);

    // Open the dashboard on the mailbox that was just connected.
    return backToDashboard({ account: accountId });
  } catch (error) {
    console.error("Nylas callback error:", error);
    return backToDashboard({ connect_error: "We couldn't finish connecting your mailbox. Please try again." });
  }
};
