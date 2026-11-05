"use client";

import Link from "next/link";
import { ArrowLeft, Check, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { api } from "@/trpc/react";
import { PLAN_LIST, formatNaira, type PlanDefinition } from "@/lib/plans";
import { formatPlanPrice } from "@/lib/currency";
import { countryName, type CountryCode } from "@/lib/countries";
import { CountrySelect } from "@/components/CountrySelect";

interface PriceContext {
  currency: string;
  rate: number | null;
}

/** Plans & billing. Layout follows the Qorelly plans page: two-column cards, serif names. */
export default function PlansPage() {
  const planQuery = api.account.getPlan.useQuery();
  const current = planQuery.data;
  const utils = api.useUtils();
  const billingQuery = api.account.getBillingProfile.useQuery();
  const billing = billingQuery.data;
  const setCountry = api.account.setCountry.useMutation();
  const priceContext: PriceContext = { currency: billing?.currency ?? "NGN", rate: billing?.rate ?? null };
  const converted = priceContext.currency !== "NGN" && priceContext.rate !== null;

  const changeCountry = async (country: CountryCode) => {
    try {
      await setCountry.mutateAsync({ country });
      await utils.account.getBillingProfile.invalidate();
    } catch {
      toast.error("We couldn't update your country. Please try again.");
    }
  };

  return (
    <div className="h-full w-full overflow-y-auto bg-slate-50">
      <div className="mx-auto w-full max-w-5xl px-4 py-6 sm:px-6 sm:py-10">
        <Link
          href="/dashboard"
          className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-slate-900"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to inbox
        </Link>

        <header className="mb-6 sm:mb-8">
          <h1 className="font-serif text-3xl text-slate-900 sm:text-4xl">Plans</h1>
          <p className="mt-2 max-w-2xl text-sm text-slate-600 sm:text-base">
            Pick how many mailboxes you want to manage in one place.
          </p>
          {current && (
            <p className="mt-3 text-sm text-slate-600">
              You&apos;re on <span className="font-semibold text-slate-900">{current.planName}</span>
              {" · "}
              {current.linked} of {current.maxMailboxes ?? "unlimited"} mailbox
              {current.maxMailboxes === 1 ? "" : "es"} linked
            </p>
          )}
        </header>

        {billing?.country && (
          <div className="mb-6 flex flex-wrap items-center gap-2 text-sm text-slate-600">
            <label htmlFor="billing-country">Prices for</label>
            <CountrySelect
              id="billing-country"
              value={billing.country as CountryCode}
              onChange={(c) => void changeCountry(c)}
              disabled={setCountry.isPending}
              className="h-9 rounded-full border border-slate-200 bg-white px-3 text-sm text-slate-900 focus:border-blue-500 focus:outline-none"
            />
            {setCountry.isPending && <Loader2 className="h-4 w-4 animate-spin text-slate-400" />}
          </div>
        )}

        {planQuery.isLoading || billingQuery.isLoading ? (
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <Loader2 className="h-4 w-4 animate-spin" />
            Loading your plan…
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2">
            {PLAN_LIST.map((plan) => (
              <PlanCard
                key={plan.id}
                plan={plan}
                isCurrent={current?.planId === plan.id}
                price={priceContext}
              />
            ))}
          </div>
        )}

        <p className="mt-6 text-xs text-slate-500">
          {converted && billing
            ? `Prices are per month, converted from Naira to ${billing.currency} at today's exchange rate${
                billing.ratesUpdatedAt ? ` (updated ${new Date(billing.ratesUpdatedAt).toLocaleDateString()})` : ""
              }, so they can change slightly as rates move. `
            : billing && billing.currency !== "NGN"
              ? `We couldn't load today's exchange rate for ${countryName(billing.country ?? "")}, so prices are shown in Naira. `
              : "Prices are per month in Naira. "}
          Online payment isn&apos;t available yet; upgrades are applied by our team. Every plan includes the AI
          Copilot.
        </p>
      </div>
    </div>
  );
}

function PlanCard({ plan, isCurrent, price }: { plan: PlanDefinition; isCurrent: boolean; price: PriceContext }) {
  const showNairaToo = price.currency !== "NGN" && price.rate !== null;
  const popular = Boolean(plan.popular);
  return (
    <div
      className={`relative flex flex-col rounded-2xl border p-6 sm:p-7 ${
        popular ? "border-violet-500 bg-violet-50" : "border-slate-200 bg-white"
      }`}
    >
      {popular && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-violet-600 px-3 py-1 text-xs font-semibold text-white">
          Most popular
        </span>
      )}

      <h2 className="font-serif text-2xl text-slate-900">{plan.name}</h2>
      <p className="mt-2 min-h-[2.75rem] text-sm text-slate-600">{plan.tagline}</p>

      <p className="mt-5 font-serif text-3xl text-slate-900 sm:text-4xl">
        {plan.priceNgn === 0 ? (
          "Free"
        ) : (
          <>
            {formatPlanPrice(plan.priceNgn, price.currency, price.rate)}
            <span className="ml-1 font-sans text-sm text-slate-500">/ mo</span>
            {showNairaToo && (
              <span className="mt-1 block font-sans text-xs text-slate-500">{formatNaira(plan.priceNgn)} / mo</span>
            )}
          </>
        )}
      </p>

      {isCurrent ? (
        <button
          disabled
          className="mt-6 h-11 w-full rounded-xl bg-slate-100 text-sm font-semibold text-slate-500"
        >
          Current plan
        </button>
      ) : (
        <button
          onClick={() =>
            toast.info(`Online payment for ${plan.name} is coming soon.`, {
              description: "Until then, upgrades are applied by our team on request.",
            })
          }
          className={`mt-6 h-11 w-full rounded-xl text-sm font-semibold text-white transition-colors ${
            popular ? "bg-violet-600 hover:bg-violet-700" : "bg-slate-900 hover:bg-slate-800"
          }`}
        >
          {plan.priceNgn === 0 ? "Switch to Free" : "Upgrade"}
        </button>
      )}

      <ul className="mt-6 space-y-2.5">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2.5 text-sm text-slate-700">
            <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-violet-500">
              <Check className="h-2.5 w-2.5 text-white" strokeWidth={3} />
            </span>
            {feature}
          </li>
        ))}
      </ul>
    </div>
  );
}
