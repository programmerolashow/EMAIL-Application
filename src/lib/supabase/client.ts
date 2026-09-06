import { createBrowserClient } from "@supabase/ssr";
import { env } from "@/env";
import type { SupabaseClient } from "@supabase/supabase-js";

let clientSingleton: SupabaseClient | undefined;

export function createClient() {
  if (clientSingleton) return clientSingleton;

  clientSingleton = createBrowserClient(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  return clientSingleton;
}

export const supabase = createClient();
