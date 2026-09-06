import "server-only";
import type { EmailThread, NormalizedMessage } from "@/lib/email-normalizer";
import { EmailService } from "@/server/services/email-service";

export interface RelevantContextResult {
  systemPrompt: string;
  userPrompt: string;
  resolvedEntity?: string;
  messagesIncludedCount: number;
}

export class AIContextBuilder {
  /**
   * Sanitizes text content by stripping HTML tags, inline base64 images, tracking artifacts,
   * and truncating to max length to ensure privacy and token budget efficiency.
   */
  public static sanitizeText(text: string, maxLength = 800): string {
    if (!text) return "";

    const cleaned = text
      .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
      .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
      .replace(/<[^>]+>/g, " ") // Strip HTML tags
      .replace(/data:image\/[a-zA-Z]+;base64,[a-zA-Z0-9+/=]+/g, "[image-data]") // Remove base64 images
      .replace(/https?:\/\/\S+/g, (url) => (url.length > 50 ? `${url.slice(0, 47)}...` : url)) // Truncate long URLs
      .replace(/\s+/g, " ")
      .trim();

    return cleaned.length > maxLength ? `${cleaned.slice(0, maxLength)}... [truncated]` : cleaned;
  }

  /**
   * Resolves target person names, email addresses, or key search terms from a user prompt.
   * Example: "Summarize my recent conversations with John" -> "John"
   */
  public static resolveEntityOrKeywords(prompt: string): string | null {
    const withMatch = /(?:with|from|to|about)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)/i.exec(prompt);
    if (withMatch?.[1]) {
      return withMatch[1].trim();
    }

    const emailMatch = /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/.exec(prompt);
    if (emailMatch?.[1]) {
      return emailMatch[1].trim();
    }

    // Fallback: extract main non-stop words
    const words = prompt
      .replace(/[^\w\s]/gi, "")
      .split(/\s+/)
      .filter((w) => w.length > 3 && !["summarize", "recent", "conversations", "emails", "messages", "show", "find"].includes(w.toLowerCase()));

    return words[0] ?? null;
  }

  /**
   * Builds minimum necessary structured context for an EmailThread.
   */
  public static buildThreadContext(thread: EmailThread): string {
    const participantsList = thread.participants
      .map((p) => (p.name ? `${p.name} <${p.address}>` : p.address))
      .filter(Boolean)
      .join(", ");

    const formattedMessages = thread.messages
      .slice(-5) // Include max 5 recent messages in thread
      .map((msg: NormalizedMessage, index: number) => {
        const sender = msg.from.name ? `${msg.from.name} <${msg.from.address}>` : msg.from.address;
        const cleanBody = this.sanitizeText(msg.body, 600);

        return `[Msg ${index + 1}] Date: ${msg.receivedAt} | From: ${sender}
Snippet: ${cleanBody}`;
      })
      .join("\n---\n");

    return `THREAD SUBJECT: ${this.sanitizeText(thread.subject, 100)}
PARTICIPANTS: ${participantsList}
TOTAL MESSAGES IN THREAD: ${thread.metadata.messageCount}

RELEVANT MESSAGES:
${formattedMessages}`;
  }

  /**
   * Main Pipeline: Resolves entity -> Retrieves relevant emails -> Sanitizes & filters -> Builds minimum necessary context.
   */
  public static async buildFilteredContextForPrompt(
    userId: string,
    userPrompt: string,
    accountId?: string
  ): Promise<RelevantContextResult> {
    const entity = this.resolveEntityOrKeywords(userPrompt);
    let messages: NormalizedMessage[] = [];

    if (entity) {
      // 1. Search only for relevant emails matching resolved entity/keyword
      const searchResult = await EmailService.searchEmails(userId, entity, accountId, { limit: 5 });
      messages = searchResult.items;
    } else {
      // 2. Fallback: fetch recent inbox items (max 5)
      const inboxResult = await EmailService.getInbox(userId, accountId, { limit: 5 });
      messages = inboxResult.items;
    }

    // 3. Filter unnecessary data & build minimal structured context
    const formattedList = messages
      .map((msg, idx) => {
        const sender = msg.from.name ? `${msg.from.name} <${msg.from.address}>` : msg.from.address;
        const bodySnippet = this.sanitizeText(msg.body || msg.snippet, 400);
        return `[Email ${idx + 1}] Subject: ${msg.subject} | From: ${sender} | Date: ${msg.receivedAt}
Content: ${bodySnippet}`;
      })
      .join("\n\n");

    const minimalContext = `RESOLVED ENTITY: ${entity ?? "General Inbox"}
MATCHING MESSAGES (${messages.length}):
${formattedList.length > 0 ? formattedList : "No matching emails found."}`;

    return {
      systemPrompt: "You are a privacy-preserving executive email assistant. Rely strictly on the provided minimal context to answer the user request. Do not hallucinate external details.",
      userPrompt: `MINIMAL RELEVANT CONTEXT:
${minimalContext}

USER REQUEST:
${userPrompt}`,
      resolvedEntity: entity ?? undefined,
      messagesIncludedCount: messages.length,
    };
  }

  /**
   * Builds OpenAI chat completion prompt messages for thread summarization.
   */
  public static buildSummaryPrompt(thread: EmailThread) {
    const context = this.buildThreadContext(thread);
    return {
      system: "You are a privacy-focused executive email assistant. Summarize the provided email thread concisely into 3 bullet points highlighting key decisions, action items, and next steps.",
      user: `Please summarize the following email thread:\n\n${context}`,
    };
  }

  /**
   * Builds OpenAI chat completion prompt messages for AI email drafting / smart reply.
   */
  public static buildDraftPrompt(thread: EmailThread | null, instruction: string) {
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
