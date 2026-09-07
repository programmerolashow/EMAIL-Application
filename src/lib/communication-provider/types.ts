import "server-only";

export const DEFAULT_PAGE_SIZE = 15;
export const MAX_PAGE_SIZE = 50;

export interface CursorPaginatedResponse<T> {
  items: T[];
  nextCursor?: string;
  hasMore: boolean;
}

export interface EmailAddress {
  name?: string;
  address: string;
}

export interface MessageAttachment {
  id: string;
  name: string;
  contentType: string;
  size: number;
}

export interface Message {
  id: string;
  threadId?: string;
  subject?: string;
  from?: EmailAddress;
  to?: EmailAddress[];
  cc?: EmailAddress[];
  bcc?: EmailAddress[];
  body?: string;
  snippet?: string;
  sentAt?: string;
  receivedAt?: string;
  flags?: string[];
  isRead?: boolean;
  attachments?: MessageAttachment[];
}

export interface Thread {
  id: string;
  subject?: string;
  messages: Message[];
  lastMessageAt?: string;
}

export interface Draft {
  id?: string;
  subject?: string;
  to: EmailAddress[];
  cc?: EmailAddress[];
  bcc?: EmailAddress[];
  body: string;
}

export interface Contact {
  id: string;
  name?: string;
  emailAddresses?: string[];
  phoneNumbers?: string[];
}

export interface CalendarEvent {
  id: string;
  title?: string;
  description?: string;
  start?: string;
  end?: string;
  location?: string;
  attendees?: EmailAddress[];
}

export interface ListParams {
  pageToken?: string;
  limit?: number;
  folderId?: string;
}

export interface SearchMessagesParams extends ListParams {
  query: string;
}

/**
 * Strict CommunicationProvider Interface Abstraction
 * 
 * Flow Architecture:
 * Application (React UI / Server Services / tRPC Routers)
 *          ↓
 * CommunicationProvider (Abstract Contract)
 *          ↓
 * NylasCommunicationProvider (Provider Implementation)
 *          ↓
 * Nylas API (Gateway to Gmail / Outlook / Office365)
 * 
 * Never allow React components or Application code to bypass this interface
 * to call Gmail API, Outlook API, or Nylas API directly.
 */
export interface CommunicationProvider {
  /** List messages from inbox or folder */
  listMessages(params?: ListParams): Promise<{ messages: Message[]; nextPageToken?: string }>;

  /** Fetch a single message by ID */
  getMessage(id: string): Promise<Message>;

  /** Fetch a complete message thread by ID */
  getThread(id: string): Promise<Thread>;

  /** Search messages by query string */
  searchMessages(query: string, params?: ListParams): Promise<{ messages: Message[]; nextPageToken?: string }>;

  /** Send an email message */
  sendMessage(params: Draft): Promise<{ id: string }>;

  /** Create a draft email */
  createDraft(params: Draft): Promise<{ id: string }>;

  /** Update an existing draft email */
  updateDraft(id: string, params: Draft): Promise<{ id: string }>;

  /** Delete a draft email */
  deleteDraft(id: string): Promise<{ success: boolean }>;

  /** Mark a message as read or unread */
  markRead(id: string, isRead: boolean): Promise<{ success: boolean }>;

  /** Archive a message */
  archive(id: string): Promise<{ success: boolean }>;

  /** List user contacts */
  listContacts(params?: ListParams): Promise<{ contacts: Contact[]; nextPageToken?: string }>;

  /** Get individual contact by ID */
  getContact(id: string): Promise<Contact>;

  /** List user calendar events */
  listCalendarEvents(params?: ListParams): Promise<{ events: CalendarEvent[]; nextPageToken?: string }>;
}
