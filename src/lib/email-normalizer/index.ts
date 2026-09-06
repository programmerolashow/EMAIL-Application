import "server-only";
import type { Message, Thread } from "@/lib/communication-provider/types";
import type {
  Participant,
  Attachment,
  NormalizedMessage,
  NormalizedThread,
} from "./types";

export * from "./types";

/**
 * Normalizes a raw participant/email address payload into a consistent Participant domain object.
 */
export function normalizeParticipant(raw?: Partial<Participant> | null): Participant {
  if (!raw) return { address: "" };
  const address = (raw.address ?? "").trim().toLowerCase();
  const name = raw.name?.trim() ?? undefined;
  const rawString = raw.raw ?? (name ? `${name} <${address}>` : address);

  return {
    name,
    address,
    raw: rawString,
  };
}

/**
 * Normalizes a list of raw email address/participant payloads, filtering empty entries and deduplicating by email address.
 */
export function normalizeParticipantList(rawList?: Partial<Participant>[] | null): Participant[] {
  if (!Array.isArray(rawList)) return [];

  const map = new Map<string, Participant>();
  for (const item of rawList) {
    const normalized = normalizeParticipant(item);
    if (normalized.address && !map.has(normalized.address)) {
      map.set(normalized.address, normalized);
    }
  }

  return Array.from(map.values());
}

/**
 * Normalizes a raw attachment object into a consistent Attachment domain object.
 */
export function normalizeAttachment(raw: unknown): Attachment {
  const att = (typeof raw === "object" && raw !== null ? raw : {}) as Record<string, unknown>;
  const filename = typeof att.name === "string" ? att.name : typeof att.filename === "string" ? att.filename : "attachment";

  return {
    id: typeof att.id === "string" ? att.id : "",
    name: filename,
    filename,
    mimeType: typeof att.contentType === "string" ? att.contentType : typeof att.mimeType === "string" ? att.mimeType : "application/octet-stream",
    size: typeof att.size === "number" ? att.size : 0,
    contentId: typeof att.contentId === "string" ? att.contentId : undefined,
    contentLocation: typeof att.contentLocation === "string" ? att.contentLocation : undefined,
    isInline: typeof att.isInline === "boolean" ? att.isInline : false,
  };
}

/**
 * Normalizes a raw provider message into a consistent NormalizedMessage structure.
 */
export function normalizeMessage(raw: Message): NormalizedMessage {
  const sender = normalizeParticipant(raw.from);
  const recipients = normalizeParticipantList(raw.to);
  const cc = normalizeParticipantList(raw.cc);
  const bcc = normalizeParticipantList(raw.bcc);

  const isRead = raw.isRead ?? (!raw.flags?.includes("unread") && !raw.flags?.includes("UNREAD"));

  const attachments: Attachment[] = Array.isArray(raw.attachments)
    ? raw.attachments.map(normalizeAttachment)
    : [];

  const bodyContent = raw.body ?? "";
  const isHtml = bodyContent.trim().toLowerCase().startsWith("<") || bodyContent.includes("</");
  const bodyHtml = isHtml ? bodyContent : undefined;
  const bodyText = !isHtml ? bodyContent : bodyContent.replace(/<[^>]*>?/gm, "");

  const timestamp = raw.receivedAt ?? raw.sentAt ?? new Date().toISOString();

  return {
    id: raw.id ?? "",
    threadId: raw.threadId ?? raw.id ?? "",
    subject: (raw.subject ?? "(No Subject)").trim(),
    sender,
    recipients,
    cc,
    bcc,
    from: sender,
    to: recipients,
    bodyHtml,
    bodyText,
    body: bodyContent,
    snippet: raw.snippet ?? (bodyText ? bodyText.slice(0, 150) : ""),
    timestamp,
    sentAt: raw.sentAt ?? timestamp,
    receivedAt: raw.receivedAt ?? timestamp,
    isRead: Boolean(isRead),
    flags: Array.isArray(raw.flags) ? raw.flags : [],
    attachments,
    providerMetadata: {
      rawFlags: raw.flags ?? [],
    },
  };
}

/**
 * Normalizes a raw provider thread or message array into a consistent NormalizedThread domain representation.
 * Performs accurate calculations for messageCount, unreadCount, lastActivityAt, and deduplicated participants.
 */
export function normalizeThread(rawThread: Thread, providerName?: string): NormalizedThread {
  const rawMessages = Array.isArray(rawThread.messages) ? rawThread.messages : [];
  const messages: NormalizedMessage[] = rawMessages.map(normalizeMessage);

  // Sort messages chronologically (oldest first)
  messages.sort(
    (a, b) => new Date(a.receivedAt).getTime() - new Date(b.receivedAt).getTime()
  );

  // Extract latest message
  const latestMessage = messages.length > 0 ? messages[messages.length - 1] ?? null : null;

  // Deduplicate all participants across sender, recipients, cc, and bcc
  const participantMap = new Map<string, Participant>();
  for (const msg of messages) {
    if (msg.sender.address) {
      participantMap.set(msg.sender.address, msg.sender);
    }
    for (const p of [...msg.recipients, ...msg.cc, ...msg.bcc]) {
      if (p.address && !participantMap.has(p.address)) {
        participantMap.set(p.address, p);
      }
    }
  }
  const participants = Array.from(participantMap.values());

  // Calculate messageCount & unreadCount
  const messageCount = messages.length;
  const unreadCount = messages.reduce((count, msg) => (msg.isRead ? count : count + 1), 0);

  // Calculate lastActivityAt
  const lastActivityAt = rawThread.lastMessageAt ?? latestMessage?.receivedAt ?? new Date().toISOString();

  // Extract unique labels / flags
  const labelSet = new Set<string>();
  for (const msg of messages) {
    for (const flag of msg.flags) {
      labelSet.add(flag);
    }
  }

  const hasAttachments = messages.some((msg) => msg.attachments.length > 0);

  return {
    id: rawThread.id ?? latestMessage?.threadId ?? "",
    subject: rawThread.subject ?? latestMessage?.subject ?? "(No Subject)",
    participants,
    messages,
    latestMessage,
    messageCount,
    unreadCount,
    lastActivityAt,
    lastActivity: lastActivityAt,
    metadata: {
      messageCount,
      hasAttachments,
      labels: Array.from(labelSet),
      provider: providerName,
    },
  };
}
