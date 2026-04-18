"use client";

import { Button } from "@/components/ui/button";
import { getAurinkoAuthUrlAction } from "@/server/actions/aurinko";

export const LinkAccountButton = () => {
    return (
        <Button
            onClick={async () => {
                const authUrl = await getAurinkoAuthUrlAction("Google");
                window.location.href = authUrl;
            }}
        >
            Link Account
        </Button>
    );
};
