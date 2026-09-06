import "server-only";
import { db } from "@/server/db";
import { getCommunicationProvider } from "@/lib/communication-provider";
import type {
  ListParams,
  Draft,
} from "@/lib/communication-provider/types";

export class MailService {
  /**
   * Helper to retrieve the user's account and return a CommunicationProvider instance.
   */
  private static async getProviderForUser(userId: string, accountId?: string) {
    const account = accountId
      ? await db.account.findFirst({ where: { id: accountId, userId } })
      : await db.account.findFirst({ where: { userId } });

    if (!account) {
      throw new Error("No connected email account found for user.");
    }

    return getCommunicationProvider(account.accessToken);
  }

  /**
   * Returns metadata for all email accounts linked to the given user (never exposing access tokens).
   */
  static async getUserAccounts(userId: string) {
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

  static async listMessages(userId: string, accountId?: string, params?: ListParams) {
    const provider = await this.getProviderForUser(userId, accountId);
    return provider.listMessages(params);
  }

  static async getMessage(userId: string, messageId: string, accountId?: string) {
    const provider = await this.getProviderForUser(userId, accountId);
    return provider.getMessage(messageId);
  }

  static async getThread(userId: string, threadId: string, accountId?: string) {
    const provider = await this.getProviderForUser(userId, accountId);
    return provider.getThread(threadId);
  }

  static async searchMessages(userId: string, query: string, accountId?: string, params?: ListParams) {
    const provider = await this.getProviderForUser(userId, accountId);
    return provider.searchMessages(query, params);
  }

  static async sendMessage(userId: string, draft: Draft, accountId?: string) {
    const provider = await this.getProviderForUser(userId, accountId);
    return provider.sendMessage(draft);
  }

  static async createDraft(userId: string, draft: Draft, accountId?: string) {
    const provider = await this.getProviderForUser(userId, accountId);
    return provider.createDraft(draft);
  }

  static async updateDraft(userId: string, draftId: string, draft: Draft, accountId?: string) {
    const provider = await this.getProviderForUser(userId, accountId);
    return provider.updateDraft(draftId, draft);
  }

  static async listContacts(userId: string, accountId?: string, params?: ListParams) {
    const provider = await this.getProviderForUser(userId, accountId);
    return provider.listContacts(params);
  }

  static async listCalendarEvents(userId: string, accountId?: string, params?: ListParams) {
    const provider = await this.getProviderForUser(userId, accountId);
    return provider.listCalendarEvents(params);
  }
}
