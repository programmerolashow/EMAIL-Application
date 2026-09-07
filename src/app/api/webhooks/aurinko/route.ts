import { NextResponse } from "next/server";
import { WebhookService } from "@/server/services/webhook-service";

export async function POST(request: Request) {
  let eventPayload: Record<string, unknown>;

  try {
    eventPayload = (await request.json()) as Record<string, unknown>;
  } catch (err) {
    console.error("❌ Aurinko Webhook Payload Parsing Failed:", err);
    return NextResponse.json(
      { error: "Invalid JSON payload." },
      { status: 400 }
    );
  }

  // Extract Event Metadata
  const eventId =
    typeof eventPayload.id === "string"
      ? eventPayload.id
      : typeof eventPayload.eventId === "string"
      ? eventPayload.eventId
      : request.headers.get("x-aurinko-event-id") ?? undefined;

  if (!eventId) {
    console.warn("⚠️ Rejecting Aurinko webhook: Missing eventId.");
    return NextResponse.json(
      { error: "Missing required unique event identifier." },
      { status: 400 }
    );
  }

  const eventType =
    typeof eventPayload.type === "string"
      ? eventPayload.type
      : typeof eventPayload.eventType === "string"
      ? eventPayload.eventType
      : "notification";

  const data = (typeof eventPayload.data === "object" && eventPayload.data !== null
    ? eventPayload.data
    : eventPayload) as Record<string, unknown>;

  const accountId =
    typeof data.accountId === "string"
      ? data.accountId
      : typeof eventPayload.accountId === "string"
      ? eventPayload.accountId
      : undefined;

  // Execute Idempotency Strategy
  try {
    const result = await WebhookService.processEvent({
      eventId,
      provider: "Aurinko",
      eventType,
      accountId,
      payload: eventPayload,
    });

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error(`❌ Aurinko Webhook Handler Exception [eventId=${eventId}]:`, error);
    return NextResponse.json(
      { error: "Internal webhook processing error." },
      { status: 500 }
    );
  }
}
