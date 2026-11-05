import "server-only";
import { db } from "@/server/db";
import { createClient } from "@/lib/supabase/server";
import type { User as SupabaseUser } from "@supabase/supabase-js";
import { isCountryCode } from "@/lib/countries";

/**
 * Idempotently synchronizes a Supabase Auth user record to the Prisma PostgreSQL User model.
 * Uses the Supabase user ID as the stable external identity.
 */
export async function syncSupabaseUserToDatabase(user: SupabaseUser) {
  const meta = user.user_metadata ?? {};
  const email = user.email ?? "";

  const fullName =
    typeof meta.full_name === "string" && meta.full_name
      ? meta.full_name
      : typeof meta.name === "string" && meta.name
      ? meta.name
      : "";

  const nameParts = fullName ? fullName.trim().split(" ") : [];

  const firstname =
    typeof meta.first_name === "string" && meta.first_name
      ? meta.first_name
      : nameParts[0] ?? "User";

  const lastname =
    typeof meta.last_name === "string" && meta.last_name
      ? meta.last_name
      : nameParts.slice(1).join(" ");

  const imageURL =
    typeof meta.avatar_url === "string"
      ? meta.avatar_url
      : typeof meta.picture === "string"
      ? meta.picture
      : "";

  const time = user.created_at ? new Date(user.created_at) : new Date();

  // Country chosen on the sign-up form. Only fills an empty value, so a later change the user
  // makes in the app is never overwritten by the original sign-up choice.
  const signupCountry = isCountryCode(meta.country) ? meta.country : null;

  const dbUser = await db.user.upsert({
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
      time,
      imageURL,
      country: signupCountry,
    },
  });

  if (!dbUser.country && signupCountry) {
    return db.user.update({ where: { id: user.id }, data: { country: signupCountry } });
  }
  return dbUser;
}

/**
 * Server helper to obtain authenticated identity directly from the Supabase session
 * (never trusting user-provided browser IDs) and idempotently synchronize the user to DB.
 */
export async function getAuthenticatedUserAndSync() {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return null;
  }

  const dbUser = await syncSupabaseUserToDatabase(user);
  return { supabaseUser: user, dbUser };
}
