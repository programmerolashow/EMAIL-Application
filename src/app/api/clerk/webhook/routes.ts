import { db } from "@/server/db";
import { type NextRequest } from "next/server";
import type { UserJSON } from "@clerk/nextjs/server";

export async function POST(req: NextRequest) {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const body = await req.json();

    // Clerk sends data inside "data"
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const data = body?.data as UserJSON;

    if (!data?.id) {
      return new Response("Invalid payload", { status: 400 });
    }

    console.log("📩 Webhook received:", data.id);

    const email = data.email_addresses?.[0]?.email_address ?? "";
    const firstName = data.first_name ?? "";
    const lastName = data.last_name ?? "";
    const imageUrl = data.image_url ?? "";

    // ✅ Prevent duplicates using upsert
    await db.user.upsert({
      where: {
        id: data.id,
      },
      update: {
        email,
        firstname: firstName,
        lastname: lastName,
        imageURL: imageUrl,
        time: new Date(),
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

    return new Response("Webhook processed", { status: 200 });
  } catch (err) {
    console.error("Webhook error:", err);
    return new Response("Server error", { status: 500 });
  }
}