import "server-only";
import { db } from "@/server/db";
import { getCommunicationProvider } from "@/lib/communication-provider";
import type {
  ListParams,
  Message,
  Thread,
  Draft,
} from "@/lib/communication-provider/types";

export interface InboxResponse {
  messages: Message[];
  nextPageToken?: string;
}

export interface SearchResponse {
  messages: Message[];
  nextPageToken?: string;
}

export interface ActionSuccessResponse {
  success: boolean;
  id?: string;
}

export class EmailService {
  /**
   * Helper to retrieve the user's account and return a CommunicationProvider instance.
   */
  private static async getProvider(userId: string, accountId?: string) {
    const account = accountId
      ? await db.account.findFirst({ where: { id: accountId, userId } })
      : await db.account.findFirst({ where: { userId } });

    if (!account) {
      throw new Error("No connected email account found for user.");
    }

    return getCommunicationProvider(account.accessToken);
  }

  /**
   * Fetches inbox emails for the given user.
   */
  static async getInbox(userId: string, accountId?: string, params?: ListParams): Promise<InboxResponse> {
    const provider = await this.getProvider(userId, accountId);
    return provider.listMessages(params);
  }

  /**
   * Fetches a single message by ID.
   */
  static async getMessage(userId: string, messageId: string, accountId?: string): Promise<Message> {
    const provider = await this.getProvider(userId, accountId);
    return provider.getMessage(messageId);
  }

  /**
   * Fetches an email thread by ID.
   */
  static async getThread(userId: string, threadId: string, accountId?: string): Promise<Thread> {
    const provider = await this.getProvider(userId, accountId);
    return provider.getThread(threadId);
  }

  /**
   * Searches emails by query string.
   */
  static async searchEmails(userId: string, query: string, accountId?: string, params?: ListParams): Promise<SearchResponse> {
    const provider = await this.getProvider(userId, accountId);
    return provider.searchMessages(query, params);
  }

  /**
   * Sends an email message.
   */
  static async sendEmail(userId: string, draft: Draft, accountId?: string): Promise<{ id: string }> {
    const provider = await this.getProvider(userId, accountId);
    return provider.sendMessage(draft);
  }

  /**
   * Creates a draft email.
   */
  static async createDraft(userId: string, draft: Draft, accountId?: string): Promise<{ id: string }> {
    const provider = await this.getProvider(userId, accountId);
    return provider.createDraft(draft);
  }

  /**
   * Updates an existing draft.
   */
  static async updateDraft(userId: string, draftId: string, draft: Draft, accountId?: string): Promise<{ id: string }> {
    const provider = await this.getProvider(userId, accountId);
    return provider.updateDraft(draftId, draft);
  }

  /**
   * Deletes a draft email.
   */
  static async deleteDraft(userId: string, draftId: string, accountId?: string): Promise<ActionSuccessResponse> {
    const provider = await this.getProvider(userId, accountId);
    return provider.deleteDraft(draftId);
  }

  /**
   * Marks an email message as read or unread.
   */
  static async markRead(userId: string, messageId: string, isRead: boolean, accountId?: string): Promise<ActionSuccessResponse> {
    const provider = await this.getProvider(userId, accountId);
    return provider.markRead(messageId, isRead);
  }

  /**
   * Archives an email message.
   */
  static async archive(userId: string, messageId: string, accountId?: string): Promise<ActionSuccessResponse> {
    const provider = await this.getProvider(userId, accountId);
    return provider.archive(messageId);
  }
}
