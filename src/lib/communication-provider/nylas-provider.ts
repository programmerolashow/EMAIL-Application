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
  attachments?: NylasAttachment[];
}

interface NylasRawThread {
  id: string;
  subject?: string;
  latest_draft_or_message?: NylasRawMessage;
  message_ids?: string[];
}

export class NylasCommunicationProvider implements CommunicationProvider {
  private readonly baseUrl = env.NYLAS_API_URI;

  constructor(private readonly accessToken: string) {}

  private async request<T>(path: string, options: RequestInit = {}): Promise<T> {
    const authHeader = this.accessToken.startsWith("Bearer ")
      ? this.accessToken
      : `Bearer ${this.accessToken}`;

    const response = await fetch(`${this.baseUrl}${path}`, {
      ...options,
      headers: {
        Authorization: authHeader,
        "Content-Type": "application/json",
        ...options.headers,
      },
    });

    if (!response.ok) {
      const errText = await response.text().catch(() => response.statusText);
      throw new Error(
        `Nylas API request failed [${response.status} ${response.statusText}]: ${errText}`
      );
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
      attachments: raw.attachments?.map((att) => ({
        id: att.id,
        name: att.filename ?? "attachment",
        contentType: att.content_type ?? "application/octet-stream",
        size: att.size ?? 0,
      })),
    };
  }

  async listMessages(params?: ListParams): Promise<{ messages: Message[]; nextPageToken?: string }> {
    const query = new URLSearchParams();
    if (params?.limit) query.set("limit", String(params.limit));
    if (params?.pageToken) query.set("page_token", params.pageToken);

    const queryString = query.toString();
    const path = `/v3/grants/me/messages${queryString ? `?${queryString}` : ""}`;
    const result = await this.request<{ data: NylasRawMessage[]; next_page_token?: string }>(path);

    return {
      messages: (result.data ?? []).map((m) => this.mapMessage(m)),
      nextPageToken: result.next_page_token,
    };
  }

  async getMessage(id: string): Promise<Message> {
    const result = await this.request<{ data: NylasRawMessage }>(`/v3/grants/me/messages/${encodeURIComponent(id)}`);
    return this.mapMessage(result.data);
  }

  async getThread(id: string): Promise<Thread> {
    const result = await this.request<{ data: NylasRawThread }>(`/v3/grants/me/threads/${encodeURIComponent(id)}`);
    const rawThread = result.data;

    const msgsResult = await this.request<{ data: NylasRawMessage[] }>(
      `/v3/grants/me/messages?thread_id=${encodeURIComponent(id)}`
    );
    const messages = (msgsResult.data ?? []).map((m) => this.mapMessage(m));

    return {
      id: rawThread.id,
      subject: rawThread.subject ?? messages[0]?.subject,
      messages,
      lastMessageAt: messages[messages.length - 1]?.sentAt,
    };
  }

  async searchMessages(query: string, params?: ListParams): Promise<{ messages: Message[]; nextPageToken?: string }> {
    const searchParams = new URLSearchParams({ q: query });
    if (params?.limit) searchParams.set("limit", String(params.limit));
    if (params?.pageToken) searchParams.set("page_token", params.pageToken);

    const path = `/v3/grants/me/messages?${searchParams.toString()}`;
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
    };

    const result = await this.request<{ data: { id: string } }>("/v3/grants/me/messages/send", {
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
    };

    const result = await this.request<{ data: { id: string } }>("/v3/grants/me/drafts", {
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
    };

    const result = await this.request<{ data: { id: string } }>(`/v3/grants/me/drafts/${encodeURIComponent(id)}`, {
      method: "PUT",
      body: JSON.stringify(payload),
    });

    return { id: result.data.id };
  }

  async deleteDraft(id: string): Promise<{ success: boolean }> {
    await this.request<unknown>(`/v3/grants/me/drafts/${encodeURIComponent(id)}`, {
      method: "DELETE",
    });
    return { success: true };
  }

  async markRead(id: string, isRead: boolean): Promise<{ success: boolean }> {
    await this.request<unknown>(`/v3/grants/me/messages/${encodeURIComponent(id)}`, {
      method: "PATCH",
      body: JSON.stringify({ unread: !isRead }),
    });
    return { success: true };
  }

  async archive(id: string): Promise<{ success: boolean }> {
    await this.request<unknown>(`/v3/grants/me/messages/${encodeURIComponent(id)}`, {
      method: "PATCH",
      body: JSON.stringify({ folders: ["archive"] }),
    });
    return { success: true };
  }

  async listContacts(params?: ListParams): Promise<{ contacts: Contact[]; nextPageToken?: string }> {
    const query = new URLSearchParams();
    if (params?.limit) query.set("limit", String(params.limit));
    if (params?.pageToken) query.set("page_token", params.pageToken);

    const queryString = query.toString();
    const path = `/v3/grants/me/contacts${queryString ? `?${queryString}` : ""}`;
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
    }>(`/v3/grants/me/contacts/${encodeURIComponent(id)}`);
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
    const path = `/v3/grants/me/events${queryString ? `?${queryString}` : ""}`;
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
