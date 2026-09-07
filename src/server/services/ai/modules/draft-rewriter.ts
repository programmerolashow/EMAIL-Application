import "server-only";
import type { RewriteOption } from "./types";
import { AIContextBuilder } from "../context-builder";
import { AIService } from "../ai-service";

export class DraftRewriter {
  public static async rewriteDraft(
    draftText: string,
    option: RewriteOption,
    customPrompt?: string
  ): Promise<string> {
    const result = await this.rewrite(draftText, option, customPrompt);
    return result.rewrittenContent;
  }

  public static async rewrite(
    content: string,
    option: RewriteOption,
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
    const fallbackContent = `[Rewritten (${option})]:\n${cleanContent}\n\n[Configure OPENAI_API_KEY for live GPT draft rewriting.]`;

    const systemPrompt = `You are a professional email editing assistant.
TASK: ${instruction}

Output ONLY the rewritten draft text. Do not add introductory conversational filler.`;

    const rewritten = await AIService.complete(
      {
        systemPrompt,
        userPrompt: cleanContent,
        temperature: 0.5,
      },
      fallbackContent
    );

    return {
      rewrittenContent: rewritten.trim(),
    };
  }
}
