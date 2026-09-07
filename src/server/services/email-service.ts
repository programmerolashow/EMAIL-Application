import "server-only";
import { MailService } from "./mail-service";
import type { ListParams, Draft } from "@/lib/communication-provider/types";

/**
 * Backward compatibility wrapper delegating to the central MailService.
 */
export class EmailService {
  static async getInbox(userId: string, accountId?: string, params?: ListParams) {
    return MailService.getInbox(userId, accountId, params);
  }

  static async getMessage(userId: string, messageId: string, accountId?: string) {
    return MailService.getMessage(userId, messageId, accountId);
  }

  static async getThread(userId: string, threadId: string, accountId?: string) {
    return MailService.getThread(userId, threadId, accountId);
  }

  static async searchEmails(userId: string, query: string, accountId?: string, params?: ListParams) {
    return MailService.searchMail(userId, query, accountId, params);
  }

  static async sendEmail(userId: string, draft: Draft, accountId?: string) {
    return MailService.sendMail(userId, draft, accountId);
  }

  static async createDraft(userId: string, draft: Draft, accountId?: string) {
    return MailService.createDraft(userId, draft, accountId);
  }

  static async updateDraft(userId: string, draftId: string, draft: Draft, accountId?: string) {
    return MailService.updateDraft(userId, draftId, draft, accountId);
  }

  static async deleteDraft(userId: string, draftId: string, accountId?: string) {
    return MailService.deleteDraft(userId, draftId, accountId);
  }

  static async markRead(userId: string, messageId: string, isRead: boolean, accountId?: string) {
    return MailService.markAsRead(userId, messageId, isRead, accountId);
  }

  static async archive(userId: string, messageId: string, accountId?: string) {
    return MailService.archiveMessage(userId, messageId, accountId);
  }
}
