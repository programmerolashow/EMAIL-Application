import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { syncSupabaseUserToDatabase } from "@/lib/supabase/user-sync";

/** Only allow same-site relative paths, so the callback can't be used as an open redirect. */
function safeNextPath(raw: string | null, fallback: string): string {
  if (!raw?.startsWith("/") || raw.startsWith("//") || raw.startsWith("/\\")) return fallback;
  return raw;
}

function buildRedirect(request: Request, origin: string, pathWithQuery: string): string {
  const target = new URL(`${origin}${pathWithQuery}`);
  const forwardedHost = request.headers.get("x-forwarded-host");
  if (process.env.NODE_ENV !== "development" && forwardedHost) {
    target.protocol = "https:";
    target.host = forwardedHost;
  }
  return target.toString();
}

/**
 * Handles two Supabase redirect flows:
 *  - flow=oauth (Google): keep the session and send the user into the app.
 *  - email verification (default): confirm the address, then ask the user to sign in.
 */
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const isOAuth = searchParams.get("flow") === "oauth";
  const next = safeNextPath(searchParams.get("next"), isOAuth ? "/dashboard" : "/sign-in");

  // Provider-side failure (e.g. the user cancelled the Google consent screen).
  const providerError = searchParams.get("error_description") ?? searchParams.get("error");
  if (providerError && !code) {
    const failure = new URL(`${origin}/sign-in`);
    failure.searchParams.set(
      "error",
      isOAuth ? "Google sign-in was cancelled or failed. Please try again." : providerError
    );
    return NextResponse.redirect(buildRedirect(request, origin, `${failure.pathname}${failure.search}`));
  }

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        await syncSupabaseUserToDatabase(user).catch((err: unknown) => {
          console.error("[auth/callback] User sync failed:", err);
        });
      }

      if (isOAuth) {
        return NextResponse.redirect(buildRedirect(request, origin, next));
      }

      // Email verification: end the temporary session and ask the user to sign in.
      await supabase.auth.signOut();
      const separator = next.includes("?") ? "&" : "?";
      return NextResponse.redirect(buildRedirect(request, origin, `${next}${separator}verified=1`));
    }

    console.error("[auth/callback] Code exchange failed:", error.message);
  }

  const failure = new URL(`${origin}/sign-in`);
  failure.searchParams.set(
    "error",
    isOAuth ? "Google sign-in couldn't be completed. Please try again." : "Could not verify email"
  );
  return NextResponse.redirect(buildRedirect(request, origin, `${failure.pathname}${failure.search}`));
}
