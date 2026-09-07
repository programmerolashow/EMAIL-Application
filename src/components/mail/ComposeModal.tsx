"use client";

import React, { useState, useEffect, useRef } from "react";
import { api } from "@/trpc/react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Send,
  Save,
  Loader2,
  Sparkles,
  Paperclip,
  Mic,
  MicOff,
  X,
  Wand2,
  Check,
  FileText,
  Smile,
  ShieldCheck,
  Zap,
  Scissors,
  Feather,
} from "lucide-react";
import { toast } from "sonner";

interface ComposeModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTo?: string;
  initialSubject?: string;
  initialBody?: string;
  accountId?: string;
}

type RewriteOption =
  | "Make it more professional"
  | "Make it shorter"
  | "Make it friendlier"
  | "Fix grammar"
  | "Make it persuasive"
  | "Simplify it";

interface SpeechRecognitionResultItem {
  transcript: string;
}

type SpeechRecognitionResultList = Record<number, SpeechRecognitionResultItem>;

type SpeechRecognitionResults = Record<number, SpeechRecognitionResultList> & {
  length: number;
};

interface SpeechRecognitionEvent {
  resultIndex: number;
  results: SpeechRecognitionResults;
  error?: string;
}

interface WebSpeechRecognition {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onstart: () => void;
  onresult: (event: SpeechRecognitionEvent) => void;
  onerror: (event: SpeechRecognitionEvent) => void;
  onend: () => void;
  start: () => void;
  stop: () => void;
}

type WebSpeechConstructor = new () => WebSpeechRecognition;

export function ComposeModal({
  isOpen,
  onClose,
  initialTo = "",
  initialSubject = "",
  initialBody = "",
  accountId,
}: ComposeModalProps) {
  const [to, setTo] = useState(initialTo);
  const [showCc, setShowCc] = useState(false);
  const [showBcc, setShowBcc] = useState(false);
  const [cc, setCc] = useState("");
  const [bcc, setBcc] = useState("");
  const [subject, setSubject] = useState(initialSubject);
  const [body, setBody] = useState(initialBody);

  // Attachments State
  const [attachments, setAttachments] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Voice to Text State
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<WebSpeechRecognition | null>(null);

  // AI Assist Mutations
  const generateDraftMutation = api.ai.generateDraft.useMutation();
  const rewriteDraftMutation = api.ai.rewriteDraft.useMutation();
  const [isAiLoading, setIsAiLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setTo(initialTo);
      setSubject(initialSubject);
      setBody(initialBody);
      setCc("");
      setBcc("");
      setShowCc(false);
      setShowBcc(false);
      setAttachments([]);
      setIsListening(false);
    }
  }, [isOpen, initialTo, initialSubject, initialBody]);

  // Clean up Web Speech Recognition on unmount
  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch {
          // ignore
        }
      }
    };
  }, []);

  const sendEmailMutation = api.mail.sendEmail.useMutation();
  const createDraftMutation = api.mail.createDraft.useMutation();

  const parseRecipients = (raw: string) => {
    return raw
      .split(",")
      .map((s) => s.trim())
      .filter((s) => Boolean(s))
      .map((address) => ({ address }));
  };

  const handleSend = async () => {
    if (!to.trim()) {
      toast.error("Please specify at least one recipient email address.");
      return;
    }

    try {
      await sendEmailMutation.mutateAsync({
        accountId,
        draft: {
          to: parseRecipients(to),
          cc: cc.trim() ? parseRecipients(cc) : undefined,
          bcc: bcc.trim() ? parseRecipients(bcc) : undefined,
          subject,
          body,
        },
      });
      toast.success("Email sent successfully!");
      onClose();
    } catch (err) {
      console.error("Failed to send email:", err);
      toast.error("Failed to send email. Please verify connection and try again.");
    }
  };

  const handleSaveDraft = async () => {
    try {
      await createDraftMutation.mutateAsync({
        accountId,
        draft: {
          to: parseRecipients(to),
          cc: cc.trim() ? parseRecipients(cc) : undefined,
          bcc: bcc.trim() ? parseRecipients(bcc) : undefined,
          subject,
          body,
        },
      });
      toast.success("Draft saved successfully.");
      onClose();
    } catch (err) {
      console.error("Failed to save draft:", err);
      toast.error("Failed to save draft.");
    }
  };

  // Attachment handling
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      setAttachments((prev) => [...prev, ...selectedFiles]);
    }
  };

  const removeAttachment = (index: number) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  // Voice to Text Composer
  const toggleVoiceInput = () => {
    if (isListening) {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      setIsListening(false);
      return;
    }

    const windowObj = window as unknown as Record<string, WebSpeechConstructor | undefined>;
    const SpeechRecognition = windowObj.SpeechRecognition ?? windowObj.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      toast.error("Voice recognition is not supported in this browser. Please use Chrome, Edge, or Safari.");
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = "en-US";

      recognition.onstart = () => {
        setIsListening(true);
        toast.info("Listening... Speak clearly into your microphone.");
      };

      recognition.onresult = (event: SpeechRecognitionEvent) => {
        let transcript = "";
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const result = event.results[i];
          if (result?.[0]) {
            transcript += result[0].transcript;
          }
        }
        if (transcript) {
          setBody((prev) => (prev ? `${prev} ${transcript}` : transcript));
        }
      };

      recognition.onerror = (event: SpeechRecognitionEvent) => {
        const err = event.error ?? "unknown";
        console.error("Speech recognition error:", err);
        setIsListening(false);
        toast.error(`Voice input error: ${err}`);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (err) {
      console.error("Failed to start voice recognition:", err);
      toast.error("Could not access microphone.");
      setIsListening(false);
    }
  };

  // AI Actions: Generate
  const handleAiGenerate = async () => {
    const promptText = subject.trim() ? subject : "Compose a professional response";
    try {
      setIsAiLoading(true);
      const res = await generateDraftMutation.mutateAsync({
        instruction: promptText,
        accountId,
      });
      setBody(res.body);
      if (res.subject && !subject) setSubject(res.subject);
      toast.success("AI draft generated and inserted into editor!");
    } catch (err) {
      console.error("AI Generate Error:", err);
      toast.error("Failed to generate draft. Ensure OPENAI_API_KEY is configured.");
    } finally {
      setIsAiLoading(false);
    }
  };

  // AI Actions: Rewrite / Style transformation
  const handleAiRewrite = async (option: RewriteOption) => {
    if (!body.trim()) {
      toast.error("Please type or generate some body text first before rewriting.");
      return;
    }

    try {
      setIsAiLoading(true);
      const res = await rewriteDraftMutation.mutateAsync({
        draftText: body,
        option,
      });
      setBody(res);
      toast.success(`Transformed text (${option}) inserted into editor!`);
    } catch (err) {
      console.error("AI Rewrite Error:", err);
      toast.error("Failed to rewrite draft. Check AI configuration.");
    } finally {
      setIsAiLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-3xl bg-white p-0 overflow-hidden rounded-2xl shadow-2xl">
        {/* Header */}
        <DialogHeader className="p-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <DialogTitle className="text-base font-bold flex items-center gap-2 text-white">
            <Sparkles className="h-4 w-4 text-blue-400" />
            New Message
          </DialogTitle>
        </DialogHeader>

        {/* Content Body */}
        <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          {/* To Field with CC/BCC Toggles */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500">
                To
              </label>
              <div className="flex items-center gap-2 text-xs font-medium text-blue-600">
                {!showCc && (
                  <button
                    type="button"
                    onClick={() => setShowCc(true)}
                    className="hover:underline text-slate-500 hover:text-blue-600"
                  >
                    + Cc
                  </button>
                )}
                {!showBcc && (
                  <button
                    type="button"
                    onClick={() => setShowBcc(true)}
                    className="hover:underline text-slate-500 hover:text-blue-600"
                  >
                    + Bcc
                  </button>
                )}
              </div>
            </div>
            <Input
              type="email"
              placeholder="recipient@example.com (comma separated)"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="text-sm border-slate-200"
            />
          </div>

          {/* CC Field */}
          {showCc && (
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Cc
                </label>
                <button
                  type="button"
                  onClick={() => setShowCc(false)}
                  className="text-slate-400 hover:text-slate-600"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
              <Input
                type="email"
                placeholder="cc@example.com (comma separated)"
                value={cc}
                onChange={(e) => setCc(e.target.value)}
                className="text-sm border-slate-200"
              />
            </div>
          )}

          {/* BCC Field */}
          {showBcc && (
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Bcc
                </label>
                <button
                  type="button"
                  onClick={() => setShowBcc(false)}
                  className="text-slate-400 hover:text-slate-600"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
              <Input
                type="email"
                placeholder="bcc@example.com (comma separated)"
                value={bcc}
                onChange={(e) => setBcc(e.target.value)}
                className="text-sm border-slate-200"
              />
            </div>
          )}

          {/* Subject Field */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
              Subject
            </label>
            <Input
              type="text"
              placeholder="Message subject..."
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="text-sm border-slate-200"
            />
          </div>

          {/* Body Editor with AI Assist Toolbar */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500">
                Body
              </label>

              {/* Editor Toolbar Tools: AI Assist & Voice to Text */}
              <div className="flex items-center gap-2">
                {/* Voice to Text Button */}
                <Button
                  type="button"
                  size="sm"
                  variant={isListening ? "default" : "outline"}
                  onClick={toggleVoiceInput}
                  className={`h-7 px-2.5 text-xs font-medium gap-1.5 transition-all ${
                    isListening
                      ? "bg-red-600 text-white animate-pulse hover:bg-red-700"
                      : "border-slate-200 text-slate-600 hover:bg-slate-50"
                  }`}
                  title="Voice to Text Composer"
                >
                  {isListening ? (
                    <>
                      <MicOff className="h-3.5 w-3.5" />
                      <span>Listening...</span>
                    </>
                  ) : (
                    <>
                      <Mic className="h-3.5 w-3.5 text-blue-600" />
                      <span>Voice Input</span>
                    </>
                  )}
                </Button>

                {/* AI Assist Dropdown Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      disabled={isAiLoading}
                      className="h-7 px-2.5 text-xs font-medium text-blue-700 border-blue-200 bg-blue-50/50 hover:bg-blue-100 gap-1.5"
                    >
                      {isAiLoading ? (
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      ) : (
                        <Wand2 className="h-3.5 w-3.5" />
                      )}
                      <span>AI Assist</span>
                    </Button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel className="text-[11px] uppercase tracking-wider text-slate-400">
                      AI Actions
                    </DropdownMenuLabel>
                    
                    <DropdownMenuItem
                      onClick={handleAiGenerate}
                      className="cursor-pointer text-xs font-semibold text-blue-600"
                    >
                      <Sparkles className="mr-2 h-4 w-4 text-blue-600" />
                      Generate Draft
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />

                    <DropdownMenuLabel className="text-[11px] uppercase tracking-wider text-slate-400">
                      Style Transformations
                    </DropdownMenuLabel>

                    <DropdownMenuItem
                      onClick={() => handleAiRewrite("Make it more professional")}
                      className="cursor-pointer text-xs"
                    >
                      <ShieldCheck className="mr-2 h-3.5 w-3.5 text-slate-500" />
                      Make Professional
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      onClick={() => handleAiRewrite("Make it shorter")}
                      className="cursor-pointer text-xs"
                    >
                      <Scissors className="mr-2 h-3.5 w-3.5 text-slate-500" />
                      Make Shorter
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      onClick={() => handleAiRewrite("Make it friendlier")}
                      className="cursor-pointer text-xs"
                    >
                      <Smile className="mr-2 h-3.5 w-3.5 text-slate-500" />
                      Make Friendlier
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      onClick={() => handleAiRewrite("Fix grammar")}
                      className="cursor-pointer text-xs"
                    >
                      <Check className="mr-2 h-3.5 w-3.5 text-slate-500" />
                      Fix Grammar
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      onClick={() => handleAiRewrite("Make it persuasive")}
                      className="cursor-pointer text-xs"
                    >
                      <Zap className="mr-2 h-3.5 w-3.5 text-slate-500" />
                      Make Persuasive
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      onClick={() => handleAiRewrite("Simplify it")}
                      className="cursor-pointer text-xs"
                    >
                      <Feather className="mr-2 h-3.5 w-3.5 text-slate-500" />
                      Simplify
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            <Textarea
              placeholder="Write your email message here, dictate using Voice Input, or generate/rewrite with AI Assist..."
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="text-sm border-slate-200 h-52 resize-none font-sans leading-relaxed"
            />
          </div>

          {/* Attachments Section */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500">
                Attachments ({attachments.length})
              </label>
              
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                multiple
                className="hidden"
              />

              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => fileInputRef.current?.click()}
                className="h-7 px-2 text-xs text-slate-600 hover:text-slate-900 gap-1"
              >
                <Paperclip className="h-3.5 w-3.5" />
                Attach Files
              </Button>
            </div>

            {attachments.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-1">
                {attachments.map((file, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-1.5 bg-slate-100 px-2.5 py-1 rounded-lg text-xs border border-slate-200 text-slate-800"
                  >
                    <FileText className="h-3.5 w-3.5 text-blue-600" />
                    <span className="truncate max-w-[140px] font-medium">{file.name}</span>
                    <span className="text-[10px] text-slate-400">
                      ({formatFileSize(file.size)})
                    </span>
                    <button
                      type="button"
                      onClick={() => removeAttachment(idx)}
                      className="text-slate-400 hover:text-red-600 ml-1"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <DialogFooter className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between sm:justify-between">
          <Button
            variant="outline"
            size="sm"
            onClick={handleSaveDraft}
            disabled={createDraftMutation.isPending}
            className="gap-1.5 text-xs text-slate-600"
          >
            {createDraftMutation.isPending ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <Save className="h-3.5 w-3.5" />
            )}
            Save Draft
          </Button>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-xs text-slate-500"
            >
              Cancel
            </Button>

            <Button
              onClick={handleSend}
              disabled={sendEmailMutation.isPending}
              className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold gap-1.5 shadow-sm px-4 h-9"
            >
              {sendEmailMutation.isPending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  <Send className="h-3.5 w-3.5" />
                  Send Email
                </>
              )}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
