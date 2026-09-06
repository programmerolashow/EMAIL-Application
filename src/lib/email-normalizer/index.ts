import "server-only";
import type { Message, Thread } from "@/lib/communication-provider/types";
import type {
  EmailAddress,
  NormalizedMessage,
  EmailThread,
  MessageAttachment,
} from "./types";

export * from "./types";

/**
 * Normalizes a raw email address payload into a consistent EmailAddress object.
 */
export function normalizeEmailAddress(raw?: Partial<EmailAddress> | null): EmailAddress {
  if (!raw) return { address: "" };
  return {
    name: raw.name?.trim() ?? undefined,
    address: (raw.address ?? "").trim().toLowerCase(),
  };
}

/**
 * Normalizes a list of raw email addresses, filtering out empty entries.
 */
export function normalizeEmailAddressList(rawList?: Partial<EmailAddress>[] | null): EmailAddress[] {
  if (!Array.isArray(rawList)) return [];
  return rawList
    .map((item) => normalizeEmailAddress(item))
    .filter((addr) => Boolean(addr.address));
}

/**
 * Normalizes a raw provider message into a consistent NormalizedMessage structure.
 */
export function normalizeMessage(raw: Message): NormalizedMessage {
  const from = normalizeEmailAddress(raw.from);
  const to = normalizeEmailAddressList(raw.to);
  const cc = normalizeEmailAddressList(raw.cc);
  const bcc = normalizeEmailAddressList(raw.bcc);

  const isRead = raw.isRead ?? (!raw.flags?.includes("unread") && !raw.flags?.includes("UNREAD"));

  const attachments: MessageAttachment[] = Array.isArray(raw.attachments)
    ? raw.attachments.map((att) => ({
        id: att.id ?? "",
        name: att.name ?? "attachment",
        contentType: att.contentType ?? "application/octet-stream",
        size: typeof att.size === "number" ? att.size : 0,
      }))
    : [];

  return {
    id: raw.id ?? "",
    threadId: raw.threadId ?? raw.id ?? "",
    subject: (raw.subject ?? "(No Subject)").trim(),
    from,
    to,
    cc,
    bcc,
    body: raw.body ?? "",
    snippet: raw.snippet ?? (raw.body ? raw.body.slice(0, 150) : ""),
    sentAt: raw.sentAt ?? raw.receivedAt ?? new Date().toISOString(),
    receivedAt: raw.receivedAt ?? raw.sentAt ?? new Date().toISOString(),
    isRead: Boolean(isRead),
    flags: Array.isArray(raw.flags) ? raw.flags : [],
    attachments,
  };
}

/**
 * Normalizes a raw provider thread or message array into a consistent EmailThread representation.
 */
export function normalizeThread(rawThread: Thread, providerName?: string): EmailThread {
  const rawMessages = Array.isArray(rawThread.messages) ? rawThread.messages : [];
  const messages: NormalizedMessage[] = rawMessages.map(normalizeMessage);

  // Sort messages chronologically (oldest first)
  messages.sort(
    (a, b) => new Date(a.receivedAt).getTime() - new Date(b.receivedAt).getTime()
  );

  // Extract latest message
  const latestMessage = messages.length > 0 ? messages[messages.length - 1] ?? null : null;

  // Deduplicate all participants across messages
  const participantMap = new Map<string, EmailAddress>();
  for (const msg of messages) {
    if (msg.from.address) {
      participantMap.set(msg.from.address, msg.from);
    }
    for (const recipient of [...msg.to, ...msg.cc, ...msg.bcc]) {
      if (recipient.address && !participantMap.has(recipient.address)) {
        participantMap.set(recipient.address, recipient);
      }
    }
  }
  const participants = Array.from(participantMap.values());

  // Count unread messages
  const unreadCount = messages.reduce((count, msg) => (msg.isRead ? count : count + 1), 0);

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
    unreadCount,
    lastActivity: rawThread.lastMessageAt ?? latestMessage?.receivedAt ?? new Date().toISOString(),
    metadata: {
      messageCount: messages.length,
      hasAttachments,
      labels: Array.from(labelSet),
      provider: providerName,
    },
  };
}
