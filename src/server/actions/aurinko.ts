"use server";

import { getAurinkoAuthUrl } from "@/lib/aurinko";
import { createClient } from "@/lib/supabase/server";

export const getAurinkoAuthUrlAction = async (serviceType: 'Google' | 'Office365') => {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Unauthorized");

    const authUrl = getAurinkoAuthUrl(serviceType);
    return authUrl;
};
