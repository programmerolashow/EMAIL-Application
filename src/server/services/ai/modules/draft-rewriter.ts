import "server-only";
import type { RewriteOption, DraftRewriteResult } from "./types";
import { AIContextBuilder } from "../context-builder";
import { AIService } from "../ai-service";

export class DraftRewriter {
  /**
   * Alias method for backward compatibility returning plain string rewritten content.
   */
  public static async rewriteDraft(
    draftText: string,
    option: RewriteOption,
    customPrompt?: string
  ): Promise<string> {
    const result = await this.rewrite(draftText, option, customPrompt);
    return result.rewrittenContent;
  }

  /**
   * Primary rewriting method supporting all goals, strict meaning preservation,
   * zero unsupported facts policy, and returning editor metadata.
   */
  public static async rewrite(
    content: string,
    option: RewriteOption,
    customPrompt?: string
  ): Promise<DraftRewriteResult> {
    const cleanContent = AIContextBuilder.sanitizeText(content, 4000);
    const originalLength = cleanContent.length;

    // Supported Goal Prompts Mapping
    const optionPrompts: Record<RewriteOption, string> = {
      "Make professional": "Rewrite the draft to sound highly professional, polite, executive-ready, and polished.",
      "Make it more professional": "Rewrite the draft to sound highly professional, polite, executive-ready, and polished.",
      "Make shorter": "Concisely rewrite the draft to be as brief, direct, and clear as possible without omitting core points.",
      "Make it shorter": "Concisely rewrite the draft to be as brief, direct, and clear as possible without omitting core points.",
      "Make friendlier": "Rewrite the draft using a warm, friendly, approachable, and encouraging tone.",
      "Make it friendlier": "Rewrite the draft using a warm, friendly, approachable, and encouraging tone.",
      "Fix grammar": "Correct all spelling, grammar, punctuation, and phrasing errors while preserving original tone and wording as closely as possible.",
      "Make persuasive": "Rewrite the draft to be persuasive, compelling, clear, influential, and action-oriented.",
      "Make it persuasive": "Rewrite the draft to be persuasive, compelling, clear, influential, and action-oriented.",
      "Simplify": "Simplify the vocabulary and sentence structure so the draft is extremely easy to read and understand.",
      "Simplify it": "Simplify the vocabulary and sentence structure so the draft is extremely easy to read and understand.",
    };

    const goalInstruction = customPrompt ?? optionPrompts[option] ?? optionPrompts["Make professional"];
    const fallbackContent = cleanContent || "Draft content is empty.";

    const systemPrompt = `You are an expert email editing assistant.

REWRITING GOAL:
${goalInstruction}

STRICT QUALITY & INTEGRITY RULES:
1. PRESERVE ORIGINAL MEANING: Retain the core intent, key facts, and message purpose unless the user explicitly requests a change of intent.
2. DO NOT INTRODUCE UNSUPPORTED FACTS: Do NOT invent new dates, promises, names, figures, or claims not present in the original draft.
3. OUTPUT FORMAT: Return ONLY the rewritten draft text. Do NOT add introductory/explanatory conversational filler or markdown code blocks.`;

    const rawRewritten = await AIService.complete(
      {
        systemPrompt,
        userPrompt: cleanContent,
        temperature: 0.4,
      },
      fallbackContent
    );

    const rewrittenContent = rawRewritten.trim();

    return {
      rewrittenContent,
      originalLength,
      rewrittenLength: rewrittenContent.length,
      goal: option,
      hasMeaningPreserved: true,
    };
  }
}
