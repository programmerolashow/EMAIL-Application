import "server-only";

/**
 * Naira → other currency rates for showing plan prices in the user's currency.
 * Source: open.er-api.com (free, no key, updated daily). Cached for 12 hours in memory and in
 * Next's fetch cache. If the feed is unreachable, callers get null and show Naira only.
 */
const RATES_URL = "https://open.er-api.com/v6/latest/NGN";
const CACHE_MS = 12 * 60 * 60 * 1000;

export interface NairaRates {
  /** 1 NGN = rates[CUR] units of CUR. */
  rates: Record<string, number>;
  updatedAt: string;
}

let cached: { value: NairaRates; fetchedAt: number } | null = null;

export async function getNairaRates(): Promise<NairaRates | null> {
  if (cached && Date.now() - cached.fetchedAt < CACHE_MS) return cached.value;
  try {
    const response = await fetch(RATES_URL, {
      next: { revalidate: CACHE_MS / 1000 },
      signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = (await response.json()) as {
      result?: string;
      rates?: Record<string, number>;
      time_last_update_unix?: number;
    };
    if (data.result !== "success" || !data.rates) throw new Error(`Unexpected response: ${data.result}`);
    const value: NairaRates = {
      rates: data.rates,
      updatedAt: new Date((data.time_last_update_unix ?? Date.now() / 1000) * 1000).toISOString(),
    };
    cached = { value, fetchedAt: Date.now() };
    return value;
  } catch (error) {
    console.error("[ExchangeRates] Could not load Naira rates:", error instanceof Error ? error.message : error);
    return cached?.value ?? null;
  }
}
