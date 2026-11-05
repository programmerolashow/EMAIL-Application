/**
 * Countries (ISO 3166-1 alpha-2) and the currency each one pays in (ISO 4217).
 * Shared by the sign-up form, the country prompt, server validation and the plans page.
 * Country names come from Intl.DisplayNames, so no names are hard-coded here.
 */
export const COUNTRY_CURRENCY = {
  AD: "EUR", AE: "AED", AF: "AFN", AG: "XCD", AL: "ALL", AM: "AMD", AO: "AOA", AR: "ARS",
  AT: "EUR", AU: "AUD", AZ: "AZN", BA: "BAM", BB: "BBD", BD: "BDT", BE: "EUR", BF: "XOF",
  BG: "BGN", BH: "BHD", BI: "BIF", BJ: "XOF", BN: "BND", BO: "BOB", BR: "BRL", BS: "BSD",
  BT: "BTN", BW: "BWP", BY: "BYN", BZ: "BZD", CA: "CAD", CD: "CDF", CF: "XAF", CG: "XAF",
  CH: "CHF", CI: "XOF", CL: "CLP", CM: "XAF", CN: "CNY", CO: "COP", CR: "CRC", CU: "CUP",
  CV: "CVE", CY: "EUR", CZ: "CZK", DE: "EUR", DJ: "DJF", DK: "DKK", DM: "XCD", DO: "DOP",
  DZ: "DZD", EC: "USD", EE: "EUR", EG: "EGP", ER: "ERN", ES: "EUR", ET: "ETB", FI: "EUR",
  FJ: "FJD", FR: "EUR", GA: "XAF", GB: "GBP", GD: "XCD", GE: "GEL", GH: "GHS", GM: "GMD",
  GN: "GNF", GQ: "XAF", GR: "EUR", GT: "GTQ", GW: "XOF", GY: "GYD", HK: "HKD", HN: "HNL",
  HR: "EUR", HT: "HTG", HU: "HUF", ID: "IDR", IE: "EUR", IL: "ILS", IN: "INR", IQ: "IQD",
  IR: "IRR", IS: "ISK", IT: "EUR", JM: "JMD", JO: "JOD", JP: "JPY", KE: "KES", KG: "KGS",
  KH: "KHR", KM: "KMF", KN: "XCD", KR: "KRW", KW: "KWD", KZ: "KZT", LA: "LAK", LB: "LBP",
  LC: "XCD", LI: "CHF", LK: "LKR", LR: "LRD", LS: "LSL", LT: "EUR", LU: "EUR", LV: "EUR",
  LY: "LYD", MA: "MAD", MC: "EUR", MD: "MDL", ME: "EUR", MG: "MGA", MK: "MKD", ML: "XOF",
  MM: "MMK", MN: "MNT", MO: "MOP", MR: "MRU", MT: "EUR", MU: "MUR", MV: "MVR", MW: "MWK",
  MX: "MXN", MY: "MYR", MZ: "MZN", NA: "NAD", NE: "XOF", NG: "NGN", NI: "NIO", NL: "EUR",
  NO: "NOK", NP: "NPR", NZ: "NZD", OM: "OMR", PA: "PAB", PE: "PEN", PG: "PGK", PH: "PHP",
  PK: "PKR", PL: "PLN", PT: "EUR", PY: "PYG", QA: "QAR", RO: "RON", RS: "RSD", RU: "RUB",
  RW: "RWF", SA: "SAR", SB: "SBD", SC: "SCR", SD: "SDG", SE: "SEK", SG: "SGD", SI: "EUR",
  SK: "EUR", SL: "SLE", SM: "EUR", SN: "XOF", SO: "SOS", SR: "SRD", SS: "SSP", ST: "STN",
  SV: "USD", SY: "SYP", SZ: "SZL", TD: "XAF", TG: "XOF", TH: "THB", TJ: "TJS", TL: "USD",
  TM: "TMT", TN: "TND", TO: "TOP", TR: "TRY", TT: "TTD", TW: "TWD", TZ: "TZS", UA: "UAH",
  UG: "UGX", US: "USD", UY: "UYU", UZ: "UZS", VC: "XCD", VE: "VES", VN: "VND", VU: "VUV",
  WS: "WST", YE: "YER", ZA: "ZAR", ZM: "ZMW", ZW: "USD",
} as const satisfies Record<string, string>;

export type CountryCode = keyof typeof COUNTRY_CURRENCY;

export const COUNTRY_CODES = Object.keys(COUNTRY_CURRENCY) as [CountryCode, ...CountryCode[]];

export function isCountryCode(value: unknown): value is CountryCode {
  return typeof value === "string" && value in COUNTRY_CURRENCY;
}

export function currencyForCountry(country: string | null | undefined): string {
  return isCountryCode(country) ? COUNTRY_CURRENCY[country] : "NGN";
}

let displayNames: Intl.DisplayNames | null = null;
export function countryName(code: string): string {
  try {
    displayNames ??= new Intl.DisplayNames(["en"], { type: "region" });
    return displayNames.of(code) ?? code;
  } catch {
    return code;
  }
}

/** All countries sorted by English name, for dropdowns. */
export function countryOptions(): { code: CountryCode; name: string }[] {
  return COUNTRY_CODES.map((code) => ({ code, name: countryName(code) })).sort((a, b) =>
    a.name.localeCompare(b.name)
  );
}

/** Common time zones → country, used only to pre-select the dropdown. */
const TIMEZONE_COUNTRY: Record<string, CountryCode> = {
  "Africa/Lagos": "NG", "Africa/Accra": "GH", "Africa/Nairobi": "KE", "Africa/Johannesburg": "ZA",
  "Africa/Cairo": "EG", "Africa/Casablanca": "MA", "Africa/Abidjan": "CI", "Africa/Dakar": "SN",
  "Africa/Kampala": "UG", "Africa/Dar_es_Salaam": "TZ", "Africa/Kigali": "RW", "Africa/Addis_Ababa": "ET",
  "Africa/Douala": "CM", "Africa/Lusaka": "ZM", "Africa/Harare": "ZW", "Europe/London": "GB",
  "Europe/Dublin": "IE", "Europe/Paris": "FR", "Europe/Berlin": "DE", "Europe/Madrid": "ES",
  "Europe/Rome": "IT", "Europe/Amsterdam": "NL", "America/New_York": "US", "America/Chicago": "US",
  "America/Denver": "US", "America/Los_Angeles": "US", "America/Toronto": "CA", "Asia/Dubai": "AE",
  "Asia/Kolkata": "IN", "Asia/Singapore": "SG", "Australia/Sydney": "AU",
};

/** Best guess of the visitor's country from the browser (pre-fills the form; user confirms). */
export function guessCountryFromBrowser(): CountryCode | null {
  if (typeof navigator === "undefined") return null;
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const byZone = TIMEZONE_COUNTRY[tz];
    if (byZone) return byZone;
  } catch {
    // ignore
  }
  for (const locale of navigator.languages ?? [navigator.language]) {
    const region = locale.split("-")[1]?.toUpperCase();
    if (isCountryCode(region)) return region;
  }
  return null;
}
