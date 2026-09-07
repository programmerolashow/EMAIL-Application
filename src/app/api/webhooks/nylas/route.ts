import { NextResponse } from "next/server";
import { WebhookService } from "@/server/services/webhook-service";

export async function POST(request: Request) {
  let eventPayload: Record<string, unknown>;

  try {
    eventPayload = (await request.json()) as Record<string, unknown>;
  } catch (err) {
    console.error("❌ Nylas Webhook Payload Parsing Failed:", err);
    return NextResponse.json(
      { error: "Invalid JSON payload." },
      { status: 400 }
    );
  }

  // Extract Event Metadata from Nylas Webhook schema
  const data = (typeof eventPayload.data === "object" && eventPayload.data !== null
    ? eventPayload.data
    : eventPayload) as Record<string, unknown>;

  const eventId =
    typeof eventPayload.id === "string"
      ? eventPayload.id
      : typeof data.id === "string"
      ? data.id
      : request.headers.get("x-nylas-signature") ?? undefined;

  if (!eventId) {
    console.warn("⚠️ Rejecting Nylas webhook: Missing event identifier.");
    return NextResponse.json(
      { error: "Missing required unique event identifier." },
      { status: 400 }
    );
  }

  const eventType =
    typeof eventPayload.type === "string"
      ? eventPayload.type
      : typeof eventPayload.event === "string"
      ? eventPayload.event
      : "notification";

  const accountId =
    typeof data.grant_id === "string"
      ? data.grant_id
      : typeof eventPayload.grant_id === "string"
      ? eventPayload.grant_id
      : undefined;

  // Execute Idempotency Strategy
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
    return NextResponse.json(
      { error: "Internal webhook processing error." },
      { status: 500 }
    );
  }
}
