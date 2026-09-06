import "server-only";

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

export interface CommunicationProvider {
  listMessages(params?: ListParams): Promise<{ messages: Message[]; nextPageToken?: string }>;
  getMessage(id: string): Promise<Message>;
  getThread(id: string): Promise<Thread>;
  searchMessages(query: string, params?: ListParams): Promise<{ messages: Message[]; nextPageToken?: string }>;
  sendMessage(params: Draft): Promise<{ id: string }>;
  createDraft(params: Draft): Promise<{ id: string }>;
  updateDraft(id: string, params: Draft): Promise<{ id: string }>;
  deleteDraft(id: string): Promise<{ success: boolean }>;
  markRead(id: string, isRead: boolean): Promise<{ success: boolean }>;
  archive(id: string): Promise<{ success: boolean }>;
  listContacts(params?: ListParams): Promise<{ contacts: Contact[]; nextPageToken?: string }>;
  getContact(id: string): Promise<Contact>;
  listCalendarEvents(params?: ListParams): Promise<{ events: CalendarEvent[]; nextPageToken?: string }>;
}
