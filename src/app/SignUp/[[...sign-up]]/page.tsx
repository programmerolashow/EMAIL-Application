"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { friendlyAuthError } from "@/lib/supabase/auth-errors";
import { GoogleAuthButton, AuthDivider } from "@/components/auth/GoogleAuthButton";
import { CountrySelect } from "@/components/CountrySelect";
import { guessCountryFromBrowser, type CountryCode } from "@/lib/countries";
import {
  AuthShell,
  AuthCard,
  AuthAlert,
  authInputClass,
  authPrimaryButtonClass,
} from "@/components/auth/AuthLayout";

const MIN_PASSWORD_LENGTH = 8;

export default function SignUpPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [country, setCountry] = useState<CountryCode | "">("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Pre-select the likely country after mount (the browser isn't available during SSR).
  useEffect(() => {
    setCountry((current) => current || (guessCountryFromBrowser() ?? ""));
  }, []);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setNotice(null);

    if (!country) {
      setError("Select the country you're based in.");
      return;
    }

    if (password.length < MIN_PASSWORD_LENGTH) {
      setError(`Use at least ${MIN_PASSWORD_LENGTH} characters for your password.`);
      return;
    }

    setLoading(true);
    try {
      const supabase = createClient();
      const nameParts = fullName.trim().split(/\s+/);
      const firstName = nameParts[0] ?? "User";
      const lastName = nameParts.slice(1).join(" ");
      // Always the site the user is on, so a localhost sign-up never links to production.
      const baseUrl = window.location.origin;

      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${baseUrl}/auth/callback?next=${encodeURIComponent("/sign-in")}`,
          data: { full_name: fullName.trim(), first_name: firstName, last_name: lastName, country },
        },
      });

      if (signUpError) {
        setError(friendlyAuthError(signUpError));
        setLoading(false);
        return;
      }

      if (data.session) {
        router.push("/dashboard");
        router.refresh();
        return;
      }

      setNotice(`Account created. We've sent a verification link to ${email}. Open it to confirm your account.`);
      setLoading(false);
    } catch (err) {
      setError(friendlyAuthError(err));
      setLoading(false);
    }
  };

  return (
    <AuthShell>
      <AuthCard
        title="Create your account"
        subtitle="Start managing your email smarter with E-MassCom."
        footer={
          <>
            Already have an account?{" "}
            <Link href="/sign-in" className="font-semibold text-blue-600 hover:underline">
              Sign in
            </Link>
          </>
        }
      >
        {error && <AuthAlert kind="error">{error}</AuthAlert>}
        {notice && <AuthAlert kind="success">{notice}</AuthAlert>}

        <form onSubmit={handleSignUp} className="space-y-4">
          <div>
            <label htmlFor="fullName" className="mb-2 block text-sm font-medium text-gray-900">
              Full name
            </label>
            <input
              id="fullName"
              type="text"
              autoComplete="name"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className={authInputClass}
              placeholder="Jane Doe"
            />
          </div>

          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-900">
              Email
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={authInputClass}
              placeholder="you@company.com"
            />
          </div>

          <div>
            <label htmlFor="country" className="mb-2 block text-sm font-medium text-gray-900">
              Country
            </label>
            <CountrySelect id="country" value={country} onChange={setCountry} className={authInputClass} />
            <p className="mt-1.5 text-xs text-gray-500">Plan prices are shown in your local currency.</p>
          </div>

          <div>
            <label htmlFor="password" className="mb-2 block text-sm font-medium text-gray-900">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                required
                minLength={MIN_PASSWORD_LENGTH}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`${authInputClass} pr-11`}
                placeholder={`At least ${MIN_PASSWORD_LENGTH} characters`}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 transition-colors hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <button type="submit" disabled={loading} className={authPrimaryButtonClass}>
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Creating account…
              </>
            ) : (
              "Create account"
            )}
          </button>
        </form>

        <div className="mt-5 space-y-5">
          <AuthDivider />
          <GoogleAuthButton label="Sign up with Google" onError={setError} disabled={loading} />
        </div>

        <p className="mt-5 text-center text-xs leading-relaxed text-gray-400">
          By creating an account you agree to our Terms of Service and Privacy Policy.
        </p>
      </AuthCard>
    </AuthShell>
  );
}
