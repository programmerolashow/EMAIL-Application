import React from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { syncSupabaseUserToDatabase } from "@/lib/supabase/user-sync";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/sign-in");
  }

  await syncSupabaseUserToDatabase(user).catch(() => null);

  return (
    <div className="flex h-dvh w-full overflow-hidden bg-slate-100 font-sans text-slate-900">
      {children}
    </div>
  );
}
