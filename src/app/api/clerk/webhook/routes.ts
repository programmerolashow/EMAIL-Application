/* eslint-disable @typescript-eslint/no-unused-vars */

import { Webhook } from "svix";
import { headers } from "next/headers";
import { db } from "@/server/db";
import { env } from "@/env";
import type { UserJSON, WebhookEvent } from "@clerk/nextjs/server";

export async function POST(req: Request) {
  // ✅ 1. headers() is NOT async
  const headersList = await headers();

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  const svix_id = headersList.get("svix-id");
  const svix_timestamp = headersList.get("svix-timestamp");
  const svix_signature = headersList.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Missing svix headers", { status: 400 });
  }

  // ✅ 2. Read raw body
  const body = await req.text();

  // ✅ 3. Verify webhook
  const wh = new Webhook(env.CLERK_WEBHOOK_SECRET);

  let evt: WebhookEvent;

  try {
    evt = wh.verify(body, {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      "svix-id": svix_id,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      "svix-timestamp": svix_timestamp,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("❌ Webhook verification failed:", err);
    return new Response("Invalid signature", { status: 400 });
  }

  const eventType = evt.type;
  const data = evt.data as UserJSON;

  console.log(`✅ Webhook received: ${eventType}`);

  // ✅ 4. Handle events safely
  try {
    switch (eventType) {
      case "user.created":
        await handleUserCreated(data);
        break;

      case "user.updated":
        await handleUserUpdated(data);
        break;

      case "user.deleted":
        await handleUserDeleted(data);
        break;

      default:
        console.log(`⚠️ Unhandled event: ${eventType}`);
    }
  } catch (err) {
    console.error("❌ DB operation failed:", err);
    return new Response("Database error", { status: 500 });
  }

  return new Response("OK", { status: 200 });
}

// =========================
// DB HANDLERS
// =========================

function getPrimaryEmail(user: UserJSON): string {
  return user.email_addresses?.[0]?.email_address ?? "";
}

async function handleUserCreated(user: UserJSON) {
  await db.user.upsert({
    where: { id: user.id },
    update: {},
    create: {
      id: user.id,
      firstname: user.first_name ?? "",
      lastname: user.last_name ?? "",
      email: getPrimaryEmail(user),
      time: new Date(),
      imageURL: user.image_url ?? "",
    },
  });
}

async function handleUserUpdated(user: UserJSON) {
  await db.user.update({
    where: { id: user.id },
    data: {
      firstname: user.first_name ?? "",
      lastname: user.last_name ?? "",
      email: getPrimaryEmail(user),
      time: new Date(),
      imageURL: user.image_url ?? "",
    },
  });
}

async function handleUserDeleted(user: UserJSON) {
  await db.user.delete({
    where: { id: user.id },
  });
}