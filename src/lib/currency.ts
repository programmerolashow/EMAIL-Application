import { formatNaira } from "@/lib/plans";

/**
 * Plan prices are set in Naira. For other currencies the price is converted at `rate`
 * (1 NGN = rate units) and rounded: whole units from 100 upwards, otherwise 2 decimals.
 * Returns null when no conversion is possible (caller shows Naira).
 */
export function convertFromNaira(amountNgn: number, rate: number | null): number | null {
  if (!rate || rate <= 0) return null;
  const converted = amountNgn * rate;
  return converted >= 100 ? Math.round(converted) : Math.round(converted * 100) / 100;
}

export function formatMoney(amount: number, currency: string): string {
  try {
    return new Intl.NumberFormat("en", {
      style: "currency",
      currency,
      currencyDisplay: "narrowSymbol",
      maximumFractionDigits: amount >= 100 ? 0 : 2,
    }).format(amount);
  } catch {
    return `${currency} ${amount.toLocaleString("en")}`;
  }
}

/** "₦25,000" for Naira users; "GH₵210" (converted) for others; Naira if no rate is available. */
export function formatPlanPrice(amountNgn: number, currency: string, rate: number | null): string {
  if (currency === "NGN") return formatNaira(amountNgn);
  const converted = convertFromNaira(amountNgn, rate);
  return converted === null ? formatNaira(amountNgn) : formatMoney(converted, currency);
}
