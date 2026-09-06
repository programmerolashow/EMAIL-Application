"use client";

import React, { useState } from "react";
import type { EmailThread, NormalizedMessage } from "@/lib/email-normalizer";
import { api } from "@/trpc/react";
import {
  Sparkles,
  CheckCircle,
  Clock,
  User,
  Wand2,
  RefreshCw,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";

interface AICopilotPanelProps {
  thread: EmailThread | null;
  selectedMessage: NormalizedMessage | null;
  onUseGeneratedReply: (replyText: string, subject?: string) => void;
  defaultActiveTab?: "summarize" | "intelligence" | "reply" | "rewrite" | "action-items";
}

type ReplyTone =
  | "Professional"
  | "Friendly"
  | "Concise"
  | "Detailed"
  | "Formal"
  | "Apologetic"
  | "Persuasive";

type RewriteOption =
  | "Make it more professional"
  | "Make it shorter"
  | "Make it friendlier"
  | "Fix grammar"
  | "Make it persuasive"
  | "Simplify it";

export function AICopilotPanel({
  thread,
  selectedMessage,
  onUseGeneratedReply,
  defaultActiveTab = "summarize",
}: AICopilotPanelProps) {
  const [activeTab, setActiveTab] = useState(defaultActiveTab);

  // Subtask 7.3 State: Reply Generation
  const [selectedTone, setSelectedTone] = useState<ReplyTone>("Professional");
  const [replyPrompt, setReplyPrompt] = useState("");

  // Subtask 7.4 State: Rewrite Draft
  const [rewriteInputText, setRewriteInputText] = useState("");
  const [selectedRewriteOption, setSelectedRewriteOption] =
    useState<RewriteOption>("Make it more professional");

  // Queries & Mutations
  const emailSummaryQuery = api.ai.summarizeEmail.useQuery(
    { messageId: selectedMessage?.id ?? "" },
    { enabled: Boolean(selectedMessage?.id) && activeTab === "summarize" }
  );

  const threadIntelligenceQuery = api.ai.getThreadIntelligence.useQuery(
    { threadId: thread?.id ?? "" },
    { enabled: Boolean(thread?.id) && activeTab === "intelligence" }
  );

  const actionItemsQuery = api.ai.extractActionItems.useQuery(
    { emailOrThreadId: thread?.id ?? selectedMessage?.id ?? "", isThread: Boolean(thread?.id) },
    { enabled: Boolean(thread?.id ?? selectedMessage?.id) && activeTab === "action-items" }
  );

  const generateReplyMutation = api.ai.generateReply.useMutation();
  const rewriteDraftMutation = api.ai.rewriteDraft.useMutation();

  const handleGenerateReply = async () => {
    if (!selectedMessage) return;
    try {
      const res = await generateReplyMutation.mutateAsync({
        messageId: selectedMessage.id,
        tone: selectedTone,
        prompt: replyPrompt,
      });
      onUseGeneratedReply(res.body, res.subject);
    } catch (err) {
      console.error("Failed to generate reply:", err);
    }
  };

  const handleRewriteDraft = async () => {
    if (!rewriteInputText.trim()) return;
    try {
      const res = await rewriteDraftMutation.mutateAsync({
        draftText: rewriteInputText,
        option: selectedRewriteOption,
      });
      setRewriteInputText(res);
    } catch (err) {
      console.error("Failed to rewrite draft:", err);
    }
  };

  if (!thread && !selectedMessage) {
    return (
      <div className="flex h-full flex-col items-center justify-center p-6 text-center text-slate-400 bg-slate-50/40 border-l border-slate-200">
        <Sparkles className="h-8 w-8 text-blue-500 mb-2" />
        <span className="text-sm font-semibold text-slate-700">AI Copilot</span>
        <span className="text-xs text-slate-400 max-w-xs mt-1">
          Select an email conversation to activate AI intelligence, summarization, and reply drafting.
        </span>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col bg-slate-50/50 border-l border-slate-200">
      {/* Copilot Header */}
      <div className="p-4 border-b border-slate-200 bg-white flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
            <Sparkles className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">AI Copilot</h3>
            <p className="text-[11px] text-slate-500">Privacy-preserving neural assistant</p>
          </div>
        </div>

        <Badge variant="outline" className="text-[10px] bg-blue-50 text-blue-700 border-blue-200">
          GPT-4o Ready
        </Badge>
      </div>

      {/* Feature Nav Tabs */}
      <div className="flex border-b border-slate-200 bg-white px-2 overflow-x-auto scrollbar-none">
        {[
          { id: "summarize", label: "Summary" },
          { id: "intelligence", label: "Intelligence" },
          { id: "reply", label: "Smart Reply" },
          { id: "rewrite", label: "Rewrite" },
          { id: "action-items", label: "Action Items" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={`px-3 py-2.5 text-xs font-semibold whitespace-nowrap border-b-2 transition-colors ${
              activeTab === tab.id
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Contents */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* SUBTASK 7.1: EMAIL SUMMARIZATION */}
        {activeTab === "summarize" && (
          <div className="space-y-4">
            {emailSummaryQuery.isLoading ? (
              <div className="flex h-40 items-center justify-center text-slate-400 gap-2">
                <Loader2 className="h-5 w-5 animate-spin text-blue-600" />
                <span className="text-xs">Analyzing email content...</span>
              </div>
            ) : emailSummaryQuery.data ? (
              <>
                <div className="rounded-xl border border-slate-200 bg-white p-4 space-y-2 shadow-sm">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-blue-600">
                    Executive Summary
                  </h4>
                  <p className="text-sm text-slate-800 leading-relaxed">
                    {emailSummaryQuery.data.summary}
                  </p>
                </div>

                <div className="rounded-xl border border-slate-200 bg-white p-4 space-y-2 shadow-sm">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600">
                    Key Highlights
                  </h4>
                  <ul className="space-y-1.5 text-xs text-slate-700">
                    {emailSummaryQuery.data.keyPoints.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle className="h-3.5 w-3.5 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-xl border border-slate-200 bg-white p-4 space-y-2 shadow-sm">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600">
                    Suggested Next Step
                  </h4>
                  <p className="text-xs text-slate-800 font-medium">
                    {emailSummaryQuery.data.suggestedNextStep}
                  </p>
                </div>
              </>
            ) : null}
          </div>
        )}

        {/* SUBTASK 7.2: THREAD INTELLIGENCE */}
        {activeTab === "intelligence" && (
          <div className="space-y-4">
            {threadIntelligenceQuery.isLoading ? (
              <div className="flex h-40 items-center justify-center text-slate-400 gap-2">
                <Loader2 className="h-5 w-5 animate-spin text-blue-600" />
                <span className="text-xs">Processing conversation history...</span>
              </div>
            ) : threadIntelligenceQuery.data ? (
              <>
                <div className="rounded-xl border border-slate-200 bg-white p-4 space-y-2 shadow-sm">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-blue-600">
                    Conversation Overview
                  </h4>
                  <p className="text-sm text-slate-800 leading-relaxed">
                    {threadIntelligenceQuery.data.overview}
                  </p>
                </div>

                <div className="rounded-xl border border-slate-200 bg-white p-4 space-y-2 shadow-sm">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600">
                    Who Owes What
                  </h4>
                  <div className="space-y-2">
                    {threadIntelligenceQuery.data.whoOwesWhat.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between text-xs bg-slate-50 p-2 rounded-lg">
                        <span className="font-semibold text-slate-800">{item.person}</span>
                        <span className="text-slate-600">{item.task}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-xl border border-slate-200 bg-white p-4 space-y-2 shadow-sm">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600">
                    Next Recommended Action
                  </h4>
                  <p className="text-xs text-slate-800 font-medium">
                    {threadIntelligenceQuery.data.nextRecommendedAction}
                  </p>
                </div>
              </>
            ) : null}
          </div>
        )}

        {/* SUBTASK 7.3: TONE-GUIDED REPLY GENERATION */}
        {activeTab === "reply" && (
          <div className="space-y-4">
            <div className="rounded-xl border border-slate-200 bg-white p-4 space-y-4 shadow-sm">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
                  Select Response Tone
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {(
                    [
                      "Professional",
                      "Friendly",
                      "Concise",
                      "Detailed",
                      "Formal",
                      "Apologetic",
                      "Persuasive",
                    ] as ReplyTone[]
                  ).map((tone) => (
                    <Badge
                      key={tone}
                      onClick={() => setSelectedTone(tone)}
                      className={`cursor-pointer text-xs px-2.5 py-1 transition-all ${
                        selectedTone === tone
                          ? "bg-blue-600 text-white hover:bg-blue-600"
                          : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                      }`}
                    >
                      {tone}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
                  Instructions / Points to include (optional)
                </label>
                <Textarea
                  placeholder="e.g., Accept meeting request for Thursday at 2pm"
                  value={replyPrompt}
                  onChange={(e) => setReplyPrompt(e.target.value)}
                  className="text-xs border-slate-200 focus:border-blue-500 h-20"
                />
              </div>

              <Button
                onClick={handleGenerateReply}
                disabled={generateReplyMutation.isPending || !selectedMessage}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs h-9 gap-1.5 shadow-sm"
              >
                {generateReplyMutation.isPending ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <>
                    <Wand2 className="h-4 w-4" />
                    Generate Draft Reply
                  </>
                )}
              </Button>
            </div>
          </div>
        )}

        {/* SUBTASK 7.4: DRAFT REWRITER */}
        {activeTab === "rewrite" && (
          <div className="space-y-4">
            <div className="rounded-xl border border-slate-200 bg-white p-4 space-y-4 shadow-sm">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
                  Draft Text to Rewrite
                </label>
                <Textarea
                  placeholder="Paste or type text you want to transform..."
                  value={rewriteInputText}
                  onChange={(e) => setRewriteInputText(e.target.value)}
                  className="text-xs border-slate-200 focus:border-blue-500 h-28"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
                  Transformation Goal
                </label>
                <select
                  value={selectedRewriteOption}
                  onChange={(e) => setSelectedRewriteOption(e.target.value as RewriteOption)}
                  className="w-full text-xs rounded-lg border border-slate-200 px-3 py-2 bg-white text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-blue-200"
                >
                  <option value="Make it more professional">Make it more professional</option>
                  <option value="Make it shorter">Make it shorter</option>
                  <option value="Make it friendlier">Make it friendlier</option>
                  <option value="Fix grammar">Fix grammar</option>
                  <option value="Make it persuasive">Make it persuasive</option>
                  <option value="Simplify it">Simplify it</option>
                </select>
              </div>

              <Button
                onClick={handleRewriteDraft}
                disabled={rewriteDraftMutation.isPending || !rewriteInputText.trim()}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs h-9 gap-1.5 shadow-sm"
              >
                {rewriteDraftMutation.isPending ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <>
                    <RefreshCw className="h-4 w-4" />
                    Transform Draft
                  </>
                )}
              </Button>
            </div>
          </div>
        )}

        {/* SUBTASK 7.5: ACTION-ITEM EXTRACTION */}
        {activeTab === "action-items" && (
          <div className="space-y-4">
            {actionItemsQuery.isLoading ? (
              <div className="flex h-40 items-center justify-center text-slate-400 gap-2">
                <Loader2 className="h-5 w-5 animate-spin text-blue-600" />
                <span className="text-xs">Extracting action items...</span>
              </div>
            ) : actionItemsQuery.data ? (
              <div className="space-y-3">
                {actionItemsQuery.data.map((item, idx) => (
                  <div
                    key={idx}
                    className="rounded-xl border border-slate-200 bg-white p-3.5 space-y-2 shadow-sm"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-xs font-bold text-slate-900 leading-snug">
                        {item.task}
                      </span>
                      <Badge
                        className={`text-[10px] shrink-0 ${
                          item.priority === "High"
                            ? "bg-red-50 text-red-700 border-red-200"
                            : item.priority === "Medium"
                            ? "bg-amber-50 text-amber-700 border-amber-200"
                            : "bg-slate-100 text-slate-700 border-slate-200"
                        }`}
                      >
                        {item.priority}
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-100">
                      <div className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        <span>{item.owner}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{item.deadline}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
}
