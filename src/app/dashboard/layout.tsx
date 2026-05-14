"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  BarChart3,
  Share2,
  DollarSign,
  Settings,
  Sparkles,
  Bell,
  Search,
  Menu,
  X,
  ChevronDown,
  LogOut,
  User,
  Calendar,
  MessageSquare,
} from "lucide-react";
import { useState } from "react";

const sidebarLinks = [
  { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { label: "Content", href: "/dashboard/content", icon: FileText },
  { label: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
  { label: "Social Media", href: "/dashboard/social", icon: Share2 },
  { label: "Calendar", href: "/dashboard/calendar", icon: Calendar },
  { label: "Messages", href: "/dashboard/messages", icon: MessageSquare },
  { label: "Monetization", href: "/dashboard/monetization", icon: DollarSign },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#050508] text-white flex relative">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed md:sticky top-0 left-0 z-50 h-screen w-[260px]
          border-r border-white/[0.06] bg-[#08080d]/95 backdrop-blur-2xl
          flex flex-col transition-transform duration-300 ease-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-5 border-b border-white/[0.06]">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/20 group-hover:shadow-purple-500/40 transition-shadow">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="text-[17px] font-bold tracking-tight">Aura</span>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="md:hidden p-1 rounded-md hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          {sidebarLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setSidebarOpen(false)}
                className={`
                  flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium
                  transition-all duration-200 relative group
                  ${
                    isActive
                      ? "bg-white/[0.08] text-white shadow-sm"
                      : "text-white/50 hover:text-white/80 hover:bg-white/[0.04]"
                  }
                `}
              >
                {isActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-r-full bg-gradient-to-b from-indigo-400 to-purple-500" />
                )}
                <link.icon className={`w-[18px] h-[18px] ${isActive ? "text-indigo-400" : "text-white/40 group-hover:text-white/60"}`} />
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Sidebar bottom — user info */}
        <div className="border-t border-white/[0.06] p-3">
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/[0.04] cursor-pointer transition-colors">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-xs font-bold">
              A
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">Alex Creator</p>
              <p className="text-xs text-white/40 truncate">Pro Plan</p>
            </div>
            <ChevronDown className="w-4 h-4 text-white/30" />
          </div>
        </div>
      </aside>

      {/* Main Area */}
      <main className="flex-1 flex flex-col min-h-screen overflow-hidden">
        {/* Top Header */}
        <header className="h-16 border-b border-white/[0.06] flex items-center justify-between px-4 md:px-6 bg-[#08080d]/80 backdrop-blur-xl sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
            {/* Search */}
            <div className="hidden sm:flex items-center gap-2 bg-white/[0.04] border border-white/[0.06] rounded-xl px-3 py-2 w-[280px] focus-within:border-indigo-500/40 focus-within:bg-white/[0.06] transition-all">
              <Search className="w-4 h-4 text-white/30" />
              <input
                type="text"
                placeholder="Search content, analytics..."
                className="bg-transparent text-sm text-white placeholder:text-white/30 outline-none w-full"
              />
              <kbd className="hidden lg:inline-flex text-[10px] text-white/20 border border-white/10 rounded px-1.5 py-0.5 font-mono">⌘K</kbd>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Notifications */}
            <button className="relative p-2 rounded-xl hover:bg-white/[0.06] transition-colors">
              <Bell className="w-[18px] h-[18px] text-white/50" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-indigo-500 ring-2 ring-[#08080d]" />
            </button>
            {/* Profile */}
            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-white/[0.06] transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-xs font-bold">
                  A
                </div>
              </button>
              {profileOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-xl bg-[#12121a] border border-white/[0.08] shadow-2xl py-1 z-50">
                  <Link href="/dashboard/settings" className="flex items-center gap-2 px-4 py-2.5 text-sm text-white/70 hover:text-white hover:bg-white/[0.04]">
                    <User className="w-4 h-4" /> Profile
                  </Link>
                  <Link href="/dashboard/settings" className="flex items-center gap-2 px-4 py-2.5 text-sm text-white/70 hover:text-white hover:bg-white/[0.04]">
                    <Settings className="w-4 h-4" /> Settings
                  </Link>
                  <div className="border-t border-white/[0.06] my-1" />
                  <button className="flex items-center gap-2 px-4 py-2.5 text-sm text-red-400/80 hover:text-red-400 hover:bg-white/[0.04] w-full">
                    <LogOut className="w-4 h-4" /> Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-auto p-4 md:p-6 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
