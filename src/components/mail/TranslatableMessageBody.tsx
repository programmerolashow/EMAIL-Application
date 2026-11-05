"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Languages, Loader2, ChevronDown, RotateCcw } from "lucide-react";
import { toast } from "sonner";
import type { NormalizedMessage } from "@/lib/email-normalizer";
import { TRANSLATION_LANGUAGES, languageName, type TranslationLanguageCode } from "@/lib/languages";
import { api } from "@/trpc/react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

/** Below this many letters the detector guesses too often, so no Translate prompt is shown. */
const MIN_DETECT_CHARS = 40;

interface TranslatableMessageBodyProps {
  message: NormalizedMessage;
  /** The normal (sanitized) rendering of the email body. */
  original: React.ReactNode;
}

/** Plain text of a message for language detection (first ~2,000 characters). */
function messageText(message: NormalizedMessage): string {
  const raw = message.bodyText?.trim() ? message.bodyText : message.body;
  let text = raw;
  if (/<[a-z][\s\S]*>/i.test(raw) && typeof DOMParser !== "undefined") {
    const doc = new DOMParser().parseFromString(raw, "text/html");
    doc.querySelectorAll("style, script, blockquote, .gmail_quote").forEach((el) => el.remove());
    text = doc.body.textContent ?? "";
  }
  return text.replace(/https?:\/\/\S+/g, " ").replace(/\s+/g, " ").trim().slice(0, 2000);
}

/** The reader's language from the browser, if it is one we translate to. */
function readerLanguage(): (typeof TRANSLATION_LANGUAGES)[number] | undefined {
  if (typeof navigator === "undefined") return undefined;
  const prefixes = (navigator.languages?.length ? navigator.languages : [navigator.language]).map(
    (l) => l.toLowerCase().split("-")[0]
  );
  for (const prefix of prefixes) {
    const match = TRANSLATION_LANGUAGES.find((l) => l.iso1 === prefix);
    if (match) return match;
  }
  return undefined;
}

export function TranslatableMessageBody({ message, original }: TranslatableMessageBodyProps) {
  const utils = api.useUtils();
  const translateMutation = api.ai.translateEmail.useMutation();
  const quotaQuery = api.ai.getQuota.useQuery(undefined, { staleTime: 60_000 });
  const quota = quotaQuery.data?.translate;

  const [translation, setTranslation] = useState<{
    targetLanguage: string;
    detectedLanguage: string;
    subject: string;
    body: string;
    truncated: boolean;
  } | null>(null);
  const [showOriginal, setShowOriginal] = useState(false);
  const [pendingLanguage, setPendingLanguage] = useState<string | null>(null);

  // Detection needs the DOM, so run it after mount (avoids a server/client mismatch).
  const [detected, setDetected] = useState<{ iso3: string } | null>(null);
  useEffect(() => {
    const text = messageText(message);
    if (text.replace(/[^\p{L}]/gu, "").length < MIN_DETECT_CHARS) {
      setDetected(null);
      return;
    }
    // Loaded on demand so the detector's language data stays out of the main dashboard bundle.
    let cancelled = false;
    void import("franc-min")
      .then(({ franc }) => {
        if (!cancelled) setDetected({ iso3: franc(text) });
      })
      .catch(() => {
        if (!cancelled) setDetected(null);
      });
    return () => {
      cancelled = true;
    };
  }, [message]);

  const reader = useMemo(() => readerLanguage(), []);
  const defaultTarget: TranslationLanguageCode = reader?.code ?? "en";
  const detectedLang = detected ? TRANSLATION_LANGUAGES.find((l) => l.iso3 === detected.iso3) : undefined;
  const isForeign =
    !!detected && detected.iso3 !== "und" && detected.iso3 !== (reader?.iso3 ?? "eng");

  const translate = async (target: TranslationLanguageCode) => {
    setPendingLanguage(target);
    try {
      const result = await translateMutation.mutateAsync({
        messageId: message.id,
        targetLanguage: target,
        accountId: message.accountId,
      });
      setTranslation(result);
      setShowOriginal(false);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Translation failed. Try again.");
    } finally {
      setPendingLanguage(null);
      void utils.ai.getQuota.invalidate();
    }
  };

  // Nothing to offer: the email is in the reader's language and hasn't been translated.
  if (!isForeign && !translation) return <>{original}</>;

  const busy = pendingLanguage !== null;
  const outOfQuota = quota?.remaining === 0;

  const languageMenu = (trigger: React.ReactNode) => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild disabled={busy}>
        {trigger}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="max-h-80 w-56 overflow-y-auto">
        <DropdownMenuLabel className="text-[0.6875rem] uppercase tracking-wider text-slate-400">
          Translate to
        </DropdownMenuLabel>
        {TRANSLATION_LANGUAGES.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            disabled={lang.iso3 === detected?.iso3 && !translation}
            onSelect={() => void translate(lang.code)}
            className="cursor-pointer text-xs"
          >
            {lang.name}
            {lang.code === defaultTarget && <span className="ml-auto text-[0.625rem] text-slate-400">Your language</span>}
          </DropdownMenuItem>
        ))}
        {quota && (
          <>
            <DropdownMenuSeparator />
            <p className={`px-2 py-1 text-[0.6875rem] ${outOfQuota ? "text-amber-700" : "text-slate-500"}`}>
              {quota.unlimited
                ? "Unlimited translations on this account."
                : outOfQuota
                ? `All ${quota.limit} translations used this week. Saved translations still open.`
                : `${quota.remaining} of ${quota.limit} translations left this week.`}
            </p>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );

  const showingTranslation = translation && !showOriginal;

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-2 rounded-lg border border-blue-100 bg-blue-50/50 px-3 py-2 text-xs text-slate-700">
        <Languages className="h-3.5 w-3.5 shrink-0 text-blue-600" />
        <span className="min-w-0 flex-1">
          {showingTranslation
            ? `Translated from ${translation.detectedLanguage} to ${languageName(translation.targetLanguage)}.`
            : translation
              ? "Showing the original email."
              : `This email appears to be in ${detectedLang?.name ?? "another language"}.`}
        </span>

        {translation && (
          <Button
            type="button"
            size="sm"
            variant="ghost"
            onClick={() => setShowOriginal((v) => !v)}
            className="h-7 gap-1 rounded-full px-2.5 text-xs text-slate-600"
          >
            <RotateCcw className="h-3 w-3" />
            {showOriginal ? "Show translation" : "Show original"}
          </Button>
        )}

        {languageMenu(
          <Button
            type="button"
            size="sm"
            variant="outline"
            className="h-7 gap-1.5 rounded-full border-blue-200 bg-white px-3 text-xs font-semibold text-blue-700 hover:bg-blue-50"
          >
            {busy ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Languages className="h-3.5 w-3.5" />}
            {busy
              ? `Translating to ${languageName(pendingLanguage)}…`
              : translation
                ? "Change language"
                : "Translate"}
            <ChevronDown className="h-3 w-3" />
          </Button>
        )}
      </div>

      {showingTranslation ? (
        <div className="space-y-2" lang={translation.targetLanguage}>
          {translation.subject && (
            <p className="text-sm font-semibold text-slate-900">{translation.subject}</p>
          )}
          <div className="whitespace-pre-wrap break-words text-sm leading-relaxed text-slate-800">
            {translation.body}
          </div>
          {translation.truncated && (
            <p className="text-[0.6875rem] text-amber-700">
              This email is very long; only the first part was translated.
            </p>
          )}
        </div>
      ) : (
        original
      )}
    </div>
  );
}
