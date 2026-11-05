"use client";

import React, { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { api } from "@/trpc/react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CountrySelect } from "@/components/CountrySelect";
import { currencyForCountry, guessCountryFromBrowser, type CountryCode } from "@/lib/countries";

/**
 * One-time prompt for users without a country (Google sign-ups and accounts created before
 * the sign-up form asked). Shown on every dashboard page until answered.
 */
export function CountryPrompt() {
  const utils = api.useUtils();
  const profile = api.account.getBillingProfile.useQuery(undefined, { staleTime: 5 * 60_000 });
  const setCountry = api.account.setCountry.useMutation();
  const [country, setCountryValue] = useState<CountryCode | "">("");

  useEffect(() => {
    setCountryValue((current) => current || (guessCountryFromBrowser() ?? ""));
  }, []);

  const open = profile.isSuccess && profile.data.country === null;

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!country) return;
    try {
      await setCountry.mutateAsync({ country });
      await utils.account.getBillingProfile.invalidate();
      toast.success(`Saved. Prices will be shown in ${currencyForCountry(country)}.`);
    } catch {
      toast.error("We couldn't save your country. Please try again.");
    }
  };

  return (
    <Dialog open={open}>
      <DialogContent
        showCloseButton={false}
        onEscapeKeyDown={(e) => e.preventDefault()}
        onPointerDownOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Where are you based?</DialogTitle>
          <DialogDescription>
            We use your country to show plan prices in your local currency.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={save} className="space-y-3">
          <label htmlFor="country-prompt" className="sr-only">
            Country
          </label>
          <CountrySelect
            id="country-prompt"
            value={country}
            onChange={setCountryValue}
            disabled={setCountry.isPending}
            className="h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-900 focus:border-blue-500 focus:outline-none"
          />
          <button
            type="submit"
            disabled={!country || setCountry.isPending}
            className="flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-slate-900 text-sm font-semibold text-white hover:bg-slate-800 disabled:opacity-60"
          >
            {setCountry.isPending && <Loader2 className="h-4 w-4 animate-spin" />}
            Continue
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
