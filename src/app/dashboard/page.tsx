/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { api } from "@/trpc/react";
import type { EmailThread, NormalizedMessage } from "@/lib/email-normalizer";
import { AccountSwitcher } from "@/components/mail/AccountSwitcher";
import { ThreadList } from "@/components/mail/ThreadList";
import { ThreadView } from "@/components/mail/ThreadView";
import { AICopilotPanel } from "@/components/mail/AICopilotPanel";
import { ComposeModal } from "@/components/mail/ComposeModal";
import { getNylasAuthUrlAction } from "@/server/actions/nylas";
import {
  Mail,
  Inbox,
  Send,
  FileText,
  Archive,
  Trash2,
  Star,
  Flag,
  Mails,
  ShieldAlert,
  Tag,
  Tags,
  RefreshCw,
  LogOut,
  Plus,
  PanelRightClose,
  PanelRightOpen,
  AlertTriangle,
  Menu,
  ArrowLeft,
  PenSquare,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";

type LucideIcon = typeof Inbox;

const ROLE_ORDER = ["inbox", "starred", "important", "sent", "drafts", "all", "spam", "trash", "archive"] as const;
const ROLE_ICONS: Record<string, LucideIcon> = {
  inbox: Inbox,
  starred: Star,
  important: Flag,
  sent: Send,
  drafts: FileText,
  all: Mails,
  spam: ShieldAlert,
  trash: Trash2,
  archive: Archive,
};
/** Folders where an unread badge is meaningful (Gmail hides it for Sent, Trash, etc.). */
const SHOW_UNREAD_FOR = new Set(["inbox", "spam", "important", "starred"]);

const PAGE_SIZE = 50;
const MAIL_REFETCH_MS = 60_000;
const SYNC_POLL_MS = 15_000;

export default function DashboardPage() {
  const [selectedAccountId, setSelectedAccountId] = useState<string | undefined>(undefined);
  const [selectedThread, setSelectedThread] = useState<EmailThread | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterUnreadOnly, setFilterUnreadOnly] = useState(false);
  /** A mailbox role ("inbox", "spam", ...) or, for a single account, a label / folder id. */
  const [activeFolder, setActiveFolder] = useState<string>("inbox");

  // Phones / tablets: the folder sidebar is a slide-in drawer.
  const [sidebarOpen, setSidebarOpen] = useState(false);
  // The Copilot is docked on wide screens (xl+) and an overlay below that. It starts open only
  // where it is docked, so a phone never opens straight into the overlay.
  const isWide = useMediaQuery("(min-width: 1280px)");
  const [showCopilot, setShowCopilot] = useState(false);
  React.useEffect(() => {
    setShowCopilot(isWide);
  }, [isWide]);
  const [copilotDefaultTab, setCopilotDefaultTab] = useState<
    "summarize" | "intelligence" | "reply" | "rewrite" | "action-items"
  >("summarize");

  // Compose Modal State
  const [isComposeOpen, setIsComposeOpen] = useState(false);
  const [composeTo, setComposeTo] = useState("");
  const [composeSubject, setComposeSubject] = useState("");
  const [composeBody, setComposeBody] = useState("");
  const [composeReplyToMessageId, setComposeReplyToMessageId] = useState<string | undefined>(undefined);
  const [composeThreadId, setComposeThreadId] = useState<string | undefined>(undefined);
  const [composeDraftId, setComposeDraftId] = useState<string | undefined>(undefined);
  /** Mailbox the compose window sends from (the replied-to / draft's account). */
  const [composeAccountId, setComposeAccountId] = useState<string | undefined>(undefined);

  const utils = api.useUtils();

  // Connected mailboxes. Nothing here expires on inactivity: mail is read through the Nylas
  // grant with the server API key, so a mailbox stays connected until the user revokes it.
  const accountsQuery = api.account.getAccounts.useQuery(undefined, {
    refetchOnWindowFocus: true,
  });
  const accounts = accountsQuery.data;
  const hasNoAccounts = accountsQuery.isSuccess && (accounts?.length ?? 0) === 0;
  const brokenAccounts = (accounts ?? []).filter((a) => a.status === "invalid");

  // Open the mailbox straight away: a freshly connected account (?account=<id> from the Nylas
  // callback) is selected, and a user with exactly one mailbox never has to pick it manually.
  const [connectError, setConnectError] = useState<string | null>(null);
  const autoSelected = React.useRef(false);
  React.useEffect(() => {
    if (autoSelected.current || !accounts) return;
    autoSelected.current = true;
    const params = new URLSearchParams(window.location.search);
    const fromCallback = params.get("account");
    if (fromCallback && accounts.some((a) => a.id === fromCallback)) {
      setSelectedAccountId(fromCallback);
    } else if (accounts.length === 1) {
      setSelectedAccountId(accounts[0]!.id);
    }
    const err = params.get("connect_error");
    if (err) setConnectError(err);
    if (fromCallback || err) {
      window.history.replaceState(null, "", window.location.pathname);
    }
  }, [accounts]);

  const [connecting, setConnecting] = useState(false);
  const removeAccount = api.account.removeAccount.useMutation({
    onSuccess: (_res, vars) => {
      if (selectedAccountId === vars.accountId) setSelectedAccountId(undefined);
      setSelectedThread(null);
      void utils.account.getAccounts.invalidate();
      void utils.mail.invalidate();
    },
  });
  const handleConnect = async (serviceType: "Google" | "Office365") => {
    try {
      setConnecting(true);
      window.location.href = await getNylasAuthUrlAction(serviceType);
    } catch (err) {
      console.error("Failed to start account connection:", err);
      setConnecting(false);
    }
  };

  // Folders / labels for the selected account (or standard roles across all accounts).
  const foldersQuery = api.mail.getFolders.useQuery(
    { accountId: selectedAccountId },
    { enabled: accountsQuery.isSuccess && !hasNoAccounts, refetchInterval: MAIL_REFETCH_MS, refetchOnWindowFocus: true }
  );

  // Labels only exist per account: when switching accounts, fall back to the Inbox
  // unless the current folder is a role every account has.
  const handleSelectAccount = (id: string | undefined) => {
    setSelectedAccountId(id);
    setSelectedThread(null);
    if (!(ROLE_ORDER as readonly string[]).includes(activeFolder)) {
      setActiveFolder("inbox");
    }
  };

  const isSearching = Boolean(searchQuery.trim());

  // Folder listing, paged with a cursor; all loaded pages refetch together on refresh.
  const inboxQuery = api.mail.getInbox.useInfiniteQuery(
    {
      accountId: selectedAccountId,
      limit: PAGE_SIZE,
      folderId: activeFolder,
    },
    {
      enabled: !isSearching && accountsQuery.isSuccess && !hasNoAccounts,
      getNextPageParam: (lastPage) => lastPage.nextCursor,
      // Timed refresh re-requests every loaded page, so stop it once the user has scrolled deep
      // into old mail; webhook-driven refresh (sync state) and window focus still apply.
      refetchInterval: (query) =>
        (query.state.data?.pages.length ?? 0) > 4 ? false : MAIL_REFETCH_MS,
      refetchOnWindowFocus: true,
    }
  );

  // Search (across all accounts when none is selected).
  const searchQueryResult = api.mail.searchEmails.useInfiniteQuery(
    {
      query: searchQuery,
      accountId: selectedAccountId,
      limit: PAGE_SIZE,
    },
    {
      enabled: isSearching && !hasNoAccounts,
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    }
  );

  const activeQuery = isSearching ? searchQueryResult : inboxQuery;
  const isLoading = activeQuery.isLoading;

  // Live refresh: the Nylas webhook bumps each account's updatedAt; when the marker for any
  // account in view moves, refetch mail and folder counts immediately.
  const syncState = api.mail.getSyncState.useQuery(undefined, {
    enabled: !hasNoAccounts,
    refetchInterval: SYNC_POLL_MS,
    refetchOnWindowFocus: true,
  });
  const syncSignature = (syncState.data ?? [])
    .filter((a) => !selectedAccountId || a.id === selectedAccountId)
    .map((a) => `${a.id}:${a.updatedAt}`)
    .sort()
    .join("|");
  const lastSyncSignature = React.useRef<string | null>(null);
  React.useEffect(() => {
    if (!syncSignature) return;
    if (lastSyncSignature.current !== null && lastSyncSignature.current !== syncSignature) {
      void utils.mail.getInbox.invalidate();
      void utils.mail.getFolders.invalidate();
      void utils.mail.getThread.invalidate();
    }
    lastSyncSignature.current = syncSignature;
  }, [syncSignature, utils]);

  // Flatten pages and drop duplicates.
  const messages: NormalizedMessage[] = React.useMemo(() => {
    const seen = new Set<string>();
    const out: NormalizedMessage[] = [];
    for (const page of activeQuery.data?.pages ?? []) {
      for (const msg of page.items) {
        const key = `${msg.accountId ?? ""}:${msg.id}`;
        if (seen.has(key)) continue;
        seen.add(key);
        out.push(msg);
      }
    }
    return out;
  }, [activeQuery.data]);

  // One row per conversation, showing its newest message.
  const conversations = React.useMemo(() => {
    const byThread = new Map<string, { latest: NormalizedMessage; unread: number; count: number }>();
    for (const msg of messages) {
      const key = `${msg.accountId ?? ""}:${msg.threadId || msg.id}`;
      const entry = byThread.get(key);
      if (!entry) {
        byThread.set(key, { latest: msg, unread: msg.isRead ? 0 : 1, count: 1 });
        continue;
      }
      entry.count += 1;
      if (!msg.isRead) entry.unread += 1;
      if ((msg.receivedAt ?? "") > (entry.latest.receivedAt ?? "")) entry.latest = msg;
    }
    return [...byThread.values()].sort((a, b) =>
      (b.latest.receivedAt ?? "").localeCompare(a.latest.receivedAt ?? "")
    );
  }, [messages]);

  const folders = foldersQuery.data ?? [];
  const roleRank = (role?: string) => {
    const idx = (ROLE_ORDER as readonly string[]).indexOf(role ?? "");
    return idx === -1 ? ROLE_ORDER.length : idx;
  };
  const systemFolders = folders
    .filter((f) => f.role)
    .sort((a, b) => roleRank(a.role) - roleRank(b.role));
  const categoryFolders = folders.filter((f) => !f.role && f.isCategory);
  const labelFolders = folders
    .filter((f) => !f.role && !f.isCategory)
    .sort((a, b) => a.name.localeCompare(b.name));
  const activeFolderName =
    folders.find((f) => f.key === activeFolder)?.name ?? (activeFolder === "inbox" ? "Inbox" : "Mail");

  // The list only carries each conversation's newest message; load the whole conversation
  // when one is opened, and mark it read like Gmail / Outlook do.
  const openMessage = selectedThread?.latestMessage ?? null;
  const threadDetail = api.mail.getThread.useQuery(
    { threadId: openMessage?.threadId ?? "", accountId: openMessage?.accountId },
    { enabled: Boolean(openMessage?.threadId && openMessage?.accountId && activeFolder !== "drafts") }
  );
  const displayedThread: EmailThread | null =
    selectedThread && threadDetail.data && threadDetail.data.messages.length > 0
      ? { ...threadDetail.data, id: selectedThread.id }
      : selectedThread;

  const markRead = api.mail.markRead.useMutation({
    onSuccess: () => {
      void utils.mail.getInbox.invalidate();
      void utils.mail.getFolders.invalidate();
    },
  });
  const handleSelectThread = (thread: EmailThread) => {
    const latest = thread.latestMessage;
    // Drafts open in the editor, like Gmail / Outlook, instead of the read-only viewer.
    if (activeFolder === "drafts" && latest) {
      handleOpenCompose(
        latest.to.map((r) => r.address).filter(Boolean).join(", "),
        latest.subject === "(No Subject)" ? "" : latest.subject,
        htmlToText(nonEmpty(latest.bodyText) ?? latest.body),
        { draftId: latest.id, accountId: latest.accountId, threadId: latest.threadId || undefined }
      );
      return;
    }
    setSelectedThread(thread);
    if (latest && !latest.isRead && latest.accountId && activeFolder !== "drafts") {
      markRead.mutate({ messageId: latest.id, isRead: true, accountId: latest.accountId });
    }
  };

  const archive = api.mail.archive.useMutation();
  const [threadActionPending, setThreadActionPending] = useState(false);

  /** Mark Read marks every unread message in the conversation; Mark Unread flags the newest. */
  const handleToggleReadStatus = async (_threadId: string, hasUnread: boolean) => {
    if (!displayedThread) return;
    const targets = hasUnread
      ? displayedThread.messages.filter((m) => !m.isRead)
      : displayedThread.latestMessage
        ? [displayedThread.latestMessage]
        : [];
    setThreadActionPending(true);
    try {
      await Promise.all(
        targets.map((m) =>
          markRead.mutateAsync({ messageId: m.id, isRead: hasUnread, accountId: m.accountId })
        )
      );
      void utils.mail.getThread.invalidate();
      if (!hasUnread) setSelectedThread(null);
    } catch (err) {
      console.error("Failed to update read status:", err);
    } finally {
      setThreadActionPending(false);
    }
  };

  /** Archives every message of the open conversation, then closes it. */
  const handleArchiveThread = async () => {
    if (!displayedThread || threadActionPending) return;
    setThreadActionPending(true);
    try {
      await Promise.all(
        displayedThread.messages.map((m) =>
          archive.mutateAsync({ messageId: m.id, accountId: m.accountId })
        )
      );
      setSelectedThread(null);
      void utils.mail.getInbox.invalidate();
      void utils.mail.getFolders.invalidate();
    } catch (err) {
      console.error("Failed to archive conversation:", err);
    } finally {
      setThreadActionPending(false);
    }
  };

  const handleRefresh = () => {
    void utils.account.getAccounts.invalidate();
    void utils.mail.getThread.invalidate();
    void utils.mail.getInbox.invalidate();
    void utils.mail.searchEmails.invalidate();
    void utils.mail.getFolders.invalidate();
  };

  const rawThreads: EmailThread[] = conversations.map(({ latest: msg, unread, count }) => ({
    id: msg.threadId || msg.id,
    subject: msg.subject,
    participants: [msg.from, ...msg.to],
    messages: [msg],
    latestMessage: msg,
    messageCount: count,
    unreadCount: unread,
    lastActivityAt: msg.receivedAt,
    lastActivity: msg.receivedAt,
    metadata: {
      messageCount: count,
      hasAttachments: msg.attachments.length > 0,
      labels: msg.flags,
      provider: msg.accountEmail,
    },
  }));

  const handleOpenCompose = (
    to = "",
    subject = "",
    body = "",
    reply?: { messageId?: string; threadId?: string; accountId?: string; draftId?: string }
  ) => {
    setComposeTo(to);
    setComposeSubject(subject);
    setComposeBody(body);
    setComposeReplyToMessageId(reply?.messageId);
    setComposeThreadId(reply?.threadId);
    setComposeDraftId(reply?.draftId);
    setComposeAccountId(reply?.accountId ?? selectedAccountId);
    setIsComposeOpen(true);
  };

  const handleReplyToMessage = (message: NormalizedMessage, isReplyAll = false) => {
    const recipients = isReplyAll
      ? [message.from, ...message.to]
          .map((r) => r.address)
          .filter((addr) => Boolean(addr))
          .join(", ")
      : message.from.address;

    const replySubject = message.subject.toLowerCase().startsWith("re:")
      ? message.subject
      : `Re: ${message.subject}`;

    const replyPrefix = `\n\n---------------\nOn ${message.receivedAt}, ${
      message.from.name ?? message.from.address
    } wrote:\n> ${message.snippet}`;

    handleOpenCompose(recipients, replySubject, replyPrefix, {
      messageId: message.id,
      threadId: message.threadId || undefined,
      accountId: message.accountId,
    });
  };

  const handleUseGeneratedReply = (replyText: string, subject?: string) => {
    if (!displayedThread) return;
    const latestMessage = displayedThread.latestMessage;
    const to = latestMessage?.from.address ?? "";
    const replySubject = subject ?? (displayedThread.subject.toLowerCase().startsWith("re:")
      ? displayedThread.subject
      : `Re: ${displayedThread.subject}`);

    handleOpenCompose(to, replySubject, replyText, {
      messageId: latestMessage?.id,
      threadId: nonEmpty(latestMessage?.threadId),
      accountId: latestMessage?.accountId,
    });
  };

  const handleTriggerCopilotTool = (tool: "summarize" | "intelligence" | "extract") => {
    setShowCopilot(true);
    if (tool === "summarize") setCopilotDefaultTab("summarize");
    if (tool === "intelligence") setCopilotDefaultTab("intelligence");
    if (tool === "extract") setCopilotDefaultTab("action-items");
  };

  return (
    <div className="relative flex h-full w-full overflow-hidden bg-slate-100">
      {/* Drawer backdrop (phones / tablets) */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-950/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* 1. Left Sidebar Navigation: static on desktop, slide-in drawer below lg */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[min(17rem,85vw)] flex-col border-r border-slate-800 bg-slate-900 text-white transition-transform duration-200 lg:static lg:z-auto lg:w-64 lg:shrink-0 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-extrabold text-lg text-blue-400">
            <Mail className="h-6 w-6" />
            <span>E-MassCom</span>
          </Link>
          <span className="hidden lg:inline text-[0.625rem] font-mono uppercase bg-blue-950 text-blue-400 px-2 py-0.5 rounded border border-blue-800">
            v2.0
          </span>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden rounded-md p-1 text-slate-400 hover:bg-slate-800 hover:text-white"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-4 space-y-4">
          <AccountSwitcher
            selectedAccountId={selectedAccountId}
            onSelectAccount={handleSelectAccount}
          />

          <Button
            onClick={() => {
              setSidebarOpen(false);
              handleOpenCompose();
            }}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold h-11 shadow-lg shadow-blue-900/40 gap-2"
          >
            <Plus className="h-5 w-5" />
            Compose Email
          </Button>
        </div>

        {/* Navigation Folders: every system folder, category and label on the mailbox */}
        <nav className="flex-1 px-3 space-y-1 overflow-y-auto pb-4">
          {foldersQuery.isLoading && (
            <div className="px-3 py-2 text-xs text-slate-500">Loading folders...</div>
          )}
          {foldersQuery.isError && (
            <button
              onClick={() => void foldersQuery.refetch()}
              className="w-full px-3 py-2 text-left text-xs text-red-400 hover:text-red-300"
            >
              Couldn&apos;t load folders. Retry
            </button>
          )}

          {systemFolders.map((folder) => (
            <FolderButton
              key={folder.key}
              label={folder.name}
              icon={ROLE_ICONS[folder.role ?? ""] ?? Tag}
              count={folder.role && SHOW_UNREAD_FOR.has(folder.role) ? folder.unreadCount : undefined}
              isActive={activeFolder === folder.key}
              onClick={() => {
                setActiveFolder(folder.key);
                setSelectedThread(null);
                setSidebarOpen(false);
              }}
            />
          ))}

          {categoryFolders.length > 0 && (
            <div className="pt-4 pb-1 px-3 text-[0.625rem] font-semibold uppercase tracking-wider text-slate-500">
              Categories
            </div>
          )}
          {categoryFolders.map((folder) => (
            <FolderButton
              key={folder.key}
              label={folder.name}
              icon={Tags}
              count={folder.unreadCount}
              isActive={activeFolder === folder.key}
              onClick={() => {
                setActiveFolder(folder.key);
                setSelectedThread(null);
                setSidebarOpen(false);
              }}
            />
          ))}

          {labelFolders.length > 0 && (
            <div className="pt-4 pb-1 px-3 text-[0.625rem] font-semibold uppercase tracking-wider text-slate-500">
              Labels
            </div>
          )}
          {labelFolders.map((folder) => (
            <FolderButton
              key={folder.key}
              label={folder.name}
              icon={Tag}
              count={folder.unreadCount}
              isActive={activeFolder === folder.key}
              onClick={() => {
                setActiveFolder(folder.key);
                setSelectedThread(null);
                setSidebarOpen(false);
              }}
            />
          ))}

          {!selectedAccountId && !foldersQuery.isLoading && (accounts?.length ?? 0) > 1 && (
            <p className="px-3 pt-4 text-[0.6875rem] leading-snug text-slate-500">
              Pick a single account to see its labels.
            </p>
          )}
        </nav>

        {/* User Footer / Sign Out */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/60">
          <form action="/api/auth/signout" method="post">
            <Button
              type="submit"
              variant="ghost"
              className="w-full justify-start gap-2 text-slate-400 hover:text-red-400 hover:bg-slate-900 text-xs font-medium"
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </Button>
          </form>
        </div>
      </aside>

      {/* 2. Middle Column: Thread List */}
      {/* Phones show one pane at a time: the list, or the open conversation. */}
      <main
        className={`${
          selectedThread ? "hidden md:flex" : "flex"
        } w-full min-w-0 flex-col bg-white md:w-80 md:shrink-0 md:border-r md:border-slate-200 lg:w-[22rem] 2xl:w-[26rem]`}
      >
        <div className="h-12 shrink-0 border-b border-slate-100 px-3 sm:px-4 flex items-center justify-between gap-2">
          <div className="flex min-w-0 items-center gap-2">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden -ml-1 rounded-md p-1.5 text-slate-600 hover:bg-slate-100"
              aria-label="Open folders"
            >
              <Menu className="h-5 w-5" />
            </button>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 truncate">
              {isSearching ? "Search results" : activeFolderName}
            </span>
          </div>
          <div className="flex shrink-0 items-center gap-1">
            <button
              onClick={() => handleOpenCompose()}
              title="Compose"
              aria-label="Compose"
              className="lg:hidden rounded-md p-1.5 text-blue-600 hover:bg-blue-50"
            >
              <PenSquare className="h-4 w-4" />
            </button>
            <button
              onClick={handleRefresh}
              title="Refresh"
              aria-label="Refresh"
              className="rounded-md p-1.5 text-slate-400 hover:text-blue-600"
            >
              <RefreshCw className={`h-4 w-4 ${activeQuery.isFetching ? "animate-spin" : ""}`} />
            </button>
          </div>
        </div>
        {brokenAccounts.length > 0 && (
          <div className="shrink-0 border-b border-amber-200 bg-amber-50 px-4 py-2 text-xs text-amber-900 flex items-start gap-2">
            <AlertTriangle className="h-4 w-4 shrink-0 text-amber-600" />
            <div className="min-w-0">
              <p className="font-semibold break-all">
                {brokenAccounts.map((a) => a.email).join(", ")}{" "}
                {brokenAccounts.length === 1 ? "needs" : "need"} to be reconnected
              </p>
              <p className="text-amber-800">
                Nylas no longer accepts this connection.{" "}
                <button
                  disabled={connecting}
                  onClick={() =>
                    void handleConnect(brokenAccounts[0]?.connector === "microsoft" ? "Office365" : "Google")
                  }
                  className="font-semibold underline"
                >
                  Reconnect
                </button>{" "}
                or{" "}
                <button
                  disabled={removeAccount.isPending}
                  onClick={() => {
                    for (const a of brokenAccounts) removeAccount.mutate({ accountId: a.id });
                  }}
                  className="font-semibold underline"
                >
                  remove {brokenAccounts.length === 1 ? "it" : "them"}
                </button>
              </p>
            </div>
          </div>
        )}
        {connectError && (
          <div className="shrink-0 border-b border-red-200 bg-red-50 px-4 py-2 text-xs text-red-800 flex justify-between gap-2">
            <span>{connectError}</span>
            <button onClick={() => setConnectError(null)} className="font-semibold">
              Dismiss
            </button>
          </div>
        )}
        <ThreadList
          threads={rawThreads}
          selectedThreadId={selectedThread?.id}
          onSelectThread={handleSelectThread}
          searchQuery={searchQuery}
          onSearchChange={(q) => setSearchQuery(q)}
          isLoading={(isLoading && !hasNoAccounts) || accountsQuery.isLoading}
          isError={activeQuery.isError}
          errorMessage={activeQuery.error?.message}
          isFetchingMore={activeQuery.isFetchingNextPage}
          emptyState={
            hasNoAccounts ? (
              <div className="flex flex-col items-center gap-3">
                <Mail className="h-8 w-8 text-slate-300" />
                <span className="text-sm font-semibold text-slate-700">Connect your mailbox</span>
                <span className="text-xs text-slate-400 max-w-xs">
                  Link Gmail, Microsoft 365 or Outlook once. Inbox, Sent, Drafts, Spam, Trash and every
                  label load automatically and stay in sync.
                </span>
                <div className="flex flex-col gap-2 w-full max-w-[14rem]">
                  <Button size="sm" disabled={connecting} onClick={() => void handleConnect("Google")}>
                    Connect Google
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    disabled={connecting}
                    onClick={() => void handleConnect("Office365")}
                  >
                    Connect Microsoft / Outlook
                  </Button>
                </div>
              </div>
            ) : undefined
          }
          onRetry={() => void activeQuery.refetch()}
          hasMore={Boolean(activeQuery.hasNextPage)}
          onLoadMore={() => {
            if (activeQuery.hasNextPage && !activeQuery.isFetchingNextPage) {
              void activeQuery.fetchNextPage();
            }
          }}
          filterUnreadOnly={filterUnreadOnly}
          onToggleUnreadFilter={() => setFilterUnreadOnly(!filterUnreadOnly)}
        />
      </main>

      {/* 3. Right Column: Thread Reader & AI Copilot Panel */}
      <section
        className={`${selectedThread ? "flex" : "hidden md:flex"} min-w-0 flex-1 overflow-hidden bg-white`}
      >
        <div className="flex-1 flex flex-col min-w-0">
          {/* Main Top Header */}
          <div className="h-12 shrink-0 border-b border-slate-100 bg-slate-50/50 px-3 sm:px-4 flex items-center justify-between gap-2">
            <div className="flex min-w-0 items-center gap-2">
              <button
                onClick={() => setSelectedThread(null)}
                className="md:hidden -ml-1 rounded-md p-1.5 text-slate-600 hover:bg-slate-100"
                aria-label="Back to list"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <span className="truncate text-xs font-semibold uppercase tracking-wider text-slate-500">
                {displayedThread ? displayedThread.subject : "No conversation selected"}
              </span>
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowCopilot(!showCopilot)}
              className="shrink-0 text-xs gap-1.5 text-blue-600 hover:bg-blue-50 font-medium"
              aria-label={showCopilot ? "Hide AI Copilot" : "Show AI Copilot"}
            >
              {showCopilot ? <PanelRightClose className="h-4 w-4" /> : <PanelRightOpen className="h-4 w-4" />}
              <span className="hidden sm:inline">{showCopilot ? "Hide AI Copilot" : "Show AI Copilot"}</span>
            </Button>
          </div>

          <div className="flex-1 overflow-hidden">
            <ThreadView
              thread={displayedThread}
              onOpenReply={handleReplyToMessage}
              onTriggerCopilotTool={handleTriggerCopilotTool}
              onToggleReadStatus={activeFolder === "drafts" ? undefined : (id, unread) => void handleToggleReadStatus(id, unread)}
              onArchiveThread={
                activeFolder === "drafts" || activeFolder === "archive" || activeFolder === "all"
                  ? undefined
                  : () => void handleArchiveThread()
              }
            />
          </div>
        </div>

        {/* AI Copilot: docked on wide screens */}
        {showCopilot && isWide && (
          <aside className="flex w-80 shrink-0 flex-col 2xl:w-96">
            <AICopilotPanel
              thread={displayedThread}
              selectedMessage={displayedThread?.latestMessage ?? null}
              onUseGeneratedReply={handleUseGeneratedReply}
              defaultActiveTab={copilotDefaultTab}
            />
          </aside>
        )}
      </section>

      {/* AI Copilot: full-screen sheet on phones, right-hand overlay on tablets / small laptops */}
      {showCopilot && !isWide && (
        <>
          <div
            className="fixed inset-0 z-40 hidden bg-slate-950/40 sm:block"
            onClick={() => setShowCopilot(false)}
            aria-hidden="true"
          />
          <aside className="fixed inset-0 z-50 flex flex-col bg-white sm:inset-y-0 sm:left-auto sm:right-0 sm:w-[26rem] sm:max-w-[90vw] sm:border-l sm:border-slate-200">
            <div className="flex h-12 shrink-0 items-center justify-between border-b border-slate-100 px-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">AI Copilot</span>
              <button
                onClick={() => setShowCopilot(false)}
                className="rounded-md p-1.5 text-slate-500 hover:bg-slate-100"
                aria-label="Close AI Copilot"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="min-h-0 flex-1 overflow-hidden">
              <AICopilotPanel
                thread={displayedThread}
                selectedMessage={displayedThread?.latestMessage ?? null}
                onUseGeneratedReply={(text, subject) => {
                  setShowCopilot(false);
                  handleUseGeneratedReply(text, subject);
                }}
                defaultActiveTab={copilotDefaultTab}
              />
            </div>
          </aside>
        </>
      )}

      {/* 4. AI-Assisted Email Compose Modal */}
      <ComposeModal
        isOpen={isComposeOpen}
        onClose={() => setIsComposeOpen(false)}
        initialTo={composeTo}
        initialSubject={composeSubject}
        initialBody={composeBody}
        replyToMessageId={composeReplyToMessageId}
        threadId={composeThreadId}
        initialDraftId={composeDraftId}
        accountId={composeAccountId}
      />
    </div>
  );
}

function FolderButton({
  label,
  icon: Icon,
  count,
  isActive,
  onClick,
}: {
  label: string;
  icon: LucideIcon;
  count?: number;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
        isActive ? "bg-blue-600 text-white" : "text-slate-300 hover:bg-slate-800 hover:text-white"
      }`}
    >
      <div className="flex items-center gap-3 min-w-0">
        <Icon className="h-4 w-4 shrink-0" />
        <span className="truncate">{label}</span>
      </div>

      {count !== undefined && count > 0 && (
        <span
          className={`text-xs px-2 py-0.5 rounded-full font-bold ${
            isActive ? "bg-white text-blue-700" : "bg-blue-900 text-blue-300"
          }`}
        >
          {count}
        </span>
      )}
    </button>
  );
}

/** Plain-text version of an HTML draft body for the editor. */
function htmlToText(html: string): string {
  if (!/<[a-z][\s\S]*>/i.test(html)) return html;
  return html
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/(p|div|li|h[1-6])>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

/** Live CSS media-query match (false during SSR and the first client render). */
function useMediaQuery(query: string): boolean {
  return React.useSyncExternalStore(
    (onChange) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => false
  );
}

/** Treats "" as missing (Nylas returns empty strings for absent ids / bodies). */
function nonEmpty(value: string | undefined | null): string | undefined {
  return value === "" || value == null ? undefined : value;
}
