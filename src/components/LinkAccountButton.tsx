"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { api } from "@/trpc/react";
import { Plus, Loader2, ChevronDown } from "lucide-react";

export const LinkAccountButton = () => {
  const [loadingService, setLoadingService] = useState<string | null>(null);

  const getAuthUrl = api.account.getAuthUrl.useMutation({
    onSuccess: (authUrl) => {
      window.location.href = authUrl;
    },
    onError: () => {
      setLoadingService(null);
    },
  });

  const handleConnect = (serviceType: "Google" | "Office365") => {
    setLoadingService(serviceType);
    getAuthUrl.mutate({ serviceType });
  };

  const isPending = getAuthUrl.isPending;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          disabled={isPending}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-sm transition-all flex items-center gap-2"
        >
          {isPending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Connecting...</span>
            </>
          ) : (
            <>
              <Plus className="h-4 w-4" />
              <span>Connect Account</span>
              <ChevronDown className="h-3 w-3 opacity-70" />
            </>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 p-1">
        <DropdownMenuItem
          disabled={isPending}
          onClick={() => handleConnect("Google")}
          className="cursor-pointer font-medium px-3 py-2 text-slate-700 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
        >
          {loadingService === "Google" ? "Connecting Google..." : "Google (Gmail)"}
        </DropdownMenuItem>
        <DropdownMenuItem
          disabled={isPending}
          onClick={() => handleConnect("Office365")}
          className="cursor-pointer font-medium px-3 py-2 text-slate-700 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
        >
          {loadingService === "Office365" ? "Connecting Microsoft..." : "Microsoft (Office 365)"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
