import "server-only";
import { env } from "@/env";

export const getNylasAuthUrl = (serviceType: "Google" | "Office365") => {
  const baseUrl =
    env.NEXT_PUBLIC_APP_URL ??
    (process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000");

  const providerMap: Record<"Google" | "Office365", string> = {
    Google: "google",
    Office365: "microsoft",
  };

  const params = new URLSearchParams({
    client_id: env.NYLAS_CLIENT_ID,
    redirect_uri: `${baseUrl}/api/nylas/callback`,
    response_type: "code",
    provider: providerMap[serviceType] ?? "google",
  });

  return `${env.NYLAS_API_URI}/v3/connect/auth?${params.toString()}`;
};

export const exchangeCodeForAccessToken = async (code: string) => {
  const baseUrl =
    env.NEXT_PUBLIC_APP_URL ??
    (process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000");

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
      redirect_uri: `${baseUrl}/api/nylas/callback`,
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

export const getAccount = async (accessToken: string, grantId?: string) => {
  const targetId = grantId && grantId.length > 0 ? grantId : "me";
  const authHeader = accessToken.startsWith("Bearer ")
    ? accessToken
    : `Bearer ${env.NYLAS_API_KEY}`;

  const response = await fetch(`${env.NYLAS_API_URI}/v3/grants/${targetId}`, {
    headers: {
      Authorization: authHeader,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to get account details from Nylas: ${response.statusText}`);
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
    id: data?.id ?? grantId ?? "",
    email,
    name: email ? email.split("@")[0] ?? "Nylas User" : "Nylas User",
  };
};
