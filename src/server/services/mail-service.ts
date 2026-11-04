import "server-only";
import { db } from "@/server/db";
import { getCommunicationProvider } from "@/lib/communication-provider";
import { getAccount } from "@/lib/nylas";
import type {
  CommunicationProvider,
  ListParams,
  Draft,
  CursorPaginatedResponse,
  Folder,
  FolderRole,
  Message,
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

/** Folder as returned to the client. `key` is what the client sends back as `folderId`. */
export interface MailFolder {
  key: string;
  name: string;
  role?: FolderRole;
  isCategory?: boolean;
  unreadCount: number;
  totalCount: number;
}

/** Connected account; `grantId` is the Nylas grant used for every API call. */
type AccountRow = { id: string; email: string; provider: string | null; grantId: string };

const ROLE_KEYS: FolderRole[] = [
  "inbox",
  "starred",
  "important",
  "sent",
  "drafts",
  "all",
  "spam",
  "trash",
  "archive",
];

const ROLE_LABELS: Record<FolderRole, string> = {
  inbox: "Inbox",
  starred: "Starred",
  important: "Important",
  sent: "Sent",
  drafts: "Drafts",
  all: "All Mail",
  spam: "Spam",
  trash: "Trash",
  archive: "Archive",
};

const isRoleKey = (value: string): value is FolderRole =>
  (ROLE_KEYS as string[]).includes(value);

/** Folder lists change rarely; cache per grant briefly to avoid an extra Nylas call per page. */
const FOLDER_CACHE_TTL_MS = 60 * 1000;
const folderCache = new Map<string, { at: number; folders: Folder[] }>();

/** Grant status rarely changes; check it at most every few minutes per grant. */
const GRANT_HEALTH_TTL_MS = 5 * 60 * 1000;
const grantHealthCache = new Map<
  string,
  { at: number; value: { status: "valid" | "invalid" | "unknown"; connector?: string } }
>();

/**
 * Composite cursor for unified ("All Inboxes") views: one Nylas page token per account.
 * `null` marks an account whose results are exhausted.
 */
type CompositeCursor = Record<string, string | null>;

const encodeCursor = (cursor: CompositeCursor): string =>
  Buffer.from(JSON.stringify(cursor), "utf8").toString("base64url");

const decodeCursor = (raw?: string): CompositeCursor | undefined => {
  if (!raw) return undefined;
  try {
    const parsed = JSON.parse(Buffer.from(raw, "base64url").toString("utf8")) as unknown;
    return parsed && typeof parsed === "object" ? (parsed as CompositeCursor) : undefined;
  } catch {
    return undefined;
  }
};

const byNewest = (a: NormalizedMessage, b: NormalizedMessage) =>
  (b.receivedAt ?? "").localeCompare(a.receivedAt ?? "");

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
      : await db.account.findFirst({ where: { userId }, orderBy: { createdAt: "asc" } });

    if (!account) {
      throw new Error("No connected email account found for this user.");
    }

    try {
      // The Account row id is the Nylas grant id.
      const provider = getCommunicationProvider(account.providerAccountId ?? account.id);
      return { account, provider };
    } catch (err) {
      console.error(`[MailService] Failed to initialize provider for account ${account.id}:`, err);
      throw new Error("Failed to initialize email provider for the connected account.");
    }
  }

  private static async getAllAccounts(userId: string): Promise<AccountRow[]> {
    if (!userId) throw new Error("Unauthorized");
    const rows = await db.account.findMany({
      where: { userId },
      select: { id: true, email: true, provider: true, providerAccountId: true },
      orderBy: { createdAt: "asc" },
    });
    return rows.map((r) => ({
      id: r.id,
      email: r.email,
      provider: r.provider,
      grantId: r.providerAccountId ?? r.id,
    }));
  }

  private static providerFor(account: AccountRow): CommunicationProvider {
    return getCommunicationProvider(account.grantId);
  }

  private static async getFoldersCached(cacheKey: string, provider: CommunicationProvider, fresh = false) {
    const cached = folderCache.get(cacheKey);
    if (!fresh && cached && Date.now() - cached.at < FOLDER_CACHE_TTL_MS) {
      return cached.folders;
    }
    const folders = await provider.listFolders();
    folderCache.set(cacheKey, { at: Date.now(), folders });
    return folders;
  }

  private static stamp(messages: Message[], account: { id: string; email: string }): NormalizedMessage[] {
    return messages.map((m) => ({
      ...normalizeMessage(m),
      accountId: account.id,
      accountEmail: account.email,
    }));
  }

  /**
   * Lists one page of a folder for a single account.
   * `folderKey` is either a role ("inbox", "spam", ...) or a concrete provider folder id.
   * Returns `null` when the account has no folder for the requested role.
   */
  private static async listFolderPage(
    account: AccountRow,
    folderKey: string,
    params: ListParams
  ): Promise<{ messages: NormalizedMessage[]; nextPageToken?: string } | null> {
    const provider = this.providerFor(account);

    if (folderKey === "drafts") {
      const result = await provider.listDrafts(params);
      return { messages: this.stamp(result.messages, account), nextPageToken: result.nextPageToken };
    }

    let folderId: string | undefined;
    if (folderKey === "all") {
      folderId = undefined; // No `in` filter: every message Nylas exposes for the grant.
    } else if (isRoleKey(folderKey)) {
      const folders = await this.getFoldersCached(account.id, provider);
      const match = folders.find((f) => f.role === folderKey);
      if (!match) return null;
      folderId = match.id;
    } else {
      folderId = folderKey;
    }

    const result = await provider.listMessages({ ...params, folderId });
    return { messages: this.stamp(result.messages, account), nextPageToken: result.nextPageToken };
  }

  /**
   * Fans a paged request out to several accounts and merges the results newest-first.
   * Each account keeps its own page token inside a composite cursor, so paging never
   * skips or repeats an account's messages.
   */
  private static async listAcrossAccounts(
    accounts: Array<AccountRow>,
    cursorRaw: string | undefined,
    fetchPage: (
      account: AccountRow,
      pageToken: string | undefined
    ) => Promise<{ messages: NormalizedMessage[]; nextPageToken?: string } | null>
  ): Promise<CursorPaginatedResponse<NormalizedMessage>> {
    const cursor = decodeCursor(cursorRaw);
    const active = accounts.filter((a) => !cursor || (a.id in cursor && cursor[a.id] !== null));

    const results = await Promise.allSettled(
      active.map(async (account) => ({
        account,
        page: await fetchPage(account, cursor?.[account.id] ?? undefined),
      }))
    );

    const nextCursor: CompositeCursor = {};
    const items: NormalizedMessage[] = [];
    let failures = 0;

    results.forEach((res, idx) => {
      const account = active[idx]!;
      if (res.status === "rejected") {
        failures++;
        console.error(`[MailService] Account ${account.id} failed in unified view:`, res.reason);
        // Drop the failing account from this paging run so infinite scroll can't spin on it;
        // the next refetch (poll, focus or refresh) starts every account from the top again.
        nextCursor[account.id] = null;
        return;
      }
      const page = res.value.page;
      if (!page) {
        nextCursor[account.id] = null;
        return;
      }
      items.push(...page.messages);
      nextCursor[account.id] = page.nextPageToken ?? null;
    });

    if (failures > 0 && failures === active.length) {
      throw new Error("Failed to load mail from your connected accounts.");
    }

    const hasMore = Object.values(nextCursor).some((token) => token !== null);
    return {
      items: items.sort(byNewest),
      nextCursor: hasMore ? encodeCursor(nextCursor) : undefined,
      hasMore,
    };
  }

  /**
   * Returns metadata for all email accounts linked to the given user (never exposing access tokens).
   */
  static async getUserAccounts(userId: string) {
    if (!userId) throw new Error("Unauthorized");
    const rows = await db.account.findMany({
      where: { userId },
      orderBy: { createdAt: "asc" },
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

    // Report grant health so the UI only asks for a reconnect when the provider has really
    // revoked access. A transient Nylas error is "unknown", never "invalid".
    const health = await Promise.all(
      rows.map((r) => this.getGrantHealth(r.providerAccountId ?? r.id))
    );
    return rows.map((r, i) => ({ ...r, ...health[i]! }));
  }

  private static async getGrantHealth(
    grantId: string
  ): Promise<{ status: "valid" | "invalid" | "unknown"; connector?: string }> {
    const cached = grantHealthCache.get(grantId);
    if (cached && Date.now() - cached.at < GRANT_HEALTH_TTL_MS) return cached.value;
    try {
      const grant = await getAccount(grantId);
      const status: "valid" | "invalid" =
        grant.grantStatus && grant.grantStatus !== "valid" ? "invalid" : "valid";
      const value = { status, connector: grant.provider };
      grantHealthCache.set(grantId, { at: Date.now(), value });
      return value;
    } catch (err) {
      const message = err instanceof Error ? err.message : "";
      // 404 = grant deleted on the Nylas side: the mailbox must be linked again.
      if (/\b404\b|not[_ ]found/i.test(message)) {
        const value = { status: "invalid" as const };
        grantHealthCache.set(grantId, { at: Date.now(), value });
        return value;
      }
      console.error(`[MailService] Grant health check failed for ${grantId}:`, err);
      return { status: "unknown" };
    }
  }

  /** Drops cached state for a grant (called after a reconnect or a grant webhook). */
  static forgetGrant(grantId: string) {
    grantHealthCache.delete(grantId);
    folderCache.delete(grantId);
  }

  /**
   * Lightweight change marker for live refresh: the Nylas webhook bumps `updatedAt`
   * on the account whenever mail changes, and the client polls this cheap DB read.
   */
  static async getSyncState(userId: string) {
    if (!userId) throw new Error("Unauthorized");
    const rows = await db.account.findMany({
      where: { userId },
      select: { id: true, updatedAt: true },
    });
    return rows.map((r) => ({ id: r.id, updatedAt: r.updatedAt.toISOString() }));
  }

  /**
   * Returns every folder / label for one account, or the standard mailbox roles
   * (with unread counts summed across accounts) for the unified view.
   */
  static async getFolders(userId: string, accountId?: string): Promise<MailFolder[]> {
    if (accountId) {
      const { account, provider } = await this.getProviderAndAccount(userId, accountId);
      const folders = await this.getFoldersCached(account.id, provider, true);
      // System folders are keyed by role so the selected folder survives an account switch.
      // If two folders claim the same role, the second keeps its own id so it stays reachable.
      const usedRoles = new Set<FolderRole>();
      const result: MailFolder[] = folders.map((f) => {
        const ownsRole = f.role !== undefined && !usedRoles.has(f.role);
        if (ownsRole && f.role) usedRoles.add(f.role);
        return {
          key: ownsRole && f.role ? f.role : f.id,
          name: ownsRole && f.role ? ROLE_LABELS[f.role] : f.name,
          role: ownsRole ? f.role : undefined,
          isCategory: f.isCategory,
          unreadCount: f.unreadCount,
          totalCount: f.totalCount,
        };
      });
      if (!result.some((f) => f.role === "drafts")) {
        result.push({ key: "drafts", name: "Drafts", role: "drafts", unreadCount: 0, totalCount: 0 });
      }
      if (!result.some((f) => f.role === "all")) {
        result.push({ key: "all", name: "All Mail", role: "all", unreadCount: 0, totalCount: 0 });
      }
      return result;
    }

    const accounts = await this.getAllAccounts(userId);
    const totals = new Map<FolderRole, MailFolder>();
    for (const role of ["inbox", "starred", "sent", "drafts", "all", "spam", "trash"] as FolderRole[]) {
      totals.set(role, { key: role, name: ROLE_LABELS[role], role, unreadCount: 0, totalCount: 0 });
    }

    const results = await Promise.allSettled(
      accounts.map((a) => this.getFoldersCached(a.id, this.providerFor(a), true))
    );
    for (const res of results) {
      if (res.status !== "fulfilled") continue;
      for (const f of res.value) {
        if (!f.role) continue;
        const entry = totals.get(f.role) ?? {
          key: f.role,
          name: ROLE_LABELS[f.role],
          role: f.role,
          unreadCount: 0,
          totalCount: 0,
        };
        entry.unreadCount += f.unreadCount;
        entry.totalCount += f.totalCount;
        totals.set(f.role, entry);
      }
    }
    return [...totals.values()];
  }

  /**
   * Fetches one page of a folder. With no accountId, merges that folder across every
   * connected account ("All Inboxes").
   */
  static async getInbox(
    userId: string,
    accountId?: string,
    params?: ListParams
  ): Promise<CursorPaginatedResponse<NormalizedMessage>> {
    const folderKey = params?.folderId ?? "inbox";
    const limit = params?.limit;

    try {
      if (accountId) {
        const { account } = await this.getProviderAndAccount(userId, accountId);
        const page = await this.listFolderPage(
          {
            id: account.id,
            email: account.email,
            provider: account.provider,
            grantId: account.providerAccountId ?? account.id,
          },
          folderKey,
          { limit, pageToken: params?.pageToken }
        );
        if (!page) return { items: [], hasMore: false };
        return {
          items: page.messages,
          nextCursor: page.nextPageToken,
          hasMore: Boolean(page.nextPageToken),
        };
      }

      const accounts = await this.getAllAccounts(userId);
      if (accounts.length === 0) {
        throw new Error("No connected email account found for this user.");
      }
      if (!isRoleKey(folderKey)) {
        throw new Error("Pick a single account to open a label.");
      }
      return await this.listAcrossAccounts(accounts, params?.pageToken, (account, pageToken) =>
        this.listFolderPage(account, folderKey, { limit, pageToken })
      );
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
      const thread = normalizeThread(rawThread, account.provider ?? "Email");
      const stampMessage = (m: NormalizedMessage): NormalizedMessage => ({
        ...m,
        accountId: account.id,
        accountEmail: account.email,
      });
      return {
        ...thread,
        messages: thread.messages.map(stampMessage),
        latestMessage: thread.latestMessage ? stampMessage(thread.latestMessage) : thread.latestMessage,
      };
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
      const { account, provider } = await this.getProviderAndAccount(userId, accountId);
      const rawMessage = await provider.getMessage(messageId);
      return { ...normalizeMessage(rawMessage), accountId: account.id, accountEmail: account.email };
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
      const limit = params?.limit;
      if (accountId) {
        const { account, provider } = await this.getProviderAndAccount(userId, accountId);
        const result = await provider.searchMessages(query, { limit, pageToken: params?.pageToken });
        return {
          items: this.stamp(result.messages, account),
          nextCursor: result.nextPageToken,
          hasMore: Boolean(result.nextPageToken),
        };
      }

      // Unified search across every connected account.
      const accounts = await this.getAllAccounts(userId);
      if (accounts.length === 0) {
        throw new Error("No connected email account found for this user.");
      }
      return await this.listAcrossAccounts(accounts, params?.pageToken, async (account, pageToken) => {
        const result = await this.providerFor(account).searchMessages(query, { limit, pageToken });
        return { messages: this.stamp(result.messages, account), nextPageToken: result.nextPageToken };
      });
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
      const { account, provider } = await this.getProviderAndAccount(userId, accountId);
      const folders = await this.getFoldersCached(account.id, provider);
      const archiveFolder = folders.find((f) => f.role === "archive");
      const inboxFolder = folders.find((f) => f.role === "inbox");
      return await provider.archive(messageId, archiveFolder?.id, inboxFolder?.id ?? "INBOX");
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
