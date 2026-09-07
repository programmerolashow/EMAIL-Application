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
  type NormalizedThread,
} from "@/lib/email-normalizer";

export interface ActionSuccessResponse {
  success: boolean;
  id?: string;
}

export class MailService {
  /**
   * Private helper to authenticate user, resolve connected account from database,
   * and return CommunicationProvider instance along with account metadata.
   */
  private static async getProviderAndAccount(userId: string, accountId?: string) {
    if (!userId) {
      throw new Error("Unauthorized: User identity is required.");
    }

    const account = accountId
      ? await db.account.findFirst({ where: { id: accountId, userId } })
      : await db.account.findFirst({ where: { userId } });

    if (!account) {
      throw new Error("No connected email account found for this user.");
    }

    try {
      const provider = getCommunicationProvider(account.accessToken);
      return { account, provider };
    } catch (err) {
      console.error(`[MailService] Failed to initialize provider for account ${account.id}:`, err);
      throw new Error("Failed to initialize email provider for the connected account.");
    }
  }

  /**
   * Returns metadata for all email accounts linked to the given user (never exposing access tokens).
   */
  static async getUserAccounts(userId: string) {
    if (!userId) throw new Error("Unauthorized");
    return db.account.findMany({
      where: { userId },
      select: {
        id: true,
        email: true,
        name: true,
        provider: true,
        providerAccountId: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  /**
   * Fetches inbox emails for the authenticated user, returning normalized cursor-paginated messages.
   */
  static async getInbox(
    userId: string,
    accountId?: string,
    params?: ListParams
  ): Promise<CursorPaginatedResponse<NormalizedMessage>> {
    try {
      const { provider } = await this.getProviderAndAccount(userId, accountId);
      const result = await provider.listMessages(params);

      return {
        items: result.messages.map(normalizeMessage),
        nextCursor: result.nextPageToken,
        hasMore: Boolean(result.nextPageToken),
      };
    } catch (error) {
      console.error("[MailService.getInbox] Provider error:", error);
      throw new Error(error instanceof Error ? error.message : "Failed to retrieve inbox emails.");
    }
  }

  /**
   * Fetches an email thread by ID, returning a normalized thread with calculated messageCount, unreadCount, and participants.
   */
  static async getThread(userId: string, threadId: string, accountId?: string): Promise<NormalizedThread> {
    try {
      const { account, provider } = await this.getProviderAndAccount(userId, accountId);
      const rawThread = await provider.getThread(threadId);
      return normalizeThread(rawThread, account.provider ?? "Email");
    } catch (error) {
      console.error(`[MailService.getThread] Provider error [threadId=${threadId}]:`, error);
      throw new Error(error instanceof Error ? error.message : "Failed to retrieve email thread.");
    }
  }

  /**
   * Fetches a single message by ID, returning a normalized representation.
   */
  static async getMessage(userId: string, messageId: string, accountId?: string): Promise<NormalizedMessage> {
    try {
      const { provider } = await this.getProviderAndAccount(userId, accountId);
      const rawMessage = await provider.getMessage(messageId);
      return normalizeMessage(rawMessage);
    } catch (error) {
      console.error(`[MailService.getMessage] Provider error [messageId=${messageId}]:`, error);
      throw new Error(error instanceof Error ? error.message : "Failed to retrieve email message.");
    }
  }

  /**
   * Searches emails by query string, returning normalized cursor-paginated results.
   */
  static async searchMail(
    userId: string,
    query: string,
    accountId?: string,
    params?: ListParams
  ): Promise<CursorPaginatedResponse<NormalizedMessage>> {
    try {
      const { provider } = await this.getProviderAndAccount(userId, accountId);
      const result = await provider.searchMessages(query, params);

      return {
        items: result.messages.map(normalizeMessage),
        nextCursor: result.nextPageToken,
        hasMore: Boolean(result.nextPageToken),
      };
    } catch (error) {
      console.error(`[MailService.searchMail] Provider error [query=${query}]:`, error);
      throw new Error(error instanceof Error ? error.message : "Failed to search emails.");
    }
  }

  /** Alias for searchMail for backward compatibility */
  static async searchMessages(userId: string, query: string, accountId?: string, params?: ListParams) {
    return this.searchMail(userId, query, accountId, params);
  }

  /**
   * Sends an email message.
   */
  static async sendMail(userId: string, draft: Draft, accountId?: string): Promise<{ id: string }> {
    try {
      const { provider } = await this.getProviderAndAccount(userId, accountId);
      return await provider.sendMessage(draft);
    } catch (error) {
      console.error("[MailService.sendMail] Provider error:", error);
      throw new Error(error instanceof Error ? error.message : "Failed to send email.");
    }
  }

  /** Alias for sendMail for backward compatibility */
  static async sendMessage(userId: string, draft: Draft, accountId?: string) {
    return this.sendMail(userId, draft, accountId);
  }

  /**
   * Creates a draft email.
   */
  static async createDraft(userId: string, draft: Draft, accountId?: string): Promise<{ id: string }> {
    try {
      const { provider } = await this.getProviderAndAccount(userId, accountId);
      return await provider.createDraft(draft);
    } catch (error) {
      console.error("[MailService.createDraft] Provider error:", error);
      throw new Error(error instanceof Error ? error.message : "Failed to create draft.");
    }
  }

  /**
   * Updates an existing draft.
   */
  static async updateDraft(userId: string, draftId: string, draft: Draft, accountId?: string): Promise<{ id: string }> {
    try {
      const { provider } = await this.getProviderAndAccount(userId, accountId);
      return await provider.updateDraft(draftId, draft);
    } catch (error) {
      console.error(`[MailService.updateDraft] Provider error [draftId=${draftId}]:`, error);
      throw new Error(error instanceof Error ? error.message : "Failed to update draft.");
    }
  }

  /**
   * Deletes a draft email.
   */
  static async deleteDraft(userId: string, draftId: string, accountId?: string): Promise<ActionSuccessResponse> {
    try {
      const { provider } = await this.getProviderAndAccount(userId, accountId);
      return await provider.deleteDraft(draftId);
    } catch (error) {
      console.error(`[MailService.deleteDraft] Provider error [draftId=${draftId}]:`, error);
      throw new Error(error instanceof Error ? error.message : "Failed to delete draft.");
    }
  }

  /**
   * Marks an email message as read or unread.
   */
  static async markAsRead(userId: string, messageId: string, isRead: boolean, accountId?: string): Promise<ActionSuccessResponse> {
    try {
      const { provider } = await this.getProviderAndAccount(userId, accountId);
      return await provider.markRead(messageId, isRead);
    } catch (error) {
      console.error(`[MailService.markAsRead] Provider error [messageId=${messageId}]:`, error);
      throw new Error(error instanceof Error ? error.message : "Failed to update read status.");
    }
  }

  /** Alias for markAsRead for backward compatibility */
  static async markRead(userId: string, messageId: string, isRead: boolean, accountId?: string) {
    return this.markAsRead(userId, messageId, isRead, accountId);
  }

  /**
   * Archives an email message.
   */
  static async archiveMessage(userId: string, messageId: string, accountId?: string): Promise<ActionSuccessResponse> {
    try {
      const { provider } = await this.getProviderAndAccount(userId, accountId);
      return await provider.archive(messageId);
    } catch (error) {
      console.error(`[MailService.archiveMessage] Provider error [messageId=${messageId}]:`, error);
      throw new Error(error instanceof Error ? error.message : "Failed to archive email.");
    }
  }

  /** Alias for archiveMessage for backward compatibility */
  static async archive(userId: string, messageId: string, accountId?: string) {
    return this.archiveMessage(userId, messageId, accountId);
  }

  /**
   * Fetches user contacts.
   */
  static async listContacts(userId: string, accountId?: string, params?: ListParams) {
    try {
      const { provider } = await this.getProviderAndAccount(userId, accountId);
      return await provider.listContacts(params);
    } catch (error) {
      console.error("[MailService.listContacts] Provider error:", error);
      throw new Error(error instanceof Error ? error.message : "Failed to retrieve contacts.");
    }
  }

  /**
   * Fetches calendar events.
   */
  static async listCalendarEvents(userId: string, accountId?: string, params?: ListParams) {
    try {
      const { provider } = await this.getProviderAndAccount(userId, accountId);
      return await provider.listCalendarEvents(params);
    } catch (error) {
      console.error("[MailService.listCalendarEvents] Provider error:", error);
      throw new Error(error instanceof Error ? error.message : "Failed to retrieve calendar events.");
    }
  }
}
