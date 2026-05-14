"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Edit3, Trash2, Eye, Heart, Clock, Calendar, Tag, User, Send, ExternalLink, X, Loader2, Check } from "lucide-react";
import { useBlogStore, type BlogPost } from "@/lib/blog-store";
import { useState, useEffect } from "react";

const statusColors: Record<string, string> = {
  published: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  draft: "bg-white/[0.04] text-white/40 border-white/[0.06]",
  scheduled: "bg-amber-500/10 text-amber-400 border-amber-500/20",
};

const platformColors: Record<string, string> = {
  instagram: "from-pink-500 to-purple-600",
  twitter: "from-blue-400 to-blue-600",
  youtube: "from-red-500 to-red-700",
  linkedin: "from-blue-600 to-blue-800",
  tiktok: "from-teal-400 to-cyan-600",
};

const allPlatforms = ["instagram", "twitter", "youtube", "linkedin", "tiktok"];

export default function ViewPostPage() {
  const params = useParams();
  const router = useRouter();
  const { getPost, deletePost, publishToSocial, unpublishFromSocial } = useBlogStore();
  const postId = params.id as string;

  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [showPublishModal, setShowPublishModal] = useState(false);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [publishing, setPublishing] = useState(false);
  const [unpublishing, setUnpublishing] = useState<string | null>(null);
  const [toast, setToast] = useState("");

  useEffect(() => {
    getPost(postId).then((p) => { setPost(p); setLoading(false); });
  }, [postId]);

  if (loading) return <div className="flex items-center justify-center py-20"><Loader2 className="w-6 h-6 text-indigo-400 animate-spin" /></div>;

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto flex flex-col items-center justify-center py-20 text-center">
        <p className="text-lg font-medium mb-2">Post not found</p>
        <p className="text-sm text-white/40 mb-6">This post may have been deleted.</p>
        <Link href="/dashboard/content"><button className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-sm font-medium transition-colors"><ArrowLeft className="w-4 h-4" /> Back to Content</button></Link>
      </div>
    );
  }

  async function handleDelete() {
    setDeleting(true);
    try { await deletePost(postId); router.push("/dashboard/content"); } catch { setDeleting(false); }
  }

  async function handlePublish() {
    if (selectedPlatforms.length === 0) return;
    setPublishing(true);
    try {
      const result = await publishToSocial(postId, selectedPlatforms);
      const refreshed = await getPost(postId);
      if (refreshed) setPost(refreshed);
      setToast(`Published to ${selectedPlatforms.length} platform(s)!`);
      setShowPublishModal(false);
      setSelectedPlatforms([]);
      setTimeout(() => setToast(""), 3000);
    } catch (e: any) { alert(e.message); }
    setPublishing(false);
  }

  async function handleUnpublish(platform: string) {
    setUnpublishing(platform);
    try {
      await unpublishFromSocial(postId, platform);
      const refreshed = await getPost(postId);
      if (refreshed) setPost(refreshed);
      setToast(`Removed from ${platform}`);
      setTimeout(() => setToast(""), 3000);
    } catch {}
    setUnpublishing(null);
  }

  function formatDate(d: string) { return new Date(d).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }); }
  function formatNumber(n: number) { return n >= 1000 ? (n / 1000).toFixed(1) + "K" : n.toString(); }

  const plain = post.content.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
  const wc = plain ? plain.split(" ").length : 0;
  const rt = Math.max(1, Math.ceil(wc / 200));
  const activeSocials = post.socialPublishes?.filter((s) => s.status === "published") || [];
  const availablePlatforms = allPlatforms.filter((p) => !activeSocials.find((s) => s.platform === p));

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {toast && <div className="fixed top-6 right-6 z-[200] bg-emerald-600 text-white px-5 py-3 rounded-xl shadow-lg flex items-center gap-2"><Check className="w-4 h-4" /> {toast}</div>}

      {/* Top bar */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <Link href="/dashboard/content"><button className="inline-flex items-center gap-2 p-2 rounded-xl hover:bg-white/[0.06] transition-colors text-sm text-white/50 hover:text-white"><ArrowLeft className="w-4 h-4" /> Back</button></Link>
        <div className="flex items-center gap-2">
          {post.status === "published" && availablePlatforms.length > 0 && (
            <button onClick={() => setShowPublishModal(true)} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-sm font-medium transition-colors shadow-lg shadow-emerald-500/20">
              <Send className="w-4 h-4" /> Publish to Social
            </button>
          )}
          <Link href={`/dashboard/content/${postId}/edit`}><button className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.06] border border-white/[0.06] hover:bg-white/[0.08] text-sm font-medium transition-colors"><Edit3 className="w-4 h-4" /> Edit</button></Link>
          <button onClick={() => setDeleteConfirm(true)} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 text-sm font-medium text-red-400 transition-colors"><Trash2 className="w-4 h-4" /> Delete</button>
        </div>
      </div>

      {/* Post Header */}
      <div className="rounded-2xl border border-white/[0.06] bg-[#0c0c14] p-6 md:p-8">
        <div className="flex items-center gap-3 mb-4 flex-wrap">
          <span className={`text-[11px] px-2.5 py-1 rounded-full border font-medium capitalize ${statusColors[post.status]}`}>{post.status}</span>
          <span className="text-xs text-white/30 bg-white/[0.04] px-2 py-0.5 rounded-md">{post.category}</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight leading-tight">{post.title}</h1>
        {post.excerpt && <p className="text-white/40 mt-3 text-sm leading-relaxed">{post.excerpt}</p>}
        <div className="flex items-center gap-4 mt-6 text-xs text-white/30 flex-wrap">
          <span className="flex items-center gap-1.5"><User className="w-3.5 h-3.5" />{post.author}</span>
          <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" />{formatDate(post.createdAt)}</span>
          <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" />{rt} min read</span>
          {post.status === "published" && (<><span className="flex items-center gap-1.5"><Eye className="w-3.5 h-3.5" />{formatNumber(post.views)} views</span><span className="flex items-center gap-1.5"><Heart className="w-3.5 h-3.5" />{formatNumber(post.likes)} likes</span></>)}
        </div>
        {post.tags.length > 0 && (
          <div className="flex items-center gap-2 mt-4 flex-wrap">
            <Tag className="w-3.5 h-3.5 text-white/20" />
            {post.tags.map((tag) => <span key={tag} className="text-[11px] text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded-full">{tag}</span>)}
          </div>
        )}
      </div>

      {/* Social Media Status */}
      {activeSocials.length > 0 && (
        <div className="rounded-2xl border border-white/[0.06] bg-[#0c0c14] p-5">
          <h3 className="text-sm font-semibold mb-3">📡 Published on Social Media</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {activeSocials.map((s) => (
              <div key={s.id} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${platformColors[s.platform] || "from-gray-500 to-gray-600"} flex items-center justify-center text-white text-xs font-bold uppercase`}>{s.platform[0]}</div>
                  <div>
                    <p className="text-sm font-medium capitalize">{s.platform}</p>
                    <p className="text-[11px] text-white/30">{s.publishedAt ? formatDate(s.publishedAt) : ""}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {s.externalUrl && <a href={s.externalUrl} target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-lg hover:bg-white/[0.06] transition-colors"><ExternalLink className="w-3.5 h-3.5 text-white/40" /></a>}
                  <button onClick={() => handleUnpublish(s.platform)} disabled={unpublishing === s.platform} className="p-1.5 rounded-lg hover:bg-red-500/10 transition-colors" title="Remove from platform">
                    {unpublishing === s.platform ? <Loader2 className="w-3.5 h-3.5 text-white/40 animate-spin" /> : <X className="w-3.5 h-3.5 text-white/40 hover:text-red-400" />}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Post Body */}
      <div className="rounded-2xl border border-white/[0.06] bg-[#0c0c14] p-6 md:p-8">
        {post.content ? (
          <div className="prose prose-invert prose-sm max-w-none [&_h1]:text-2xl [&_h1]:font-bold [&_h1]:mt-8 [&_h1]:mb-4 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:mt-8 [&_h2]:mb-3 [&_h2]:text-white/90 [&_p]:text-white/60 [&_p]:leading-relaxed [&_p]:mb-4 [&_strong]:text-white/80 [&_em]:text-white/50 [&_blockquote]:border-l-2 [&_blockquote]:border-indigo-500/30 [&_blockquote]:pl-4 [&_blockquote]:text-white/50 [&_blockquote]:italic [&_code]:bg-white/[0.06] [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-indigo-300 [&_code]:text-xs [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:text-white/60 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:text-white/60 [&_a]:text-indigo-400 [&_a]:underline [&_hr]:border-white/[0.06] [&_hr]:my-6"
            dangerouslySetInnerHTML={{ __html: post.content }} />
        ) : <p className="text-white/30 italic text-sm">No content yet.</p>}
      </div>

      {/* Publish Modal */}
      {showPublishModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" onClick={() => !publishing && setShowPublishModal(false)}>
          <div className="w-full max-w-sm rounded-2xl border border-white/[0.08] bg-[#12121a] p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-semibold mb-1">Publish to Social Media</h3>
            <p className="text-xs text-white/40 mb-4">Select platforms to publish this post to:</p>
            <div className="space-y-2 mb-6">
              {availablePlatforms.map((p) => (
                <button key={p} onClick={() => setSelectedPlatforms((prev) => prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p])}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm capitalize transition-all ${selectedPlatforms.includes(p) ? "bg-indigo-500/15 text-indigo-300 border border-indigo-500/20" : "bg-white/[0.02] text-white/50 border border-white/[0.04] hover:bg-white/[0.04]"}`}>
                  {p} {selectedPlatforms.includes(p) && <Check className="w-4 h-4 text-indigo-400" />}
                </button>
              ))}
            </div>
            <div className="flex gap-3">
              <button onClick={() => setShowPublishModal(false)} disabled={publishing} className="flex-1 px-4 py-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] text-sm font-medium transition-colors">Cancel</button>
              <button onClick={handlePublish} disabled={publishing || selectedPlatforms.length === 0} className="flex-1 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-sm font-medium transition-colors disabled:opacity-50 inline-flex items-center justify-center gap-2">
                {publishing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />} Publish
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" onClick={() => !deleting && setDeleteConfirm(false)}>
          <div className="w-full max-w-sm rounded-2xl border border-white/[0.08] bg-[#12121a] p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="w-12 h-12 rounded-2xl bg-red-500/10 flex items-center justify-center mb-4 mx-auto"><Trash2 className="w-6 h-6 text-red-400" /></div>
            <h3 className="text-lg font-semibold text-center">Delete this post?</h3>
            <p className="text-sm text-white/40 text-center mt-2">{activeSocials.length > 0 ? `This will also remove it from ${activeSocials.length} social platform(s).` : "This action cannot be undone."}</p>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setDeleteConfirm(false)} disabled={deleting} className="flex-1 px-4 py-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] text-sm font-medium transition-colors">Cancel</button>
              <button onClick={handleDelete} disabled={deleting} className="flex-1 px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-sm font-medium transition-colors inline-flex items-center justify-center gap-2">
                {deleting ? <Loader2 className="w-4 h-4 animate-spin" /> : null} Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
