import "server-only";
import { env } from "@/env";
import type {
  CommunicationProvider,
  ListParams,
  Message,
  Thread,
  Draft,
  Contact,
  CalendarEvent,
  EmailAddress,
  Folder,
  FolderRole,
} from "./types";

interface NylasParticipant {
  name?: string;
  email: string;
}

interface NylasAttachment {
  id: string;
  filename?: string;
  content_type?: string;
  size?: number;
}

interface NylasRawMessage {
  id: string;
  thread_id?: string;
  subject?: string;
  from?: NylasParticipant[];
  to?: NylasParticipant[];
  cc?: NylasParticipant[];
  bcc?: NylasParticipant[];
  body?: string;
  snippet?: string;
  date?: number;
  unread?: boolean;
  starred?: boolean;
  folders?: string[];
  attachments?: NylasAttachment[];
}

interface NylasRawThread {
  id: string;
  subject?: string;
  latest_draft_or_message?: NylasRawMessage;
  message_ids?: string[];
}

interface NylasRawFolder {
  id: string;
  name?: string;
  system_folder?: boolean;
  attributes?: string[];
  unread_count?: number;
  total_count?: number;
  parent_id?: string;
}

/** Gmail system label ids -> roles. */
const GMAIL_ROLE_BY_ID: Record<string, FolderRole> = {
  INBOX: "inbox",
  SENT: "sent",
  DRAFT: "drafts",
  SPAM: "spam",
  TRASH: "trash",
  STARRED: "starred",
  IMPORTANT: "important",
};

/** IMAP / Microsoft special-use attributes -> roles. */
const ROLE_BY_ATTRIBUTE: Record<string, FolderRole> = {
  "\\inbox": "inbox",
  "\\sent": "sent",
  "\\drafts": "drafts",
  "\\junk": "spam",
  "\\spam": "spam",
  "\\trash": "trash",
  "\\archive": "archive",
  "\\all": "all",
  "\\flagged": "starred",
  "\\important": "important",
};

/** Folder display names (Outlook / generic IMAP) -> roles, used when no attribute is present. */
const ROLE_BY_NAME: Record<string, FolderRole> = {
  inbox: "inbox",
  "sent items": "sent",
  sent: "sent",
  "sent mail": "sent",
  drafts: "drafts",
  "junk email": "spam",
  junk: "spam",
  spam: "spam",
  "deleted items": "trash",
  trash: "trash",
  archive: "archive",
};

const GMAIL_CATEGORY_NAMES: Record<string, string> = {
  CATEGORY_PERSONAL: "Primary",
  CATEGORY_SOCIAL: "Social",
  CATEGORY_PROMOTIONS: "Promotions",
  CATEGORY_UPDATES: "Updates",
  CATEGORY_FORUMS: "Forums",
};

/** Gmail pseudo-labels that are not real mailboxes. */
const HIDDEN_FOLDER_IDS = new Set(["UNREAD", "CHAT"]);

/**
 * Nylas v3 provider.
 *
 * Every call is made server-side against `/v3/grants/{grantId}` with the application API key.
 * Grants do not expire the way per-user access tokens do (~1h), so a linked mailbox stays
 * accessible for as long as the grant itself is valid.
 */
export class NylasCommunicationProvider implements CommunicationProvider {
  private readonly baseUrl = env.NYLAS_API_URI;
  private readonly grantPath: string;

  constructor(private readonly grantId: string) {
    if (!grantId) {
      throw new Error("Nylas grant id is required.");
    }
    this.grantPath = `/v3/grants/${encodeURIComponent(grantId)}`;
  }

  private async request<T>(path: string, options: RequestInit = {}): Promise<T> {
    const response = await fetch(`${this.baseUrl}${path}`, {
      ...options,
      headers: {
        Authorization: `Bearer ${env.NYLAS_API_KEY}`,
        "Content-Type": "application/json",
        Accept: "application/json",
        ...options.headers,
      },
      cache: "no-store",
    });

    if (!response.ok) {
      const errText = await response.text().catch(() => response.statusText);
      throw new Error(
        `Nylas API request failed [${response.status} ${response.statusText}]: ${errText}`
      );
    }

    if (response.status === 204) {
      return undefined as T;
    }

    return (await response.json()) as T;
  }

  private mapParticipant(p?: NylasParticipant): EmailAddress | undefined {
    if (!p?.email) return undefined;
    return { name: p.name, address: p.email };
  }

  private mapParticipants(list?: NylasParticipant[]): EmailAddress[] | undefined {
    if (!list) return undefined;
    return list.map((p) => ({ name: p.name, address: p.email }));
  }

  private mapMessage(raw: NylasRawMessage): Message {
    const sentDate = raw.date ? new Date(raw.date * 1000).toISOString() : undefined;
    const flags: string[] = [...(raw.folders ?? [])];
    if (raw.unread) flags.push("unread");
    if (raw.starred) flags.push("starred");
    return {
      id: raw.id,
      threadId: raw.thread_id,
      subject: raw.subject,
      from: raw.from && raw.from.length > 0 ? this.mapParticipant(raw.from[0]) : undefined,
      to: this.mapParticipants(raw.to),
      cc: this.mapParticipants(raw.cc),
      bcc: this.mapParticipants(raw.bcc),
      body: raw.body,
      snippet: raw.snippet,
      sentAt: sentDate,
      receivedAt: sentDate,
      isRead: raw.unread !== undefined ? !raw.unread : true,
      flags,
      folders: raw.folders ?? [],
      attachments: raw.attachments?.map((att) => ({
        id: att.id,
        name: att.filename ?? "attachment",
        contentType: att.content_type ?? "application/octet-stream",
        size: att.size ?? 0,
      })),
    };
  }

  private mapFolder(raw: NylasRawFolder): Folder {
    const id = raw.id;
    const upperId = id.toUpperCase();
    const name = raw.name ?? id;

    let role: FolderRole | undefined = GMAIL_ROLE_BY_ID[upperId];
    if (!role && raw.attributes?.length) {
      for (const attr of raw.attributes) {
        const match = ROLE_BY_ATTRIBUTE[attr.toLowerCase()];
        if (match) {
          role = match;
          break;
        }
      }
    }
    // Name matching is a last resort and never applies to Gmail user labels (ids "Label_…"),
    // so a user label called "Archive" stays a plain label.
    if (!role && raw.system_folder !== false && !/^Label_/i.test(id)) {
      role = ROLE_BY_NAME[name.trim().toLowerCase()];
    }

    const isCategory = upperId.startsWith("CATEGORY_");

    return {
      id,
      name: GMAIL_CATEGORY_NAMES[upperId] ?? name,
      role,
      isCategory,
      unreadCount: raw.unread_count ?? 0,
      totalCount: raw.total_count ?? 0,
      parentId: raw.parent_id,
    };
  }

  private buildListQuery(params?: ListParams): URLSearchParams {
    const query = new URLSearchParams();
    if (params?.limit) query.set("limit", String(params.limit));
    if (params?.pageToken) query.set("page_token", params.pageToken);
    if (params?.folderId) query.set("in", params.folderId);
    return query;
  }

  async listMessages(params?: ListParams): Promise<{ messages: Message[]; nextPageToken?: string }> {
    const queryString = this.buildListQuery(params).toString();
    const path = `${this.grantPath}/messages${queryString ? `?${queryString}` : ""}`;
    const result = await this.request<{ data: NylasRawMessage[]; next_page_token?: string }>(path);

    return {
      messages: (result.data ?? []).map((m) => this.mapMessage(m)),
      nextPageToken: result.next_page_token,
    };
  }

  async listDrafts(params?: ListParams): Promise<{ messages: Message[]; nextPageToken?: string }> {
    const queryString = this.buildListQuery({ ...params, folderId: undefined }).toString();
    const path = `${this.grantPath}/drafts${queryString ? `?${queryString}` : ""}`;
    const result = await this.request<{ data: NylasRawMessage[]; next_page_token?: string }>(path);

    return {
      messages: (result.data ?? []).map((m) => this.mapMessage(m)),
      nextPageToken: result.next_page_token,
    };
  }

  async listFolders(): Promise<Folder[]> {
    const folders: Folder[] = [];
    let pageToken: string | undefined;
    // Gmail accounts can have hundreds of labels, so page through them.
    for (let i = 0; i < 20; i++) {
      const query = new URLSearchParams({ limit: "200" });
      if (pageToken) query.set("page_token", pageToken);
      const result = await this.request<{ data: NylasRawFolder[]; next_page_token?: string }>(
        `${this.grantPath}/folders?${query.toString()}`
      );
      for (const raw of result.data ?? []) {
        if (HIDDEN_FOLDER_IDS.has(raw.id.toUpperCase())) continue;
        folders.push(this.mapFolder(raw));
      }
      pageToken = result.next_page_token;
      if (!pageToken) break;
    }
    return folders;
  }

  async getMessage(id: string): Promise<Message> {
    const result = await this.request<{ data: NylasRawMessage }>(
      `${this.grantPath}/messages/${encodeURIComponent(id)}`
    );
    return this.mapMessage(result.data);
  }

  async getThread(id: string): Promise<Thread> {
    const result = await this.request<{ data: NylasRawThread }>(
      `${this.grantPath}/threads/${encodeURIComponent(id)}`
    );
    const rawThread = result.data;

    const msgsResult = await this.request<{ data: NylasRawMessage[] }>(
      `${this.grantPath}/messages?thread_id=${encodeURIComponent(id)}&limit=100`
    );
    const messages = (msgsResult.data ?? [])
      .map((m) => this.mapMessage(m))
      .sort((a, b) => (a.sentAt ?? "").localeCompare(b.sentAt ?? ""));

    return {
      id: rawThread.id,
      subject: rawThread.subject ?? messages[0]?.subject,
      messages,
      lastMessageAt: messages[messages.length - 1]?.sentAt,
    };
  }

  async searchMessages(query: string, params?: ListParams): Promise<{ messages: Message[]; nextPageToken?: string }> {
    // Nylas v3 passes provider-native search syntax through `search_query_native`
    // (Gmail operators for Google, KQL for Microsoft). `q` is not a v3 parameter.
    const searchParams = new URLSearchParams({ search_query_native: query });
    if (params?.limit) searchParams.set("limit", String(params.limit));
    if (params?.pageToken) searchParams.set("page_token", params.pageToken);

    const path = `${this.grantPath}/messages?${searchParams.toString()}`;
    const result = await this.request<{ data: NylasRawMessage[]; next_page_token?: string }>(path);

    return {
      messages: (result.data ?? []).map((m) => this.mapMessage(m)),
      nextPageToken: result.next_page_token,
    };
  }

  async sendMessage(params: Draft): Promise<{ id: string }> {
    const payload = {
      subject: params.subject,
      to: params.to.map((addr) => ({ name: addr.name, email: addr.address })),
      cc: params.cc?.map((addr) => ({ name: addr.name, email: addr.address })),
      bcc: params.bcc?.map((addr) => ({ name: addr.name, email: addr.address })),
      body: params.body,
      reply_to_message_id: params.replyToMessageId,
      attachments: params.attachments?.length
        ? params.attachments.map((file) => ({
            filename: file.filename,
            content_type: file.contentType,
            size: file.size,
            content: file.contentBase64,
          }))
        : undefined,
    };

    const result = await this.request<{ data: { id: string } }>(`${this.grantPath}/messages/send`, {
      method: "POST",
      body: JSON.stringify(payload),
    });

    return { id: result.data.id };
  }

  async createDraft(params: Draft): Promise<{ id: string }> {
    const payload = {
      subject: params.subject,
      to: params.to.map((addr) => ({ name: addr.name, email: addr.address })),
      cc: params.cc?.map((addr) => ({ name: addr.name, email: addr.address })),
      bcc: params.bcc?.map((addr) => ({ name: addr.name, email: addr.address })),
      body: params.body,
      reply_to_message_id: params.replyToMessageId,
    };

    const result = await this.request<{ data: { id: string } }>(`${this.grantPath}/drafts`, {
      method: "POST",
      body: JSON.stringify(payload),
    });

    return { id: result.data.id };
  }

  async updateDraft(id: string, params: Draft): Promise<{ id: string }> {
    const payload = {
      subject: params.subject,
      to: params.to.map((addr) => ({ name: addr.name, email: addr.address })),
      cc: params.cc?.map((addr) => ({ name: addr.name, email: addr.address })),
      bcc: params.bcc?.map((addr) => ({ name: addr.name, email: addr.address })),
      body: params.body,
      reply_to_message_id: params.replyToMessageId,
    };

    const result = await this.request<{ data: { id: string } }>(
      `${this.grantPath}/drafts/${encodeURIComponent(id)}`,
      {
        method: "PUT",
        body: JSON.stringify(payload),
      }
    );

    return { id: result.data.id };
  }

  async deleteDraft(id: string): Promise<{ success: boolean }> {
    await this.request<unknown>(`${this.grantPath}/drafts/${encodeURIComponent(id)}`, {
      method: "DELETE",
    });
    return { success: true };
  }

  async markRead(id: string, isRead: boolean): Promise<{ success: boolean }> {
    // Nylas v3 updates messages with PUT.
    await this.request<unknown>(`${this.grantPath}/messages/${encodeURIComponent(id)}`, {
      method: "PUT",
      body: JSON.stringify({ unread: !isRead }),
    });
    return { success: true };
  }

  async archive(id: string, archiveFolderId?: string, inboxFolderId = "INBOX"): Promise<{ success: boolean }> {
    let folders: string[];
    if (archiveFolderId) {
      // Outlook / IMAP: move the message into the Archive folder.
      folders = [archiveFolderId];
    } else {
      // Gmail: archiving removes the INBOX label and keeps every other label.
      const message = await this.getMessage(id);
      folders = (message.folders ?? []).filter((f) => f !== inboxFolderId);
    }

    await this.request<unknown>(`${this.grantPath}/messages/${encodeURIComponent(id)}`, {
      method: "PUT",
      body: JSON.stringify({ folders }),
    });
    return { success: true };
  }

  async listContacts(params?: ListParams): Promise<{ contacts: Contact[]; nextPageToken?: string }> {
    const query = new URLSearchParams();
    if (params?.limit) query.set("limit", String(params.limit));
    if (params?.pageToken) query.set("page_token", params.pageToken);

    const queryString = query.toString();
    const path = `${this.grantPath}/contacts${queryString ? `?${queryString}` : ""}`;
    const result = await this.request<{
      data: Array<{
        id?: string;
        given_name?: string;
        surname?: string;
        emails?: Array<{ email?: string }>;
      }>;
      next_page_token?: string;
    }>(path);

    const contacts: Contact[] = (result.data ?? []).map((c) => {
      const surname = c.surname ? ` ${c.surname}` : "";
      return {
        id: c.id ?? "",
        name: c.given_name ? `${c.given_name}${surname}`.trim() : undefined,
        emailAddresses: c.emails
          ? c.emails.map((e) => e.email ?? "").filter(Boolean)
          : [],
      };
    });

    return {
      contacts,
      nextPageToken: result.next_page_token,
    };
  }

  async getContact(id: string): Promise<Contact> {
    const result = await this.request<{
      data: {
        id?: string;
        given_name?: string;
        surname?: string;
        emails?: Array<{ email?: string }>;
      };
    }>(`${this.grantPath}/contacts/${encodeURIComponent(id)}`);
    const c = result.data;
    const surname = c.surname ? ` ${c.surname}` : "";
    return {
      id: c.id ?? "",
      name: c.given_name ? `${c.given_name}${surname}`.trim() : undefined,
      emailAddresses: c.emails
        ? c.emails.map((e) => e.email ?? "").filter(Boolean)
        : [],
    };
  }

  async listCalendarEvents(params?: ListParams): Promise<{ events: CalendarEvent[]; nextPageToken?: string }> {
    const query = new URLSearchParams();
    if (params?.limit) query.set("limit", String(params.limit));
    if (params?.pageToken) query.set("page_token", params.pageToken);

    const queryString = query.toString();
    const path = `${this.grantPath}/events${queryString ? `?${queryString}` : ""}`;
    const result = await this.request<{
      data: Array<{
        id?: string;
        title?: string;
        description?: string;
        location?: string;
        when?: {
          start_time?: number;
          end_time?: number;
        };
      }>;
      next_page_token?: string;
    }>(path);

    const events: CalendarEvent[] = (result.data ?? []).map((e) => ({
      id: e.id ?? "",
      title: e.title,
      description: e.description,
      start: e.when?.start_time ? String(e.when.start_time) : undefined,
      end: e.when?.end_time ? String(e.when.end_time) : undefined,
      location: e.location,
    }));

    return {
      events,
      nextPageToken: result.next_page_token,
    };
  }
}
