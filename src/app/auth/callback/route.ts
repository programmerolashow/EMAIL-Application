import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { syncSupabaseUserToDatabase } from "@/lib/supabase/user-sync";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/sign-in";

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        await syncSupabaseUserToDatabase(user).catch(() => null);
      }

      await supabase.auth.signOut();

      const verifyRedirect = new URL(`${origin}${next}`);
      verifyRedirect.searchParams.set("verified", "1");

      const forwardedHost = request.headers.get("x-forwarded-host");
      const isLocalEnv = process.env.NODE_ENV === "development";

      if (isLocalEnv) {
        return NextResponse.redirect(verifyRedirect.toString());
      } else if (forwardedHost) {
        const forwardedUrl = new URL(verifyRedirect.toString());
        forwardedUrl.protocol = "https:";
        forwardedUrl.host = forwardedHost;
        return NextResponse.redirect(forwardedUrl.toString());
      }

      return NextResponse.redirect(verifyRedirect.toString());
    }
  }

  const failureUrl = new URL(`${origin}/sign-in`);
  failureUrl.searchParams.set("error", "Could not verify email");
  return NextResponse.redirect(failureUrl.toString());
}
