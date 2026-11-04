"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { friendlyAuthError } from "@/lib/supabase/auth-errors";
import { GoogleAuthButton, AuthDivider } from "@/components/auth/GoogleAuthButton";
import {
  AuthShell,
  AuthCard,
  AuthAlert,
  authInputClass,
  authPrimaryButtonClass,
} from "@/components/auth/AuthLayout";

function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const isVerified = searchParams.get("verified") === "1";
  const urlError = searchParams.get("error");

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const supabase = createClient();
      const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });

      if (signInError) {
        setError(friendlyAuthError(signInError));
        setLoading(false);
        return;
      }

      router.push("/dashboard");
      router.refresh();
    } catch (err) {
      setError(friendlyAuthError(err));
      setLoading(false);
    }
  };

  return (
    <AuthCard
      title="Welcome back"
      subtitle="Sign in to your E-MassCom account."
      footer={
        <>
          Don&apos;t have an account?{" "}
          <Link href="/sign-up" className="font-semibold text-blue-600 hover:underline">
            Sign up
          </Link>
        </>
      }
    >
      {isVerified && !error && <AuthAlert kind="success">Email verified. Sign in to continue.</AuthAlert>}
      {urlError && !error && <AuthAlert kind="error">{urlError}</AuthAlert>}
      {error && <AuthAlert kind="error">{error}</AuthAlert>}

      <form onSubmit={handleSignIn} className="space-y-4">
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
          <label htmlFor="password" className="mb-2 block text-sm font-medium text-gray-900">
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`${authInputClass} pr-11`}
              placeholder="••••••••"
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
              Signing in…
            </>
          ) : (
            "Sign in"
          )}
        </button>
      </form>

      <div className="mt-5 space-y-5">
        <AuthDivider />
        <GoogleAuthButton label="Continue with Google" onError={setError} disabled={loading} />
      </div>
    </AuthCard>
  );
}

export default function SignInPage() {
  return (
    <AuthShell>
      <Suspense fallback={<Loader2 className="h-8 w-8 animate-spin text-blue-600" />}>
        <SignInForm />
      </Suspense>
    </AuthShell>
  );
}
