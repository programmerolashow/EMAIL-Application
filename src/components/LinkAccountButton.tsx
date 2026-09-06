"use client";

import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";

export const LinkAccountButton = () => {
    const getAuthUrl = api.account.getAuthUrl.useMutation({
        onSuccess: (authUrl) => {
            window.location.href = authUrl;
        },
    });

    return (
        <Button
            disabled={getAuthUrl.isPending}
            onClick={() => {
                getAuthUrl.mutate({ serviceType: "Google" });
            }}
        >
            {getAuthUrl.isPending ? "Connecting..." : "Link Account"}
        </Button>
    );
};
