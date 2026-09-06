import "server-only";
import type {
  CommunicationProvider,
  ListParams,
  Message,
  Thread,
  Draft,
  Contact,
  CalendarEvent,
} from "./types";

export class AurinkoCommunicationProvider implements CommunicationProvider {
  private readonly baseUrl = "https://api.aurinko.io/v1";

  constructor(private readonly accessToken: string) {}

  private async request<T>(path: string, options: RequestInit = {}): Promise<T> {
    const response = await fetch(`${this.baseUrl}${path}`, {
      ...options,
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
        "Content-Type": "application/json",
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(
        `Aurinko API request failed [${response.status} ${response.statusText}]: ${path}`
      );
    }

    return (await response.json()) as T;
  }

  async listMessages(params?: ListParams): Promise<{ messages: Message[]; nextPageToken?: string }> {
    const query = new URLSearchParams();
    if (params?.limit) query.set("limit", String(params.limit));
    if (params?.pageToken) query.set("pageToken", params.pageToken);
    if (params?.folderId) query.set("folderId", params.folderId);

    const queryString = query.toString();
    const path = `/email/messages${queryString ? `?${queryString}` : ""}`;
    const result = await this.request<{ records?: Message[]; messages?: Message[]; nextPageToken?: string }>(path);

    return {
      messages: result.records ?? result.messages ?? [],
      nextPageToken: result.nextPageToken,
    };
  }

  async getMessage(id: string): Promise<Message> {
    return this.request<Message>(`/email/messages/${encodeURIComponent(id)}`);
  }

  async getThread(id: string): Promise<Thread> {
    return this.request<Thread>(`/email/threads/${encodeURIComponent(id)}`);
  }

  async searchMessages(query: string, params?: ListParams): Promise<{ messages: Message[]; nextPageToken?: string }> {
    const searchParams = new URLSearchParams({ q: query });
    if (params?.limit) searchParams.set("limit", String(params.limit));
    if (params?.pageToken) searchParams.set("pageToken", params.pageToken);

    const path = `/email/messages?${searchParams.toString()}`;
    const result = await this.request<{ records?: Message[]; messages?: Message[]; nextPageToken?: string }>(path);

    return {
      messages: result.records ?? result.messages ?? [],
      nextPageToken: result.nextPageToken,
    };
  }

  async sendMessage(params: Draft): Promise<{ id: string }> {
    return this.request<{ id: string }>("/email/messages", {
      method: "POST",
      body: JSON.stringify(params),
    });
  }

  async createDraft(params: Draft): Promise<{ id: string }> {
    return this.request<{ id: string }>("/email/drafts", {
      method: "POST",
      body: JSON.stringify(params),
    });
  }

  async updateDraft(id: string, params: Draft): Promise<{ id: string }> {
    return this.request<{ id: string }>(`/email/drafts/${encodeURIComponent(id)}`, {
      method: "PATCH",
      body: JSON.stringify(params),
    });
  }

  async listContacts(params?: ListParams): Promise<{ contacts: Contact[]; nextPageToken?: string }> {
    const query = new URLSearchParams();
    if (params?.limit) query.set("limit", String(params.limit));
    if (params?.pageToken) query.set("pageToken", params.pageToken);

    const queryString = query.toString();
    const path = `/contacts${queryString ? `?${queryString}` : ""}`;
    const result = await this.request<{ records?: Contact[]; contacts?: Contact[]; nextPageToken?: string }>(path);

    return {
      contacts: result.records ?? result.contacts ?? [],
      nextPageToken: result.nextPageToken,
    };
  }

  async getContact(id: string): Promise<Contact> {
    return this.request<Contact>(`/contacts/${encodeURIComponent(id)}`);
  }

  async listCalendarEvents(params?: ListParams): Promise<{ events: CalendarEvent[]; nextPageToken?: string }> {
    const query = new URLSearchParams();
    if (params?.limit) query.set("limit", String(params.limit));
    if (params?.pageToken) query.set("pageToken", params.pageToken);

    const queryString = query.toString();
    const path = `/calendar/events${queryString ? `?${queryString}` : ""}`;
    const result = await this.request<{ records?: CalendarEvent[]; events?: CalendarEvent[]; nextPageToken?: string }>(path);

    return {
      events: result.records ?? result.events ?? [],
      nextPageToken: result.nextPageToken,
    };
  }
}
