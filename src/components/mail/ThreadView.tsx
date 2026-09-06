"use client";

import React, { useState } from "react";
import type { EmailThread, NormalizedMessage } from "@/lib/email-normalizer";
import { format } from "date-fns";
import {
  Reply,
  ReplyAll,
  Paperclip,
  Sparkles,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface ThreadViewProps {
  thread: EmailThread | null;
  onOpenReply: (message: NormalizedMessage, isReplyAll?: boolean) => void;
  _onArchiveThread?: (threadId: string) => void;
  _onToggleReadStatus?: (threadId: string, currentStatus: boolean) => void;
  onTriggerCopilotTool?: (tool: "summarize" | "intelligence" | "extract") => void;
}

export function ThreadView({
  thread,
  onOpenReply,
  _onArchiveThread,
  _onToggleReadStatus,
  onTriggerCopilotTool,
}: ThreadViewProps) {
  const [collapsedMessageIds, setCollapsedMessageIds] = useState<Set<string>>(new Set());

  if (!thread) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-3 bg-slate-50/30 p-8 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
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

  const latestMessage = thread.latestMessage;

  return (
    <div className="flex h-full flex-col bg-white">
      {/* Thread Header Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 p-4 sm:px-6">
        <div className="flex items-center gap-2 min-w-0">
          <h2 className="text-xl font-bold text-slate-900 truncate">
            {thread.subject}
          </h2>
          {thread.unreadCount > 0 && (
            <Badge className="bg-blue-600 text-white hover:bg-blue-600 text-[10px]">Unread</Badge>
          )}
        </div>

        <div className="flex items-center gap-2">
          {onTriggerCopilotTool && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onTriggerCopilotTool("summarize")}
              className="gap-1.5 border-blue-200 text-blue-600 hover:bg-blue-50 font-medium text-xs"
            >
              <Sparkles className="h-3.5 w-3.5" />
              AI Summary
            </Button>
          )}

          {latestMessage && (
            <Button
              variant="default"
              size="sm"
              onClick={() => onOpenReply(latestMessage)}
              className="gap-1.5 bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs shadow-sm"
            >
              <Reply className="h-3.5 w-3.5" />
              Reply
            </Button>
          )}
        </div>
      </div>

      {/* Messages Feed */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
        {thread.messages.map((message, index) => {
          const isLast = index === thread.messages.length - 1;
          const isCollapsed = collapsedMessageIds.has(message.id);
          const senderInitials = (message.from.name ?? message.from.address)
            .slice(0, 2)
            .toUpperCase();

          const formattedDate = (() => {
            try {
              return format(new Date(message.receivedAt), "PPP 'at' p");
            } catch {
              return message.receivedAt;
            }
          })();

          return (
            <div
              key={message.id}
              className={`rounded-2xl border transition-all ${
                isLast
                  ? "border-blue-100 bg-white shadow-sm ring-1 ring-blue-50"
                  : "border-slate-100 bg-slate-50/50"
              }`}
            >
              {/* Message Header */}
              <div
                onClick={() => toggleMessageCollapse(message.id)}
                className="flex items-center justify-between p-4 cursor-pointer select-none"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <Avatar className="h-9 w-9 bg-blue-100 text-blue-700 font-bold">
                    <AvatarFallback className="bg-blue-100 text-blue-700 text-xs">
                      {senderInitials}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex flex-col min-w-0">
                    <span className="font-semibold text-slate-900 text-sm truncate">
                      {message.from.name ?? message.from.address}
                    </span>
                    <span className="text-xs text-slate-500 truncate">
                      To: {message.to.map((t) => t.name ?? t.address).join(", ")}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-xs text-slate-400 font-mono">
                    {formattedDate}
                  </span>
                  {isCollapsed ? (
                    <ChevronDown className="h-4 w-4 text-slate-400" />
                  ) : (
                    <ChevronUp className="h-4 w-4 text-slate-400" />
                  )}
                </div>
              </div>

              {/* Message Body Content */}
              {!isCollapsed && (
                <div className="border-t border-slate-100 p-4 sm:p-6 space-y-4">
                  <div
                    className="prose prose-slate max-w-none text-sm leading-relaxed whitespace-pre-wrap text-slate-800"
                    dangerouslySetInnerHTML={{
                      __html: message.body.includes("<")
                        ? message.body
                        : message.body.replace(/\n/g, "<br/>"),
                    }}
                  />

                  {/* Attachments */}
                  {message.attachments.length > 0 && (
                    <div className="pt-4 border-t border-slate-100 space-y-2">
                      <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                        Attachments ({message.attachments.length})
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {message.attachments.map((att) => (
                          <div
                            key={att.id ?? att.name}
                            className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs text-slate-700 font-medium"
                          >
                            <Paperclip className="h-3.5 w-3.5 text-slate-400" />
                            <span>{att.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Reply Button Footer */}
                  <div className="pt-2 flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onOpenReply(message, false)}
                      className="gap-1.5 text-xs font-medium text-slate-700"
                    >
                      <Reply className="h-3.5 w-3.5" />
                      Reply
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onOpenReply(message, true)}
                      className="gap-1.5 text-xs font-medium text-slate-700"
                    >
                      <ReplyAll className="h-3.5 w-3.5" />
                      Reply All
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
