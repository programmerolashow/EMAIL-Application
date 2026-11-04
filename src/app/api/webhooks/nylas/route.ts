import crypto from "node:crypto";
import { NextResponse } from "next/server";
import { env } from "@/env";
import { WebhookService } from "@/server/services/webhook-service";

export const dynamic = "force-dynamic";

/**
 * Nylas v3 verifies a webhook URL by sending GET ?challenge=<value> and expecting the
 * exact value back as plain text within 10 seconds. Without this the webhook can't be created.
 */
export function GET(request: Request) {
  const challenge = new URL(request.url).searchParams.get("challenge");
  if (!challenge) {
    return NextResponse.json({ error: "Missing challenge." }, { status: 400 });
  }
  return new Response(challenge, {
    status: 200,
    headers: { "Content-Type": "text/plain" },
  });
}

/** x-nylas-signature is a hex HMAC-SHA256 of the raw request body, keyed with the webhook secret. */
function isValidSignature(rawBody: string, signature: string | null, secret: string): boolean {
  if (!signature) return false;
  const expected = crypto.createHmac("sha256", secret).update(rawBody, "utf8").digest("hex");
  const a = Buffer.from(expected, "utf8");
  const b = Buffer.from(signature.trim().toLowerCase(), "utf8");
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

export async function POST(request: Request) {
  const rawBody = await request.text();

  if (env.NYLAS_WEBHOOK_SECRET) {
    if (!isValidSignature(rawBody, request.headers.get("x-nylas-signature"), env.NYLAS_WEBHOOK_SECRET)) {
      console.warn("⚠️ Rejecting Nylas webhook: invalid signature.");
      return NextResponse.json({ error: "Invalid signature." }, { status: 401 });
    }
  } else {
    console.warn("⚠️ NYLAS_WEBHOOK_SECRET is not set; Nylas webhook signatures are NOT being verified.");
  }

  let eventPayload: Record<string, unknown>;
  try {
    eventPayload = JSON.parse(rawBody) as Record<string, unknown>;
  } catch (err) {
    console.error("❌ Nylas Webhook Payload Parsing Failed:", err);
    return NextResponse.json({ error: "Invalid JSON payload." }, { status: 400 });
  }

  // Nylas v3 shape: { id, type, time, data: { application_id, grant_id, object: {...} } }
  const data = (typeof eventPayload.data === "object" && eventPayload.data !== null
    ? eventPayload.data
    : {}) as Record<string, unknown>;
  const object = (typeof data.object === "object" && data.object !== null
    ? data.object
    : {}) as Record<string, unknown>;

  const eventId = typeof eventPayload.id === "string" ? eventPayload.id : undefined;
  if (!eventId) {
    console.warn("⚠️ Rejecting Nylas webhook: Missing event identifier.");
    return NextResponse.json({ error: "Missing required unique event identifier." }, { status: 400 });
  }

  const eventType = typeof eventPayload.type === "string" ? eventPayload.type : "notification";

  const accountId =
    typeof data.grant_id === "string"
      ? data.grant_id
      : typeof object.grant_id === "string"
      ? object.grant_id
      : undefined;

  try {
    const result = await WebhookService.processEvent({
      eventId,
      provider: "Nylas",
      eventType,
      accountId,
      payload: eventPayload,
    });

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error(`❌ Nylas Webhook Handler Exception [eventId=${eventId}]:`, error);
    return NextResponse.json({ error: "Internal webhook processing error." }, { status: 500 });
  }
}
