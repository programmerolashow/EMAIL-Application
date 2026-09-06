import { exchangeCodeForAccessToken, getAccount } from "@/lib/aurinko";
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
  const status = searchParams.get("status");

  if (status !== "success") {
    return NextResponse.json({ error: "Aurinko connection failed" }, { status: 400 });
  }

  const code = searchParams.get("code");
  if (!code) {
    return NextResponse.json({ error: "No code provided" }, { status: 400 });
  }

  try {
    const token = await exchangeCodeForAccessToken(code);
    const account = await getAccount(token.accessToken);

    if (!account?.id || !account?.email) {
      return NextResponse.json({ error: "Invalid account details returned from Aurinko" }, { status: 400 });
    }

    const expiresAt = token.expiresIn ? new Date(Date.now() + token.expiresIn * 1000) : undefined;

    await db.account.upsert({
      where: { id: account.id },
      update: {
        userId,
        accessToken: token.accessToken,
        refreshToken: token.refreshToken,
        email: account.email,
        name: account.name,
        expiresAt,
      },
      create: {
        id: account.id,
        userId,
        accessToken: token.accessToken,
        refreshToken: token.refreshToken,
        email: account.email,
        name: account.name,
        providerAccountId: account.id,
        expiresAt,
      },
    });

    // Redirect to dashboard upon successful connection
    return NextResponse.redirect(new URL("/dashboard", req.url));
  } catch (error) {
    console.error("Aurinko callback error:", error);
    return NextResponse.json({ error: "Failed to exchange code" }, { status: 500 });
  }
};
