import { NextResponse } from "next/server";
import { Webhook } from "svix";
import { env } from "@/env";
import { db } from "@/server/db";
import type { Prisma } from "../../../../../generated/prisma";

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
  const provider = typeof eventPayload.provider === "string" ? eventPayload.provider : "Aurinko";
  const data = (typeof eventPayload.data === "object" && eventPayload.data !== null ? eventPayload.data : eventPayload) as Record<string, unknown>;
  const accountId = typeof data.accountId === "string" ? data.accountId : typeof eventPayload.accountId === "string" ? eventPayload.accountId : undefined;

  // 4. Idempotency Check & Duplicate Event Handling
  try {
    const existingRecord = await db.webhookEvent.findUnique({
      where: { eventId },
    });

    if (existingRecord) {
      if (existingRecord.status === "PROCESSED") {
        console.log(`ℹ️ Svix Webhook Duplicate Event skipped [eventId=${eventId}]: Already processed.`);
        return NextResponse.json({ received: true, duplicate: true });
      }
    } else {
      await db.webhookEvent.create({
        data: {
          eventId,
          provider,
          eventType,
          accountId: accountId ?? null,
          payload: eventPayload as unknown as Prisma.InputJsonValue,
          status: "PENDING",
        },
      });
    }

    // 5. Application Event Handler & Cache/Database Synchronization
    switch (eventType) {
      case "email.created":
      case "email.updated":
      case "message.new":
      case "message.updated": {
        console.log(`⚡ Svix Event [${eventType}]: Processing message update for account ${accountId ?? "unknown"}`);
        break;
      }

      case "thread.updated": {
        console.log(`⚡ Svix Event [${eventType}]: Processing thread update for account ${accountId ?? "unknown"}`);
        break;
      }

      case "account.updated":
      case "account.sync": {
        console.log(`⚡ Svix Event [${eventType}]: Processing account status update for account ${accountId ?? "unknown"}`);
        break;
      }

      default: {
        console.log(`ℹ️ Svix Event [${eventType}]: Received unhandled event type.`);
        break;
      }
    }

    // 6. Mark Event as PROCESSED
    await db.webhookEvent.update({
      where: { eventId },
      data: { status: "PROCESSED" },
    });

    return NextResponse.json({ received: true, success: true });
  } catch (error) {
    console.error(`❌ Svix Webhook Handler Failed [eventId=${eventId}]:`, error);

    // Mark event status as FAILED so Svix retry system can safely retry delivery
    await db.webhookEvent
      .update({
        where: { eventId },
        data: { status: "FAILED" },
      })
      .catch(() => null);

    return NextResponse.json(
      { error: "Internal webhook processing error." },
      { status: 500 }
    );
  }
}
