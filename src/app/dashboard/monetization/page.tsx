"use client";

import { DollarSign, TrendingUp, CreditCard, Users, ArrowUpRight, ExternalLink } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

const revenueData = [
  { month: "Jan", revenue: 3200 },
  { month: "Feb", revenue: 4100 },
  { month: "Mar", revenue: 3800 },
  { month: "Apr", revenue: 5400 },
  { month: "May", revenue: 6200 },
  { month: "Jun", revenue: 8100 },
  { month: "Jul", revenue: 12450 },
];

const sourceData = [
  { source: "Subscriptions", amount: 5200 },
  { source: "Sponsorships", amount: 3400 },
  { source: "Affiliate", amount: 2100 },
  { source: "Digital Products", amount: 1200 },
  { source: "Tips", amount: 550 },
];

const transactions = [
  { description: "Pro Subscription - Monthly", amount: "+$29.99", type: "income", date: "May 14", customer: "John D." },
  { description: "Stripe Payout", amount: "-$4,200.00", type: "payout", date: "May 12", customer: "—" },
  { description: "Affiliate Commission - Vercel", amount: "+$180.00", type: "income", date: "May 11", customer: "Referral" },
  { description: "Sponsored Post - TechBrand", amount: "+$2,500.00", type: "income", date: "May 10", customer: "TechBrand Inc." },
  { description: "Digital Course Sale", amount: "+$49.99", type: "income", date: "May 9", customer: "Maria S." },
];

export default function MonetizationPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Monetization</h1>
        <p className="text-white/40 text-sm mt-1">Track revenue, subscriptions, and earnings.</p>
      </div>

      {/* Revenue Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        {[
          { label: "Total Revenue", value: "$12,450", change: "+24.5%", icon: DollarSign },
          { label: "MRR", value: "$5,200", change: "+12.3%", icon: TrendingUp },
          { label: "Active Subscribers", value: "1,847", change: "+8.1%", icon: Users },
          { label: "Avg. Revenue/User", value: "$2.81", change: "+4.2%", icon: CreditCard },
        ].map((stat, i) => (
          <div key={i} className="rounded-2xl border border-white/[0.06] bg-[#0c0c14] p-4 md:p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium text-white/40 uppercase tracking-wider">{stat.label}</span>
              <stat.icon className="w-4 h-4 text-white/20" />
            </div>
            <p className="text-2xl font-bold">{stat.value}</p>
            <p className="text-xs text-emerald-400 font-medium mt-1 flex items-center gap-1">
              <ArrowUpRight className="w-3 h-3" /> {stat.change}
            </p>
          </div>
        ))}
      </div>

      {/* Revenue Chart + Sources */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-5">
        <div className="lg:col-span-2 rounded-2xl border border-white/[0.06] bg-[#0c0c14] p-5">
          <h2 className="font-semibold text-sm mb-1">Revenue Trend</h2>
          <p className="text-xs text-white/30 mb-5">Monthly revenue over the last 7 months</p>
          <div className="h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10b981" stopOpacity={0.25} />
                    <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" stroke="#ffffff15" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#ffffff15" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v / 1000}k`} />
                <Tooltip contentStyle={{ backgroundColor: "#16161f", borderColor: "#ffffff10", borderRadius: "12px", color: "#fff", fontSize: "12px" }} />
                <Area type="monotone" dataKey="revenue" stroke="#10b981" fill="url(#revGrad)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-2xl border border-white/[0.06] bg-[#0c0c14] p-5">
          <h2 className="font-semibold text-sm mb-1">Revenue Sources</h2>
          <p className="text-xs text-white/30 mb-5">Breakdown by category</p>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sourceData} layout="vertical" margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                <XAxis type="number" stroke="#ffffff15" fontSize={10} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v / 1000}k`} />
                <YAxis type="category" dataKey="source" stroke="#ffffff15" fontSize={10} tickLine={false} axisLine={false} width={90} />
                <Tooltip contentStyle={{ backgroundColor: "#16161f", borderColor: "#ffffff10", borderRadius: "12px", color: "#fff", fontSize: "12px" }} />
                <Bar dataKey="amount" fill="#6366f1" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="rounded-2xl border border-white/[0.06] bg-[#0c0c14] p-5">
        <h2 className="font-semibold text-sm mb-4">Recent Transactions</h2>
        <div className="space-y-2">
          {transactions.map((tx, i) => (
            <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:bg-white/[0.04] transition-colors">
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${tx.type === "income" ? "bg-emerald-500/10" : "bg-amber-500/10"}`}>
                  <DollarSign className={`w-4 h-4 ${tx.type === "income" ? "text-emerald-400" : "text-amber-400"}`} />
                </div>
                <div>
                  <p className="text-sm font-medium">{tx.description}</p>
                  <p className="text-[11px] text-white/30">{tx.customer} · {tx.date}</p>
                </div>
              </div>
              <span className={`text-sm font-mono font-medium ${tx.type === "income" ? "text-emerald-400" : "text-amber-400"}`}>
                {tx.amount}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
