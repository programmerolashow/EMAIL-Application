import "server-only";
import type { EmailThread, NormalizedMessage, Participant } from "@/lib/email-normalizer";
import { EmailService } from "@/server/services/email-service";

export interface MinimalParticipant {
  name?: string;
  address: string;
}

export interface MinimalMessageContext {
  subject: string;
  sender: string;
  recipients: string;
  date: string;
  body: string;
}

export interface RelevantContextResult {
  systemPrompt: string;
  userPrompt: string;
  resolvedEntity?: string;
  messagesIncludedCount: number;
}

export class AIContextBuilder {
  private static readonly MAX_BODY_LENGTH_PER_MSG = 600;
  private static readonly MAX_MESSAGES_PER_THREAD = 4;
  private static readonly MAX_TOTAL_CONTEXT_CHARS = 1800;

  /**
   * Stage 3 & Stage 4: Content Sanitization Pipeline.
   * Strips HTML tags, script/style blocks, base64 images, long URLs, and potential secrets/credentials.
   */
  public static sanitizeText(text: string, maxLength = this.MAX_BODY_LENGTH_PER_MSG): string {
    if (!text) return "";

    const cleaned = text
      // Remove HTML style and script blocks
      .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
      .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
      // Strip HTML tags
      .replace(/<[^>]+>/g, " ")
      // Remove inline base64 data URLs
      .replace(/data:image\/[a-zA-Z]+;base64,[a-zA-Z0-9+/=]+/g, "[image-data]")
      // Truncate long URLs to prevent token bloat
      .replace(/https?:\/\/\S+/g, (url) => (url.length > 50 ? `${url.slice(0, 47)}...` : url))
      // Mask potential secret/credential patterns (Bearer tokens, API keys, basic auth)
      .replace(/Bearer\s+[a-zA-Z0-9-._~+/]+=*/gi, "Bearer [redacted-token]")
      .replace(/sk-[a-zA-Z0-9]{20,}/g, "[redacted-api-key]")
      .replace(/\s+/g, " ")
      .trim();

    return cleaned.length > maxLength ? `${cleaned.slice(0, maxLength)}... [truncated]` : cleaned;
  }

  /**
   * Stage 1 & Stage 2: Extract Relevant Information & Omit Unnecessary Metadata.
   * Formats participants into privacy-safe string representation, omitting internal DB IDs.
   */
  public static formatParticipant(participant?: Participant | MinimalParticipant): string {
    if (!participant?.address) return "Unknown";
    return participant.name ? `${participant.name} <${participant.address}>` : participant.address;
  }

  /**
   * Stage 1 & Stage 2: Extracts ONLY the minimal fields required from a single NormalizedMessage.
   * Strips DB IDs, access tokens, provider metadata, raw headers, and internal flags.
   */
  public static extractMinimalMessage(msg: NormalizedMessage): MinimalMessageContext {
    const sender = this.formatParticipant(msg.from);
    const recipientsList = (msg.to ?? [])
      .map((p) => this.formatParticipant(p))
      .filter(Boolean)
      .join(", ");

    return {
      subject: this.sanitizeText(msg.subject || "No Subject", 100),
      sender,
      recipients: recipientsList || "Undisclosed Recipients",
      date: msg.receivedAt || msg.sentAt || "Unknown Date",
      body: this.sanitizeText(msg.body || msg.snippet, this.MAX_BODY_LENGTH_PER_MSG),
    };
  }

  /**
   * Stage 4 & Stage 5: Limit Context Size & Build Minimal Thread Context.
   * Applies character budget caps and message limits so OpenAI receives minimum necessary context.
   */
  public static buildThreadContext(thread: EmailThread): string {
    const participantsList = thread.participants
      .map((p) => this.formatParticipant(p))
      .filter(Boolean)
      .join(", ");

    // Take only the most recent N messages in thread to enforce context budget
    const recentMessages = thread.messages.slice(-this.MAX_MESSAGES_PER_THREAD);

    let currentLength = 0;
    const formattedMessages: string[] = [];

    for (let i = 0; i < recentMessages.length; i++) {
      const msg = recentMessages[i];
      if (!msg) continue;

      const minimal = this.extractMinimalMessage(msg);
      const entry = `[Msg ${i + 1}] Date: ${minimal.date} | From: ${minimal.sender}\nBody: ${minimal.body}`;

      if (currentLength + entry.length > this.MAX_TOTAL_CONTEXT_CHARS) {
        formattedMessages.push("[Remaining older messages truncated for privacy & token efficiency]");
        break;
      }

      formattedMessages.push(entry);
      currentLength += entry.length;
    }

    return `THREAD SUBJECT: ${this.sanitizeText(thread.subject || "No Subject", 100)}
PARTICIPANTS: ${participantsList}
TOTAL MESSAGES: ${thread.metadata.messageCount}

RELEVANT MESSAGES:
${formattedMessages.join("\n---\n")}`;
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

    const words = prompt
      .replace(/[^\w\s]/gi, "")
      .split(/\s+/)
      .filter((w) => w.length > 3 && !["summarize", "recent", "conversations", "emails", "messages", "show", "find"].includes(w.toLowerCase()));

    return words[0] ?? null;
  }

  /**
   * Main Privacy Pipeline:
   * Entity Resolution -> Filtered Retrieval -> Data Minimization -> Token Budget Enforcement.
   */
  public static async buildFilteredContextForPrompt(
    userId: string,
    userPrompt: string,
    accountId?: string
  ): Promise<RelevantContextResult> {
    const entity = this.resolveEntityOrKeywords(userPrompt);
    let messages: NormalizedMessage[] = [];

    if (entity) {
      const searchResult = await EmailService.searchEmails(userId, entity, accountId, { limit: 4 });
      messages = searchResult.items;
    } else {
      const inboxResult = await EmailService.getInbox(userId, accountId, { limit: 4 });
      messages = inboxResult.items;
    }

    let accumulatedLength = 0;
    const formattedList: string[] = [];

    for (let idx = 0; idx < messages.length; idx++) {
      const msg = messages[idx];
      if (!msg) continue;

      const minimal = this.extractMinimalMessage(msg);
      const entry = `[Email ${idx + 1}] Subject: ${minimal.subject} | From: ${minimal.sender} | Date: ${minimal.date}\nContent: ${minimal.body}`;

      if (accumulatedLength + entry.length > this.MAX_TOTAL_CONTEXT_CHARS) {
        formattedList.push("[Additional emails omitted to enforce context budget & privacy]");
        break;
      }

      formattedList.push(entry);
      accumulatedLength += entry.length;
    }

    const minimalContext = `RESOLVED ENTITY: ${entity ?? "General Inbox"}
MATCHING MESSAGES (${messages.length}):
${formattedList.length > 0 ? formattedList.join("\n\n") : "No matching emails found."}`;

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
