"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Mail } from "lucide-react";

/* Layout modelled on the Qorelly app (app.qorelly.com/auth/*): the form sits in a card inside a
 * soft grey tray on the left, and a rotating photo showcase fills the right half on large screens. */

interface Slide {
  src: string;
  tag: string;
  title: string;
  body: string;
}

const SLIDES: Slide[] = [
  {
    src: "/images/auth/inbox.webp",
    tag: "Unified inbox",
    title: "Every inbox, one calm view.",
    body: "Bring all your email accounts together and see what needs you first.",
  },
  {
    src: "/images/auth/ai.webp",
    tag: "AI replies",
    title: "Replies that write themselves.",
    body: "Draft, rewrite and polish emails with AI, then send them in a tap.",
  },
  {
    src: "/images/auth/focus.webp",
    tag: "Focus",
    title: "Find any message in seconds.",
    body: "Smart search and summaries so you spend less time digging and more time doing.",
  },
];

const SLIDE_INTERVAL_MS = 6000;

function CloseButton({ tone, className = "" }: { tone: "image" | "card"; className?: string }) {
  const toneClass =
    tone === "image"
      ? "bg-white/15 text-white ring-1 ring-white/25 backdrop-blur-md hover:bg-white/25"
      : "bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-900";
  return (
    <Link
      href="/"
      aria-label="Back to home"
      className={`size-9 items-center justify-center rounded-full transition-colors ${toneClass} ${className}`}
    >
      <svg viewBox="0 0 24 24" className="size-4" aria-hidden="true">
        <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </Link>
  );
}

function Showcase() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    const timer = setInterval(() => setIndex((i) => (i + 1) % SLIDES.length), SLIDE_INTERVAL_MS);
    return () => clearInterval(timer);
  }, []);

  const slide = SLIDES[index] ?? SLIDES[0];
  if (!slide) return null;

  return (
    <div className="relative h-full w-full overflow-hidden rounded-[28px] bg-gray-900">
      {SLIDES.map((s, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={s.src}
          src={s.src}
          alt=""
          loading={i === 0 ? "eager" : "lazy"}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ease-out ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/5 to-transparent" />

      <div className="relative flex h-full flex-col p-10 xl:p-12">
        <div className="flex max-w-md flex-col gap-4">
          <h2
            key={slide.title}
            className="animate-in fade-in slide-in-from-bottom-2 font-serif text-4xl leading-[1.1] font-normal text-white duration-700 xl:text-5xl"
          >
            {slide.title}
          </h2>
          <p key={slide.body} className="animate-in fade-in text-[15px] leading-relaxed text-white/80 duration-700">
            {slide.body}
          </p>
          <div className="mt-2 flex items-center gap-1.5" role="tablist">
            {SLIDES.map((s, i) => (
              <button
                key={s.src}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={s.tag}
                onClick={() => setIndex(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === index ? "w-6 bg-white" : "w-1.5 bg-white/40 hover:bg-white/70"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      <CloseButton tone="image" className="absolute top-6 right-6 flex" />
    </div>
  );
}

/** Page shell: form column on the left, photo showcase on the right (lg and up). */
export function AuthShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-dvh bg-white">
      <div className="flex flex-1 items-center justify-center px-4 py-10 sm:px-8">{children}</div>
      <div className="sticky top-0 hidden h-dvh w-[48%] max-w-[780px] shrink-0 p-3 lg:block">
        <Showcase />
      </div>
    </div>
  );
}

/** Card inside a soft tray, with the brand tile on top and an optional footer under the card. */
export function AuthCard({
  title,
  subtitle,
  footer,
  children,
}: {
  title: string;
  subtitle: string;
  footer?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="w-full max-w-md">
      <div className="rounded-[32px] border border-gray-200/80 bg-gray-100 p-2">
        <div className="relative rounded-[24px] bg-white p-6 shadow-[0_8px_24px_-8px_rgba(0,0,0,0.12)] ring-1 ring-black/[0.04] sm:p-8">
          <CloseButton tone="card" className="absolute top-4 right-4 flex lg:hidden" />

          <div className="mb-7 flex justify-center">
            <div className="flex size-12 items-center justify-center rounded-[14px] bg-blue-600 text-white">
              <Mail className="size-6" />
            </div>
          </div>

          <div className="mb-6">
            <h1 className="text-center text-[28px] leading-tight font-bold tracking-tight text-gray-900">{title}</h1>
            <p className="mt-2 text-center text-[15px] text-gray-500">{subtitle}</p>
          </div>

          {children}
        </div>
      </div>
      {footer && <div className="px-4 pt-5 pb-3 text-center text-[15px] text-gray-500">{footer}</div>}
    </div>
  );
}

export function AuthAlert({ kind, children }: { kind: "error" | "success" | "info"; children: React.ReactNode }) {
  const styles = {
    error: "border-red-200 bg-red-50 text-red-700",
    success: "border-green-200 bg-green-50 text-green-800",
    info: "border-blue-200 bg-blue-50 text-blue-800",
  }[kind];
  return (
    <div role={kind === "error" ? "alert" : "status"} className={`mb-4 rounded-2xl border p-3 text-sm ${styles}`}>
      {children}
    </div>
  );
}

export const authInputClass =
  "h-12 w-full rounded-xl border border-gray-200 bg-white px-4 text-[15px] text-gray-900 placeholder:text-gray-400 transition-colors focus:border-blue-500 focus:ring-4 focus:ring-blue-100 focus:outline-none disabled:opacity-60";

export const authPrimaryButtonClass =
  "flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 text-[15px] font-semibold text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60";
