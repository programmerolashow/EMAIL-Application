"use client";

import React, { useState } from "react";
import { api } from "@/trpc/react";
import { getNylasAuthUrlAction } from "@/server/actions/nylas";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown, Mail, Plus, Check, Globe, ShieldAlert } from "lucide-react";

interface AccountSwitcherProps {
  selectedAccountId?: string;
  onSelectAccount: (accountId: string | undefined) => void;
}

export function AccountSwitcher({
  selectedAccountId,
  onSelectAccount,
}: AccountSwitcherProps) {
  const { data: accounts, isLoading } = api.account.getAccounts.useQuery();
  const [connecting, setConnecting] = useState(false);

  const selectedAccount = accounts?.find((acc) => acc.id === selectedAccountId);

  const handleConnect = async (serviceType: "Google" | "Office365") => {
    try {
      setConnecting(true);
      const url = await getNylasAuthUrlAction(serviceType);
      window.location.href = url;
    } catch (err) {
      console.error("Failed to connect account:", err);
      setConnecting(false);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="w-full justify-between gap-2 border-slate-200 bg-white font-medium text-slate-800 hover:bg-slate-50"
        >
          <div className="flex items-center gap-2 truncate">
            <Mail className="h-4 w-4 shrink-0 text-blue-600" />
            <span className="truncate">
              {selectedAccountId
                ? selectedAccount?.email ?? "Connected Account"
                : "All Inboxes"}
            </span>
          </div>
          <ChevronDown className="h-4 w-4 shrink-0 text-slate-400" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start" className="w-64">
        <DropdownMenuLabel className="text-xs text-slate-500 uppercase tracking-wider">
          Accounts
        </DropdownMenuLabel>
        
        <DropdownMenuItem
          onClick={() => onSelectAccount(undefined)}
          className="flex items-center justify-between cursor-pointer"
        >
          <div className="flex items-center gap-2 truncate">
            <Globe className="h-4 w-4 text-slate-400" />
            <span className="font-medium text-slate-800">All Inboxes</span>
          </div>
          {!selectedAccountId && <Check className="h-4 w-4 text-blue-600" />}
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        {isLoading ? (
          <div className="px-3 py-2 text-xs text-slate-400">Loading accounts...</div>
        ) : accounts && accounts.length > 0 ? (
          accounts.map((acc) => (
            <DropdownMenuItem
              key={acc.id}
              onClick={() => onSelectAccount(acc.id)}
              className="flex items-center justify-between cursor-pointer"
            >
              <div className="flex flex-col truncate">
                <span className="font-medium text-slate-800 truncate">{acc.name || acc.email}</span>
                <span className="text-xs text-slate-400 truncate">{acc.email}</span>
              </div>
              {selectedAccountId === acc.id && <Check className="h-4 w-4 text-blue-600" />}
            </DropdownMenuItem>
          ))
        ) : (
          <div className="px-3 py-2 text-xs text-slate-400 flex items-center gap-1">
            <ShieldAlert className="h-3.5 w-3.5 text-amber-500" />
            No accounts connected
          </div>
        )}

        <DropdownMenuSeparator />

        <DropdownMenuLabel className="text-xs text-slate-500 uppercase tracking-wider">
          Add Account
        </DropdownMenuLabel>
        
        <DropdownMenuItem
          onClick={() => handleConnect("Google")}
          disabled={connecting}
          className="cursor-pointer font-medium text-blue-600 hover:text-blue-700"
        >
          <Plus className="mr-2 h-4 w-4" />
          Connect Google Account
        </DropdownMenuItem>
        
        <DropdownMenuItem
          onClick={() => handleConnect("Office365")}
          disabled={connecting}
          className="cursor-pointer font-medium text-blue-600 hover:text-blue-700"
        >
          <Plus className="mr-2 h-4 w-4" />
          Connect Office 365 Account
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
