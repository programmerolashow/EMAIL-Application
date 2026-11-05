"use client";

import React, { useMemo } from "react";
import { countryOptions, currencyForCountry, type CountryCode } from "@/lib/countries";

interface CountrySelectProps {
  id?: string;
  value: CountryCode | "";
  onChange: (country: CountryCode) => void;
  className?: string;
  disabled?: boolean;
}

/** Native select of every supported country, labelled with the currency the user will pay in. */
export function CountrySelect({ id, value, onChange, className, disabled }: CountrySelectProps) {
  const options = useMemo(() => countryOptions(), []);
  return (
    <select
      id={id}
      required
      disabled={disabled}
      value={value}
      onChange={(e) => onChange(e.target.value as CountryCode)}
      className={className}
    >
      <option value="" disabled>
        Select your country
      </option>
      {options.map((c) => (
        <option key={c.code} value={c.code}>
          {c.name} ({currencyForCountry(c.code)})
        </option>
      ))}
    </select>
  );
}
