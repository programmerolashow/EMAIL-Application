import { env } from "@/env";

export const getAurinkoAuthUrl = (serviceType: 'Google' | 'Office365') => {
  const params = new URLSearchParams({
    clientId: env.AURINKO_CLIENT_ID as string,
    serviceType,
    scopes: 'Mail.Read Mail.ReadWrite Mail.Send Mail.Drafts Mail.All Contact.Read Contact.ReadWrite Contact.All Calendar.Read Calendar.ReadWrite Calendar.All email profile',
    responseType: 'code',
    returnUrl: `${process.env.NEXT_PUBLIC_URL ?? 'https://email-application-alpha.vercel.app'}/api/aurinko/callback`,
  });

  return `https://api.aurinko.io/v1/auth/prepare?${params.toString()}`;
};

export const exchangeCodeForAccessToken = async (code: string) => {
  const authHeader = Buffer.from(`${env.AURINKO_CLIENT_ID}:${env.AURINKO_CLIENT_SECRET}`).toString('base64');

  const response = await fetch('https://api.aurinko.io/v1/auth/token', {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${authHeader}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      code,
      grantType: 'authorization_code',
    }),
  });

  if (!response.ok) {
    throw new Error(`Failed to exchange code for access token: ${response.statusText}`);
  }

  return (await response.json()) as {
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
    tokenType: string;
    accountId: string;
  };
};

export const getAccount = async (accessToken: string) => {
  const response = await fetch('https://api.aurinko.io/v1/account', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to get account details: ${response.statusText}`);
  }

  return (await response.json()) as {
    id: string;
    email: string;
    name: string;
  };
};
