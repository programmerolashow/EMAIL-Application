import "server-only";
import { headers } from "next/headers";
import { env } from "@/env";
import { NylasApiError } from "@/server/lib/errors";

/**
 * Origin of the request being served (http://localhost:3000 in dev, the Vercel / custom
 * domain in production). Using the live request means localhost never redirects to production.
 */
const getRequestOrigin = async (): Promise<string> => {
  try {
    const h = await headers();
    const host = h.get("x-forwarded-host") ?? h.get("host");
    if (host) {
      const isLocal = /^(localhost|127\.0\.0\.1|\[::1\])(:\d+)?$/.test(host);
      const proto = h.get("x-forwarded-proto") ?? (isLocal ? "http" : "https");
      return `${proto}://${host}`;
    }
  } catch {
    // Not inside a request; fall through to configuration.
  }
  return env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
};

/** Must be registered in the Nylas dashboard for every origin (localhost and production). */
const getCallbackUrl = async () => `${await getRequestOrigin()}/api/nylas/callback`;

export const getNylasAuthUrl = async (serviceType: "Google" | "Office365") => {
  const providerMap: Record<"Google" | "Office365", string> = {
    Google: "google",
    Office365: "microsoft",
  };

  const params = new URLSearchParams({
    client_id: env.NYLAS_CLIENT_ID,
    redirect_uri: await getCallbackUrl(),
    response_type: "code",
    provider: providerMap[serviceType] ?? "google",
  });

  return `${env.NYLAS_API_URI}/v3/connect/auth?${params.toString()}`;
};

export const exchangeCodeForAccessToken = async (code: string) => {
  const response = await fetch(`${env.NYLAS_API_URI}/v3/connect/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      client_id: env.NYLAS_CLIENT_ID,
      client_secret: env.NYLAS_API_KEY,
      grant_type: "authorization_code",
      code,
      redirect_uri: await getCallbackUrl(),
    }),
  });

  if (!response.ok) {
    const errText = await response.text().catch(() => "");
    throw NylasApiError.fromResponse(response.status, response.statusText, errText);
  }

  // Only the grant id is kept. The short-lived access token is deliberately discarded: every
  // mail call uses /v3/grants/{grantId} with the server API key.
  const data = (await response.json()) as { grant_id?: string; email?: string };

  return {
    grantId: data.grant_id ?? "",
    email: data.email ?? "",
  };
};

/**
 * Fetches grant details (email, provider) using the application API key.
 * Grant-scoped calls never depend on the short-lived user access token.
 */
export const getAccount = async (grantId: string) => {
  if (!grantId) {
    throw new Error("Cannot load Nylas account details without a grant id.");
  }

  const response = await fetch(
    `${env.NYLAS_API_URI}/v3/grants/${encodeURIComponent(grantId)}`,
    {
      headers: {
        Authorization: `Bearer ${env.NYLAS_API_KEY}`,
        Accept: "application/json",
      },
      cache: "no-store",
    }
  );

  if (!response.ok) {
    const errText = await response.text().catch(() => "");
    throw NylasApiError.fromResponse(response.status, response.statusText, errText);
  }

  const result = (await response.json()) as {
    data?: {
      id: string;
      email: string;
      grant_status?: string;
      provider?: string;
    };
  };

  const data = result.data;
  const email = data?.email ?? "";
  return {
    id: data?.id ?? grantId,
    email,
    provider: data?.provider,
    grantStatus: data?.grant_status,
    name: email ? email.split("@")[0] ?? "Nylas User" : "Nylas User",
  };
};

/**
 * Revokes a grant at Nylas so a disconnected mailbox stops syncing, sending webhooks and counting
 * toward the Nylas bill. A grant that is already gone (404) counts as success.
 */
export const deleteGrant = async (grantId: string): Promise<void> => {
  const response = await fetch(`${env.NYLAS_API_URI}/v3/grants/${encodeURIComponent(grantId)}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${env.NYLAS_API_KEY}`, Accept: "application/json" },
    cache: "no-store",
  });
  if (response.ok || response.status === 404) return;
  const errText = await response.text().catch(() => "");
  throw NylasApiError.fromResponse(response.status, response.statusText, errText);
};
