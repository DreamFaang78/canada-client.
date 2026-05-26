"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { ShieldCheck, Mail, Lock, Info, Loader2 } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [sessionCheck, setSessionCheck] = useState(true);
  const [error, setError] = useState("");

  const supabase = createClient();

  useEffect(() => {
    async function checkSession() {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        router.push("/admin/dashboard");
      } else {
        setSessionCheck(false);
      }
    }
    checkSession();
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Step 1: Sign in with Supabase Auth
      const { error: loginError } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (loginError) {
        throw loginError;
      }

      // Step 2: Verify admin status via server-side API (bypasses RLS)
      const res = await fetch("/api/admin/verify");
      const result = await res.json();

      if (!result.authorized) {
        await supabase.auth.signOut();
        const messages: Record<string, string> = {
          not_in_admins_table: "Unauthorized. You are not registered as an active administrator.",
          account_inactive: "Your admin account has been deactivated. Contact support.",
          server_error: "Server error during verification. Please try again.",
        };
        throw new Error(messages[result.reason] || "Unauthorized access.");
      }

      router.push("/admin/dashboard");
      router.refresh();
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to log in. Please check credentials.");
    } finally {
      setLoading(false);
    }
  };

  if (sessionCheck) {
    return (
      <div className="min-h-screen bg-big-dark flex flex-col items-center justify-center">
        <Loader2 className="w-8 h-8 text-big-red animate-spin" />
        <span className="text-xs text-gray-400 font-poppins mt-2">Checking session...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-big-dark flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-big-red/10 to-black/90 z-0" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-big-red/5 rounded-full blur-3xl" />

      <div className="max-w-md w-full bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 p-8 shadow-2xl relative z-10 space-y-8">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 bg-big-red/15 rounded-2xl flex items-center justify-center mx-auto border border-big-red/20 text-big-red">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h1 className="font-poppins font-bold text-2xl text-white">BIG Broker Portal</h1>
          <p className="text-xs text-gray-400 max-w-xs mx-auto leading-relaxed">
            Enter your credentials to manage lead CRM, consent settings, and client quote requests.
          </p>
        </div>

        {error && (
          <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-xs flex items-start gap-2">
            <Info className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1.5">
            <label htmlFor="email" className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Email Address</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                <Mail className="w-4 h-4" />
              </span>
              <input
                type="email"
                id="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@thebig.ca"
                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-big-red focus:border-transparent focus:bg-white/10 transition-all placeholder:text-gray-500"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="password" className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Password</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                <Lock className="w-4 h-4" />
              </span>
              <input
                type="password"
                id="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-big-red focus:border-transparent focus:bg-white/10 transition-all placeholder:text-gray-500"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-big-red hover:bg-deep-red disabled:bg-big-red/50 text-white font-poppins font-semibold text-sm rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 active:scale-98"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              "Sign In to Dashboard"
            )}
          </button>
        </form>

        <div className="text-center">
          <Link
            href="/"
            className="text-xs text-gray-400 hover:text-white transition-colors"
          >
            ← Return to public website
          </Link>
        </div>
      </div>
    </div>
  );
}
