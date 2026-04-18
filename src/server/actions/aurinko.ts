"use server";

import { getAurinkoAuthUrl } from "@/lib/aurinko";
import { auth } from "@clerk/nextjs/server";

export const getAurinkoAuthUrlAction = async (serviceType: 'Google' | 'Office365') => {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const authUrl = getAurinkoAuthUrl(serviceType);
    return authUrl;
};
