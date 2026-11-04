import "server-only";
import { env } from "@/env";

const getCallbackUrl = () => {
  if (env.NYLAS_CALLBACK_URI) {
    return env.NYLAS_CALLBACK_URI;
  }
  const baseUrl =
    env.NEXT_PUBLIC_APP_URL ??
    (process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000");
  return `${baseUrl}/api/nylas/callback`;
};

export const getNylasAuthUrl = (serviceType: "Google" | "Office365") => {
  const providerMap: Record<"Google" | "Office365", string> = {
    Google: "google",
    Office365: "microsoft",
  };

  const params = new URLSearchParams({
    client_id: env.NYLAS_CLIENT_ID,
    redirect_uri: getCallbackUrl(),
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
      redirect_uri: getCallbackUrl(),
    }),
  });

  if (!response.ok) {
    const errText = await response.text().catch(() => response.statusText);
    throw new Error(`Failed to exchange code for access token: ${errText}`);
  }

  const data = (await response.json()) as {
    access_token?: string;
    grant_id?: string;
    email?: string;
    expires_in?: number;
    id_token?: string;
  };

  return {
    accessToken: data.access_token ?? data.grant_id ?? "",
    grantId: data.grant_id ?? "",
    email: data.email ?? "",
    expiresIn: data.expires_in,
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
    const errText = await response.text().catch(() => response.statusText);
    throw new Error(`Failed to get account details from Nylas: ${errText}`);
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
