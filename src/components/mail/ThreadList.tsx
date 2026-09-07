"use client";

import React, { useState, useEffect, useRef } from "react";
import type { EmailThread } from "@/lib/email-normalizer";
import { formatDistanceToNow } from "date-fns";
import {
  Search,
  Mail,
  Paperclip,
  Circle,
  Loader2,
  AlertCircle,
  RefreshCw,
  XCircle,
  Inbox,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

interface ThreadListProps {
  threads: EmailThread[];
  selectedThreadId?: string;
  onSelectThread: (thread: EmailThread) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  isLoading: boolean;
  isError?: boolean;
  onRetry?: () => void;
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
  isError = false,
  onRetry,
  hasMore,
  onLoadMore,
  filterUnreadOnly,
  onToggleUnreadFilter,
}: ThreadListProps) {
  // Debounced search input state
  const [localSearch, setLocalSearch] = useState(searchQuery);
  const isFirstRender = useRef(true);

  // Sync internal local state if parent searchQuery changes externally
  useEffect(() => {
    setLocalSearch(searchQuery);
  }, [searchQuery]);

  // Debounce search updates to prevent unnecessary network requests on every keypress
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const timer = setTimeout(() => {
      if (localSearch !== searchQuery) {
        onSearchChange(localSearch);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [localSearch, searchQuery, onSearchChange]);

  const filteredThreads = filterUnreadOnly
    ? threads.filter((t) => t.unreadCount > 0)
    : threads;

  const totalUnreadCount = threads.reduce((acc, t) => acc + (t.unreadCount > 0 ? 1 : 0), 0);

  return (
    <div className="flex h-full flex-col bg-white border-r border-slate-200">
      {/* Search & Filter Header */}
      <div className="p-4 border-b border-slate-100 space-y-3 bg-white">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <Input
            type="text"
            placeholder="Search emails or recipients..."
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            className="pl-9 pr-8 bg-slate-50 border-slate-200 focus:bg-white text-xs h-9 transition-colors"
          />
          {localSearch && (
            <button
              type="button"
              onClick={() => {
                setLocalSearch("");
                onSearchChange("");
              }}
              className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600"
            >
              <XCircle className="h-4 w-4" />
            </button>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg border border-slate-200/60">
            <Button
              variant={!filterUnreadOnly ? "secondary" : "ghost"}
              size="sm"
              onClick={() => filterUnreadOnly && onToggleUnreadFilter()}
              className={`text-xs h-6 px-2.5 font-medium rounded-md transition-all ${
                !filterUnreadOnly
                  ? "bg-white text-slate-900 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              All
            </Button>
            <Button
              variant={filterUnreadOnly ? "secondary" : "ghost"}
              size="sm"
              onClick={() => !filterUnreadOnly && onToggleUnreadFilter()}
              className={`text-xs h-6 px-2.5 font-medium rounded-md gap-1 transition-all ${
                filterUnreadOnly
                  ? "bg-white text-blue-600 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <span>Unread</span>
              {totalUnreadCount > 0 && (
                <Badge
                  variant="secondary"
                  className="text-[10px] h-4 px-1 bg-blue-100 text-blue-700 font-bold border-none"
                >
                  {totalUnreadCount}
                </Badge>
              )}
            </Button>
          </div>

          <span className="text-xs text-slate-400 font-mono">
            {filteredThreads.length} conversation{filteredThreads.length === 1 ? "" : "s"}
          </span>
        </div>
      </div>

      {/* Thread List Content */}
      <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
        {/* Error State */}
        {isError ? (
          <div className="p-6 text-center space-y-3">
            <div className="flex justify-center text-red-500">
              <AlertCircle className="h-8 w-8" />
            </div>
            <div className="space-y-1">
              <h4 className="text-xs font-bold text-slate-800">Failed to load emails</h4>
              <p className="text-[11px] text-slate-500">
                Please check your network connection and try again.
              </p>
            </div>
            {onRetry && (
              <Button
                size="sm"
                variant="outline"
                onClick={onRetry}
                className="text-xs h-7 gap-1 border-slate-200 text-slate-700"
              >
                <RefreshCw className="h-3 w-3" />
                Retry
              </Button>
            )}
          </div>
        ) : isLoading && threads.length === 0 ? (
          /* Loading Skeleton State */
          <div className="p-4 space-y-4">
            {[1, 2, 3, 4, 5].map((idx) => (
              <div key={idx} className="space-y-2">
                <div className="flex items-center justify-between">
                  <Skeleton className="h-4 w-32 bg-slate-200" />
                  <Skeleton className="h-3 w-12 bg-slate-100" />
                </div>
                <Skeleton className="h-4 w-48 bg-slate-200" />
                <Skeleton className="h-3 w-full bg-slate-100" />
              </div>
            ))}
          </div>
        ) : filteredThreads.length === 0 ? (
          /* Empty States */
          <div className="flex h-64 flex-col items-center justify-center gap-2 text-slate-400 p-6 text-center">
            {localSearch ? (
              <>
                <Search className="h-8 w-8 text-slate-300 mb-1" />
                <span className="text-sm font-semibold text-slate-700">No results found</span>
                <span className="text-xs text-slate-400 max-w-xs">
                  No conversations match &quot;{localSearch}&quot;. Try adjusting your search query.
                </span>
              </>
            ) : filterUnreadOnly ? (
              <>
                <Inbox className="h-8 w-8 text-slate-300 mb-1" />
                <span className="text-sm font-semibold text-slate-700">No unread emails</span>
                <span className="text-xs text-slate-400">
                  You are all caught up! Switch to &quot;All&quot; to view past conversations.
                </span>
              </>
            ) : (
              <>
                <Mail className="h-8 w-8 text-slate-300 mb-1" />
                <span className="text-sm font-semibold text-slate-700">Your inbox is empty</span>
                <span className="text-xs text-slate-400">
                  Connected accounts will sync incoming messages here automatically.
                </span>
              </>
            )}
          </div>
        ) : (
          /* Thread Items List */
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
                className={`group relative flex flex-col gap-1.5 p-4 cursor-pointer transition-all ${
                  isSelected
                    ? "bg-blue-50/70 border-l-4 border-blue-600 shadow-2xs"
                    : isUnread
                    ? "bg-slate-50/70 hover:bg-slate-100/60"
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

                  <span className="text-[11px] text-slate-400 shrink-0 font-mono">
                    {formattedTime}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-2">
                  <h4
                    className={`text-xs truncate ${
                      isUnread ? "font-bold text-slate-900" : "font-normal text-slate-700"
                    }`}
                  >
                    {thread.subject || "(No Subject)"}
                  </h4>

                  {thread.metadata.hasAttachments && (
                    <Paperclip className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                  )}
                </div>

                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                  {thread.latestMessage?.snippet ?? "No message preview available"}
                </p>

                <div className="flex items-center justify-between mt-1">
                  {thread.metadata.messageCount > 1 ? (
                    <Badge variant="outline" className="text-[10px] h-4 px-1.5 font-normal text-slate-500 bg-white">
                      {thread.metadata.messageCount} messages
                    </Badge>
                  ) : <span />}

                  {isUnread && thread.unreadCount > 1 && (
                    <Badge className="text-[10px] h-4 px-1.5 bg-blue-600 text-white font-semibold">
                      {thread.unreadCount} unread
                    </Badge>
                  )}
                </div>
              </div>
            );
          })
        )}

        {/* Cursor Pagination Load More Trigger */}
        {hasMore && (
          <div className="p-4 text-center bg-white border-t border-slate-100">
            <Button
              variant="ghost"
              size="sm"
              onClick={onLoadMore}
              disabled={isLoading}
              className="text-xs text-blue-600 hover:text-blue-700 w-full gap-1.5"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin text-blue-600" />
                  <span>Loading older messages...</span>
                </>
              ) : (
                <span>Load older conversations</span>
              )}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
