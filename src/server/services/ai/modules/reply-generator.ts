import "server-only";
import { EmailService } from "@/server/services/email-service";
import type { EmailThread } from "@/lib/email-normalizer";
import { AIContextBuilder } from "../context-builder";
import { AIService } from "../ai-service";
import type { ReplyTone } from "./types";

export interface GeneratedReplyDraft {
  subject: string;
  body: string;
  isDraft: true;
  tone: ReplyTone;
}

export class ReplyGenerator {
  /**
   * Generates a tone-guided email reply draft based on thread context and user instructions.
   *
   * CRITICAL GUARANTEE:
   * AI NEVER sends emails automatically. The generated draft is returned to the caller
   * for manual user review, editing, and explicit human dispatch.
   */
  public static async generateReply(
    userId: string,
    messageId: string,
    tone: ReplyTone,
    prompt?: string,
    accountId?: string
  ): Promise<GeneratedReplyDraft> {
    const message = await EmailService.getMessage(userId, messageId, accountId);
    const thread = message.threadId
      ? await EmailService.getThread(userId, message.threadId, accountId)
      : null;
    const instruction = prompt ?? "Please draft a helpful response.";
    return this.generate(thread, instruction, tone);
  }

  public static async generate(
    thread: EmailThread | null,
    instruction: string,
    tone: ReplyTone
  ): Promise<GeneratedReplyDraft> {
    // 1. Privacy-Preserving Minimal Thread Context Extraction
    const context = thread
      ? AIContextBuilder.buildThreadContext(thread)
      : "No previous thread context (new message).";

    // 2. Supported Tone Specific Instructions
    const tonePrompts: Record<ReplyTone, string> = {
      Professional: "Maintain a polished, respectful, clear, and business-appropriate tone.",
      Friendly: "Use a warm, approachable, conversational, and encouraging tone.",
      Concise: "Keep the message brief, direct, to-the-point, and minimal.",
      Detailed: "Provide a comprehensive, clear, thorough, and well-explained response.",
      Formal: "Use elegant, highly formal, traditional business language.",
      Apologetic: "Express sincere empathy, polite acknowledgment, and genuine regret.",
      Persuasive: "Use compelling, influential, motivating, and action-oriented language.",
    };

    const toneInstruction = tonePrompts[tone] ?? tonePrompts.Professional;

    const subjectPrefix = thread?.subject
      ? thread.subject.toLowerCase().startsWith("re:")
        ? thread.subject
        : `Re: ${thread.subject}`
      : "Email Response";

    const fallbackBody = `Hi,\n\n[Tone: ${tone}]\n${instruction}\n\n[Note: Configure OPENAI_API_KEY for live GPT reply generation. Review and edit before sending.]`;

    // 3. System Prompt enforcing Human-in-the-Loop review and zero auto-send
    const systemPrompt = `You are an executive AI draft assistant. Generate an email reply draft according to the user's intent.

TONE REQUIREMENT:
${toneInstruction}

CRITICAL SECURITY & WORKFLOW POLICY:
- AI NEVER sends emails automatically under any circumstance.
- You are generating a preliminary DRAFT.
- Output ONLY the generated email text suitable for human editing prior to manual sending by the user.
- Do NOT include markdown code fences or auto-send commentary.`;

    const userPrompt = `CONTEXT THREAD:
${context}

USER INSTRUCTION:
${instruction}

Please generate the reply draft body text.`;

    const body = await AIService.complete(
      {
        systemPrompt,
        userPrompt,
        temperature: 0.7,
      },
      fallbackBody
    );

    return {
      subject: subjectPrefix,
      body: body.trim(),
      isDraft: true,
      tone,
    };
  }
}
