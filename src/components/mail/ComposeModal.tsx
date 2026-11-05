"use client";

import React, { useEffect, useRef, useState } from "react";
import { api } from "@/trpc/react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
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
  Trash2,
  AlertTriangle,
  CheckCircle2,
  Undo2,
  RotateCw,
} from "lucide-react";
import { toast } from "sonner";
import { MAX_DICTATION_SECONDS, useVoiceDictation } from "@/hooks/use-voice-dictation";

/* -------------------------------------------------------------------------- */
/*                                   Types                                    */
/* -------------------------------------------------------------------------- */

interface ComposeModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTo?: string;
  initialSubject?: string;
  initialBody?: string;
  /** Existing provider draft to keep editing (updates it instead of creating a new one). */
  initialDraftId?: string;
  /** Provider message id being replied to; keeps the reply in the same thread. */
  replyToMessageId?: string;
  /** Provider thread id; gives AI "Generate" the conversation as context. */
  threadId?: string;
  accountId?: string;
}

type RewriteOption =
  | "Make it more professional"
  | "Make it shorter"
  | "Make it friendlier"
  | "Fix grammar"
  | "Make it persuasive"
  | "Simplify it";

type SaveStatus = "idle" | "unsaved" | "saving" | "saved" | "error";
type FinalizeReason = "sent" | "discarded" | "closed";
type ConfirmMode = "close" | "discard" | null;

interface ComposeValues {
  to: string;
  cc: string;
  bcc: string;
  subject: string;
  body: string;
}

interface Recipient {
  name?: string;
  address: string;
}


/* -------------------------------------------------------------------------- */
/*                                  Helpers                                   */
/* -------------------------------------------------------------------------- */

const AUTOSAVE_DELAY_MS = 1500;
/** Nylas accepts JSON (base64) attachments up to 3 MB total per message. Mirrors the server check. */
const MAX_TOTAL_ATTACHMENT_BYTES = 3 * 1024 * 1024;
/** Separator the dashboard puts between a reply and the quoted original message. */
const QUOTE_SEPARATOR = "\n\n---------------\n";
const EMAIL_REGEX = /^[^\s@<>,;]+@[^\s@<>,;]+\.[^\s@<>,;]+$/;

const REWRITE_OPTIONS: { option: RewriteOption; label: string; Icon: typeof Check }[] = [
  { option: "Make it more professional", label: "Make professional", Icon: ShieldCheck },
  { option: "Make it shorter", label: "Make shorter", Icon: Scissors },
  { option: "Make it friendlier", label: "Make friendlier", Icon: Smile },
  { option: "Fix grammar", label: "Fix grammar", Icon: Check },
  { option: "Make it persuasive", label: "Make persuasive", Icon: Zap },
  { option: "Simplify it", label: "Simplify", Icon: Feather },
];

/** Parses "a@b.com, Jane <jane@c.com>; d@e.com" into valid recipients plus the invalid tokens. */
function parseRecipients(raw: string): { valid: Recipient[]; invalid: string[] } {
  const valid: Recipient[] = [];
  const invalid: string[] = [];
  const seen = new Set<string>();

  for (const token of raw.split(/[,;\n]/)) {
    const trimmed = token.trim();
    if (!trimmed) continue;

    const angled = /^(.*)<([^>]+)>$/.exec(trimmed);
    const address = (angled ? angled[2] ?? "" : trimmed).trim();
    const name = angled ? (angled[1] ?? "").trim().replace(/^"|"$/g, "") || undefined : undefined;

    if (!EMAIL_REGEX.test(address)) {
      invalid.push(trimmed);
      continue;
    }
    const key = address.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    valid.push(name ? { name, address } : { address });
  }

  return { valid, invalid };
}

function formatDictationTime(totalSeconds: number): string {
  return `${Math.floor(totalSeconds / 60)}:${String(totalSeconds % 60).padStart(2, "0")}`;
}

/** Splits the body into the part the user writes and the quoted original (reply) below it. */
function splitQuote(body: string): { main: string; quote: string } {
  const index = body.indexOf(QUOTE_SEPARATOR);
  if (index === -1) return { main: body, quote: "" };
  return { main: body.slice(0, index), quote: body.slice(index) };
}

/** Inserts text at the end of the user's part of the body, above any quoted reply. */
function appendToMain(body: string, text: string): string {
  const { main, quote } = splitQuote(body);
  const trimmedMain = main.replace(/\s+$/, "");
  const nextMain = trimmedMain ? `${trimmedMain} ${text}` : text;
  return nextMain + quote;
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Providers treat the body as HTML; convert the plain-text editor content so line breaks survive. */
function textToHtml(text: string): string {
  if (!text) return "";
  return `<div style="white-space: pre-wrap;">${escapeHtml(text).replace(/\r?\n/g, "<br>")}</div>`;
}

function snapshotOf(values: ComposeValues): string {
  return JSON.stringify([values.to, values.cc, values.bcc, values.subject, values.body]);
}

function hasAnyContent(values: ComposeValues): boolean {
  return Boolean(
    values.to.trim() || values.cc.trim() || values.bcc.trim() || values.subject.trim() || values.body.trim()
  );
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function fileKey(file: File): string {
  return `${file.name}:${file.size}:${file.lastModified}`;
}

function readFileAsBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = typeof reader.result === "string" ? reader.result : "";
      const commaIndex = result.indexOf(",");
      resolve(commaIndex === -1 ? result : result.slice(commaIndex + 1));
    };
    reader.onerror = () => reject(reader.error ?? new Error(`Could not read ${file.name}`));
    reader.readAsDataURL(file);
  });
}

/** tRPC validation errors arrive as a JSON array of zod issues; turn them into a readable sentence. */
function getErrorMessage(err: unknown, fallback: string): string {
  if (!(err instanceof Error) || !err.message) return fallback;
  const message = err.message.trim();
  if (message.startsWith("[")) {
    try {
      const issues = JSON.parse(message) as { message?: string }[];
      const first = issues.find((issue) => issue.message)?.message;
      return first ?? fallback;
    } catch {
      return fallback;
    }
  }
  return message;
}

/* -------------------------------------------------------------------------- */
/*                                 Component                                  */
/* -------------------------------------------------------------------------- */

export function ComposeModal({
  isOpen,
  onClose,
  initialTo = "",
  initialSubject = "",
  initialBody = "",
  initialDraftId,
  replyToMessageId,
  threadId,
  accountId: accountIdProp,
}: ComposeModalProps) {
  // "From" mailbox. Replies and existing drafts are tied to their mailbox; a new email can pick
  // any connected account that still works.
  const fromAccountsQuery = api.account.getAccounts.useQuery(undefined, { enabled: isOpen });
  const fromAccounts = (fromAccountsQuery.data ?? []).filter((a) => a.status !== "invalid");
  const [fromAccountId, setFromAccountId] = useState<string | undefined>(accountIdProp);
  useEffect(() => {
    if (isOpen) setFromAccountId(accountIdProp);
  }, [isOpen, accountIdProp]);
  const accountId = fromAccountId ?? accountIdProp ?? fromAccounts[0]?.id;
  const fromLocked = Boolean(replyToMessageId ?? initialDraftId);

  // Message fields
  const [to, setTo] = useState(initialTo);
  const [cc, setCc] = useState("");
  const [bcc, setBcc] = useState("");
  const [showCc, setShowCc] = useState(false);
  const [showBcc, setShowBcc] = useState(false);
  const [subject, setSubject] = useState(initialSubject);
  const [body, setBody] = useState(initialBody);
  const [touched, setTouched] = useState({ to: false, cc: false, bcc: false });

  // Draft persistence
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle");
  const [lastSavedAt, setLastSavedAt] = useState<Date | null>(null);
  const draftIdRef = useRef<string | undefined>(initialDraftId);
  const createdThisSessionRef = useRef(false);
  const lastSavedSnapshotRef = useRef("");
  const saveInFlightRef = useRef<Promise<boolean> | null>(null);
  const saveQueuedRef = useRef(false);
  const finalizedRef = useRef<FinalizeReason | null>(null);

  // Send / close / discard
  const [isSending, setIsSending] = useState(false);
  const sendingRef = useRef(false);
  const [confirmMode, setConfirmMode] = useState<ConfirmMode>(null);
  const [confirmBusy, setConfirmBusy] = useState<"save" | "delete" | null>(null);

  // Attachments
  const [attachments, setAttachments] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Voice input
  const dictation = useVoiceDictation((text) => {
    setBody((prev) => appendToMain(prev, text));
    setUndoBody(null);
  });
  const isListening = dictation.state === "recording";
  const isTranscribing = dictation.state === "transcribing";

  // AI assist
  const [aiAction, setAiAction] = useState<"generate" | RewriteOption | null>(null);
  const [showAiPrompt, setShowAiPrompt] = useState(false);
  const [aiInstruction, setAiInstruction] = useState("");
  const [undoBody, setUndoBody] = useState<string | null>(null);
  const aiPromptRef = useRef<HTMLInputElement>(null);

  // tRPC
  const utils = api.useUtils();
  const sendEmailMutation = api.mail.sendEmail.useMutation();
  const createDraftMutation = api.mail.createDraft.useMutation();
  const updateDraftMutation = api.mail.updateDraft.useMutation();
  const deleteDraftMutation = api.mail.deleteDraft.useMutation();
  const generateDraftMutation = api.ai.generateDraft.useMutation();
  const rewriteDraftMutation = api.ai.rewriteDraft.useMutation();

  // Latest values for async code (timers / in-flight saves) without re-creating callbacks every render.
  const values: ComposeValues = { to, cc, bcc, subject, body };
  const latestValuesRef = useRef(values);
  latestValuesRef.current = values;
  const contextRef = useRef({ accountId, replyToMessageId });
  contextRef.current = { accountId, replyToMessageId };
  const mutationsRef = useRef({
    createDraft: createDraftMutation.mutateAsync,
    updateDraft: updateDraftMutation.mutateAsync,
    deleteDraft: deleteDraftMutation.mutateAsync,
  });
  mutationsRef.current = {
    createDraft: createDraftMutation.mutateAsync,
    updateDraft: updateDraftMutation.mutateAsync,
    deleteDraft: deleteDraftMutation.mutateAsync,
  };

  const isAiBusy = aiAction !== null;
  const isDirty = () => snapshotOf(latestValuesRef.current) !== lastSavedSnapshotRef.current;

  /* ------------------------------ Lifecycle ------------------------------ */

  /** Closing or sending discards any recording in progress. */
  const stopListening = () => dictation.cancel();

  // Reset the composer each time it opens (only on the closed -> open transition).
  const wasOpenRef = useRef(false);
  useEffect(() => {
    if (isOpen && !wasOpenRef.current) {
      const initialValues: ComposeValues = {
        to: initialTo,
        cc: "",
        bcc: "",
        subject: initialSubject,
        body: initialBody,
      };
      setTo(initialTo);
      setCc("");
      setBcc("");
      setShowCc(false);
      setShowBcc(false);
      setSubject(initialSubject);
      setBody(initialBody);
      setTouched({ to: false, cc: false, bcc: false });
      setAttachments([]);
      setSaveStatus(initialDraftId ? "saved" : "idle");
      setLastSavedAt(null);
      setIsSending(false);
      setConfirmMode(null);
      setConfirmBusy(null);
      setAiAction(null);
      setShowAiPrompt(false);
      setAiInstruction("");
      setUndoBody(null);

      draftIdRef.current = initialDraftId;
      createdThisSessionRef.current = false;
      // Prefilled content (e.g. a reply quote) is not "unsaved" until the user edits it.
      lastSavedSnapshotRef.current = snapshotOf(initialValues);
      saveQueuedRef.current = false;
      finalizedRef.current = null;
      sendingRef.current = false;
    }
    if (!isOpen && wasOpenRef.current) {
      stopListening();
    }
    wasOpenRef.current = isOpen;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, initialTo, initialSubject, initialBody, initialDraftId]);


  /* ---------------------------- Draft saving ----------------------------- */

  const buildDraftPayload = (current: ComposeValues) => ({
    to: parseRecipients(current.to).valid,
    cc: parseRecipients(current.cc).valid,
    bcc: parseRecipients(current.bcc).valid,
    subject: current.subject,
    body: textToHtml(current.body),
    replyToMessageId: contextRef.current.replyToMessageId,
  });

  /**
   * Saves the latest content as a provider draft. Only one save runs at a time; edits made while a
   * save is in flight are picked up by a follow-up save, so a draft is never created twice.
   * Resolves true when everything is saved.
   */
  const persistDraft = async (): Promise<boolean> => {
    if (finalizedRef.current || sendingRef.current) return true;
    if (saveInFlightRef.current) {
      saveQueuedRef.current = true;
      return saveInFlightRef.current;
    }

    const run = (async () => {
      let ok = true;
      do {
        saveQueuedRef.current = false;
        const current = latestValuesRef.current;
        const snapshot = snapshotOf(current);
        if (snapshot === lastSavedSnapshotRef.current) continue;
        // Never create an empty draft (an existing one may still be updated to empty).
        if (!draftIdRef.current && !hasAnyContent(current)) continue;

        setSaveStatus("saving");
        try {
          const { accountId: currentAccountId } = contextRef.current;
          const draft = buildDraftPayload(current);
          const existingId = draftIdRef.current;

          if (existingId) {
            await mutationsRef.current.updateDraft({
              draftId: existingId,
              accountId: currentAccountId,
              draft: { ...draft, id: existingId },
            });
          } else {
            const created = await mutationsRef.current.createDraft({ accountId: currentAccountId, draft });
            // Send and discard both await this save before reading the id, so they clean it up.
            draftIdRef.current = created.id;
            createdThisSessionRef.current = true;
          }

          lastSavedSnapshotRef.current = snapshot;
          setLastSavedAt(new Date());
          setSaveStatus(isDirty() ? "unsaved" : "saved");
        } catch (err) {
          console.error("[ComposeModal] Draft save failed:", err);
          setSaveStatus("error");
          ok = false;
          break;
        }
      } while (saveQueuedRef.current && !finalizedRef.current);
      return ok;
    })();

    saveInFlightRef.current = run;
    try {
      return await run;
    } finally {
      saveInFlightRef.current = null;
    }
  };

  const persistDraftRef = useRef(persistDraft);
  persistDraftRef.current = persistDraft;

  // Debounced auto-save: fires once, 1.5s after the user stops editing. Saving never re-triggers it.
  useEffect(() => {
    if (!isOpen || isSending) return;

    const current = { to, cc, bcc, subject, body };
    if (snapshotOf(current) === lastSavedSnapshotRef.current) return;
    if (!draftIdRef.current && !hasAnyContent(current)) return;

    setSaveStatus((status) => (status === "saving" ? status : "unsaved"));
    const timer = setTimeout(() => {
      void persistDraftRef.current();
    }, AUTOSAVE_DELAY_MS);

    return () => clearTimeout(timer);
  }, [isOpen, isSending, to, cc, bcc, subject, body]);

  const handleSaveDraft = async () => {
    if (!draftIdRef.current && !hasAnyContent(latestValuesRef.current)) {
      toast.info("Nothing to save yet.");
      return;
    }
    const ok = await persistDraft();
    if (ok) {
      toast.success("Draft saved.");
    } else {
      toast.error("Couldn't save the draft. Check your connection and try again.");
    }
  };

  /* --------------------------- Close / discard --------------------------- */

  const finalizeAndClose = (reason: FinalizeReason) => {
    finalizedRef.current = reason;
    stopListening();
    setConfirmMode(null);
    setConfirmBusy(null);
    onClose();
  };

  const handleRequestClose = () => {
    if (sendingRef.current || confirmBusy) return;

    const current = latestValuesRef.current;
    const needsConfirm = isDirty() && (hasAnyContent(current) || Boolean(draftIdRef.current));
    if (needsConfirm) {
      setConfirmMode("close");
      return;
    }

    if (draftIdRef.current && createdThisSessionRef.current) {
      toast.success("Draft saved.");
    }
    finalizeAndClose("closed");
  };

  const handleSaveAndClose = async () => {
    setConfirmBusy("save");
    const ok = await persistDraft();
    if (ok) {
      toast.success("Draft saved.");
      finalizeAndClose("closed");
    } else {
      setConfirmBusy(null);
      toast.error("Couldn't save the draft. Your message is still here, so you can try again.");
    }
  };

  const handleDeleteDraft = async () => {
    setConfirmBusy("delete");
    finalizedRef.current = "discarded";

    // Let any in-flight save finish so we know the draft id to delete.
    if (saveInFlightRef.current) {
      await saveInFlightRef.current.catch(() => false);
    }

    const draftId = draftIdRef.current;
    if (draftId) {
      try {
        await deleteDraftMutation.mutateAsync({ draftId, accountId });
        void utils.mail.invalidate();
      } catch (err) {
        console.error("[ComposeModal] Draft delete failed:", err);
        toast.error("The message was discarded, but the saved draft couldn't be removed from your mailbox.");
        finalizeAndClose("discarded");
        return;
      }
    }

    toast.info("Draft discarded.");
    finalizeAndClose("discarded");
  };

  const handleDiscardClick = () => {
    const nothingToLose = !draftIdRef.current && !hasAnyContent(latestValuesRef.current) && attachments.length === 0;
    if (nothingToLose) {
      finalizeAndClose("discarded");
      return;
    }
    setConfirmMode("discard");
  };

  /* -------------------------------- Send --------------------------------- */

  const handleSend = async () => {
    if (sendingRef.current) return;

    const toResult = parseRecipients(to);
    const ccResult = parseRecipients(cc);
    const bccResult = parseRecipients(bcc);
    const invalid = [...toResult.invalid, ...ccResult.invalid, ...bccResult.invalid];

    setTouched({ to: true, cc: true, bcc: true });

    if (toResult.valid.length === 0 && toResult.invalid.length === 0) {
      toast.error("Add at least one recipient in the To field.");
      return;
    }
    if (invalid.length > 0) {
      toast.error(`Fix ${invalid.length === 1 ? "this address" : "these addresses"}: ${invalid.join(", ")}`);
      return;
    }
    if (!subject.trim() && !body.trim() && attachments.length === 0) {
      toast.error("Your message is empty. Add a subject, a message, or an attachment.");
      return;
    }
    const totalBytes = attachments.reduce((sum, file) => sum + file.size, 0);
    if (totalBytes > MAX_TOTAL_ATTACHMENT_BYTES) {
      toast.error(`Attachments total ${formatFileSize(totalBytes)}. The limit is 3 MB per message.`);
      return;
    }

    sendingRef.current = true;
    setIsSending(true);
    stopListening();

    try {
      // Wait for an in-flight auto-save so the draft id is known and can be cleaned up afterwards.
      if (saveInFlightRef.current) {
        await saveInFlightRef.current.catch(() => false);
      }

      const encodedAttachments = await Promise.all(
        attachments.map(async (file) => ({
          filename: file.name,
          contentType: file.type || "application/octet-stream",
          size: file.size,
          contentBase64: await readFileAsBase64(file),
        }))
      );

      await sendEmailMutation.mutateAsync({
        accountId,
        draft: {
          to: toResult.valid,
          cc: ccResult.valid.length ? ccResult.valid : undefined,
          bcc: bccResult.valid.length ? bccResult.valid : undefined,
          subject,
          body: textToHtml(body),
          replyToMessageId,
          attachments: encodedAttachments.length ? encodedAttachments : undefined,
        },
      });

      finalizedRef.current = "sent";
      const draftId = draftIdRef.current;
      if (draftId) {
        void deleteDraftMutation.mutateAsync({ draftId, accountId }).catch((err: unknown) => {
          console.error("[ComposeModal] Post-send draft cleanup failed:", err);
        });
      }

      toast.success("Email sent.");
      void utils.mail.invalidate();
      finalizeAndClose("sent");
    } catch (err) {
      console.error("[ComposeModal] Send failed:", err);
      toast.error(getErrorMessage(err, "Failed to send email. Check your connection and try again."));
    } finally {
      sendingRef.current = false;
      setIsSending(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      void handleSend();
    }
  };

  /* ----------------------------- Attachments ----------------------------- */

  const addFiles = (files: File[]) => {
    if (files.length === 0) return;
    setAttachments((prev) => {
      const existing = new Set(prev.map(fileKey));
      const next = [...prev];
      let total = prev.reduce((sum, file) => sum + file.size, 0);
      const rejected: string[] = [];

      for (const file of files) {
        if (existing.has(fileKey(file))) continue;
        if (total + file.size > MAX_TOTAL_ATTACHMENT_BYTES) {
          rejected.push(file.name);
          continue;
        }
        existing.add(fileKey(file));
        next.push(file);
        total += file.size;
      }

      if (rejected.length > 0) {
        // Defer so the toast isn't fired inside a state updater.
        setTimeout(() => {
          toast.error(`Not attached (3 MB total limit): ${rejected.join(", ")}`);
        }, 0);
      }
      return next;
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    addFiles(Array.from(e.target.files ?? []));
    // Allow picking the same file again after removing it.
    e.target.value = "";
  };

  const removeAttachment = (key: string) => {
    setAttachments((prev) => prev.filter((file) => fileKey(file) !== key));
  };

  const handleDragOver = (e: React.DragEvent) => {
    if (!e.dataTransfer.types.includes("Files")) return;
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDrop = (e: React.DragEvent) => {
    if (!e.dataTransfer.types.includes("Files")) return;
    e.preventDefault();
    setIsDragging(false);
    addFiles(Array.from(e.dataTransfer.files));
  };

  const totalAttachmentBytes = attachments.reduce((sum, file) => sum + file.size, 0);

  /* ----------------------------- Voice input ----------------------------- */

  const toggleVoiceInput = () => {
    if (isListening) dictation.stop();
    else if (!isTranscribing) void dictation.start();
  };

  /* ------------------------------ AI assist ------------------------------ */

  const applyAiBody = (previousBody: string, nextMain: string) => {
    const { quote } = splitQuote(previousBody);
    setUndoBody(previousBody);
    setBody(nextMain.trim() + quote);
  };

  const handleUndoAi = () => {
    if (undoBody === null) return;
    setBody(undoBody);
    setUndoBody(null);
    toast.info("AI change undone.");
  };

  const handleAiGenerate = async () => {
    const instruction =
      aiInstruction.trim() || (threadId ? "Write a helpful, natural reply to this email." : subject.trim());

    if (!instruction) {
      setShowAiPrompt(true);
      setTimeout(() => aiPromptRef.current?.focus(), 0);
      toast.info("Tell the AI what the email should say.");
      return;
    }

    const startingBody = body;
    setAiAction("generate");
    try {
      let result: { subject: string; body: string };
      try {
        result = await generateDraftMutation.mutateAsync({ instruction, threadId, accountId });
      } catch (err) {
        // The thread may not be fetchable (e.g. a message without a provider thread); retry without
        // context. Never retry a limit / configuration error: it would fail the same way.
        const code = (err as { data?: { code?: string } } | null)?.data?.code;
        if (!threadId || code === "TOO_MANY_REQUESTS" || code === "PRECONDITION_FAILED") throw err;
        result = await generateDraftMutation.mutateAsync({ instruction, accountId });
      }

      if (!result.body.trim()) {
        toast.error("The AI returned an empty draft. Try a more specific instruction.");
        return;
      }

      applyAiBody(startingBody, result.body);
      if (result.subject.trim() && !latestValuesRef.current.subject.trim()) {
        setSubject(result.subject.trim());
      }
      setShowAiPrompt(false);
      setAiInstruction("");
      toast.success("AI draft inserted. Review it before sending.");
    } catch (err) {
      console.error("[ComposeModal] AI generate failed:", err);
      toast.error(getErrorMessage(err, "Couldn't generate a draft right now. Please try again."));
    } finally {
      setAiAction(null);
    }
  };

  const handleAiRewrite = async (option: RewriteOption) => {
    const startingBody = body;
    const { main } = splitQuote(startingBody);
    if (!main.trim()) {
      toast.error("Write or generate some text first, then rewrite it.");
      return;
    }

    setAiAction(option);
    try {
      const rewritten = await rewriteDraftMutation.mutateAsync({ draftText: main, option });
      if (!rewritten.trim()) {
        toast.error("The AI returned an empty result. Your text is unchanged.");
        return;
      }
      applyAiBody(startingBody, rewritten);
      toast.success("Text rewritten. You can undo this.");
    } catch (err) {
      console.error("[ComposeModal] AI rewrite failed:", err);
      toast.error(getErrorMessage(err, "Couldn't rewrite the text right now. Please try again."));
    } finally {
      setAiAction(null);
    }
  };

  /* -------------------------------- Render ------------------------------- */

  const toInvalid = touched.to ? parseRecipients(to).invalid : [];
  const ccInvalid = touched.cc ? parseRecipients(cc).invalid : [];
  const bccInvalid = touched.bcc ? parseRecipients(bcc).invalid : [];
  const isSavingDraft = saveStatus === "saving";
  const title = replyToMessageId ? "Reply" : initialDraftId ? "Edit draft" : "New message";

  const fieldLabel = "block text-xs font-semibold uppercase tracking-wider text-slate-500";
  const recipientInput = (
    id: "to" | "cc" | "bcc",
    value: string,
    setValue: (v: string) => void,
    placeholder: string,
    invalid: string[]
  ) => (
    <>
      <Input
        id={`compose-${id}`}
        type="text"
        inputMode="email"
        autoComplete="off"
        spellCheck={false}
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={() => setTouched((prev) => ({ ...prev, [id]: true }))}
        aria-invalid={invalid.length > 0}
        disabled={isSending}
        className="text-sm border-slate-200"
      />
      {invalid.length > 0 && (
        <p className="mt-1 text-[0.6875rem] text-red-600">Invalid address: {invalid.join(", ")}</p>
      )}
    </>
  );

  return (
    <>
      <Dialog open={isOpen} onOpenChange={(open) => !open && handleRequestClose()}>
        <DialogContent
          showCloseButton={false}
          aria-describedby={undefined}
          onKeyDown={handleKeyDown}
          onEscapeKeyDown={(e) => {
            // Escape closes the AI prompt first instead of the whole composer.
            if (showAiPrompt) {
              e.preventDefault();
              setShowAiPrompt(false);
            }
          }}
          onDragOver={handleDragOver}
          onDragLeave={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setIsDragging(false);
          }}
          onDrop={handleDrop}
          className="bg-white p-0 gap-0 overflow-hidden rounded-2xl sm:max-w-3xl 2xl:max-w-4xl max-sm:inset-0 max-sm:top-0 max-sm:left-0 max-sm:flex max-sm:h-dvh max-sm:max-w-none max-sm:translate-x-0 max-sm:translate-y-0 max-sm:flex-col max-sm:rounded-none"
        >
          {/* Header */}
          <DialogHeader className="flex flex-row items-center justify-between gap-3 space-y-0 border-b border-slate-800 bg-slate-900 px-4 py-3 text-white">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-blue-400" />
              <DialogTitle className="text-base font-bold text-white">{title}</DialogTitle>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center text-[0.6875rem]" aria-live="polite">
                {saveStatus === "saving" && (
                  <span className="flex items-center gap-1.5 text-blue-300">
                    <Loader2 className="h-3 w-3 animate-spin" />
                    Saving draft…
                  </span>
                )}
                {saveStatus === "saved" && (
                  <span className="flex items-center gap-1 text-emerald-400">
                    <CheckCircle2 className="h-3 w-3" />
                    {lastSavedAt
                      ? `Saved ${lastSavedAt.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`
                      : "Saved"}
                  </span>
                )}
                {saveStatus === "unsaved" && <span className="text-amber-400">Unsaved changes</span>}
                {saveStatus === "error" && (
                  <button
                    type="button"
                    onClick={() => void persistDraft()}
                    className="flex items-center gap-1 text-red-300 hover:text-red-200"
                  >
                    <RotateCw className="h-3 w-3" />
                    Couldn&apos;t save. Retry
                  </button>
                )}
              </div>

              <button
                type="button"
                onClick={handleRequestClose}
                disabled={isSending}
                aria-label="Close"
                className="rounded-full p-1 text-slate-300 hover:bg-slate-800 hover:text-white disabled:opacity-50"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </DialogHeader>

          {/* Content */}
          <div className="relative max-h-[75vh] space-y-4 overflow-y-auto p-4 sm:p-6 max-sm:max-h-none max-sm:min-h-0 max-sm:flex-1">
            {isDragging && (
              <div className="pointer-events-none absolute inset-2 z-10 flex items-center justify-center rounded-2xl border-2 border-dashed border-blue-400 bg-blue-50/90 text-sm font-medium text-blue-700">
                Drop files to attach
              </div>
            )}

            {/* From (only when there is a choice) */}
            {fromAccounts.length > 1 && (
              <div>
                <label htmlFor="compose-from" className={`${fieldLabel} mb-1`}>
                  From
                </label>
                <select
                  id="compose-from"
                  value={accountId ?? ""}
                  disabled={fromLocked || isSending}
                  onChange={(e) => {
                    const next = e.target.value;
                    // An autosaved draft lives in the old mailbox: remove it there; the next
                    // autosave creates it in the newly selected mailbox.
                    const oldDraftId = draftIdRef.current;
                    if (oldDraftId && accountId && next !== accountId) {
                      void deleteDraftMutation
                        .mutateAsync({ draftId: oldDraftId, accountId })
                        .catch((err: unknown) => console.error("[ComposeModal] Old draft cleanup failed:", err));
                      draftIdRef.current = undefined;
                    }
                    setFromAccountId(next);
                  }}
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 disabled:bg-slate-50 disabled:text-slate-500"
                  title={fromLocked ? "Replies and drafts are sent from their own mailbox." : undefined}
                >
                  {fromAccounts.map((a) => (
                    <option key={a.id} value={a.id}>
                      {a.name && a.name !== a.email ? `${a.name} <${a.email}>` : a.email}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* To + Cc/Bcc toggles */}
            <div>
              <div className="mb-1 flex items-center justify-between">
                <label htmlFor="compose-to" className={fieldLabel}>
                  To
                </label>
                <div className="flex items-center gap-2 text-xs font-medium">
                  {!showCc && (
                    <button
                      type="button"
                      onClick={() => setShowCc(true)}
                      className="text-slate-500 hover:text-blue-600 hover:underline"
                    >
                      + Cc
                    </button>
                  )}
                  {!showBcc && (
                    <button
                      type="button"
                      onClick={() => setShowBcc(true)}
                      className="text-slate-500 hover:text-blue-600 hover:underline"
                    >
                      + Bcc
                    </button>
                  )}
                </div>
              </div>
              {recipientInput("to", to, setTo, "recipient@example.com, Jane <jane@example.com>", toInvalid)}
            </div>

            {showCc && (
              <div>
                <div className="mb-1 flex items-center justify-between">
                  <label htmlFor="compose-cc" className={fieldLabel}>
                    Cc
                  </label>
                  <button
                    type="button"
                    aria-label="Remove Cc"
                    onClick={() => {
                      setShowCc(false);
                      setCc("");
                    }}
                    className="text-slate-400 hover:text-slate-600"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
                {recipientInput("cc", cc, setCc, "cc@example.com (comma separated)", ccInvalid)}
              </div>
            )}

            {showBcc && (
              <div>
                <div className="mb-1 flex items-center justify-between">
                  <label htmlFor="compose-bcc" className={fieldLabel}>
                    Bcc
                  </label>
                  <button
                    type="button"
                    aria-label="Remove Bcc"
                    onClick={() => {
                      setShowBcc(false);
                      setBcc("");
                    }}
                    className="text-slate-400 hover:text-slate-600"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
                {recipientInput("bcc", bcc, setBcc, "bcc@example.com (comma separated)", bccInvalid)}
              </div>
            )}

            {/* Subject */}
            <div>
              <label htmlFor="compose-subject" className={`${fieldLabel} mb-1`}>
                Subject
              </label>
              <Input
                id="compose-subject"
                type="text"
                placeholder="Message subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                disabled={isSending}
                className="text-sm border-slate-200"
              />
            </div>

            {/* Body + toolbar */}
            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <label htmlFor="compose-body" className={fieldLabel}>
                  Message
                </label>

                <div className="flex items-center gap-2">
                  {undoBody !== null && !isAiBusy && (
                    <Button
                      type="button"
                      size="sm"
                      variant="ghost"
                      onClick={handleUndoAi}
                      className="h-7 rounded-full px-2.5 text-xs text-slate-600"
                    >
                      <Undo2 className="h-3.5 w-3.5" />
                      Undo AI
                    </Button>
                  )}

                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={toggleVoiceInput}
                    disabled={isSending || isAiBusy || isTranscribing}
                    aria-pressed={isListening}
                    className={`h-7 gap-1.5 rounded-full px-2.5 text-xs font-medium ${
                      isListening
                        ? "border-red-600 bg-red-600 text-white hover:bg-red-700 hover:text-white"
                        : "border-slate-200 text-slate-600 hover:bg-slate-50"
                    }`}
                    title="Dictate your message"
                  >
                    {isListening ? (
                      <>
                        <MicOff className="h-3.5 w-3.5" />
                        <span>Stop dictation</span>
                      </>
                    ) : isTranscribing ? (
                      <>
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        <span>Transcribing…</span>
                      </>
                    ) : (
                      <>
                        <Mic className="h-3.5 w-3.5 text-blue-600" />
                        <span>Voice input</span>
                      </>
                    )}
                  </Button>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        disabled={isAiBusy || isSending}
                        className="h-7 gap-1.5 rounded-full border-blue-200 bg-blue-50/50 px-2.5 text-xs font-medium text-blue-700 hover:bg-blue-100"
                      >
                        {isAiBusy ? (
                          <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        ) : (
                          <Wand2 className="h-3.5 w-3.5" />
                        )}
                        <span>{isAiBusy ? "Working…" : "AI assist"}</span>
                      </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end" className="w-60">
                      <DropdownMenuLabel className="text-[0.6875rem] uppercase tracking-wider text-slate-400">
                        Write
                      </DropdownMenuLabel>
                      <DropdownMenuItem
                        onSelect={() => {
                          setShowAiPrompt(true);
                          setTimeout(() => aiPromptRef.current?.focus(), 0);
                        }}
                        className="cursor-pointer text-xs font-semibold text-blue-600"
                      >
                        <Sparkles className="mr-2 h-4 w-4 text-blue-600" />
                        {threadId ? "Write reply with AI" : "Write with AI"}
                      </DropdownMenuItem>

                      <DropdownMenuSeparator />

                      <DropdownMenuLabel className="text-[0.6875rem] uppercase tracking-wider text-slate-400">
                        Rewrite your text
                      </DropdownMenuLabel>
                      {REWRITE_OPTIONS.map(({ option, label, Icon }) => (
                        <DropdownMenuItem
                          key={option}
                          onSelect={() => void handleAiRewrite(option)}
                          className="cursor-pointer text-xs"
                        >
                          <Icon className="mr-2 h-3.5 w-3.5 text-slate-500" />
                          {label}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              {/* AI instruction bar */}
              {showAiPrompt && (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    void handleAiGenerate();
                  }}
                  className="flex items-center gap-2 rounded-2xl border border-blue-200 bg-blue-50/60 p-2"
                >
                  <Sparkles className="ml-1 h-4 w-4 shrink-0 text-blue-600" />
                  <Input
                    ref={aiPromptRef}
                    value={aiInstruction}
                    onChange={(e) => setAiInstruction(e.target.value)}
                    disabled={isAiBusy}
                    placeholder={
                      threadId
                        ? "Optional: how should the reply go? e.g. accept and propose Tuesday"
                        : "What should the email say? e.g. ask Tunde for the Q3 invoice"
                    }
                    className="h-8 border-blue-200 bg-white text-xs"
                  />
                  <Button
                    type="submit"
                    size="sm"
                    disabled={isAiBusy || (!aiInstruction.trim() && !threadId && !subject.trim())}
                    className="h-8 rounded-full bg-blue-600 px-3 text-xs text-white hover:bg-blue-700"
                  >
                    {aiAction === "generate" ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : "Generate"}
                  </Button>
                  <button
                    type="button"
                    aria-label="Close AI prompt"
                    onClick={() => setShowAiPrompt(false)}
                    className="rounded-full p-1 text-slate-400 hover:text-slate-600"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </form>
              )}

              <Textarea
                id="compose-body"
                placeholder="Write your message, dictate it with Voice input, or let AI assist draft it…"
                value={body}
                onChange={(e) => {
                  setBody(e.target.value);
                  setUndoBody(null);
                }}
                readOnly={isAiBusy}
                disabled={isSending}
                className={`min-h-52 resize-y border-slate-200 font-sans text-sm leading-relaxed ${
                  isAiBusy ? "opacity-60" : ""
                }`}
              />

              {isListening && (
                <p className="flex items-center gap-1.5 text-[0.6875rem] text-red-600" aria-live="polite">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-600" />
                  Recording {formatDictationTime(dictation.seconds)} / {formatDictationTime(MAX_DICTATION_SECONDS)}. Click
                  &quot;Stop dictation&quot; to add the text.
                </p>
              )}
            </div>

            {/* Attachments */}
            <div className="space-y-2 border-t border-slate-100 pt-2">
              <div className="flex items-center justify-between">
                <span className={fieldLabel}>
                  Attachments ({attachments.length}
                  {attachments.length > 0 ? ` · ${formatFileSize(totalAttachmentBytes)} of 3 MB` : ""})
                </span>

                <input type="file" ref={fileInputRef} onChange={handleFileChange} multiple className="hidden" />

                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isSending}
                  className="h-7 gap-1 rounded-full px-2.5 text-xs text-slate-600 hover:text-slate-900"
                >
                  <Paperclip className="h-3.5 w-3.5" />
                  Attach files
                </Button>
              </div>

              {attachments.length > 0 ? (
                <div className="flex flex-wrap gap-2 pt-1">
                  {attachments.map((file) => {
                    const key = fileKey(file);
                    return (
                      <div
                        key={key}
                        className="flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-100 px-3 py-1 text-xs text-slate-800"
                      >
                        <FileText className="h-3.5 w-3.5 text-blue-600" />
                        <span className="max-w-[9rem] truncate font-medium">{file.name}</span>
                        <span className="text-[0.625rem] text-slate-400">({formatFileSize(file.size)})</span>
                        <button
                          type="button"
                          aria-label={`Remove ${file.name}`}
                          onClick={() => removeAttachment(key)}
                          disabled={isSending}
                          className="ml-1 text-slate-400 hover:text-red-600"
                        >
                          <X className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-[0.6875rem] text-slate-400">
                  Drag files here or use Attach files. Up to 3 MB total. Attachments are sent with the message and
                  aren&apos;t stored in drafts.
                </p>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="flex shrink-0 flex-wrap items-center justify-between gap-2 border-t border-slate-100 bg-slate-50 p-3 sm:p-4">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => void handleSaveDraft()}
                disabled={isSavingDraft || isSending}
                className="h-9 gap-1.5 rounded-full text-xs text-slate-700"
              >
                {isSavingDraft ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                ) : (
                  <Save className="h-3.5 w-3.5 text-slate-500" />
                )}
                <span>Save draft</span>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={handleDiscardClick}
                disabled={isSending}
                className="h-9 gap-1 rounded-full text-xs text-red-600 hover:bg-red-50 hover:text-red-700"
              >
                <Trash2 className="h-3.5 w-3.5" />
                <span>Discard</span>
              </Button>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleRequestClose}
                disabled={isSending}
                className="h-9 rounded-full text-xs text-slate-500"
              >
                Close
              </Button>

              <Button
                onClick={() => void handleSend()}
                disabled={isSending || isAiBusy}
                title="Send (Ctrl+Enter)"
                className="h-9 gap-1.5 rounded-full bg-blue-600 px-5 text-xs font-semibold text-white hover:bg-blue-700"
              >
                {isSending ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Sending…</span>
                  </>
                ) : (
                  <>
                    <Send className="h-3.5 w-3.5" />
                    <span>Send</span>
                  </>
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Close / discard confirmation */}
      <Dialog
        open={confirmMode !== null}
        onOpenChange={(open) => {
          if (!open && !confirmBusy) setConfirmMode(null);
        }}
      >
        <DialogContent
          showCloseButton={false}
          aria-describedby={undefined}
          className="space-y-4 rounded-2xl bg-white p-6 sm:max-w-md"
        >
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-600">
              <AlertTriangle className="h-5 w-5" />
            </div>
            <div>
              <DialogTitle className="text-sm font-bold text-slate-900">
                {confirmMode === "discard" ? "Discard this draft?" : "Save changes before closing?"}
              </DialogTitle>
              <p className="mt-1 text-xs leading-relaxed text-slate-500">
                {confirmMode === "discard"
                  ? "This deletes the message and any saved copy in your Drafts folder. This can't be undone."
                  : "Your latest edits haven't been saved yet. Save them as a draft, or delete the draft entirely."}
                {attachments.length > 0 && " Attachments are not kept in drafts."}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-end gap-2 pt-2">
            <Button
              variant="ghost"
              size="sm"
              disabled={confirmBusy !== null}
              onClick={() => setConfirmMode(null)}
              className="rounded-full text-xs text-slate-600"
            >
              Keep editing
            </Button>

            <Button
              variant="outline"
              size="sm"
              disabled={confirmBusy !== null}
              onClick={() => void handleDeleteDraft()}
              className="gap-1.5 rounded-full border-slate-200 text-xs text-red-600 hover:bg-red-50"
            >
              {confirmBusy === "delete" ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <Trash2 className="h-3.5 w-3.5" />
              )}
              Delete draft
            </Button>

            {confirmMode === "close" && (
              <Button
                size="sm"
                disabled={confirmBusy !== null}
                onClick={() => void handleSaveAndClose()}
                className="gap-1.5 rounded-full bg-blue-600 text-xs font-semibold text-white hover:bg-blue-700"
              >
                {confirmBusy === "save" && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
                Save &amp; close
              </Button>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
