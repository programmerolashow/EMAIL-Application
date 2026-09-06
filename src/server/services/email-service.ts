import "server-only";
import { db } from "@/server/db";
import { getCommunicationProvider } from "@/lib/communication-provider";
import type {
  ListParams,
  Draft,
  CursorPaginatedResponse,
} from "@/lib/communication-provider/types";
import {
  normalizeMessage,
  normalizeThread,
  type NormalizedMessage,
  type EmailThread,
} from "@/lib/email-normalizer";

export interface ActionSuccessResponse {
  success: boolean;
  id?: string;
}

export class EmailService {
  /**
   * Helper to retrieve the user's account and return a CommunicationProvider instance along with account metadata.
   */
  private static async getAccountAndProvider(userId: string, accountId?: string) {
    const account = accountId
      ? await db.account.findFirst({ where: { id: accountId, userId } })
      : await db.account.findFirst({ where: { userId } });

    if (!account) {
      throw new Error("No connected email account found for user.");
    }

    return {
      account,
      provider: getCommunicationProvider(account.accessToken),
    };
  }

  /**
   * Fetches inbox emails for the given user, returning a cursor-paginated response.
   */
  static async getInbox(
    userId: string,
    accountId?: string,
    params?: ListParams
  ): Promise<CursorPaginatedResponse<NormalizedMessage>> {
    const { provider } = await this.getAccountAndProvider(userId, accountId);
    const result = await provider.listMessages(params);

    return {
      items: result.messages.map(normalizeMessage),
      nextCursor: result.nextPageToken,
      hasMore: Boolean(result.nextPageToken),
    };
  }

  /**
   * Fetches a single message by ID, returning a normalized representation.
   */
  static async getMessage(userId: string, messageId: string, accountId?: string): Promise<NormalizedMessage> {
    const { provider } = await this.getAccountAndProvider(userId, accountId);
    const rawMessage = await provider.getMessage(messageId);
    return normalizeMessage(rawMessage);
  }

  /**
   * Fetches an email thread by ID, returning a normalized EmailThread entity.
   */
  static async getThread(userId: string, threadId: string, accountId?: string): Promise<EmailThread> {
    const { account, provider } = await this.getAccountAndProvider(userId, accountId);
    const rawThread = await provider.getThread(threadId);
    return normalizeThread(rawThread, account.provider ?? "Email");
  }

  /**
   * Searches emails by query string, returning a cursor-paginated response.
   */
  static async searchEmails(
    userId: string,
    query: string,
    accountId?: string,
    params?: ListParams
  ): Promise<CursorPaginatedResponse<NormalizedMessage>> {
    const { provider } = await this.getAccountAndProvider(userId, accountId);
    const result = await provider.searchMessages(query, params);

    return {
      items: result.messages.map(normalizeMessage),
      nextCursor: result.nextPageToken,
      hasMore: Boolean(result.nextPageToken),
    };
  }

  /**
   * Sends an email message.
   */
  static async sendEmail(userId: string, draft: Draft, accountId?: string): Promise<{ id: string }> {
    const { provider } = await this.getAccountAndProvider(userId, accountId);
    return provider.sendMessage(draft);
  }

  /**
   * Creates a draft email.
   */
  static async createDraft(userId: string, draft: Draft, accountId?: string): Promise<{ id: string }> {
    const { provider } = await this.getAccountAndProvider(userId, accountId);
    return provider.createDraft(draft);
  }

  /**
   * Updates an existing draft.
   */
  static async updateDraft(userId: string, draftId: string, draft: Draft, accountId?: string): Promise<{ id: string }> {
    const { provider } = await this.getAccountAndProvider(userId, accountId);
    return provider.updateDraft(draftId, draft);
  }

  /**
   * Deletes a draft email.
   */
  static async deleteDraft(userId: string, draftId: string, accountId?: string): Promise<ActionSuccessResponse> {
    const { provider } = await this.getAccountAndProvider(userId, accountId);
    return provider.deleteDraft(draftId);
  }

  /**
   * Marks an email message as read or unread.
   */
  static async markRead(userId: string, messageId: string, isRead: boolean, accountId?: string): Promise<ActionSuccessResponse> {
    const { provider } = await this.getAccountAndProvider(userId, accountId);
    return provider.markRead(messageId, isRead);
  }

  /**
   * Archives an email message.
   */
  static async archive(userId: string, messageId: string, accountId?: string): Promise<ActionSuccessResponse> {
    const { provider } = await this.getAccountAndProvider(userId, accountId);
    return provider.archive(messageId);
  }
}
