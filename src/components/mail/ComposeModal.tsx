"use client";

import React, { useState, useEffect } from "react";
import { api } from "@/trpc/react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Send, Save, Loader2, Sparkles } from "lucide-react";
import { toast } from "sonner";

interface ComposeModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTo?: string;
  initialSubject?: string;
  initialBody?: string;
  accountId?: string;
}

export function ComposeModal({
  isOpen,
  onClose,
  initialTo = "",
  initialSubject = "",
  initialBody = "",
  accountId,
}: ComposeModalProps) {
  const [to, setTo] = useState(initialTo);
  const [subject, setSubject] = useState(initialSubject);
  const [body, setBody] = useState(initialBody);

  useEffect(() => {
    if (isOpen) {
      setTo(initialTo);
      setSubject(initialSubject);
      setBody(initialBody);
    }
  }, [isOpen, initialTo, initialSubject, initialBody]);

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

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-2xl bg-white p-0 overflow-hidden rounded-2xl shadow-2xl">
        <DialogHeader className="p-4 bg-slate-900 text-white flex items-center justify-between">
          <DialogTitle className="text-base font-bold flex items-center gap-2 text-white">
            <Sparkles className="h-4 w-4 text-blue-400" />
            New Message
          </DialogTitle>
        </DialogHeader>

        <div className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
              To
            </label>
            <Input
              type="email"
              placeholder="recipient@example.com (comma separated)"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="text-sm border-slate-200"
            />
          </div>

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

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
              Body
            </label>
            <Textarea
              placeholder="Write your email body or use AI Copilot to generate a draft..."
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="text-sm border-slate-200 h-48 resize-none font-sans"
            />
          </div>
        </div>

        <DialogFooter className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between sm:justify-between">
          <Button
            variant="outline"
            size="sm"
            onClick={handleSaveDraft}
            disabled={createDraftMutation.isPending}
            className="gap-1.5 text-xs text-slate-600"
          >
            <Save className="h-3.5 w-3.5" />
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
              className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold gap-1.5 shadow-sm"
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
