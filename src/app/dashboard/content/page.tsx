"use client";

import { FileText, Plus, Search, Trash2, Eye, Edit3, Send, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useBlogStore } from "@/lib/blog-store";

const statusColors: Record<string, string> = {
  published: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  draft: "bg-white/[0.04] text-white/40 border-white/[0.06]",
  scheduled: "bg-amber-500/10 text-amber-400 border-amber-500/20",
};

const platformColors: Record<string, string> = {
  instagram: "bg-pink-500/10 text-pink-400",
  twitter: "bg-blue-400/10 text-blue-400",
  youtube: "bg-red-500/10 text-red-400",
  linkedin: "bg-blue-600/10 text-blue-500",
  tiktok: "bg-teal-500/10 text-teal-400",
};

export default function ContentPage() {
  const { posts, loading, total, fetchPosts, deletePost, seedDatabase } = useBlogStore();
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    seedDatabase().then(() => fetchPosts());
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchPosts(activeTab, searchQuery);
    }, 300);
    return () => clearTimeout(timer);
  }, [activeTab, searchQuery]);

  async function handleDelete(id: string) {
    setDeleting(true);
    try {
      await deletePost(id);
    } catch {}
    setDeleting(false);
    setDeleteConfirm(null);
  }

  function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  }

  function formatNumber(n: number): string {
    if (n >= 1000) return (n / 1000).toFixed(1) + "K";
    return n.toString();
  }

  const stats = {
    total: posts.length,
    published: posts.filter((p) => p.status === "published").length,
    drafts: posts.filter((p) => p.status === "draft").length,
    scheduled: posts.filter((p) => p.status === "scheduled").length,
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Blog Management</h1>
          <p className="text-white/40 text-sm mt-1">Create, edit, and delete blog posts. <span className="text-white/20">{total} total</span></p>
        </div>
        <Link href="/dashboard/content/new">
          <button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium transition-all shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30 active:scale-[0.98]">
            <Plus className="w-4 h-4" /> Create New Post
          </button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: "Total Posts", value: stats.total, color: "text-indigo-400" },
          { label: "Published", value: stats.published, color: "text-emerald-400" },
          { label: "Drafts", value: stats.drafts, color: "text-white/40" },
          { label: "Scheduled", value: stats.scheduled, color: "text-amber-400" },
        ].map((s, i) => (
          <div key={i} className="rounded-xl border border-white/[0.06] bg-[#0c0c14] p-4">
            <p className="text-xs text-white/30 uppercase tracking-wider">{s.label}</p>
            <p className={`text-2xl font-bold mt-1 ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Tabs + Search */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 justify-between">
        <div className="flex gap-1 rounded-xl bg-white/[0.03] border border-white/[0.06] p-1">
          {["all", "published", "draft", "scheduled"].map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`px-4 py-1.5 rounded-lg text-xs font-medium capitalize transition-all ${activeTab === tab ? "bg-white/[0.08] text-white" : "text-white/40 hover:text-white/60"}`}>
              {tab === "draft" ? "Drafts" : tab}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2 bg-white/[0.04] border border-white/[0.06] rounded-xl px-3 py-2 w-[240px] focus-within:border-indigo-500/40 transition-all">
          <Search className="w-3.5 h-3.5 text-white/30" />
          <input type="text" placeholder="Search posts..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent text-xs text-white placeholder:text-white/30 outline-none w-full" />
        </div>
      </div>

      {/* Loading */}
      {loading && posts.length === 0 && (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="w-6 h-6 text-indigo-400 animate-spin" />
        </div>
      )}

      {/* Empty State */}
      {!loading && posts.length === 0 && (
        <div className="rounded-2xl border border-white/[0.06] bg-[#0c0c14] p-12 flex flex-col items-center justify-center text-center">
          <div className="w-14 h-14 rounded-2xl bg-white/[0.04] flex items-center justify-center mb-4">
            <FileText className="w-7 h-7 text-white/20" />
          </div>
          <p className="text-sm font-medium text-white/60">No posts found</p>
          <p className="text-xs text-white/30 mt-1">{searchQuery ? "Try a different search term." : "Create your first blog post."}</p>
          {!searchQuery && (
            <Link href="/dashboard/content/new">
              <button className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-sm font-medium transition-colors">
                <Plus className="w-4 h-4" /> Create Post
              </button>
            </Link>
          )}
        </div>
      )}

      {/* Posts Table */}
      {posts.length > 0 && (
        <div className="rounded-2xl border border-white/[0.06] bg-[#0c0c14] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/[0.06]">
                  <th className="text-left text-[11px] font-medium text-white/30 uppercase tracking-wider px-5 py-3">Title</th>
                  <th className="text-left text-[11px] font-medium text-white/30 uppercase tracking-wider px-5 py-3 hidden md:table-cell">Status</th>
                  <th className="text-left text-[11px] font-medium text-white/30 uppercase tracking-wider px-5 py-3 hidden lg:table-cell">Social</th>
                  <th className="text-left text-[11px] font-medium text-white/30 uppercase tracking-wider px-5 py-3 hidden sm:table-cell">Views</th>
                  <th className="text-left text-[11px] font-medium text-white/30 uppercase tracking-wider px-5 py-3 hidden lg:table-cell">Date</th>
                  <th className="text-right text-[11px] font-medium text-white/30 uppercase tracking-wider px-5 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((post) => {
                  const activeSocials = post.socialPublishes?.filter((s) => s.status === "published") || [];
                  return (
                    <tr key={post.id} className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors group">
                      <td className="px-5 py-4">
                        <Link href={`/dashboard/content/${post.id}`} className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-lg bg-indigo-500/10 border border-indigo-500/10 flex items-center justify-center flex-shrink-0">
                            <FileText className="w-4 h-4 text-indigo-400" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-medium truncate max-w-[280px] group-hover:text-indigo-300 transition-colors">{post.title}</p>
                            <p className="text-[11px] text-white/30 truncate max-w-[280px] mt-0.5">{post.excerpt}</p>
                          </div>
                        </Link>
                      </td>
                      <td className="px-5 py-4 hidden md:table-cell">
                        <span className={`text-[11px] px-2.5 py-1 rounded-full border font-medium capitalize ${statusColors[post.status]}`}>{post.status}</span>
                      </td>
                      <td className="px-5 py-4 hidden lg:table-cell">
                        <div className="flex gap-1">
                          {activeSocials.length > 0 ? activeSocials.map((s) => (
                            <span key={s.id} className={`text-[10px] px-1.5 py-0.5 rounded capitalize ${platformColors[s.platform] || "bg-white/[0.04] text-white/40"}`}>{s.platform}</span>
                          )) : <span className="text-[11px] text-white/20">—</span>}
                        </div>
                      </td>
                      <td className="px-5 py-4 hidden sm:table-cell text-sm text-white/50 font-mono">
                        {post.status === "published" ? formatNumber(post.views) : "—"}
                      </td>
                      <td className="px-5 py-4 hidden lg:table-cell text-sm text-white/40">{formatDate(post.createdAt)}</td>
                      <td className="px-5 py-4">
                        <div className="flex items-center justify-end gap-1">
                          <Link href={`/dashboard/content/${post.id}`}>
                            <button className="p-1.5 rounded-lg hover:bg-white/[0.06] transition-all opacity-0 group-hover:opacity-100" title="View"><Eye className="w-4 h-4 text-white/40" /></button>
                          </Link>
                          <Link href={`/dashboard/content/${post.id}/edit`}>
                            <button className="p-1.5 rounded-lg hover:bg-white/[0.06] transition-all opacity-0 group-hover:opacity-100" title="Edit"><Edit3 className="w-4 h-4 text-white/40" /></button>
                          </Link>
                          <button onClick={() => setDeleteConfirm(post.id)} className="p-1.5 rounded-lg hover:bg-red-500/10 transition-all opacity-0 group-hover:opacity-100" title="Delete">
                            <Trash2 className="w-4 h-4 text-white/40 hover:text-red-400" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" onClick={() => !deleting && setDeleteConfirm(null)}>
          <div className="w-full max-w-sm rounded-2xl border border-white/[0.08] bg-[#12121a] p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="w-12 h-12 rounded-2xl bg-red-500/10 flex items-center justify-center mb-4 mx-auto"><Trash2 className="w-6 h-6 text-red-400" /></div>
            <h3 className="text-lg font-semibold text-center">Delete Post?</h3>
            <p className="text-sm text-white/40 text-center mt-2">This will also remove it from all social media platforms. This cannot be undone.</p>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setDeleteConfirm(null)} disabled={deleting} className="flex-1 px-4 py-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] text-sm font-medium transition-colors disabled:opacity-50">Cancel</button>
              <button onClick={() => handleDelete(deleteConfirm)} disabled={deleting} className="flex-1 px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-sm font-medium transition-colors disabled:opacity-50 inline-flex items-center justify-center gap-2">
                {deleting && <Loader2 className="w-4 h-4 animate-spin" />} Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
