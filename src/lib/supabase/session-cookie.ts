/**
 * True when the request carries a Supabase auth cookie (`sb-<project-ref>-auth-token`, possibly
 * chunked as `.0`, `.1`, ...). Without one there is no session to refresh, so callers can skip
 * the network round-trip to Supabase entirely. That keeps public pages fast, and keeps them
 * working when Supabase is slow or unreachable.
 */
export function hasSupabaseSessionCookie(cookies: { name: string }[]): boolean {
  return cookies.some(({ name }) => name.startsWith("sb-") && name.includes("-auth-token"));
}
