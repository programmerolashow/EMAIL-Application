import "server-only";
import { EmailService } from "@/server/services/email-service";
import type { EmailThread } from "@/lib/email-normalizer";
import { AIContextBuilder } from "../context-builder";
import { AIService } from "../ai-service";
import type { ReplyTone } from "./types";

export class ReplyGenerator {
  public static async generateReply(
    userId: string,
    messageId: string,
    tone: ReplyTone,
    prompt?: string,
    accountId?: string
  ): Promise<{ subject: string; body: string }> {
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
  ): Promise<{ subject: string; body: string }> {
    const context = thread ? AIContextBuilder.buildThreadContext(thread) : "No previous thread context (new message).";

    const tonePrompts: Record<ReplyTone, string> = {
      Professional: "Maintain a polished, respectful, and business-appropriate tone.",
      Friendly: "Use a warm, approachable, conversational, and friendly tone.",
      Concise: "Keep the message brief, direct, to-the-point, and minimal.",
      Detailed: "Provide a comprehensive, clear, and thoroughly detailed response.",
      Formal: "Use elegant, highly formal, traditional business language.",
      Apologetic: "Express sincere empathy, acknowledgment, and polite regret.",
      Persuasive: "Use compelling, influential, motivating, and persuasive language.",
    };

    const toneInstruction = tonePrompts[tone] ?? tonePrompts.Professional;

    const subjectPrefix = thread?.subject
      ? thread.subject.toLowerCase().startsWith("re:")
        ? thread.subject
        : `Re: ${thread.subject}`
      : "Email Response";

    const fallbackBody = `Hi,\n\n[Tone: ${tone}]\n${instruction}\n\n[Note: Configure OPENAI_API_KEY for live GPT reply generation. Review and edit before sending.]`;

    const systemPrompt = `You are an AI draft assistant. Generate an email reply according to the user's intent.
TONE REQUIREMENT: ${toneInstruction}

IMPORTANT POLICY:
Do NOT include any auto-send commands. Return ONLY the generated email text suitable for human editing prior to manual sending.`;

    const userPrompt = `CONTEXT THREAD:
${context}

USER INSTRUCTION:
${instruction}

Please generate the reply draft body.`;

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
    };
  }
}
