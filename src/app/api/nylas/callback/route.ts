import { exchangeCodeForAccessToken, getAccount } from "@/lib/nylas";
import { db } from "@/server/db";
import { createClient } from "@/lib/supabase/server";
import { syncSupabaseUserToDatabase } from "@/lib/supabase/user-sync";
import { type NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Ensure user is idempotently synced to PostgreSQL
  await syncSupabaseUserToDatabase(user).catch(() => null);

  const userId = user.id;
  const searchParams = req.nextUrl.searchParams;
  const code = searchParams.get("code");

  if (!code) {
    return NextResponse.json({ error: "No code provided" }, { status: 400 });
  }

  try {
    const token = await exchangeCodeForAccessToken(code);
    const account = await getAccount(token.accessToken, token.grantId);

    const accountId = account.id || token.grantId;

    if (!accountId || !account?.email) {
      return NextResponse.json(
        { error: "Invalid account details returned from Nylas" },
        { status: 400 }
      );
    }

    const expiresAt = token.expiresIn
      ? new Date(Date.now() + token.expiresIn * 1000)
      : undefined;

    await db.account.upsert({
      where: { id: accountId },
      update: {
        userId,
        accessToken: token.accessToken,
        refreshToken: null,
        email: account.email,
        name: account.name,
        expiresAt,
        provider: "Nylas",
      },
      create: {
        id: accountId,
        userId,
        accessToken: token.accessToken,
        refreshToken: null,
        email: account.email,
        name: account.name,
        providerAccountId: accountId,
        expiresAt,
        provider: "Nylas",
      },
    });

    // Redirect to dashboard upon successful connection
    return NextResponse.redirect(new URL("/dashboard", req.url));
  } catch (error) {
    console.error("Nylas callback error:", error);
    return NextResponse.json(
      { error: "Failed to exchange code" },
      { status: 500 }
    );
  }
};
