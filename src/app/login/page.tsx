"use client";

import { Sparkles } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#050508] text-white flex items-center justify-center relative overflow-hidden px-4">
      {/* Background effects */}
      <div className="absolute top-[-20%] left-[-10%] w-[40vw] h-[40vw] rounded-full bg-indigo-600/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[30vw] h-[30vw] rounded-full bg-purple-600/10 blur-[120px] pointer-events-none" />

      <div className="w-full max-w-[400px] relative z-10">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 justify-center mb-8">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/20">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="text-2xl font-bold tracking-tight">Aura</span>
        </Link>

        {/* Card */}
        <div className="rounded-2xl border border-white/[0.06] bg-[#0c0c14] p-6 md:p-8">
          <div className="text-center mb-6">
            <h1 className="text-xl font-bold tracking-tight">Welcome back</h1>
            <p className="text-sm text-white/40 mt-1">Sign in to your account to continue</p>
          </div>

          {/* Social Login */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <button className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.06] text-sm font-medium hover:bg-white/[0.06] transition-colors">
              <svg className="w-4 h-4" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
              Google
            </button>
            <button className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.06] text-sm font-medium hover:bg-white/[0.06] transition-colors">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
              GitHub
            </button>
          </div>

          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-white/[0.06]" />
            <span className="text-xs text-white/20 uppercase tracking-wider">or</span>
            <div className="flex-1 h-px bg-white/[0.06]" />
          </div>

          {/* Form */}
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="block text-xs font-medium text-white/40 mb-1.5">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full bg-white/[0.04] border border-white/[0.06] rounded-xl px-3 py-2.5 text-sm text-white placeholder:text-white/20 outline-none focus:border-indigo-500/40 transition-colors"
              />
            </div>
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-xs font-medium text-white/40">Password</label>
                <button type="button" className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors">Forgot?</button>
              </div>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full bg-white/[0.04] border border-white/[0.06] rounded-xl px-3 py-2.5 text-sm text-white placeholder:text-white/20 outline-none focus:border-indigo-500/40 transition-colors"
              />
            </div>
            <Link href="/dashboard">
              <Button className="w-full rounded-xl bg-indigo-600 hover:bg-indigo-500 h-11 text-sm font-medium shadow-lg shadow-indigo-500/20 mt-2">
                Sign In
              </Button>
            </Link>
          </form>
        </div>

        <p className="text-center text-xs text-white/30 mt-6">
          Don&apos;t have an account?{" "}
          <Link href="/login" className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors">Sign up</Link>
        </p>
      </div>
    </div>
  );
}
