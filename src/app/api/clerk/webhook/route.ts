import { db } from "@/server/db";
import { type NextRequest } from "next/server";
import { Webhook } from "svix";
import { env } from "@/env";
import type { WebhookEvent } from "@clerk/nextjs/server";

export async function POST(req: NextRequest) {
  // 1. CATCH-ALL LOG - This must appear in your terminal if Clerk reaches you
  console.log("--------------------------------------------------");
  console.log("🌐 INCOMING WEBHOOK:", req.method, req.url);
  console.log("📡 Remote Address:", req.headers.get("x-forwarded-for") ?? "unknown");

  const WEBHOOK_SECRET = env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    console.error("❌ CONFIG ERROR: CLERK_WEBHOOK_SECRET is missing");
    return new Response("Configuration error", { status: 500 });
  }

  // Get the headers
  const svix_id = req.headers.get("svix-id");
  const svix_timestamp = req.headers.get("svix-timestamp");
  const svix_signature = req.headers.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    console.warn("⚠️ SECURITY WARNING: Missing svix headers. Is this request from Clerk?");
    return new Response("Missing svix headers", { status: 400 });
  }

  // Get the raw body
  const body = await req.text();
  console.log("📄 DATA RECEIVED: Body length", body.length);

  const wh = new Webhook(WEBHOOK_SECRET);
  let evt: WebhookEvent;

  // Verify signature
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
    console.log("✅ VERIFICATION SUCCESS: Signature is valid");
  } catch (err) {
    console.error("❌ VERIFICATION FAILURE: Invalid signature or secret", err);
    return new Response("Error occurred during verification", { status: 400 });
  }

  const eventType = evt.type;
  console.log(`📌 EVENT TYPE: ${eventType}`);

  // Sync user data
  if (eventType === "user.created" || eventType === "user.updated") {
    const { id, email_addresses, first_name, last_name, image_url } = evt.data;
    const email = email_addresses?.[0]?.email_address ?? "";

    console.log(`📩 DATABASE ACTION: Syncing user ${email} (ID: ${id})`);

    try {
      await db.user.upsert({
        where: { id: id },
        update: {
          email: email,
          firstname: first_name ?? "",
          lastname: last_name ?? "",
          imageURL: image_url ?? "",
        },
        create: {
          id: id,
          email: email,
          firstname: first_name ?? "",
          lastname: last_name ?? "",
          imageURL: image_url ?? "",
          time: new Date(),
        },
      });
      console.log("✨ DATABASE SUCCESS: User record synchronized");
    } catch (dbError) {
      console.error("❌ DATABASE ERROR:", dbError);
      return new Response("Database error", { status: 500 });
    }
  } else if (eventType === "user.deleted") {
    const { id } = evt.data;
    console.log(`🗑️ DATABASE ACTION: Deleting user (ID: ${id})`);

    if (!id) {
      console.error("❌ CLERK WEBHOOK ERROR: user.deleted payload missing ID");
      return new Response("Missing user ID", { status: 400 });
    }

    try {
      // deleteMany is idempotent - if user is already deleted or never existed, it succeeds quietly
      await db.user.deleteMany({
        where: { id: id },
      });
      console.log(`✨ DATABASE SUCCESS: User record ${id} and associated data deleted`);
    } catch (dbError) {
      console.error("❌ DATABASE ERROR:", dbError);
      return new Response("Database error", { status: 500 });
    }
  } else {
    console.log(`ℹ️ SKIPPING: No action defined for event ${eventType}`);
  }

  console.log("--------------------------------------------------");
  return new Response("Sync complete", { status: 200 });
}
