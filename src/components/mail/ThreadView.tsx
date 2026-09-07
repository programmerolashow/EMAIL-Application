"use client";

import React, { useState, useEffect } from "react";
import type { EmailThread, NormalizedMessage } from "@/lib/email-normalizer";
import { format } from "date-fns";
import {
  Reply,
  ReplyAll,
  Paperclip,
  Sparkles,
  ChevronDown,
  ChevronUp,
  User,
  Clock,
  Archive,
  MailCheck,
  Mail,
  FileText,
  Maximize2,
  Minimize2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface ThreadViewProps {
  thread: EmailThread | null;
  onOpenReply: (message: NormalizedMessage, isReplyAll?: boolean) => void;
  onArchiveThread?: (threadId: string) => void;
  onToggleReadStatus?: (threadId: string, currentStatus: boolean) => void;
  onTriggerCopilotTool?: (tool: "summarize" | "intelligence" | "extract") => void;
}

export function ThreadView({
  thread,
  onOpenReply,
  onArchiveThread,
  onToggleReadStatus,
  onTriggerCopilotTool,
}: ThreadViewProps) {
  // Collapsed message IDs set for managing long conversation feeds
  const [collapsedMessageIds, setCollapsedMessageIds] = useState<Set<string>>(new Set());

  // Automatically collapse all older messages by default on new thread selection, keeping latest expanded
  useEffect(() => {
    if (thread && thread.messages.length > 1) {
      const initialCollapsed = new Set<string>();
      // Collapse all except the last message
      for (let i = 0; i < thread.messages.length - 1; i++) {
        const msg = thread.messages[i];
        if (msg) {
          initialCollapsed.add(msg.id);
        }
      }
      setCollapsedMessageIds(initialCollapsed);
    } else {
      setCollapsedMessageIds(new Set());
    }
  }, [thread?.id, thread]);

  if (!thread) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-3 bg-slate-50/30 p-8 text-center border-l border-slate-100">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 shadow-xs">
          <Sparkles className="h-8 w-8" />
        </div>
        <h3 className="text-lg font-bold text-slate-800">Select a conversation</h3>
        <p className="max-w-sm text-sm text-slate-500">
          Choose an email from your inbox list to read messages and access AI Copilot features.
        </p>
      </div>
    );
  }

  const toggleMessageCollapse = (id: string) => {
    setCollapsedMessageIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const isAllCollapsed = collapsedMessageIds.size === thread.messages.length;

  const toggleExpandAll = () => {
    if (isAllCollapsed || collapsedMessageIds.size > 0) {
      setCollapsedMessageIds(new Set());
    } else {
      const allIds = new Set(thread.messages.map((m) => m.id));
      setCollapsedMessageIds(allIds);
    }
  };

  const latestMessage = thread.latestMessage ?? thread.messages[thread.messages.length - 1];

  const formatFileSize = (bytes: number) => {
    if (!bytes) return "";
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="flex h-full flex-col bg-white">
      {/* Thread Header Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 p-4 sm:px-6 bg-white sticky top-0 z-10">
        <div className="flex flex-col min-w-0 space-y-1">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-slate-900 truncate">
              {thread.subject ?? "(No Subject)"}
            </h2>
            {thread.unreadCount > 0 ? (
              <Badge className="bg-blue-600 text-white hover:bg-blue-600 text-[10px] font-semibold">
                {thread.unreadCount} Unread
              </Badge>
            ) : (
              <Badge variant="outline" className="text-[10px] text-slate-500 font-normal">
                Read
              </Badge>
            )}
          </div>

          {/* Participants Summary */}
          <div className="flex items-center gap-1.5 text-xs text-slate-500 truncate">
            <User className="h-3.5 w-3.5 text-slate-400 shrink-0" />
            <span className="truncate">
              {thread.participants.map((p) => p.name ?? p.address).join(", ")}
            </span>
          </div>
        </div>

        {/* Toolbar Action Controls */}
        <div className="flex items-center gap-2">
          {thread.messages.length > 1 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleExpandAll}
              className="text-xs h-8 text-slate-600 hover:text-slate-900 gap-1"
              title={collapsedMessageIds.size > 0 ? "Expand all messages" : "Collapse all messages"}
            >
              {collapsedMessageIds.size > 0 ? (
                <>
                  <Maximize2 className="h-3.5 w-3.5 text-slate-500" />
                  <span>Expand All</span>
                </>
              ) : (
                <>
                  <Minimize2 className="h-3.5 w-3.5 text-slate-500" />
                  <span>Collapse All</span>
                </>
              )}
            </Button>
          )}

          {onToggleReadStatus && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onToggleReadStatus(thread.id, thread.unreadCount > 0)}
              className="h-8 text-xs text-slate-700 border-slate-200 gap-1.5"
              title="Toggle Read / Unread Status"
            >
              {thread.unreadCount > 0 ? (
                <>
                  <MailCheck className="h-3.5 w-3.5 text-emerald-600" />
                  <span>Mark Read</span>
                </>
              ) : (
                <>
                  <Mail className="h-3.5 w-3.5 text-blue-600" />
                  <span>Mark Unread</span>
                </>
              )}
            </Button>
          )}

          {onArchiveThread && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onArchiveThread(thread.id)}
              className="h-8 text-xs text-slate-700 border-slate-200 gap-1.5"
              title="Archive Conversation"
            >
              <Archive className="h-3.5 w-3.5 text-slate-500" />
              <span>Archive</span>
            </Button>
          )}

          {onTriggerCopilotTool && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onTriggerCopilotTool("summarize")}
              className="h-8 gap-1.5 border-blue-200 bg-blue-50/50 text-blue-700 hover:bg-blue-100 font-semibold text-xs"
            >
              <Sparkles className="h-3.5 w-3.5 text-blue-600" />
              <span>AI Summary</span>
            </Button>
          )}

          {latestMessage && (
            <Button
              variant="default"
              size="sm"
              onClick={() => onOpenReply(latestMessage)}
              className="h-8 gap-1.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-sm"
            >
              <Reply className="h-3.5 w-3.5" />
              <span>Reply</span>
            </Button>
          )}
        </div>
      </div>

      {/* Messages Feed */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-slate-50/30">
        {thread.messages.map((message, index) => {
          const isLast = index === thread.messages.length - 1;
          const isCollapsed = collapsedMessageIds.has(message.id);
          const senderName = message.from.name ?? message.from.address;
          const senderInitials = senderName.slice(0, 2).toUpperCase();

          const formattedDate = (() => {
            try {
              return format(new Date(message.receivedAt || message.sentAt), "PPP 'at' p");
            } catch {
              return message.receivedAt || message.sentAt;
            }
          })();

          return (
            <div
              key={message.id}
              className={`rounded-xl border transition-all ${
                isLast
                  ? "border-blue-200 bg-white shadow-sm ring-1 ring-blue-100"
                  : "border-slate-200 bg-white shadow-2xs"
              }`}
            >
              {/* Message Header */}
              <div
                onClick={() => toggleMessageCollapse(message.id)}
                className="flex items-center justify-between p-4 cursor-pointer select-none hover:bg-slate-50/60 rounded-t-xl transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <Avatar className="h-9 w-9 bg-blue-100 text-blue-700 font-bold shrink-0">
                    <AvatarFallback className="bg-blue-100 text-blue-700 text-xs font-bold">
                      {senderInitials}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex flex-col min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 text-sm truncate">
                        {senderName}
                      </span>
                      {message.isRead === false && (
                        <Badge className="bg-blue-600 text-white text-[9px] h-4 px-1">
                          New
                        </Badge>
                      )}
                    </div>
                    <span className="text-xs text-slate-500 truncate">
                      To: {message.to.map((t) => t.name ?? t.address).join(", ")}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <div className="flex items-center gap-1 text-xs text-slate-400 font-mono">
                    <Clock className="h-3 w-3" />
                    <span>{formattedDate}</span>
                  </div>
                  {isCollapsed ? (
                    <ChevronDown className="h-4 w-4 text-slate-400" />
                  ) : (
                    <ChevronUp className="h-4 w-4 text-slate-400" />
                  )}
                </div>
              </div>

              {/* Message Snippet when Collapsed */}
              {isCollapsed && message.snippet && (
                <div
                  onClick={() => toggleMessageCollapse(message.id)}
                  className="px-4 pb-3 text-xs text-slate-500 truncate cursor-pointer hover:text-slate-700"
                >
                  {message.snippet}
                </div>
              )}

              {/* Expanded Message Body & Details */}
              {!isCollapsed && (
                <div className="border-t border-slate-100 p-4 sm:p-6 space-y-4">
                  {/* Message Body Content */}
                  <div
                    className="prose prose-slate max-w-none text-sm leading-relaxed whitespace-pre-wrap text-slate-800 font-sans"
                    dangerouslySetInnerHTML={{
                      __html: message.body.includes("<")
                        ? message.body
                        : message.body.replace(/\n/g, "<br/>"),
                    }}
                  />

                  {/* Attachments Section */}
                  {message.attachments && message.attachments.length > 0 && (
                    <div className="pt-4 border-t border-slate-100 space-y-2">
                      <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-500">
                        <Paperclip className="h-3.5 w-3.5 text-slate-400" />
                        <span>Attachments ({message.attachments.length})</span>
                      </div>

                      <div className="flex flex-wrap gap-2 pt-1">
                        {message.attachments.map((att, attIdx) => (
                          <div
                            key={att.id || attIdx}
                            className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs text-slate-800 font-medium hover:bg-slate-100 transition-colors"
                          >
                            <FileText className="h-3.5 w-3.5 text-blue-600" />
                            <span className="truncate max-w-[180px]">{att.name ?? att.filename}</span>
                            {att.size > 0 && (
                              <span className="text-[10px] text-slate-400 font-mono">
                                ({formatFileSize(att.size)})
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Reply Action Buttons */}
                  <div className="pt-2 flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onOpenReply(message, false)}
                      className="gap-1.5 text-xs font-semibold text-slate-700 h-8 border-slate-200 hover:bg-slate-50"
                    >
                      <Reply className="h-3.5 w-3.5 text-blue-600" />
                      <span>Reply</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onOpenReply(message, true)}
                      className="gap-1.5 text-xs font-semibold text-slate-700 h-8 border-slate-200 hover:bg-slate-50"
                    >
                      <ReplyAll className="h-3.5 w-3.5 text-blue-600" />
                      <span>Reply All</span>
                    </Button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
