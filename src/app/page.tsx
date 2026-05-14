"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Zap, Globe, Layers } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-white font-sans selection:bg-brand selection:text-white">
      {/* Background Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] rounded-full bg-brand/20 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[30vw] h-[30vw] rounded-full bg-purple-600/20 blur-[120px] pointer-events-none" />
      <div className="absolute top-[40%] left-[50%] translate-x-[-50%] w-[50vw] h-[20vw] rounded-full bg-blue-500/10 blur-[100px] pointer-events-none" />

      {/* Navbar */}
      <nav className="absolute top-0 w-full z-50 px-6 py-6 lg:px-12 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand to-purple-600 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-semibold tracking-tight">Aura</span>
        </div>
        
        <div className="hidden md:flex gap-8 text-sm font-medium text-white/70">
          <Link href="#features" className="hover:text-white transition-colors">Features</Link>
          <Link href="#pricing" className="hover:text-white transition-colors">Pricing</Link>
          <Link href="#customers" className="hover:text-white transition-colors">Customers</Link>
        </div>

        <div className="flex gap-4 items-center">
          <Link href="/login" className="text-sm font-medium text-white/70 hover:text-white transition-colors hidden sm:block">
            Sign In
          </Link>
          <Link href="/dashboard">
            <Button className="rounded-full bg-white text-black hover:bg-white/90 font-medium px-6">
              Get Started
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center pt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-brand/30 text-brand text-sm font-medium mb-8"
        >
          <Sparkles className="w-4 h-4" />
          <span>Introducing Aura AI v2.0</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight max-w-5xl leading-[1.1]"
        >
          The operating system for <br className="hidden md:block" />
          <span className="text-gradient">modern creators.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="mt-8 text-lg md:text-xl text-white/60 max-w-2xl font-light"
        >
          Manage blogs, automate social media, and analyze performance across platforms from one beautiful, centralized dashboard powered by AI.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="mt-12 flex flex-col sm:flex-row gap-4"
        >
          <Link href="/dashboard">
            <Button className="rounded-full bg-white text-black hover:bg-white/90 h-14 px-8 text-lg font-medium shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)]">
              Start Free Trial <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button variant="outline" className="rounded-full border-white/10 bg-white/5 hover:bg-white/10 h-14 px-8 text-lg font-medium backdrop-blur-md">
              View Demo
            </Button>
          </Link>
        </motion.div>

        {/* Hero Image / Dashboard Preview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          className="mt-20 w-full max-w-6xl relative perspective-[2000px]"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10 h-full w-full pointer-events-none bottom-0" />
          <div className="glass-dark rounded-xl md:rounded-3xl border border-white/10 overflow-hidden shadow-2xl p-2 md:p-4 rotate-x-[15deg] scale-[1.05] translate-y-[-20px]">
            <div className="w-full aspect-[16/9] bg-zinc-900 rounded-lg md:rounded-2xl border border-white/5 relative overflow-hidden flex flex-col">
               {/* Mock Dashboard Header */}
              <div className="h-12 border-b border-white/5 flex items-center px-4 gap-4 bg-black/40">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <div className="flex-1" />
                <div className="h-6 w-48 bg-white/5 rounded-full" />
              </div>
              {/* Mock Dashboard Body */}
              <div className="flex-1 flex p-4 gap-4 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-opacity-10">
                {/* Sidebar */}
                <div className="w-48 hidden md:flex flex-col gap-2">
                  <div className="h-8 bg-white/10 rounded-md w-full" />
                  <div className="h-8 bg-white/5 rounded-md w-3/4" />
                  <div className="h-8 bg-white/5 rounded-md w-5/6" />
                </div>
                {/* Main Content */}
                <div className="flex-1 flex flex-col gap-4">
                  {/* Stats Row */}
                  <div className="flex gap-4 h-24">
                    <div className="flex-1 bg-white/5 rounded-xl border border-white/5 p-4 flex flex-col justify-between">
                       <div className="w-6 h-6 rounded-md bg-blue-500/20 text-blue-400 flex items-center justify-center"><Globe className="w-4 h-4"/></div>
                       <div className="h-4 bg-white/20 w-16 rounded mt-auto" />
                    </div>
                    <div className="flex-1 bg-white/5 rounded-xl border border-white/5 p-4 flex flex-col justify-between">
                       <div className="w-6 h-6 rounded-md bg-purple-500/20 text-purple-400 flex items-center justify-center"><Layers className="w-4 h-4"/></div>
                       <div className="h-4 bg-white/20 w-24 rounded mt-auto" />
                    </div>
                    <div className="flex-1 bg-white/5 rounded-xl border border-white/5 p-4 flex flex-col justify-between">
                       <div className="w-6 h-6 rounded-md bg-brand/20 text-brand flex items-center justify-center"><Zap className="w-4 h-4"/></div>
                       <div className="h-4 bg-white/20 w-12 rounded mt-auto" />
                    </div>
                  </div>
                  {/* Chart Area */}
                  <div className="flex-1 bg-white/5 rounded-xl border border-white/5 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-tr from-brand/10 to-transparent opacity-50" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
