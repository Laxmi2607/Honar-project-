"use client";

import { Camera, MessageCircle, Play, Briefcase, Plus, Check, AlertCircle, Loader2, X, Send, ExternalLink, RefreshCw } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useBlogStore } from "@/lib/blog-store";

interface SocialAccount {
  id: string; platform: string; handle: string; followers: string; status: string;
}

const platformMeta: Record<string, { icon: any; color: string; border: string }> = {
  instagram: { icon: Camera, color: "from-pink-500 to-purple-600", border: "border-pink-500/20" },
  twitter: { icon: MessageCircle, color: "from-blue-400 to-blue-600", border: "border-blue-500/20" },
  youtube: { icon: Play, color: "from-red-500 to-red-700", border: "border-red-500/20" },
  linkedin: { icon: Briefcase, color: "from-blue-600 to-blue-800", border: "border-blue-600/20" },
};

const addablePlatforms = [
  { platform: "tiktok", description: "Schedule and publish short-form videos." },
  { platform: "pinterest", description: "Auto-publish pins from blog posts." },
  { platform: "threads", description: "Cross-post your Twitter threads." },
  { platform: "telegram", description: "Broadcast to your Telegram channel." },
];

export default function SocialPage() {
  const { posts, fetchPosts, seedDatabase } = useBlogStore();
  const [accounts, setAccounts] = useState<SocialAccount[]>([]);
  const [loading, setLoading] = useState(true);
  const [connecting, setConnecting] = useState<string | null>(null);
  const [disconnecting, setDisconnecting] = useState<string | null>(null);
  const [connectModal, setConnectModal] = useState<string | null>(null);
  const [handleInput, setHandleInput] = useState("");
  const [toast, setToast] = useState("");

  useEffect(() => {
    seedDatabase().then(() => {
      fetchPosts();
      fetchAccounts();
    });
  }, []);

  async function fetchAccounts() {
    try {
      const res = await fetch("/api/social/accounts");
      if (res.ok) {
        const data = await res.json();
        setAccounts(data);
      }
    } catch {}
    setLoading(false);
  }

  async function handleConnect(platform: string) {
    if (!handleInput.trim()) { alert("Please enter a handle."); return; }
    setConnecting(platform);
    try {
      const res = await fetch("/api/social/accounts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ platform, handle: handleInput.trim() }),
      });
      if (res.ok) {
        await fetchAccounts();
        setToast(`${platform} connected!`);
        setTimeout(() => setToast(""), 3000);
        setConnectModal(null);
        setHandleInput("");
      }
    } catch {}
    setConnecting(null);
  }

  async function handleDisconnect(platform: string) {
    setDisconnecting(platform);
    try {
      const res = await fetch(`/api/social/accounts?platform=${platform}`, { method: "DELETE" });
      if (res.ok) {
        await fetchAccounts();
        setToast(`${platform} disconnected`);
        setTimeout(() => setToast(""), 3000);
      }
    } catch {}
    setDisconnecting(null);
  }

  async function handleReconnect(platform: string) {
    setConnecting(platform);
    try {
      const acc = accounts.find((a) => a.platform === platform);
      const res = await fetch("/api/social/accounts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ platform, handle: acc?.handle || `@user_${platform}` }),
      });
      if (res.ok) {
        await fetchAccounts();
        setToast(`${platform} reconnected!`);
        setTimeout(() => setToast(""), 3000);
      }
    } catch {}
    setConnecting(null);
  }

  const connectedAccounts = accounts.filter((a) => a.status === "connected");
  const disconnectedAccounts = accounts.filter((a) => a.status !== "connected");
  const recentPublished = posts.filter((p) => p.socialPublishes?.some((s) => s.status === "published"));

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {toast && <div className="fixed top-6 right-6 z-[200] bg-emerald-600 text-white px-5 py-3 rounded-xl shadow-lg flex items-center gap-2"><Check className="w-4 h-4" /> {toast}</div>}

      <div>
        <h1 className="text-2xl font-bold tracking-tight">Social Media</h1>
        <p className="text-white/40 text-sm mt-1">Manage accounts, publish posts, and track cross-platform performance.</p>
      </div>

      {/* Connected Accounts */}
      <div>
        <h2 className="text-sm font-semibold mb-3">Connected Accounts ({connectedAccounts.length})</h2>
        {loading ? (
          <div className="flex items-center justify-center py-8"><Loader2 className="w-5 h-5 text-indigo-400 animate-spin" /></div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {connectedAccounts.map((acc) => {
              const meta = platformMeta[acc.platform] || { icon: MessageCircle, color: "from-gray-500 to-gray-600", border: "border-white/[0.06]" };
              return (
                <div key={acc.id} className={`rounded-2xl border ${meta.border} bg-[#0c0c14] p-4 group hover:border-white/10 transition-colors`}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${meta.color} flex items-center justify-center shadow-lg`}>
                      <meta.icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium capitalize">{acc.platform}</p>
                      <p className="text-xs text-white/40 truncate">{acc.handle}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-lg font-bold">{acc.followers}</p>
                      <p className="text-[11px] text-white/30">Followers</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center gap-1 text-[11px] text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-full"><Check className="w-3 h-3" /> Live</span>
                      <button onClick={() => handleDisconnect(acc.platform)} disabled={disconnecting === acc.platform}
                        className="p-1 rounded-lg hover:bg-red-500/10 transition-colors opacity-0 group-hover:opacity-100" title="Disconnect">
                        {disconnecting === acc.platform ? <Loader2 className="w-3 h-3 animate-spin text-white/40" /> : <X className="w-3 h-3 text-white/30 hover:text-red-400" />}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Disconnected / Reconnect */}
      {disconnectedAccounts.length > 0 && (
        <div>
          <h2 className="text-sm font-semibold mb-3 text-amber-400">Needs Reconnection</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {disconnectedAccounts.map((acc) => (
              <div key={acc.id} className="rounded-2xl border border-amber-500/20 bg-[#0c0c14] p-4">
                <p className="text-sm font-medium capitalize mb-2">{acc.platform}</p>
                <p className="text-xs text-white/30 mb-3">{acc.handle}</p>
                <button onClick={() => handleReconnect(acc.platform)} disabled={connecting === acc.platform}
                  className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 text-xs font-medium transition-colors">
                  {connecting === acc.platform ? <Loader2 className="w-3 h-3 animate-spin" /> : <RefreshCw className="w-3 h-3" />} Reconnect
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add Platforms */}
      <div>
        <h2 className="text-sm font-semibold mb-3">Add Platforms</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {addablePlatforms.filter((p) => !accounts.find((a) => a.platform === p.platform)).map((p) => (
            <button key={p.platform} onClick={() => { setConnectModal(p.platform); setHandleInput(""); }}
              className="rounded-2xl border border-dashed border-white/[0.08] bg-[#0c0c14] p-4 text-left hover:border-indigo-500/30 hover:bg-indigo-500/[0.03] transition-all group">
              <div className="flex items-center gap-2 mb-2">
                <Plus className="w-4 h-4 text-white/30 group-hover:text-indigo-400 transition-colors" />
                <p className="text-sm font-medium capitalize group-hover:text-white transition-colors">{p.platform}</p>
              </div>
              <p className="text-xs text-white/30">{p.description}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Published Posts Feed */}
      <div className="rounded-2xl border border-white/[0.06] bg-[#0c0c14] p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="font-semibold text-sm">Recently Published</h2>
            <p className="text-xs text-white/30 mt-0.5">Posts shared across social media</p>
          </div>
          <Link href="/dashboard/content/new">
            <button className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-xs font-medium transition-colors">
              <Plus className="w-3.5 h-3.5" /> New Post
            </button>
          </Link>
        </div>
        <div className="space-y-2">
          {recentPublished.length === 0 ? (
            <p className="text-sm text-white/30 text-center py-6">No posts published to social media yet.</p>
          ) : (
            recentPublished.slice(0, 5).map((post) => {
              const socials = post.socialPublishes?.filter((s) => s.status === "published") || [];
              return (
                <Link key={post.id} href={`/dashboard/content/${post.id}`}>
                  <div className="flex items-start gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:bg-white/[0.04] transition-colors cursor-pointer">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{post.title}</p>
                      <div className="flex items-center gap-3 mt-2 flex-wrap">
                        {socials.map((s) => (
                          <span key={s.id} className="text-[11px] px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 font-medium capitalize">{s.platform}</span>
                        ))}
                      </div>
                    </div>
                    <span className="text-[11px] px-2.5 py-1 rounded-full border bg-emerald-500/10 text-emerald-400 border-emerald-500/20 font-medium">Live</span>
                  </div>
                </Link>
              );
            })
          )}
        </div>
      </div>

      {/* Connect Modal */}
      {connectModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" onClick={() => setConnectModal(null)}>
          <div className="w-full max-w-sm rounded-2xl border border-white/[0.08] bg-[#12121a] p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-semibold capitalize mb-1">Connect {connectModal}</h3>
            <p className="text-xs text-white/40 mb-4">Enter your {connectModal} handle to connect your account.</p>
            <input type="text" placeholder={`@your_${connectModal}_handle`} value={handleInput} onChange={(e) => setHandleInput(e.target.value)}
              className="w-full bg-white/[0.04] border border-white/[0.06] rounded-xl px-3 py-2.5 text-sm text-white placeholder:text-white/20 outline-none focus:border-indigo-500/30 transition-colors mb-4"
              onKeyDown={(e) => e.key === "Enter" && handleConnect(connectModal)} />
            <div className="flex gap-3">
              <button onClick={() => setConnectModal(null)} className="flex-1 px-4 py-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] text-sm font-medium transition-colors">Cancel</button>
              <button onClick={() => handleConnect(connectModal)} disabled={connecting === connectModal}
                className="flex-1 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-sm font-medium transition-colors inline-flex items-center justify-center gap-2 disabled:opacity-50">
                {connecting === connectModal ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />} Connect
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
