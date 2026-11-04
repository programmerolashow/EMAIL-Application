import Link from "next/link";
import { Mail, Shield, Zap, Search, Layout, ArrowRight } from "lucide-react";
import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import { hasSupabaseSessionCookie } from "@/lib/supabase/session-cookie";
import { syncSupabaseUserToDatabase } from "@/lib/supabase/user-sync";
import { db } from "@/server/db";
import { Button } from "@/components/ui/button";
import { LinkAccountButton } from "@/components/LinkAccountButton";
import { HeroBackground } from "@/components/landing/HeroBackground";

const FEATURES = [
  {
    Icon: Layout,
    title: "Unified Inbox",
    description: "Consolidate all your email accounts into one seamless, well-organized workplace.",
  },
  {
    Icon: Search,
    title: "Neural Search",
    description: "Find exactly what you're looking for with our powerful, context-aware indexing engine.",
  },
  {
    Icon: Shield,
    title: "Priority Security",
    description: "Enterprise-grade encryption keeps your data and communications private and protected.",
  },
];

export default async function Home() {
  // Only ask Supabase for the user when a session cookie exists (anonymous visits stay instant).
  const cookieStore = await cookies();
  const user = hasSupabaseSessionCookie(cookieStore.getAll())
    ? (await (await createClient()).auth.getUser()).data.user
    : null;

  if (user) {
    await syncSupabaseUserToDatabase(user).catch(() => null);
  }

  // A mailbox, once linked, stays linked: send returning users to their inbox instead of
  // offering to connect again.
  const connectedCount = user
    ? await db.account.count({ where: { userId: user.id } }).catch(() => 0)
    : 0;

  return (
    // The whole landing page fits one viewport: no page scroll at any width or height.
    <div className="relative flex h-dvh w-full flex-col overflow-hidden text-white">
      <HeroBackground />

      {/* Navigation */}
      <nav className="relative z-10 shrink-0 border-b border-white/10 bg-slate-950/30 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-3 px-4 sm:h-16 sm:px-6 lg:px-8">
          <div className="flex min-w-0 items-center gap-2 text-lg font-bold text-white sm:text-xl">
            <Mail className="h-5 w-5 shrink-0 text-blue-400 sm:h-6 sm:w-6" />
            <span className="truncate">E-MassCom</span>
          </div>

          <div className="flex shrink-0 items-center gap-2 sm:gap-4">
            {!user ? (
              <>
                <Link href="/sign-in">
                  <Button variant="ghost" className="text-slate-200 hover:bg-white/10 hover:text-white">
                    Sign In
                  </Button>
                </Link>
                <Link href="/sign-up">
                  <Button className="bg-blue-600 text-white hover:bg-blue-500">Get Started</Button>
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/dashboard"
                  className="text-sm font-medium text-slate-200 transition-colors hover:text-white"
                >
                  Dashboard
                </Link>
                <form action="/api/auth/signout" method="post">
                  <Button
                    type="submit"
                    variant="outline"
                    size="sm"
                    className="border-white/20 bg-transparent text-white hover:bg-white/10 hover:text-white"
                  >
                    Sign Out
                  </Button>
                </form>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero */}
      <main className="relative z-10 flex min-h-0 flex-1 flex-col items-center justify-center px-4 text-center sm:px-6 lg:px-8">
        <div className="flex w-full max-w-5xl flex-col items-center gap-[clamp(0.75rem,2.5vh,2rem)]">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-200 backdrop-blur sm:text-sm">
            <Zap className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            <span>Introducing a smarter way to email</span>
          </div>

          <h1 className="text-[clamp(1.875rem,min(6vw,8.5vh),4.75rem)] leading-[1.05] font-extrabold tracking-tight text-white">
            Welcome to the future of <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-blue-400 via-sky-300 to-cyan-300 bg-clip-text text-transparent">
              intelligent communication.
            </span>
          </h1>

          <p className="max-w-3xl text-[clamp(0.95rem,min(1.6vw,2.4vh),1.25rem)] leading-relaxed text-slate-300">
            Manage, organize, and respond to emails with unparalleled efficiency. E-MassCom streamlines your
            workflow so you can focus on what matters most.
          </p>

          <div className="flex flex-col items-center justify-center gap-4">
            {!user ? (
              <Link href="/sign-up">
                <Button
                  size="lg"
                  className="group h-[clamp(2.75rem,6vh,3.5rem)] bg-blue-600 px-8 text-base font-bold text-white hover:bg-blue-500 sm:text-lg"
                >
                  Start for Free
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            ) : (
              <div className="flex flex-col items-center gap-3">
                <p className="max-w-full text-sm font-medium break-all text-slate-300 italic">
                  {connectedCount > 0
                    ? `Signed in as ${user.email}. Your mailbox is connected and syncing.`
                    : `You're signed in as ${user.email}! Ready to connect your inbox?`}
                </p>
                {connectedCount > 0 ? (
                  <Link href="/dashboard">
                    <Button
                      size="lg"
                      className="group h-[clamp(2.75rem,6vh,3.5rem)] bg-blue-600 px-8 text-base font-bold text-white hover:bg-blue-500 sm:text-lg"
                    >
                      Open your inbox
                      <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                ) : (
                  <LinkAccountButton />
                )}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Features */}
      <section className="relative z-10 mx-auto grid w-full max-w-7xl shrink-0 grid-cols-3 gap-2 px-4 pb-3 sm:gap-4 sm:px-6 lg:gap-6 lg:px-8">
        {FEATURES.map(({ Icon, title, description }) => (
          <div
            key={title}
            className="group flex flex-col items-center gap-2 rounded-2xl border border-white/10 bg-white/5 p-3 text-center backdrop-blur-md transition-colors hover:border-blue-400/40 hover:bg-white/10 sm:items-start sm:p-5 sm:text-left [@media(max-height:560px)]:p-2"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-500/20 text-blue-300 transition-transform group-hover:scale-110 sm:h-10 sm:w-10">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="hidden text-base font-bold text-white sm:block lg:text-lg">{title}</h3>
            </div>
            <h3 className="text-xs font-semibold text-white sm:hidden">{title}</h3>
            <p className="hidden text-sm leading-relaxed text-slate-300 md:block [@media(max-height:720px)]:hidden">
              {description}
            </p>
          </div>
        ))}
      </section>

      {/* Footer */}
      <footer className="relative z-10 shrink-0 border-t border-white/10 bg-slate-950/40 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-6 gap-y-1 px-4 py-2.5 text-xs text-slate-400 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 font-semibold">
            <Mail className="h-4 w-4 text-blue-400" />
            <span>E-MassCom &copy; 2026</span>
          </div>
          <div className="flex gap-4 sm:gap-6">
            <Link href="#" className="transition-colors hover:text-white">
              Privacy
            </Link>
            <Link href="#" className="transition-colors hover:text-white">
              Terms
            </Link>
            <Link href="#" className="transition-colors hover:text-white">
              Support
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
