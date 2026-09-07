"use server";

import { getNylasAuthUrl } from "@/lib/nylas";
import { createClient } from "@/lib/supabase/server";

export const getNylasAuthUrlAction = async (serviceType: "Google" | "Office365") => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  const authUrl = getNylasAuthUrl(serviceType);
  return authUrl;
};
