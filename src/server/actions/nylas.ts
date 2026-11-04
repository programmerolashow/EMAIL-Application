"use server";

import { getNylasAuthUrl } from "@/lib/nylas";
import { createClient } from "@/lib/supabase/server";
import { getMailboxAllowance, mailboxLimitMessage } from "@/server/services/plans";

export const getNylasAuthUrlAction = async (serviceType: "Google" | "Office365") => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Please sign in again.");

  // Plan limit: refuse before sending the user through OAuth. (The callback re-checks.)
  const allowance = await getMailboxAllowance(user.id);
  if (!allowance.canLinkAnother) throw new Error(mailboxLimitMessage(allowance));

  const authUrl = await getNylasAuthUrl(serviceType);
  return authUrl;
};
