"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { api } from "@/trpc/react";

/** Longest single recording. Keeps the upload well under Vercel's 4.5 MB body limit. */
export const MAX_DICTATION_SECONDS = 120;

export type DictationState = "idle" | "recording" | "transcribing";

/** Picks a recording format the browser supports and OpenAI accepts. */
function pickMimeType(): string | undefined {
  if (typeof MediaRecorder === "undefined") return undefined;
  const candidates = ["audio/webm;codecs=opus", "audio/webm", "audio/mp4", "audio/ogg;codecs=opus"];
  return candidates.find((type) => MediaRecorder.isTypeSupported(type));
}

function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = typeof reader.result === "string" ? reader.result : "";
      resolve(result.slice(result.indexOf(",") + 1));
    };
    reader.onerror = () => reject(reader.error ?? new Error("Could not read the recording."));
    reader.readAsDataURL(blob);
  });
}

/**
 * Records from the microphone and transcribes on the server (OpenAI speech-to-text), so it
 * works in every browser. `stop()` transcribes and calls `onText`; `cancel()` discards.
 */
export function useVoiceDictation(onText: (text: string) => void) {
  const transcribe = api.ai.transcribeAudio.useMutation();
  const utils = api.useUtils();

  const [state, setState] = useState<DictationState>("idle");
  const [seconds, setSeconds] = useState(0);

  const recorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const discardRef = useRef(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const onTextRef = useRef(onText);
  onTextRef.current = onText;

  const releaseMic = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = null;
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
  }, []);

  const finish = useCallback(
    async (mimeType: string) => {
      const chunks = chunksRef.current;
      chunksRef.current = [];
      recorderRef.current = null;
      releaseMic();

      if (discardRef.current || chunks.length === 0) {
        setState("idle");
        return;
      }
      setState("transcribing");
      try {
        const blob = new Blob(chunks, { type: mimeType });
        const audioBase64 = await blobToBase64(blob);
        const { text } = await transcribe.mutateAsync({ audioBase64, mimeType });
        if (!discardRef.current) onTextRef.current(text);
      } catch (err) {
        toast.error(err instanceof Error ? err.message : "Couldn't transcribe the recording.");
      } finally {
        setState("idle");
        void utils.ai.getQuota.invalidate();
      }
    },
    [releaseMic, transcribe, utils]
  );

  const start = useCallback(async () => {
    if (recorderRef.current) return;
    const mimeType = pickMimeType();
    if (!mimeType || !navigator.mediaDevices?.getUserMedia) {
      toast.error("Voice input isn't available in this browser.");
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      const recorder = new MediaRecorder(stream, { mimeType, audioBitsPerSecond: 32_000 });
      recorderRef.current = recorder;
      chunksRef.current = [];
      discardRef.current = false;

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) chunksRef.current.push(event.data);
      };
      recorder.onstop = () => void finish(mimeType);

      recorder.start(1000);
      setSeconds(0);
      setState("recording");
      const startedAt = Date.now();
      timerRef.current = setInterval(() => {
        const elapsed = Math.floor((Date.now() - startedAt) / 1000);
        setSeconds(elapsed);
        const active = recorderRef.current;
        if (elapsed >= MAX_DICTATION_SECONDS && active && active.state !== "inactive") {
          toast.info("Reached the 2-minute limit. Transcribing what you said.");
          active.stop();
        }
      }, 1000);
    } catch (err) {
      releaseMic();
      recorderRef.current = null;
      const name = err instanceof Error ? err.name : "";
      toast.error(
        name === "NotAllowedError"
          ? "Microphone access was blocked. Allow it in your browser settings to use voice input."
          : "Couldn't access the microphone."
      );
    }
  }, [finish, releaseMic]);

  const stop = useCallback(() => {
    const recorder = recorderRef.current;
    if (recorder && recorder.state !== "inactive") recorder.stop();
  }, []);

  /** Stops recording and throws the audio away (used when the window closes or mail is sent). */
  const cancel = useCallback(() => {
    discardRef.current = true;
    const recorder = recorderRef.current;
    if (recorder && recorder.state !== "inactive") recorder.stop();
    else releaseMic();
  }, [releaseMic]);

  // Release the microphone if the component unmounts mid-recording.
  useEffect(
    () => () => {
      discardRef.current = true;
      const recorder = recorderRef.current;
      if (recorder && recorder.state !== "inactive") recorder.stop();
      streamRef.current?.getTracks().forEach((track) => track.stop());
      if (timerRef.current) clearInterval(timerRef.current);
    },
    []
  );

  return { state, seconds, start, stop, cancel };
}
