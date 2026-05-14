"use client";

import { BarChart3, TrendingUp, Users, Eye, Globe, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const trafficData = [
  { name: "Mon", views: 12400 },
  { name: "Tue", views: 18200 },
  { name: "Wed", views: 15800 },
  { name: "Thu", views: 22100 },
  { name: "Fri", views: 19500 },
  { name: "Sat", views: 14200 },
  { name: "Sun", views: 11800 },
];

const platformData = [
  { name: "Instagram", value: 35, color: "#E1306C" },
  { name: "Twitter/X", value: 25, color: "#1DA1F2" },
  { name: "YouTube", value: 20, color: "#FF0000" },
  { name: "LinkedIn", value: 12, color: "#0077B5" },
  { name: "TikTok", value: 8, color: "#69C9D0" },
];

const topContent = [
  { title: "Reel: 5 VS Code Shortcuts", platform: "Instagram", impressions: "245K", growth: "+34%" },
  { title: "Thread: Building in Public", platform: "Twitter/X", impressions: "128K", growth: "+18%" },
  { title: "Blog: Next.js 15 Deep Dive", platform: "Blog", impressions: "89K", growth: "+52%" },
  { title: "Short: React Tips in 60s", platform: "YouTube", impressions: "67K", growth: "+12%" },
];

export default function AnalyticsPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Analytics</h1>
        <p className="text-white/40 text-sm mt-1">Track performance across all your platforms.</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        {[
          { label: "Total Impressions", value: "1.2M", change: "+18.2%", up: true, icon: Eye },
          { label: "Profile Visits", value: "234K", change: "+7.4%", up: true, icon: Users },
          { label: "Click-Through Rate", value: "4.8%", change: "-0.3%", up: false, icon: TrendingUp },
          { label: "Reach", value: "890K", change: "+22.1%", up: true, icon: Globe },
        ].map((m, i) => (
          <div key={i} className="rounded-2xl border border-white/[0.06] bg-[#0c0c14] p-4 md:p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium text-white/40 uppercase tracking-wider">{m.label}</span>
              <m.icon className="w-4 h-4 text-white/20" />
            </div>
            <p className="text-2xl font-bold">{m.value}</p>
            <p className={`text-xs font-medium mt-1 flex items-center gap-1 ${m.up ? "text-emerald-400" : "text-red-400"}`}>
              {m.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
              {m.change}
            </p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-5">
        {/* Traffic Chart */}
        <div className="lg:col-span-2 rounded-2xl border border-white/[0.06] bg-[#0c0c14] p-5">
          <h2 className="font-semibold text-sm mb-1">Traffic Overview</h2>
          <p className="text-xs text-white/30 mb-5">Page views over the last 7 days</p>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trafficData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="trafficGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#6366f1" stopOpacity={0.25} />
                    <stop offset="100%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" stroke="#ffffff15" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#ffffff15" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => `${v / 1000}k`} />
                <Tooltip contentStyle={{ backgroundColor: "#16161f", borderColor: "#ffffff10", borderRadius: "12px", color: "#fff", fontSize: "12px" }} />
                <Area type="monotone" dataKey="views" stroke="#6366f1" fill="url(#trafficGrad)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Platform Distribution */}
        <div className="rounded-2xl border border-white/[0.06] bg-[#0c0c14] p-5">
          <h2 className="font-semibold text-sm mb-1">Platform Distribution</h2>
          <p className="text-xs text-white/30 mb-4">Audience by platform</p>
          <div className="h-[180px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={platformData} cx="50%" cy="50%" innerRadius={55} outerRadius={80} paddingAngle={3} dataKey="value" stroke="none">
                  {platformData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2 mt-2">
            {platformData.map((p, i) => (
              <div key={i} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: p.color }} />
                  <span className="text-white/60">{p.name}</span>
                </div>
                <span className="text-white/40 font-mono">{p.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Content */}
      <div className="rounded-2xl border border-white/[0.06] bg-[#0c0c14] p-5">
        <h2 className="font-semibold text-sm mb-4">Top Performing Content</h2>
        <div className="space-y-2">
          {topContent.map((c, i) => (
            <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:bg-white/[0.04] transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center text-sm font-bold text-indigo-400">
                  {i + 1}
                </div>
                <div>
                  <p className="text-sm font-medium">{c.title}</p>
                  <p className="text-[11px] text-white/30">{c.platform}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-mono font-medium">{c.impressions}</p>
                <p className="text-[11px] text-emerald-400">{c.growth}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
