"use client";

import React from "react";
import type { EmailThread } from "@/lib/email-normalizer";
import { formatDistanceToNow } from "date-fns";
import { Search, Mail, Paperclip, Circle, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ThreadListProps {
  threads: EmailThread[];
  selectedThreadId?: string;
  onSelectThread: (thread: EmailThread) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  isLoading: boolean;
  hasMore: boolean;
  onLoadMore: () => void;
  filterUnreadOnly: boolean;
  onToggleUnreadFilter: () => void;
}

export function ThreadList({
  threads,
  selectedThreadId,
  onSelectThread,
  searchQuery,
  onSearchChange,
  isLoading,
  hasMore,
  onLoadMore,
  filterUnreadOnly,
  onToggleUnreadFilter,
}: ThreadListProps) {
  const filteredThreads = filterUnreadOnly
    ? threads.filter((t) => t.unreadCount > 0)
    : threads;

  return (
    <div className="flex h-full flex-col bg-white border-r border-slate-200">
      {/* Search Header */}
      <div className="p-4 border-b border-slate-100 space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
          <Input
            type="text"
            placeholder="Search emails or prompt AI..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-9 bg-slate-50 border-slate-200 focus:bg-white transition-colors"
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Button
              variant={!filterUnreadOnly ? "secondary" : "ghost"}
              size="sm"
              onClick={onToggleUnreadFilter}
              className="text-xs h-7 px-2.5 font-medium"
            >
              All
            </Button>
            <Button
              variant={filterUnreadOnly ? "secondary" : "ghost"}
              size="sm"
              onClick={onToggleUnreadFilter}
              className="text-xs h-7 px-2.5 font-medium"
            >
              Unread
            </Button>
          </div>

          <span className="text-xs text-slate-400 font-mono">
            {filteredThreads.length} conversation{filteredThreads.length === 1 ? "" : "s"}
          </span>
        </div>
      </div>

      {/* Thread List Content */}
      <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
        {isLoading && threads.length === 0 ? (
          <div className="flex h-64 flex-col items-center justify-center gap-2 text-slate-400">
            <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
            <span className="text-xs">Fetching inbox messages...</span>
          </div>
        ) : filteredThreads.length === 0 ? (
          <div className="flex h-64 flex-col items-center justify-center gap-2 text-slate-400 p-6 text-center">
            <Mail className="h-8 w-8 text-slate-300" />
            <span className="text-sm font-medium text-slate-600">No emails found</span>
            <span className="text-xs text-slate-400">
              {searchQuery
                ? `No results for "${searchQuery}"`
                : "Your inbox is clear and up to date."}
            </span>
          </div>
        ) : (
          filteredThreads.map((thread) => {
            const isSelected = thread.id === selectedThreadId;
            const isUnread = thread.unreadCount > 0;
            const participantNames = thread.participants
              .map((p) => p.name ?? p.address.split("@")[0])
              .join(", ");

            const formattedTime = (() => {
              try {
                return formatDistanceToNow(new Date(thread.lastActivity), { addSuffix: true });
              } catch {
                return thread.lastActivity;
              }
            })();

            return (
              <div
                key={thread.id}
                onClick={() => onSelectThread(thread)}
                className={`group relative flex flex-col gap-1.5 p-4 cursor-pointer transition-colors ${
                  isSelected
                    ? "bg-blue-50/70 border-l-4 border-blue-600"
                    : isUnread
                    ? "bg-slate-50/50 hover:bg-slate-100/60"
                    : "hover:bg-slate-50/80"
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    {isUnread && (
                      <Circle className="h-2 w-2 fill-blue-600 text-blue-600 shrink-0" />
                    )}
                    <span
                      className={`text-sm truncate ${
                        isUnread ? "font-bold text-slate-900" : "font-medium text-slate-700"
                      }`}
                    >
                      {participantNames || "Unknown Sender"}
                    </span>
                  </div>

                  <span className="text-xs text-slate-400 shrink-0 font-mono">
                    {formattedTime}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-2">
                  <h4
                    className={`text-sm truncate ${
                      isUnread ? "font-semibold text-slate-900" : "font-normal text-slate-700"
                    }`}
                  >
                    {thread.subject}
                  </h4>

                  {thread.metadata.hasAttachments && (
                    <Paperclip className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                  )}
                </div>

                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                  {thread.latestMessage?.snippet ?? "No preview available"}
                </p>

                {thread.metadata.messageCount > 1 && (
                  <div className="flex items-center gap-1 mt-1">
                    <Badge variant="outline" className="text-[10px] h-4 px-1.5 font-normal text-slate-500">
                      {thread.metadata.messageCount} messages
                    </Badge>
                  </div>
                )}
              </div>
            );
          })
        )}

        {hasMore && (
          <div className="p-4 text-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={onLoadMore}
              disabled={isLoading}
              className="text-xs text-blue-600 hover:text-blue-700 w-full"
            >
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Load older messages"}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
