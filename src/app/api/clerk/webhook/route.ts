import { db } from "@/server/db";
import { type NextRequest } from "next/server";

interface ClerkUser {
  id: string;
  email_addresses?: Array<{ email_address: string }>;
  first_name?: string;
  last_name?: string;
  image_url?: string;
}

interface ClerkWebhookPayload {
  type?: string;
  data?: ClerkUser;
}

export async function POST(req: NextRequest) {
  try {
    // Parse and type the body safely
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const body: ClerkWebhookPayload = await req.json();

    const data = body.data;
    const type = body.type;

    if (!data?.id) {
      return new Response("No user data found", { status: 400 });
    }

    // Only handle specific Clerk user events
    if (type !== "user.created" && type !== "user.updated") {
      return new Response("Event not handled", { status: 200 });
    }

    // Map Clerk data safely
    const email = data.email_addresses?.[0]?.email_address ?? "";
    const firstName = data.first_name ?? "";
    const lastName = data.last_name ?? "";
    const imageUrl = data.image_url ?? "";

    console.log(`📩 Syncing user ID: ${data.id}`);

    // Upsert the user record in your database
    await db.user.upsert({
      where: { id: data.id },
      update: {
        email,
        firstname: firstName,
        lastname: lastName,
        imageURL: imageUrl,
      },
      create: {
        id: data.id,
        email,
        firstname: firstName,
        lastname: lastName,
        imageURL: imageUrl,
        time: new Date(),
      },
    });

    return new Response("User synced successfully", { status: 200 });
  } catch (err) {
    console.error("Webhook Error:", err);
    return new Response("Internal Server Error", { status: 500 });
  }
}
