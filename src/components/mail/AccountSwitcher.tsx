"use client";

import React, { useState } from "react";
import { api } from "@/trpc/react";
import Link from "next/link";
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
  const utils = api.useUtils();
  const disconnect = api.account.removeAccount.useMutation({
    onSuccess: (_res, vars) => {
      if (selectedAccountId === vars.accountId) onSelectAccount(undefined);
      void utils.account.getAccounts.invalidate();
      void utils.mail.invalidate();
    },
    onError: (err) => window.alert(err.message),
  });
  const [connecting, setConnecting] = useState(false);
  const planQuery = api.account.getPlan.useQuery();
  const atLimit = planQuery.data ? !planQuery.data.canLinkAnother : false;
  const getAuthUrl = api.account.getAuthUrl.useMutation();

  const selectedAccount = accounts?.find((acc) => acc.id === selectedAccountId);

  const handleConnect = async (serviceType: "Google" | "Office365") => {
    try {
      setConnecting(true);
      const url = await getAuthUrl.mutateAsync({ serviceType });
      window.location.href = url;
    } catch (err) {
      console.error("Failed to connect account:", err);
      window.alert(err instanceof Error ? err.message : "Couldn't start connecting the account.");
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
              <div className="flex shrink-0 items-center gap-2">
                {selectedAccountId === acc.id && <Check className="h-4 w-4 text-blue-600" />}
                <button
                  type="button"
                  disabled={disconnect.isPending}
                  onPointerDown={(e) => e.stopPropagation()}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    if (
                      window.confirm(
                        `Disconnect ${acc.email}? The app stops syncing it and its access is revoked. Your emails stay in the mailbox itself.`
                      )
                    ) {
                      disconnect.mutate({ accountId: acc.id });
                    }
                  }}
                  className="rounded px-1.5 py-0.5 text-[0.6875rem] font-medium text-slate-400 hover:bg-red-50 hover:text-red-600 disabled:opacity-50"
                  aria-label={`Disconnect ${acc.email}`}
                >
                  Disconnect
                </button>
              </div>
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
        
        {atLimit ? (
          <div className="space-y-1 px-2 py-1.5">
            <p className="text-xs text-slate-500">
              Your {planQuery.data?.planName} plan includes {planQuery.data?.maxMailboxes} linked mailbox
              {planQuery.data?.maxMailboxes === 1 ? "" : "es"}.
            </p>
            <DropdownMenuItem asChild className="cursor-pointer font-medium text-violet-700">
              <Link href="/dashboard/plans">Upgrade to link another mailbox</Link>
            </DropdownMenuItem>
          </div>
        ) : (
          <>
            <DropdownMenuItem
              onClick={() => void handleConnect("Google")}
              disabled={connecting}
              className="cursor-pointer font-medium text-blue-600 hover:text-blue-700"
            >
              <Plus className="mr-2 h-4 w-4" />
              Connect Google Account
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() => void handleConnect("Office365")}
              disabled={connecting}
              className="cursor-pointer font-medium text-blue-600 hover:text-blue-700"
            >
              <Plus className="mr-2 h-4 w-4" />
              Connect Microsoft / Outlook Account
            </DropdownMenuItem>
          </>
        )}

        <DropdownMenuSeparator />
        <DropdownMenuItem asChild className="cursor-pointer text-slate-600">
          <Link href="/dashboard/plans">Plans</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
