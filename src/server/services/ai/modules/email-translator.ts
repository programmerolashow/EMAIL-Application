import "server-only";
import { z } from "zod";
import type { NormalizedMessage } from "@/lib/email-normalizer";
import { languageName } from "@/lib/languages";
import { AIService } from "../ai-service";

/** Longest body (characters of plain text) sent for translation; longer mail is cut off. */
const MAX_TRANSLATE_CHARS = 12_000;

export const emailTranslationSchema = z.object({
  detectedLanguage: z.string().default("Unknown"),
  subject: z.string().default(""),
  body: z.string().min(1),
});

export interface EmailTranslationResult {
  targetLanguage: string;
  detectedLanguage: string;
  subject: string;
  body: string;
  truncated: boolean;
}

/**
 * Converts an email body to plain text for translation. Unlike AIContextBuilder.sanitizeText it
 * keeps paragraph and line breaks and full URLs, because the reader sees this text.
 */
export function emailBodyToText(body: string): string {
  if (!/<[a-z][\s\S]*>/i.test(body)) return body.replace(/\r\n/g, "\n").trim();
  return body
    .replace(/<(style|script|head)[^>]*>[\s\S]*?<\/\1>/gi, "")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/(p|div|tr|li|h[1-6]|blockquote|table)>/gi, "\n")
    .replace(/<li[^>]*>/gi, "• ")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&#(\d+);/g, (_, n: string) => String.fromCodePoint(Number(n)))
    .replace(/[ \t]+/g, " ")
    .replace(/ *\n */g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export class EmailTranslator {
  static async translate(message: NormalizedMessage, targetCode: string): Promise<EmailTranslationResult> {
    const target = languageName(targetCode);
    const fullText = emailBodyToText([message.body, message.bodyText, message.snippet].find((t) => t?.trim()) ?? "");
    const truncated = fullText.length > MAX_TRANSLATE_CHARS;
    const text = truncated ? fullText.slice(0, MAX_TRANSLATE_CHARS) : fullText;

    const systemPrompt = `You are a professional email translator.
Translate the email the user sends into ${target}.

RULES:
1. Translate faithfully. Do not summarize, add, or omit content. Keep names, email addresses, URLs, numbers, amounts and dates exactly as written.
2. Keep the paragraph and line-break structure of the original.
3. If part of the email is already in ${target}, keep that part unchanged.
4. Return ONLY a JSON object, no markdown, in this shape:
{"detectedLanguage": "<English name of the original language>", "subject": "<translated subject>", "body": "<translated body, using \\n for line breaks>"}`;

    const userPrompt = `SUBJECT:\n${message.subject || "(no subject)"}\n\nBODY:\n${text}`;

    const result = await AIService.completeStructured(
      { systemPrompt, userPrompt, temperature: 0.2, maxTokens: 6000, timeoutMs: 60_000 },
      { detectedLanguage: "Unknown", subject: "", body: "" },
      emailTranslationSchema
    );

    return {
      targetLanguage: targetCode,
      detectedLanguage: result.detectedLanguage,
      subject: result.subject,
      body: result.body.trim(),
      truncated,
    };
  }
}
