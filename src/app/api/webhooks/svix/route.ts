import { NextResponse } from "next/server";
import { Webhook } from "svix";
import { env } from "@/env";
import { WebhookService } from "@/server/services/webhook-service";

export async function POST(request: Request) {
  const webhookSecret = env.SVIX_WEBHOOK_SECRET;

  if (!webhookSecret) {
    console.error("❌ SVIX_WEBHOOK_SECRET is not configured in server environment.");
    return NextResponse.json(
      { error: "Server webhook configuration error." },
      { status: 500 }
    );
  }

  // 1. Signature Verification: Extract Svix headers
  const svixId = request.headers.get("svix-id");
  const svixTimestamp = request.headers.get("svix-timestamp");
  const svixSignature = request.headers.get("svix-signature");

  if (!svixId || !svixTimestamp || !svixSignature) {
    console.warn("⚠️ Svix Webhook delivery rejected: Missing required Svix headers.");
    return NextResponse.json(
      { error: "Missing required Svix signature headers." },
      { status: 400 }
    );
  }

  // 2. Cryptographic Signature Verification
  const body = await request.text();
  const wh = new Webhook(webhookSecret);
  let eventPayload: Record<string, unknown>;

  try {
    eventPayload = wh.verify(body, {
      "svix-id": svixId,
      "svix-timestamp": svixTimestamp,
      "svix-signature": svixSignature,
    }) as unknown as Record<string, unknown>;
  } catch (err) {
    console.error("❌ Svix Webhook Signature Verification Failed:", err);
    return NextResponse.json(
      { error: "Invalid cryptographic signature." },
      { status: 400 }
    );
  }

  // 3. Event Structure Validation
  const eventId = typeof eventPayload.id === "string" ? eventPayload.id : svixId;
  const eventType =
    typeof eventPayload.type === "string"
      ? eventPayload.type
      : typeof eventPayload.eventType === "string"
      ? eventPayload.eventType
      : "notification";
  const provider = typeof eventPayload.provider === "string" ? eventPayload.provider : "Svix";
  const data = (typeof eventPayload.data === "object" && eventPayload.data !== null
    ? eventPayload.data
    : eventPayload) as Record<string, unknown>;
  const accountId =
    typeof data.accountId === "string"
      ? data.accountId
      : typeof eventPayload.accountId === "string"
      ? eventPayload.accountId
      : undefined;

  // 4. Idempotency Strategy Execution via WebhookService
  try {
    const result = await WebhookService.processEvent({
      eventId,
      provider,
      eventType,
      accountId,
      payload: eventPayload,
    });

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error(`❌ Svix Webhook Handler Exception [eventId=${eventId}]:`, error);
    return NextResponse.json(
      { error: "Internal webhook processing error." },
      { status: 500 }
    );
  }
}
