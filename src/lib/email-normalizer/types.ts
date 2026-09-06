import "server-only";

export interface Participant {
  name?: string;
  address: string;
  raw?: string;
}

export type EmailAddress = Participant;

export interface Attachment {
  id: string;
  name?: string;
  filename: string;
  mimeType: string;
  size: number;
  contentId?: string;
  contentLocation?: string;
  isInline?: boolean;
}

export type MessageAttachment = Attachment;

export interface NormalizedMessage {
  id: string;
  threadId: string;
  subject: string;
  sender: Participant;
  recipients: Participant[];
  cc: Participant[];
  bcc: Participant[];
  // Backward compatible aliases
  from: Participant;
  to: Participant[];
  bodyHtml?: string;
  bodyText?: string;
  body: string;
  snippet: string;
  timestamp: string;
  sentAt: string;
  receivedAt: string;
  isRead: boolean;
  flags: string[];
  attachments: Attachment[];
  providerMetadata?: Record<string, unknown>;
}

export interface EmailThreadMetadata {
  messageCount: number;
  hasAttachments: boolean;
  labels?: string[];
  provider?: string;
}

export interface NormalizedThread {
  id: string;
  subject: string;
  messages: NormalizedMessage[];
  latestMessage: NormalizedMessage | null;
  messageCount: number;
  unreadCount: number;
  lastActivityAt: string;
  lastActivity: string; // Backward compatibility
  participants: Participant[];
  metadata: EmailThreadMetadata;
}

export type EmailThread = NormalizedThread;
