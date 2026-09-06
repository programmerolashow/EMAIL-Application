import Link from "next/link";
import { Mail, Shield, Zap, Search, Layout, ArrowRight } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { syncSupabaseUserToDatabase } from "@/lib/supabase/user-sync";
import { Button } from "@/components/ui/button";
import { LinkAccountButton } from "@/components/LinkAccountButton";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    await syncSupabaseUserToDatabase(user).catch(() => null);
  }

  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2 text-xl font-bold text-blue-600">
              <Mail className="h-6 w-6" />
              <span>E-MassCom</span>
            </div>

            <div className="flex items-center gap-4">
              {!user ? (
                <>
                  <Link href="/SignIn">
                    <Button variant="ghost" className="text-slate-600 hover:text-blue-600">
                      Sign In
                    </Button>
                  </Link>
                  <Link href="/SignUp">
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm">
                      Get Started
                    </Button>
                  </Link>
                </>
              ) : (
                <div className="flex items-center gap-4">
                  <Link
                    href="/dashboard"
                    className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors"
                  >
                    Dashboard
                  </Link>
                  <form action="/api/auth/signout" method="post">
                    <Button type="submit" variant="outline" size="sm">
                      Sign Out
                    </Button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-sm font-medium border border-blue-100">
            <Zap className="h-4 w-4" />
            <span>Introducing a smarter way to email</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900">
            Welcome to the future of <br className="hidden md:block" />
            <span className="text-blue-600">intelligent communication.</span>
          </h1>

          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Manage, organize, and respond to emails with unparalleled efficiency.
            E-MassCom streamlines your workflow so you can focus on what matters most.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            {!user ? (
              <Link href="/SignUp">
                <Button size="lg" className="h-14 px-8 bg-blue-600 hover:bg-blue-700 text-white text-lg font-bold shadow-lg shadow-blue-200 group">
                  Start for Free
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            ) : (
              <div className="flex flex-col items-center gap-4">
                <p className="text-sm font-medium text-slate-500 italic">
                  You&apos;re signed in as {user.email}! Ready to connect your inbox?
                </p>
                <LinkAccountButton />
              </div>
            )}
          </div>
        </div>

        {/* Features Grid */}
        <div className="mt-32 grid md:grid-cols-3 gap-12">
          <div className="group p-8 rounded-2xl bg-slate-50 hover:bg-white border border-transparent hover:border-blue-100 transition-all duration-300">
            <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 mb-6 group-hover:scale-110 transition-transform">
              <Layout className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Unified Inbox</h3>
            <p className="text-slate-600 leading-relaxed">
              Consolidate all your email accounts into one seamless, well-organized workplace.
            </p>
          </div>

          <div className="group p-8 rounded-2xl bg-slate-50 hover:bg-white border border-transparent hover:border-blue-100 transition-all duration-300">
            <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 mb-6 group-hover:scale-110 transition-transform">
              <Search className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Neural Search</h3>
            <p className="text-slate-600 leading-relaxed">
              Find exactly what you&apos;re looking for with our powerful, context-aware indexing engine.
            </p>
          </div>

          <div className="group p-8 rounded-2xl bg-slate-50 hover:bg-white border border-transparent hover:border-blue-100 transition-all duration-300">
            <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 mb-6 group-hover:scale-110 transition-transform">
              <Shield className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Priority Security</h3>
            <p className="text-slate-600 leading-relaxed">
              Enterprise-grade encryption keeps your data and communications private and protected.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-32 border-t border-slate-100 py-12 px-4 shadow-sm bg-slate-50/50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 text-slate-900 font-bold opacity-50">
            <Mail className="h-5 w-5 text-blue-600" />
            <span>E-MassCom &copy; 2026</span>
          </div>
          <div className="flex gap-8 text-sm text-slate-500 font-medium">
            <Link href="#" className="hover:text-blue-600 transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-blue-600 transition-colors">Terms of Service</Link>
            <Link href="#" className="hover:text-blue-600 transition-colors">Contact Support</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
