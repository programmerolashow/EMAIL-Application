import "server-only";
import type { EmailThread, NormalizedMessage } from "@/lib/email-normalizer";

export class AIContextBuilder {
  /**
   * Constructs a clean, structured context string representation of an EmailThread for LLM consumption.
   */
  static buildThreadContext(thread: EmailThread): string {
    const participantsList = thread.participants
      .map((p) => (p.name ? `${p.name} <${p.address}>` : p.address))
      .join(", ");

    const formattedMessages = thread.messages
      .map((msg: NormalizedMessage, index: number) => {
        const sender = msg.from.name ? `${msg.from.name} <${msg.from.address}>` : msg.from.address;
        return `[Message ${index + 1}]
From: ${sender}
Date: ${msg.receivedAt}
Subject: ${msg.subject}

${msg.body}
--------------------------------------------------`;
      })
      .join("\n\n");

    return `THREAD SUBJECT: ${thread.subject}
THREAD PARTICIPANTS: ${participantsList}
TOTAL MESSAGES: ${thread.metadata.messageCount}

${formattedMessages}`;
  }

  /**
   * Builds OpenAI chat completion prompt messages for thread summarization.
   */
  static buildSummaryPrompt(thread: EmailThread) {
    const context = this.buildThreadContext(thread);
    return {
      system: "You are an executive email assistant. Summarize the provided email thread concisely into 3 bullet points highlighting key decisions, action items, and next steps.",
      user: `Please summarize the following email thread:\n\n${context}`,
    };
  }

  /**
   * Builds OpenAI chat completion prompt messages for AI email drafting / smart reply.
   */
  static buildDraftPrompt(thread: EmailThread | null, instruction: string) {
    const context = thread ? this.buildThreadContext(thread) : "No previous thread context (new email).";

    return {
      system: "You are a professional email assistant. Generate a clear, polite, and effective email response based on the user's instructions and previous thread context.",
      user: `CONTEXT THREAD:
${context}

USER INSTRUCTION:
${instruction}

Please write the email draft.`,
    };
  }
}
