import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { hasSupabaseSessionCookie } from "@/lib/supabase/session-cookie";

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    return supabaseResponse;
  }

  const supabase = createServerClient(
    supabaseUrl,
    supabaseAnonKey,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Refresh Supabase session & detect authenticated user. Skip the network call entirely when
  // there is no auth cookie: there's nothing to refresh, and it keeps every anonymous request fast.
  // getClaims() refreshes an expiring session and verifies the JWT (locally with asymmetric
  // signing keys), avoiding a Supabase Auth round trip on every request where possible.
  const user = hasSupabaseSessionCookie(request.cookies.getAll())
    ? ((await supabase.auth.getClaims()).data?.claims ?? null)
    : null;

  const pathname = request.nextUrl.pathname;

  const isAuthPage =
    pathname.startsWith("/SignIn") ||
    pathname.startsWith("/sign-in") ||
    pathname.startsWith("/SignUp") ||
    pathname.startsWith("/sign-up");

  const isPublicRoute =
    pathname === "/" ||
    isAuthPage ||
    pathname.startsWith("/auth") ||
    pathname.startsWith("/api/auth") ||
    pathname.startsWith("/api/webhooks") ||
    pathname.startsWith("/_next") ||
    pathname.includes(".");

  // 1. Prevent authenticated users from accessing authentication pages (redirects to /dashboard)
  if (user && isAuthPage) {
    const url = request.nextUrl.clone();
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  // 2. Protect authenticated routes (e.g., /dashboard), redirecting unauthenticated users to /sign-in
  if (!user && !isPublicRoute) {
    const url = request.nextUrl.clone();
    url.pathname = "/sign-in";
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};