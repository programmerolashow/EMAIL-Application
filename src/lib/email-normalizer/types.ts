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

export interface NormalizedMessage {
  id: string;
  threadId: string;
  subject: string;
  from: EmailAddress;
  to: EmailAddress[];
  cc: EmailAddress[];
  bcc: EmailAddress[];
  body: string;
  snippet: string;
  sentAt: string;
  receivedAt: string;
  isRead: boolean;
  flags: string[];
  attachments: MessageAttachment[];
}

export interface EmailThreadMetadata {
  messageCount: number;
  hasAttachments: boolean;
  labels?: string[];
  provider?: string;
}

export interface EmailThread {
  id: string;
  subject: string;
  participants: EmailAddress[];
  messages: NormalizedMessage[];
  latestMessage: NormalizedMessage | null;
  unreadCount: number;
  lastActivity: string;
  metadata: EmailThreadMetadata;
}
