import "server-only";
import OpenAI from "openai";
import { env } from "@/env";
import type { RewriteOption } from "./types";
import { AIContextBuilder } from "../context-builder";

export class DraftRewriter {
  public static async rewriteDraft(
    draftText: string,
    option: RewriteOption,
    customPrompt?: string
  ): Promise<string> {
    const openai = env.OPENAI_API_KEY ? new OpenAI({ apiKey: env.OPENAI_API_KEY }) : null;
    const result = await this.rewrite(draftText, option, openai, customPrompt);
    return result.rewrittenContent;
  }

  public static async rewrite(
    content: string,
    option: RewriteOption,
    openai: OpenAI | null,
    customPrompt?: string
  ): Promise<{ rewrittenContent: string }> {
    const cleanContent = AIContextBuilder.sanitizeText(content, 4000);

    const optionPrompts: Record<RewriteOption, string> = {
      "Make it more professional": "Rewrite the draft to sound highly professional, polite, and executive-ready.",
      "Make it shorter": "Concisely rewrite the draft to be as brief and clear as possible without losing key meaning.",
      "Make it friendlier": "Rewrite the draft using a warm, friendly, approachable, and encouraging tone.",
      "Fix grammar": "Correct all spelling, grammar, punctuation, and phrasing errors while maintaining original meaning and tone.",
      "Make it persuasive": "Rewrite the draft to be persuasive, compelling, clear, and action-oriented.",
      "Simplify it": "Simplify the vocabulary and sentence structure so the draft is extremely easy to read and understand.",
    };

    const instruction = customPrompt ?? optionPrompts[option] ?? optionPrompts["Make it more professional"];

    if (!openai) {
      return {
        rewrittenContent: `[Rewritten (${option})]:\n${cleanContent}\n\n[Configure OPENAI_API_KEY for live GPT draft rewriting.]`,
      };
    }

    const systemPrompt = `You are a professional email editing assistant.
TASK: ${instruction}

Output ONLY the rewritten draft text. Do not add introductory conversational filler.`;

    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: cleanContent },
        ],
        temperature: 0.5,
      });

      const rewritten = response.choices[0]?.message?.content ?? content;
      return {
        rewrittenContent: rewritten.trim(),
      };
    } catch (err) {
      console.error("DraftRewriter GPT error:", err);
    }

    return {
      rewrittenContent: content,
    };
  }
}
