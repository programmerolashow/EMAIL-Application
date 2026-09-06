import "server-only";
import { db } from "@/server/db";
import type { User as SupabaseUser } from "@supabase/supabase-js";

export async function syncSupabaseUserToDatabase(user: SupabaseUser) {
  const meta = user.user_metadata ?? {};
  const email = user.email ?? "";
  const fullName = typeof meta.full_name === "string" ? meta.full_name : "";
  const nameParts = fullName ? fullName.split(" ") : [];

  const firstname =
    typeof meta.first_name === "string" && meta.first_name
      ? meta.first_name
      : nameParts[0] ?? "User";

  const lastname =
    typeof meta.last_name === "string" && meta.last_name
      ? meta.last_name
      : nameParts.slice(1).join(" ");

  const imageURL = typeof meta.avatar_url === "string" ? meta.avatar_url : "";

  return db.user.upsert({
    where: { id: user.id },
    update: {
      email,
      firstname,
      lastname,
      imageURL,
    },
    create: {
      id: user.id,
      email,
      firstname,
      lastname,
      time: new Date(),
      imageURL,
    },
  });
}
