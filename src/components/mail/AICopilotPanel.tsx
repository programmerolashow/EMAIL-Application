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
  Copy,
  Check,
  AlertCircle,
  FileText,
  BrainCircuit,
  MessageSquare,
  ListTodo,
  ArrowRight,
  Inbox,
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
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Subtask 7.3 State: Reply Generation
  const [selectedTone, setSelectedTone] = useState<ReplyTone>("Professional");
  const [replyPrompt, setReplyPrompt] = useState("");
  const [generatedReplyResult, setGeneratedReplyResult] = useState<{
    body: string;
    subject?: string;
  } | null>(null);

  // Subtask 7.4 State: Rewrite Draft
  const [rewriteInputText, setRewriteInputText] = useState("");
  const [selectedRewriteOption, setSelectedRewriteOption] =
    useState<RewriteOption>("Make it more professional");
  const [rewrittenOutput, setRewrittenOutput] = useState<string | null>(null);

  // Clipboard copy helper with visual feedback
  const handleCopy = (text: string, key: string) => {
    void navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  // Queries & Mutations
  const threadSummaryQuery = api.ai.summarizeThread.useQuery(
    { threadId: thread?.id ?? "" },
    { enabled: Boolean(thread?.id) && activeTab === "summarize" }
  );

  const emailSummaryQuery = api.ai.summarizeEmail.useQuery(
    { messageId: selectedMessage?.id ?? "" },
    { enabled: !thread?.id && Boolean(selectedMessage?.id) && activeTab === "summarize" }
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

  const summaryData = threadSummaryQuery.data ?? emailSummaryQuery.data;
  const isSummaryLoading = threadSummaryQuery.isLoading || emailSummaryQuery.isLoading;
  const isSummaryError = threadSummaryQuery.isError || emailSummaryQuery.isError;
  const summaryError = threadSummaryQuery.error ?? emailSummaryQuery.error;
  const refetchSummary = () => {
    if (thread?.id) {
      void threadSummaryQuery.refetch();
    } else if (selectedMessage?.id) {
      void emailSummaryQuery.refetch();
    }
  };

  const handleGenerateReply = async () => {
    const msgId = selectedMessage?.id ?? thread?.latestMessage?.id ?? thread?.messages[0]?.id;
    if (!msgId) return;

    try {
      const res = await generateReplyMutation.mutateAsync({
        messageId: msgId,
        tone: selectedTone,
        prompt: replyPrompt,
      });
      setGeneratedReplyResult({ body: res.body, subject: res.subject });
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
      setRewrittenOutput(res);
    } catch (err) {
      console.error("Failed to rewrite draft:", err);
    }
  };

  if (!thread && !selectedMessage) {
    return (
      <div className="flex h-full flex-col items-center justify-center p-6 text-center text-slate-400 bg-slate-50/40 border-l border-slate-200">
        <Sparkles className="h-8 w-8 text-blue-500 mb-2 animate-pulse" />
        <span className="text-sm font-semibold text-slate-700">AI Copilot</span>
        <span className="text-xs text-slate-400 max-w-xs mt-1">
          Select an email conversation to activate AI summarization, intelligence analysis, smart replies, and action items.
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
            <p className="text-[11px] text-slate-500">Context Builder & OpenAI v4</p>
          </div>
        </div>

        <Badge variant="outline" className="text-[10px] bg-blue-50 text-blue-700 border-blue-200 font-medium">
          GPT-4o Ready
        </Badge>
      </div>

      {/* Feature Nav Tabs */}
      <div className="flex border-b border-slate-200 bg-white px-2 overflow-x-auto scrollbar-none">
        {[
          { id: "summarize", label: "Summarize", icon: FileText },
          { id: "intelligence", label: "Intelligence", icon: BrainCircuit },
          { id: "reply", label: "Smart Reply", icon: MessageSquare },
          { id: "rewrite", label: "Rewrite", icon: RefreshCw },
          { id: "action-items", label: "Action Items", icon: ListTodo },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`flex items-center gap-1.5 px-3 py-2.5 text-xs font-semibold whitespace-nowrap border-b-2 transition-all ${
                isActive
                  ? "border-blue-600 text-blue-600 bg-blue-50/40"
                  : "border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-50"
              }`}
            >
              <Icon className={`h-3.5 w-3.5 ${isActive ? "text-blue-600" : "text-slate-400"}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Contents */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* ============================================================ */}
        {/* FEATURE 1: SUMMARIZE TAB */}
        {/* ============================================================ */}
        {activeTab === "summarize" && (
          <div className="space-y-4">
            {isSummaryLoading ? (
              <div className="flex flex-col items-center justify-center p-8 bg-white rounded-xl border border-slate-200 space-y-3">
                <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
                <div className="text-center">
                  <p className="text-xs font-semibold text-slate-700">Summarizing conversation...</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">Context Builder trimming raw email payloads</p>
                </div>
              </div>
            ) : isSummaryError ? (
              <div className="rounded-xl border border-red-200 bg-red-50/50 p-4 space-y-3">
                <div className="flex items-start gap-2 text-red-700">
                  <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                  <div className="text-xs">
                    <span className="font-semibold block">Summarization Failed</span>
                    <span className="text-red-600">
                      {summaryError?.message ?? "Unable to generate email summary."}
                    </span>
                  </div>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={refetchSummary}
                  className="w-full text-xs h-8 border-red-200 text-red-700 hover:bg-red-100 gap-1.5"
                >
                  <RefreshCw className="h-3.5 w-3.5" />
                  Retry Summarization
                </Button>
              </div>
            ) : summaryData ? (
              <>
                <div className="rounded-xl border border-slate-200 bg-white p-4 space-y-2 shadow-sm relative group">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-blue-600 flex items-center gap-1.5">
                      <Sparkles className="h-3.5 w-3.5" />
                      Executive Summary
                    </h4>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-6 w-6 text-slate-400 hover:text-slate-700"
                      onClick={() =>
                        handleCopy(
                          summaryData.executiveSummary ?? summaryData.summary ?? "",
                          "summary"
                        )
                      }
                      title="Copy summary"
                    >
                      {copiedKey === "summary" ? (
                        <Check className="h-3.5 w-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="h-3.5 w-3.5" />
                      )}
                    </Button>
                  </div>
                  <p className="text-xs text-slate-800 leading-relaxed font-normal">
                    {summaryData.executiveSummary ?? summaryData.summary}
                  </p>
                </div>

                {summaryData.keyPoints && summaryData.keyPoints.length > 0 && (
                  <div className="rounded-xl border border-slate-200 bg-white p-4 space-y-2.5 shadow-sm">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                      Key Highlights
                    </h4>
                    <ul className="space-y-2 text-xs text-slate-700">
                      {summaryData.keyPoints.map((point, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle className="h-3.5 w-3.5 text-emerald-500 shrink-0 mt-0.5" />
                          <span className="leading-snug">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {summaryData.suggestedNextStep && (
                  <div className="rounded-xl border border-blue-100 bg-blue-50/30 p-4 space-y-1.5">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-blue-700">
                      Suggested Next Step
                    </h4>
                    <p className="text-xs text-slate-800 font-medium leading-normal">
                      {summaryData.suggestedNextStep}
                    </p>
                  </div>
                )}
              </>
            ) : (
              <div className="flex flex-col items-center justify-center p-8 bg-white rounded-xl border border-slate-200 text-center space-y-3">
                <Inbox className="h-8 w-8 text-slate-300" />
                <p className="text-xs text-slate-500">No summary generated for this thread yet.</p>
                <Button
                  size="sm"
                  onClick={refetchSummary}
                  className="text-xs h-8 bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Generate Summary
                </Button>
              </div>
            )}
          </div>
        )}

        {/* ============================================================ */}
        {/* FEATURE 2: THREAD INTELLIGENCE TAB */}
        {/* ============================================================ */}
        {activeTab === "intelligence" && (
          <div className="space-y-4">
            {threadIntelligenceQuery.isLoading ? (
              <div className="flex flex-col items-center justify-center p-8 bg-white rounded-xl border border-slate-200 space-y-3">
                <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
                <div className="text-center">
                  <p className="text-xs font-semibold text-slate-700">Extracting thread intelligence...</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">Analyzing decisions, deliverables & timelines</p>
                </div>
              </div>
            ) : threadIntelligenceQuery.isError ? (
              <div className="rounded-xl border border-red-200 bg-red-50/50 p-4 space-y-3">
                <div className="flex items-start gap-2 text-red-700">
                  <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                  <div className="text-xs">
                    <span className="font-semibold block">Intelligence Analysis Failed</span>
                    <span className="text-red-600">
                      {threadIntelligenceQuery.error?.message ?? "Unable to analyze thread intelligence."}
                    </span>
                  </div>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => void threadIntelligenceQuery.refetch()}
                  className="w-full text-xs h-8 border-red-200 text-red-700 hover:bg-red-100 gap-1.5"
                >
                  <RefreshCw className="h-3.5 w-3.5" />
                  Retry Intelligence Analysis
                </Button>
              </div>
            ) : threadIntelligenceQuery.data ? (
              <>
                <div className="rounded-xl border border-slate-200 bg-white p-4 space-y-2 shadow-sm relative">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-blue-600 flex items-center gap-1.5">
                      <BrainCircuit className="h-3.5 w-3.5" />
                      Conversation Overview
                    </h4>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-6 w-6 text-slate-400 hover:text-slate-700"
                      onClick={() =>
                        handleCopy(
                          threadIntelligenceQuery.data.conversationOverview ??
                            threadIntelligenceQuery.data.overview ??
                            "",
                          "intel-overview"
                        )
                      }
                      title="Copy overview"
                    >
                      {copiedKey === "intel-overview" ? (
                        <Check className="h-3.5 w-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="h-3.5 w-3.5" />
                      )}
                    </Button>
                  </div>
                  <p className="text-xs text-slate-800 leading-relaxed font-normal">
                    {threadIntelligenceQuery.data.conversationOverview ??
                      threadIntelligenceQuery.data.overview}
                  </p>
                </div>

                {threadIntelligenceQuery.data.keyDecisions &&
                  threadIntelligenceQuery.data.keyDecisions.length > 0 && (
                    <div className="rounded-xl border border-slate-200 bg-white p-4 space-y-2 shadow-sm">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                        Key Decisions Made
                      </h4>
                      <ul className="space-y-1.5 text-xs text-slate-700">
                        {threadIntelligenceQuery.data.keyDecisions.map((dec, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <Check className="h-3.5 w-3.5 text-blue-600 shrink-0 mt-0.5" />
                            <span>{dec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                {threadIntelligenceQuery.data.whoOwesWhat &&
                  threadIntelligenceQuery.data.whoOwesWhat.length > 0 && (
                    <div className="rounded-xl border border-slate-200 bg-white p-4 space-y-2.5 shadow-sm">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                        Who Owes What
                      </h4>
                      <div className="space-y-2">
                        {threadIntelligenceQuery.data.whoOwesWhat.map((item, idx) => (
                          <div
                            key={idx}
                            className="flex items-center justify-between text-xs bg-slate-50 p-2.5 rounded-lg border border-slate-100"
                          >
                            <span className="font-semibold text-slate-800 flex items-center gap-1.5">
                              <User className="h-3.5 w-3.5 text-blue-600" />
                              {item.person}
                            </span>
                            <span className="text-slate-600 text-[11px] truncate max-w-[160px]">
                              {item.task}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                {threadIntelligenceQuery.data.nextRecommendedAction && (
                  <div className="rounded-xl border border-emerald-100 bg-emerald-50/30 p-4 space-y-1.5">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                      Recommended Next Action
                    </h4>
                    <p className="text-xs text-slate-800 font-medium">
                      {threadIntelligenceQuery.data.nextRecommendedAction}
                    </p>
                  </div>
                )}
              </>
            ) : (
              <div className="flex flex-col items-center justify-center p-8 bg-white rounded-xl border border-slate-200 text-center space-y-3">
                <BrainCircuit className="h-8 w-8 text-slate-300" />
                <p className="text-xs text-slate-500">No intelligence analysis generated yet.</p>
                <Button
                  size="sm"
                  onClick={() => void threadIntelligenceQuery.refetch()}
                  className="text-xs h-8 bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Analyze Thread
                </Button>
              </div>
            )}
          </div>
        )}

        {/* ============================================================ */}
        {/* FEATURE 3: SMART REPLY TAB */}
        {/* ============================================================ */}
        {activeTab === "reply" && (
          <div className="space-y-4">
            <div className="rounded-xl border border-slate-200 bg-white p-4 space-y-4 shadow-sm">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">
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
                          ? "bg-blue-600 text-white hover:bg-blue-600 shadow-sm"
                          : "bg-slate-100 text-slate-700 hover:bg-slate-200 border-transparent"
                      }`}
                    >
                      {tone}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
                  Custom Prompt / Instructions (Optional)
                </label>
                <Textarea
                  placeholder="e.g., Confirm meeting for Thursday at 3 PM and express enthusiasm..."
                  value={replyPrompt}
                  onChange={(e) => setReplyPrompt(e.target.value)}
                  className="text-xs border-slate-200 focus:border-blue-500 h-20"
                />
              </div>

              <Button
                onClick={handleGenerateReply}
                disabled={generateReplyMutation.isPending || (!selectedMessage && !thread)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs h-9 gap-1.5 shadow-sm"
              >
                {generateReplyMutation.isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Crafting Smart Reply...</span>
                  </>
                ) : (
                  <>
                    <Wand2 className="h-4 w-4" />
                    <span>Generate Smart Reply</span>
                  </>
                )}
              </Button>
            </div>

            {/* Error State */}
            {generateReplyMutation.isError && (
              <div className="rounded-xl border border-red-200 bg-red-50/50 p-4 space-y-3">
                <div className="flex items-start gap-2 text-red-700">
                  <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                  <div className="text-xs">
                    <span className="font-semibold block">Reply Generation Failed</span>
                    <span className="text-red-600">
                      {generateReplyMutation.error?.message ?? "Unable to generate smart reply draft."}
                    </span>
                  </div>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleGenerateReply}
                  className="w-full text-xs h-8 border-red-200 text-red-700 hover:bg-red-100 gap-1.5"
                >
                  <RefreshCw className="h-3.5 w-3.5" />
                  Retry Reply Generation
                </Button>
              </div>
            )}

            {/* Generated Output */}
            {generatedReplyResult && (
              <div className="rounded-xl border border-blue-200 bg-white p-4 space-y-3 shadow-sm">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <span className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="h-3.5 w-3.5 text-blue-600" />
                    Generated Draft
                  </span>
                  <div className="flex items-center gap-1">
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-7 w-7 text-slate-500 hover:text-slate-800"
                      onClick={() => handleCopy(generatedReplyResult.body, "generated-reply")}
                      title="Copy draft"
                    >
                      {copiedKey === "generated-reply" ? (
                        <Check className="h-3.5 w-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="h-3.5 w-3.5" />
                      )}
                    </Button>
                  </div>
                </div>

                <p className="text-xs text-slate-800 whitespace-pre-wrap leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-100 font-sans">
                  {generatedReplyResult.body}
                </p>

                <Button
                  onClick={() =>
                    onUseGeneratedReply(generatedReplyResult.body, generatedReplyResult.subject)
                  }
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs h-8 gap-1.5"
                >
                  <ArrowRight className="h-3.5 w-3.5" />
                  Use Draft in Composer
                </Button>
              </div>
            )}
          </div>
        )}

        {/* ============================================================ */}
        {/* FEATURE 4: DRAFT REWRITER TAB */}
        {/* ============================================================ */}
        {activeTab === "rewrite" && (
          <div className="space-y-4">
            <div className="rounded-xl border border-slate-200 bg-white p-4 space-y-4 shadow-sm">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
                  Draft Text to Transform
                </label>
                <Textarea
                  placeholder="Paste or type email text you want to transform..."
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
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Transforming Draft...</span>
                  </>
                ) : (
                  <>
                    <RefreshCw className="h-4 w-4" />
                    <span>Rewrite Draft</span>
                  </>
                )}
              </Button>
            </div>

            {/* Error State */}
            {rewriteDraftMutation.isError && (
              <div className="rounded-xl border border-red-200 bg-red-50/50 p-4 space-y-3">
                <div className="flex items-start gap-2 text-red-700">
                  <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                  <div className="text-xs">
                    <span className="font-semibold block">Rewrite Transformation Failed</span>
                    <span className="text-red-600">
                      {rewriteDraftMutation.error?.message ?? "Unable to rewrite draft content."}
                    </span>
                  </div>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleRewriteDraft}
                  className="w-full text-xs h-8 border-red-200 text-red-700 hover:bg-red-100 gap-1.5"
                >
                  <RefreshCw className="h-3.5 w-3.5" />
                  Retry Transformation
                </Button>
              </div>
            )}

            {/* Transformed Output */}
            {rewrittenOutput && (
              <div className="rounded-xl border border-emerald-200 bg-white p-4 space-y-3 shadow-sm">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <span className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="h-3.5 w-3.5 text-emerald-600" />
                    Transformed Output
                  </span>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-7 w-7 text-slate-500 hover:text-slate-800"
                    onClick={() => handleCopy(rewrittenOutput, "rewritten-output")}
                    title="Copy rewritten text"
                  >
                    {copiedKey === "rewritten-output" ? (
                      <Check className="h-3.5 w-3.5 text-emerald-600" />
                    ) : (
                      <Copy className="h-3.5 w-3.5" />
                    )}
                  </Button>
                </div>

                <p className="text-xs text-slate-800 whitespace-pre-wrap leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-100">
                  {rewrittenOutput}
                </p>

                <Button
                  onClick={() => onUseGeneratedReply(rewrittenOutput)}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs h-8 gap-1.5"
                >
                  <ArrowRight className="h-3.5 w-3.5" />
                  Use Transformed Text
                </Button>
              </div>
            )}
          </div>
        )}

        {/* ============================================================ */}
        {/* FEATURE 5: ACTION ITEMS TAB */}
        {/* ============================================================ */}
        {activeTab === "action-items" && (
          <div className="space-y-4">
            {actionItemsQuery.isLoading ? (
              <div className="flex flex-col items-center justify-center p-8 bg-white rounded-xl border border-slate-200 space-y-3">
                <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
                <div className="text-center">
                  <p className="text-xs font-semibold text-slate-700">Extracting action items...</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">Scanning tasks, assigned owners & deadlines</p>
                </div>
              </div>
            ) : actionItemsQuery.isError ? (
              <div className="rounded-xl border border-red-200 bg-red-50/50 p-4 space-y-3">
                <div className="flex items-start gap-2 text-red-700">
                  <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                  <div className="text-xs">
                    <span className="font-semibold block">Action Item Extraction Failed</span>
                    <span className="text-red-600">
                      {actionItemsQuery.error?.message ?? "Unable to extract action items."}
                    </span>
                  </div>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => void actionItemsQuery.refetch()}
                  className="w-full text-xs h-8 border-red-200 text-red-700 hover:bg-red-100 gap-1.5"
                >
                  <RefreshCw className="h-3.5 w-3.5" />
                  Retry Extraction
                </Button>
              </div>
            ) : actionItemsQuery.data && actionItemsQuery.data.length > 0 ? (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
                    {actionItemsQuery.data.length} Deliverable(s) Found
                  </span>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-xs h-7 text-slate-500 hover:text-slate-800 gap-1"
                    onClick={() => {
                      const text = actionItemsQuery.data
                        .map(
                          (item) =>
                            `• ${item.taskDescription ?? item.task} | Owner: ${item.assignedOwner ?? item.owner} | Priority: ${item.priority}`
                        )
                        .join("\n");
                      handleCopy(text, "all-action-items");
                    }}
                  >
                    {copiedKey === "all-action-items" ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-emerald-600" />
                        <span>Copied All</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        <span>Copy All</span>
                      </>
                    )}
                  </Button>
                </div>

                {actionItemsQuery.data.map((item, idx) => (
                  <div
                    key={idx}
                    className="rounded-xl border border-slate-200 bg-white p-3.5 space-y-2.5 shadow-sm"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-xs font-bold text-slate-900 leading-snug">
                        {item.taskDescription ?? item.task}
                      </span>
                      <Badge
                        className={`text-[10px] shrink-0 font-medium ${
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

                    <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-100">
                      <div className="flex items-center gap-1">
                        <User className="h-3.5 w-3.5 text-blue-600" />
                        <span>{item.assignedOwner ?? item.owner ?? "Unassigned"}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5 text-slate-400" />
                        <span>{item.deadline ?? "No deadline"}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center p-8 bg-white rounded-xl border border-slate-200 text-center space-y-3">
                <ListTodo className="h-8 w-8 text-slate-300" />
                <p className="text-xs text-slate-500">No action items or deliverables detected.</p>
                <Button
                  size="sm"
                  onClick={() => void actionItemsQuery.refetch()}
                  className="text-xs h-8 bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Re-scan Conversation
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
