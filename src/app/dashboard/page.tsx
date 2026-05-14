"use client";

import { Zap, Activity, Users, TrendingUp, ArrowUpRight, Eye, Heart, Clock, FileText, Send, Plus, Loader2 } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { useState, useEffect } from "react";
import Link from "next/link";

interface DashboardStats {
  totalPosts: number;
  published: number;
  drafts: number;
  scheduled: number;
  totalViews: number;
  totalLikes: number;
  socialPublishes: number;
  recentPosts: any[];
}

const growthData = [
  { name: "Jan", followers: 4000, engagement: 2400 },
  { name: "Feb", followers: 3000, engagement: 1398 },
  { name: "Mar", followers: 5000, engagement: 3800 },
  { name: "Apr", followers: 7500, engagement: 3908 },
  { name: "May", followers: 9000, engagement: 4800 },
  { name: "Jun", followers: 12000, engagement: 3800 },
  { name: "Jul", followers: 15500, engagement: 6300 },
];

const weeklyData = [
  { day: "Mon", posts: 3 }, { day: "Tue", posts: 7 }, { day: "Wed", posts: 5 },
  { day: "Thu", posts: 8 }, { day: "Fri", posts: 12 }, { day: "Sat", posts: 6 }, { day: "Sun", posts: 4 },
];

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Seed database first, then fetch stats
    fetch("/api/posts/seed", { method: "POST" })
      .then(() => fetch("/api/stats"))
      .then((res) => res.json())
      .then((data) => { setStats(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  function formatNumber(n: number): string {
    if (n >= 1000000) return (n / 1000000).toFixed(1) + "M";
    if (n >= 1000) return (n / 1000).toFixed(1) + "K";
    return n.toString();
  }

  function timeAgo(dateStr: string) {
    const diff = Date.now() - new Date(dateStr).getTime();
    const hours = Math.floor(diff / 3600000);
    if (hours < 1) return "just now";
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Good morning, Alex 👋</h1>
          <p className="text-white/40 text-sm mt-1">Here&apos;s what&apos;s happening across your platforms today.</p>
        </div>
        <Link href="/dashboard/content/new">
          <button className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-sm font-medium transition-all shadow-lg shadow-indigo-500/20">
            <Plus className="w-4 h-4" /> New Post
          </button>
        </Link>
      </div>

      {/* Stats Cards — Real Data */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        {[
          { label: "Total Posts", value: loading ? "..." : stats?.totalPosts || 0, change: `${stats?.published || 0} published`, icon: FileText, gradient: "from-indigo-500/20 to-indigo-500/5", iconColor: "text-indigo-400", borderColor: "border-indigo-500/10" },
          { label: "Total Views", value: loading ? "..." : formatNumber(stats?.totalViews || 0), change: `${stats?.socialPublishes || 0} social posts`, icon: Eye, gradient: "from-emerald-500/20 to-emerald-500/5", iconColor: "text-emerald-400", borderColor: "border-emerald-500/10" },
          { label: "Total Likes", value: loading ? "..." : formatNumber(stats?.totalLikes || 0), change: `${stats?.drafts || 0} drafts pending`, icon: Heart, gradient: "from-amber-500/20 to-amber-500/5", iconColor: "text-amber-400", borderColor: "border-amber-500/10" },
          { label: "Social Reach", value: loading ? "..." : `${stats?.socialPublishes || 0}`, change: "platforms connected", icon: Send, gradient: "from-purple-500/20 to-purple-500/5", iconColor: "text-purple-400", borderColor: "border-purple-500/10" },
        ].map((stat, i) => (
          <div key={i} className={`relative overflow-hidden rounded-2xl border ${stat.borderColor} bg-[#0c0c14] p-4 md:p-5 group hover:border-white/10 transition-colors duration-300`}>
            <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-60`} />
            <div className="relative">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-medium text-white/40 uppercase tracking-wider">{stat.label}</span>
                <stat.icon className={`w-4 h-4 ${stat.iconColor}`} />
              </div>
              <p className="text-2xl md:text-3xl font-bold tracking-tight">{stat.value}</p>
              <p className="text-xs text-emerald-400 font-medium mt-1.5 flex items-center gap-1">
                <ArrowUpRight className="w-3 h-3" /> {stat.change}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-5">
        <div className="lg:col-span-2 rounded-2xl border border-white/[0.06] bg-[#0c0c14] p-5">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="font-semibold text-sm">Audience Growth</h2>
              <p className="text-xs text-white/30 mt-0.5">Last 7 months performance</p>
            </div>
            <div className="flex gap-1 rounded-lg bg-white/[0.04] p-0.5 text-xs">
              <button className="px-3 py-1 rounded-md bg-white/[0.08] text-white font-medium">7M</button>
              <button className="px-3 py-1 rounded-md text-white/40 hover:text-white/60">1Y</button>
              <button className="px-3 py-1 rounded-md text-white/40 hover:text-white/60">All</button>
            </div>
          </div>
          <div className="h-[260px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={growthData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorFollowers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#6366f1" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorEngagement" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#a855f7" stopOpacity={0.2} />
                    <stop offset="100%" stopColor="#a855f7" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" stroke="#ffffff15" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#ffffff15" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => `${v / 1000}k`} />
                <Tooltip contentStyle={{ backgroundColor: "#16161f", borderColor: "#ffffff10", borderRadius: "12px", color: "#fff", fontSize: "12px", boxShadow: "0 8px 32px rgba(0,0,0,0.4)" }} itemStyle={{ color: "#a78bfa" }} />
                <Area type="monotone" dataKey="followers" stroke="#6366f1" fillOpacity={1} fill="url(#colorFollowers)" strokeWidth={2} />
                <Area type="monotone" dataKey="engagement" stroke="#a855f7" fillOpacity={1} fill="url(#colorEngagement)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-2xl border border-white/[0.06] bg-[#0c0c14] p-5">
          <h2 className="font-semibold text-sm mb-1">Weekly Activity</h2>
          <p className="text-xs text-white/30 mb-5">Posts published this week</p>
          <div className="h-[220px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <XAxis dataKey="day" stroke="#ffffff15" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#ffffff15" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ backgroundColor: "#16161f", borderColor: "#ffffff10", borderRadius: "12px", color: "#fff", fontSize: "12px", boxShadow: "0 8px 32px rgba(0,0,0,0.4)" }} cursor={{ fill: "rgba(255,255,255,0.02)" }} />
                <Bar dataKey="posts" fill="#6366f1" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-3 text-center">
            <p className="text-2xl font-bold">{stats?.totalPosts || 0}</p>
            <p className="text-xs text-white/30">Total posts in database</p>
          </div>
        </div>
      </div>

      {/* Bottom Row — Real Posts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-5">
        <div className="lg:col-span-2 rounded-2xl border border-white/[0.06] bg-[#0c0c14] p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-sm">Recent Posts</h2>
            <Link href="/dashboard/content" className="text-xs text-indigo-400 hover:text-indigo-300 font-medium transition-colors">View All →</Link>
          </div>
          <div className="space-y-3">
            {loading ? (
              <div className="flex items-center justify-center py-8"><Loader2 className="w-5 h-5 text-indigo-400 animate-spin" /></div>
            ) : stats?.recentPosts?.length ? (
              stats.recentPosts.map((post: any) => {
                const socials = post.socialPublishes?.filter((s: any) => s.status === "published") || [];
                return (
                  <Link key={post.id} href={`/dashboard/content/${post.id}`}>
                    <div className="flex items-center gap-4 p-3 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:bg-white/[0.04] hover:border-white/[0.08] transition-all duration-200 cursor-pointer group">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate group-hover:text-white transition-colors">{post.title}</p>
                        <div className="flex items-center gap-3 mt-1.5 flex-wrap">
                          <span className={`text-[11px] px-2 py-0.5 rounded-full font-medium capitalize ${post.status === "published" ? "bg-emerald-500/10 text-emerald-400" : post.status === "draft" ? "bg-white/[0.04] text-white/40" : "bg-amber-500/10 text-amber-400"}`}>{post.status}</span>
                          {socials.map((s: any) => (
                            <span key={s.id} className="text-[10px] px-1.5 py-0.5 rounded bg-indigo-500/10 text-indigo-400 capitalize">{s.platform}</span>
                          ))}
                          <span className="text-[11px] text-white/30 flex items-center gap-1"><Clock className="w-3 h-3" />{timeAgo(post.createdAt)}</span>
                        </div>
                      </div>
                      <div className="hidden sm:flex items-center gap-4 text-xs text-white/40">
                        <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5" />{formatNumber(post.views)}</span>
                        <span className="flex items-center gap-1"><Heart className="w-3.5 h-3.5" />{formatNumber(post.likes)}</span>
                      </div>
                    </div>
                  </Link>
                );
              })
            ) : (
              <p className="text-sm text-white/30 text-center py-6">No posts yet. Create your first post!</p>
            )}
          </div>
        </div>

        {/* AI Insights */}
        <div className="rounded-2xl border border-white/[0.06] bg-[#0c0c14] p-5">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <Zap className="w-3.5 h-3.5 text-white" />
            </div>
            <h2 className="font-semibold text-sm">AI Insights</h2>
          </div>
          <div className="space-y-3">
            <div className="p-3 rounded-xl bg-indigo-500/[0.06] border border-indigo-500/10">
              <p className="text-xs font-semibold text-indigo-400 mb-1">🔥 Viral Potential</p>
              <p className="text-xs text-white/50 leading-relaxed">Your top post has {formatNumber(stats?.totalViews || 0)} total views. Schedule follow-up content to capitalize.</p>
              <Link href="/dashboard/content/new"><button className="text-[11px] text-indigo-400 mt-2 flex items-center gap-1 font-medium hover:text-indigo-300 transition-colors">Create Follow-up <ArrowUpRight className="w-3 h-3" /></button></Link>
            </div>
            <div className="p-3 rounded-xl bg-emerald-500/[0.06] border border-emerald-500/10">
              <p className="text-xs font-semibold text-emerald-400 mb-1">⏰ Best Time to Post</p>
              <p className="text-xs text-white/50 leading-relaxed">Based on audience activity, 6:30 PM EST today will yield maximum engagement.</p>
              <Link href="/dashboard/content/new"><button className="text-[11px] text-emerald-400 mt-2 flex items-center gap-1 font-medium hover:text-emerald-300 transition-colors">Schedule Post <ArrowUpRight className="w-3 h-3" /></button></Link>
            </div>
            <div className="p-3 rounded-xl bg-amber-500/[0.06] border border-amber-500/10">
              <p className="text-xs font-semibold text-amber-400 mb-1">📈 {stats?.drafts || 0} Drafts Pending</p>
              <p className="text-xs text-white/50 leading-relaxed">You have unpublished drafts. Review and publish them to grow your reach.</p>
              <Link href="/dashboard/content"><button className="text-[11px] text-amber-400 mt-2 flex items-center gap-1 font-medium hover:text-amber-300 transition-colors">Review Drafts <ArrowUpRight className="w-3 h-3" /></button></Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
