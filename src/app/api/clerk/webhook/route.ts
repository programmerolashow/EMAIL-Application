import { db } from "@/server/db";
import { type NextRequest } from "next/server";
import { Webhook } from "svix";
import { env } from "@/env";
import type { WebhookEvent } from "@clerk/nextjs/server";

export async function POST(req: NextRequest) {
  console.log("--------------------------------------------------");
  console.log("🌐 INCOMING CLERK WEBHOOK:", req.method, req.url);
  console.log("📡 Remote Address:", req.headers.get("x-forwarded-for") ?? "unknown");

  const WEBHOOK_SECRET = env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    console.error("❌ CONFIG ERROR: CLERK_WEBHOOK_SECRET is missing");
    return new Response("Configuration error", { status: 500 });
  }

  // 1. Validate Svix Headers
  const svix_id = req.headers.get("svix-id");
  const svix_timestamp = req.headers.get("svix-timestamp");
  const svix_signature = req.headers.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    console.warn("⚠️ REJECTED: Missing Svix headers");
    return new Response("Missing svix headers", { status: 400 });
  }

  // 2. Validate Raw Request Body
  const body = await req.text();
  if (!body || body.trim().length === 0) {
    console.warn("⚠️ REJECTED: Empty request body");
    return new Response("Empty request body", { status: 400 });
  }

  const wh = new Webhook(WEBHOOK_SECRET);
  let evt: WebhookEvent;

  // 3. Verify Svix Signature
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
    console.log("✅ VERIFICATION SUCCESS: Valid signature");
  } catch (err) {
    console.error("❌ REJECTED: Invalid signature or secret", err);
    return new Response("Invalid webhook signature", { status: 400 });
  }

  const eventType = evt.type;
  console.log(`📌 EVENT TYPE: ${eventType}`);

  // 4. Validate Payload & Process Idempotently
  if (eventType === "user.created" || eventType === "user.updated") {
    const data = evt.data;
    if (!data || typeof data.id !== "string" || !data.id) {
      console.error("❌ REJECTED: Malformed payload - missing user ID");
      return new Response("Malformed payload: missing user ID", { status: 400 });
    }

    const { id, email_addresses, first_name, last_name, image_url } = data;
    const email = email_addresses?.[0]?.email_address ?? "";

    console.log(`📩 DATABASE ACTION: Syncing user ${email} (ID: ${id})`);

    try {
      // Upsert guarantees idempotency - duplicate deliveries will update the existing user matching `id`
      await db.user.upsert({
        where: { id },
        update: {
          email,
          firstname: first_name ?? "",
          lastname: last_name ?? "",
          imageURL: image_url ?? "",
        },
        create: {
          id,
          email,
          firstname: first_name ?? "",
          lastname: last_name ?? "",
          imageURL: image_url ?? "",
          time: new Date(),
        },
      });
      console.log(`✨ DATABASE SUCCESS: User record ${id} synchronized`);
    } catch (dbError) {
      console.error("❌ DATABASE ERROR during user sync:", dbError);
      return new Response("Database error", { status: 500 });
    }
  } else if (eventType === "user.deleted") {
    const data = evt.data;
    if (!data || typeof data.id !== "string" || !data.id) {
      console.error("❌ REJECTED: Malformed payload - missing user ID");
      return new Response("Malformed payload: missing user ID", { status: 400 });
    }

    const { id } = data;
    console.log(`🗑️ DATABASE ACTION: Deleting user (ID: ${id})`);

    try {
      // deleteMany guarantees idempotency - repeat deliveries return { count: 0 } without throwing errors
      await db.user.deleteMany({
        where: { id },
      });
      console.log(`✨ DATABASE SUCCESS: User record ${id} and associated data deleted`);
    } catch (dbError) {
      console.error("❌ DATABASE ERROR during user deletion:", dbError);
      return new Response("Database error", { status: 500 });
    }
  } else {
    console.warn(`⚠️ REJECTED: Unsupported event type "${eventType}"`);
    return new Response(`Unsupported event type: ${eventType}`, { status: 400 });
  }

  console.log("--------------------------------------------------");
  return new Response("Webhook processed successfully", { status: 200 });
}
