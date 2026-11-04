/**
 * Turns raw Supabase / network errors into messages a user can act on.
 * "Failed to fetch" means the browser never reached the auth server (bad project URL,
 * paused/deleted Supabase project, offline, or blocked by an extension).
 */
export function friendlyAuthError(err: unknown): string {
  const raw =
    typeof err === "string"
      ? err
      : err instanceof Error
        ? err.message
        : typeof err === "object" && err !== null && "message" in err && typeof err.message === "string"
          ? err.message
          : "";

  const message = raw.toLowerCase();

  if (!message) return "Something went wrong. Please try again.";
  if (message.includes("failed to fetch") || message.includes("networkerror") || message.includes("load failed")) {
    return "We couldn't reach the sign-in service. Check your internet connection and try again. If it keeps happening, the service may be temporarily unavailable.";
  }
  if (message.includes("invalid login credentials")) return "Incorrect email or password.";
  if (message.includes("email not confirmed")) {
    return "Please confirm your email first. Check your inbox for the verification link.";
  }
  if (message.includes("user already registered")) {
    return "An account with this email already exists. Sign in instead, or continue with Google.";
  }
  if (message.includes("provider is not enabled") || message.includes("unsupported provider")) {
    return "Google sign-in isn't enabled yet. Please use email and password for now.";
  }
  if (message.includes("rate limit") || message.includes("too many requests")) {
    return "Too many attempts. Please wait a minute and try again.";
  }
  return raw;
}
