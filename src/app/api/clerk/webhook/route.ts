import { db } from "@/server/db";
import { type NextRequest } from "next/server";
import { Webhook } from "svix";
import { env } from "@/env";

export async function POST(req: NextRequest) {
  const WEBHOOK_SECRET = env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error("Please add CLERK_WEBHOOK_SECRET from Clerk Dashboard to .env or sytsem environment variables");
  }

  // Get the headers
  const svix_id = req.headers.get("svix-id");
  const svix_timestamp = req.headers.get("svix-timestamp");
  const svix_signature = req.headers.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occurred -- no svix headers", {
      status: 400,
    });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: any;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    });
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error occurred", {
      status: 400,
    });
  }

  // Handle the webhook
  const { id } = evt.data;
  const eventType = evt.type;

  if (eventType === "user.created" || eventType === "user.updated") {
    const { email_addresses, first_name, last_name, image_url } = evt.data;
    const email = email_addresses[0]?.email_address;

    console.log(`📩 Syncing user ID: ${id}`);

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
  }

  return new Response("", { status: 200 });
}
