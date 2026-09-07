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
import {
  Mail,
  Inbox,
  Send,
  FileText,
  Archive,
  Trash2,
  LogOut,
  Plus,
  PanelRightClose,
  PanelRightOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  const [selectedAccountId, setSelectedAccountId] = useState<string | undefined>(undefined);
  const [selectedThread, setSelectedThread] = useState<EmailThread | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterUnreadOnly, setFilterUnreadOnly] = useState(false);
  const [activeFolder, setActiveFolder] = useState<"inbox" | "sent" | "drafts" | "archive" | "trash">("inbox");

  // AI Copilot Side Panel visibility
  const [showCopilot, setShowCopilot] = useState(true);
  const [copilotDefaultTab, setCopilotDefaultTab] = useState<
    "summarize" | "intelligence" | "reply" | "rewrite" | "action-items"
  >("summarize");

  // Compose Modal State
  const [isComposeOpen, setIsComposeOpen] = useState(false);
  const [composeTo, setComposeTo] = useState("");
  const [composeSubject, setComposeSubject] = useState("");
  const [composeBody, setComposeBody] = useState("");

  // Cursor & Page Accumulation State
  const [cursor, setCursor] = useState<string | undefined>(undefined);
  const [accumulatedMessages, setAccumulatedMessages] = useState<NormalizedMessage[]>([]);

  // Reset pagination state when filters, folders, or account selection change
  React.useEffect(() => {
    setCursor(undefined);
    setAccumulatedMessages([]);
  }, [selectedAccountId, activeFolder, searchQuery]);

  // tRPC Inbox Query with Cursor Pagination
  const inboxQuery = api.mail.getInbox.useQuery(
    {
      accountId: selectedAccountId,
      cursor,
      limit: 15,
      folderId: activeFolder,
    },
    { enabled: !searchQuery }
  );

  // tRPC Search Query with Cursor Pagination
  const searchQueryResult = api.mail.searchEmails.useQuery(
    {
      query: searchQuery,
      accountId: selectedAccountId,
      cursor,
      limit: 15,
    },
    { enabled: Boolean(searchQuery.trim()) }
  );

  const rawResponse = searchQuery ? searchQueryResult.data : inboxQuery.data;
  const nextCursor = rawResponse?.nextCursor;
  const isLoading = searchQuery ? searchQueryResult.isLoading : inboxQuery.isLoading;

  // Accrue messages into state while avoiding duplicate items
  React.useEffect(() => {
    if (rawResponse?.items) {
      setAccumulatedMessages((prev) => {
        const existingIds = new Set(prev.map((m) => m.id));
        const newItems = rawResponse.items.filter((m) => !existingIds.has(m.id));
        return [...prev, ...newItems];
      });
    }
  }, [rawResponse]);

  const messages: NormalizedMessage[] = accumulatedMessages.length > 0 ? accumulatedMessages : (rawResponse?.items ?? []);

  const rawThreads: EmailThread[] = messages.map((msg) => ({
    id: msg.threadId || msg.id,
    subject: msg.subject,
    participants: [msg.from, ...msg.to],
    messages: [msg],
    latestMessage: msg,
    messageCount: 1,
    unreadCount: msg.isRead ? 0 : 1,
    lastActivityAt: msg.receivedAt,
    lastActivity: msg.receivedAt,
    metadata: {
      messageCount: 1,
      hasAttachments: msg.attachments.length > 0,
      labels: msg.flags,
    },
  }));

  const handleOpenCompose = (to = "", subject = "", body = "") => {
    setComposeTo(to);
    setComposeSubject(subject);
    setComposeBody(body);
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

    handleOpenCompose(recipients, replySubject, replyPrefix);
  };

  const handleUseGeneratedReply = (replyText: string, subject?: string) => {
    if (!selectedThread) return;
    const latestMessage = selectedThread.latestMessage;
    const to = latestMessage?.from.address ?? "";
    const replySubject = subject ?? (selectedThread.subject.toLowerCase().startsWith("re:")
      ? selectedThread.subject
      : `Re: ${selectedThread.subject}`);

    handleOpenCompose(to, replySubject, replyText);
  };

  const handleTriggerCopilotTool = (tool: "summarize" | "intelligence" | "extract") => {
    setShowCopilot(true);
    if (tool === "summarize") setCopilotDefaultTab("summarize");
    if (tool === "intelligence") setCopilotDefaultTab("intelligence");
    if (tool === "extract") setCopilotDefaultTab("action-items");
  };

  return (
    <div className="flex h-full w-full overflow-hidden bg-slate-100">
      {/* 1. Left Sidebar Navigation */}
      <aside className="w-64 flex-col bg-slate-900 text-white flex shrink-0 border-r border-slate-800">
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-extrabold text-lg text-blue-400">
            <Mail className="h-6 w-6" />
            <span>E-MassCom</span>
          </Link>
          <span className="text-[10px] font-mono uppercase bg-blue-950 text-blue-400 px-2 py-0.5 rounded border border-blue-800">
            v2.0
          </span>
        </div>

        <div className="p-4 space-y-4">
          <AccountSwitcher
            selectedAccountId={selectedAccountId}
            onSelectAccount={(id) => {
              setSelectedAccountId(id);
              setSelectedThread(null);
            }}
          />

          <Button
            onClick={() => handleOpenCompose()}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold h-11 shadow-lg shadow-blue-900/40 gap-2"
          >
            <Plus className="h-5 w-5" />
            Compose Email
          </Button>
        </div>

        {/* Navigation Folders */}
        <nav className="flex-1 px-3 space-y-1 overflow-y-auto">
          {[
            { id: "inbox", label: "Inbox", icon: Inbox, count: rawThreads.filter((t) => t.unreadCount > 0).length },
            { id: "sent", label: "Sent", icon: Send },
            { id: "drafts", label: "Drafts", icon: FileText },
            { id: "archive", label: "Archive", icon: Archive },
            { id: "trash", label: "Trash", icon: Trash2 },
          ].map((item) => {
            const Icon = item.icon;
            const isActive = activeFolder === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setActiveFolder(item.id as typeof activeFolder)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </div>

                {item.count !== undefined && item.count > 0 && (
                  <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                    isActive ? "bg-white text-blue-700" : "bg-blue-900 text-blue-300"
                  }`}>
                    {item.count}
                  </span>
                )}
              </button>
            );
          })}
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
      <main className="w-80 lg:w-96 flex shrink-0 flex-col bg-white">
        <ThreadList
          threads={rawThreads}
          selectedThreadId={selectedThread?.id}
          onSelectThread={(t) => setSelectedThread(t)}
          searchQuery={searchQuery}
          onSearchChange={(q) => setSearchQuery(q)}
          isLoading={isLoading}
          hasMore={Boolean(nextCursor)}
          onLoadMore={() => {
            if (nextCursor) {
              setCursor(nextCursor);
            }
          }}
          filterUnreadOnly={filterUnreadOnly}
          onToggleUnreadFilter={() => setFilterUnreadOnly(!filterUnreadOnly)}
        />
      </main>

      {/* 3. Right Column: Thread Reader & AI Copilot Panel */}
      <section className="flex flex-1 overflow-hidden bg-white">
        <div className="flex-1 flex flex-col min-w-0">
          {/* Main Top Header */}
          <div className="h-12 border-b border-slate-100 bg-slate-50/50 px-4 flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              {selectedThread ? selectedThread.subject : "No conversation selected"}
            </span>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowCopilot(!showCopilot)}
              className="text-xs gap-1.5 text-blue-600 hover:bg-blue-50 font-medium"
            >
              {showCopilot ? <PanelRightClose className="h-4 w-4" /> : <PanelRightOpen className="h-4 w-4" />}
              {showCopilot ? "Hide AI Copilot" : "Show AI Copilot"}
            </Button>
          </div>

          <div className="flex-1 overflow-hidden">
            <ThreadView
              thread={selectedThread}
              onOpenReply={handleReplyToMessage}
              onTriggerCopilotTool={handleTriggerCopilotTool}
            />
          </div>
        </div>

        {/* AI Copilot Resizable Side Drawer */}
        {showCopilot && (
          <aside className="w-80 lg:w-96 flex shrink-0 flex-col">
            <AICopilotPanel
              thread={selectedThread}
              selectedMessage={selectedThread?.latestMessage ?? null}
              onUseGeneratedReply={handleUseGeneratedReply}
              defaultActiveTab={copilotDefaultTab}
            />
          </aside>
        )}
      </section>

      {/* 4. AI-Assisted Email Compose Modal */}
      <ComposeModal
        isOpen={isComposeOpen}
        onClose={() => setIsComposeOpen(false)}
        initialTo={composeTo}
        initialSubject={composeSubject}
        initialBody={composeBody}
        accountId={selectedAccountId}
      />
    </div>
  );
}
