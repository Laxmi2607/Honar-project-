"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, Eye, Send, Bold, Italic, Underline as UnderlineIcon, List, ListOrdered, Heading1, Heading2, Quote, Code, Image, Link2, Minus, Type, Trash2, Loader2, Check } from "lucide-react";
import { useBlogStore, type BlogPost } from "@/lib/blog-store";

const categories = ["Tech", "Growth", "AI", "Monetization", "Personal", "Marketing", "Design", "Productivity"];

export default function EditPostPage() {
  const params = useParams();
  const router = useRouter();
  const { getPost, updatePost, deletePost } = useBlogStore();
  const postId = params.id as string;

  const [post, setPost] = useState<BlogPost | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [category, setCategory] = useState("Tech");
  const [tags, setTags] = useState("");
  const [status, setStatus] = useState<string>("draft");
  const [saving, setSaving] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState("");

  useEffect(() => {
    getPost(postId).then((p) => {
      if (p) {
        setPost(p);
        setTitle(p.title);
        setContent(p.content);
        setExcerpt(p.excerpt);
        setCategory(p.category);
        setTags(Array.isArray(p.tags) ? p.tags.join(", ") : p.tags || "");
        setStatus(p.status);
      }
      setLoading(false);
    });
  }, [postId]);

  if (loading) return <div className="flex items-center justify-center py-20"><Loader2 className="w-6 h-6 text-indigo-400 animate-spin" /></div>;

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto flex flex-col items-center justify-center py-20 text-center">
        <p className="text-lg font-medium mb-2">Post not found</p>
        <Link href="/dashboard/content"><button className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-sm font-medium transition-colors"><ArrowLeft className="w-4 h-4" /> Back</button></Link>
      </div>
    );
  }

  async function handleSave(saveStatus: string) {
    if (!title.trim()) { alert("Please enter a title."); return; }
    setSaving(true);
    try {
      await updatePost(postId, {
        title: title.trim(),
        content,
        excerpt: excerpt.trim() || title.trim().substring(0, 120) + "...",
        category,
        tags: tags.split(",").map((t) => t.trim()).filter(Boolean) as any,
        status: saveStatus as any,
      });
      setToast(saveStatus === "published" ? "Published!" : "Saved!");
      setTimeout(() => router.push("/dashboard/content"), 800);
    } catch (e: any) { alert(e.message || "Failed"); setSaving(false); }
  }

  async function handleDelete() {
    setDeleting(true);
    try { await deletePost(postId); router.push("/dashboard/content"); } catch { setDeleting(false); }
  }

  function insertFormat(tag: string) {
    const textarea = document.getElementById("blog-content") as HTMLTextAreaElement;
    if (!textarea) return;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = content.substring(start, end);
    let formatted = "";
    switch (tag) {
      case "bold": formatted = `<strong>${selected || "bold text"}</strong>`; break;
      case "italic": formatted = `<em>${selected || "italic text"}</em>`; break;
      case "underline": formatted = `<u>${selected || "underlined text"}</u>`; break;
      case "h1": formatted = `\n<h1>${selected || "Heading 1"}</h1>\n`; break;
      case "h2": formatted = `\n<h2>${selected || "Heading 2"}</h2>\n`; break;
      case "quote": formatted = `\n<blockquote>${selected || "Quote"}</blockquote>\n`; break;
      case "code": formatted = `<code>${selected || "code"}</code>`; break;
      case "ul": formatted = `\n<ul>\n<li>${selected || "Item"}</li>\n</ul>\n`; break;
      case "ol": formatted = `\n<ol>\n<li>${selected || "Item"}</li>\n</ol>\n`; break;
      case "hr": formatted = `\n<hr/>\n`; break;
      case "link": formatted = `<a href="url">${selected || "link"}</a>`; break;
      case "image": formatted = `\n<img src="url" alt="${selected || "image"}" />\n`; break;
      case "p": formatted = `\n<p>${selected || "Paragraph"}</p>\n`; break;
      default: formatted = selected;
    }
    setContent(content.substring(0, start) + formatted + content.substring(end));
    setTimeout(() => { textarea.focus(); textarea.selectionStart = textarea.selectionEnd = start + formatted.length; }, 0);
  }

  const plainText = content.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
  const wordCount = plainText ? plainText.split(" ").length : 0;
  const readTime = Math.max(1, Math.ceil(wordCount / 200));

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {toast && <div className="fixed top-6 right-6 z-[200] bg-emerald-600 text-white px-5 py-3 rounded-xl shadow-lg flex items-center gap-2"><Check className="w-4 h-4" /> {toast}</div>}

      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-3">
          <Link href="/dashboard/content"><button className="p-2 rounded-xl hover:bg-white/[0.06] transition-colors"><ArrowLeft className="w-5 h-5 text-white/50" /></button></Link>
          <div>
            <h1 className="text-xl font-bold tracking-tight">Edit Post</h1>
            <p className="text-xs text-white/30 mt-0.5">{wordCount} words · {readTime} min read</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setShowPreview(!showPreview)} className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-white/[0.04] border border-white/[0.06] hover:bg-white/[0.06] text-sm font-medium transition-colors">
            <Eye className="w-4 h-4 text-white/40" /> {showPreview ? "Editor" : "Preview"}
          </button>
          <button onClick={() => setDeleteConfirm(true)} className="p-2 rounded-xl bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 text-red-400 transition-colors"><Trash2 className="w-4 h-4" /></button>
          <button onClick={() => handleSave("draft")} disabled={saving} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.06] border border-white/[0.06] hover:bg-white/[0.08] text-sm font-medium transition-colors disabled:opacity-50">
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />} Save Draft
          </button>
          <button onClick={() => handleSave("published")} disabled={saving} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-sm font-medium transition-colors shadow-lg shadow-indigo-500/20 disabled:opacity-50">
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />} {post.status === "published" ? "Update" : "Publish"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 space-y-4">
          <input type="text" placeholder="Post title..." value={title} onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-transparent text-3xl font-bold placeholder:text-white/15 outline-none border-b border-white/[0.06] pb-4 focus:border-indigo-500/30 transition-colors" />

          {showPreview ? (
            <div className="rounded-2xl border border-white/[0.06] bg-[#0c0c14] p-6 min-h-[400px]">
              {content ? <div className="prose prose-invert prose-sm max-w-none [&_h1]:text-2xl [&_h1]:font-bold [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:mt-6 [&_h2]:mb-3 [&_p]:text-white/60 [&_p]:leading-relaxed [&_p]:mb-3 [&_strong]:text-white/80 [&_blockquote]:border-l-2 [&_blockquote]:border-indigo-500/30 [&_blockquote]:pl-4 [&_blockquote]:text-white/50 [&_code]:bg-white/[0.06] [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-indigo-300 [&_code]:text-xs" dangerouslySetInnerHTML={{ __html: content }} /> : <p className="text-white/20 italic">Nothing to preview.</p>}
            </div>
          ) : (
            <div className="rounded-2xl border border-white/[0.06] bg-[#0c0c14] overflow-hidden">
              <div className="flex flex-wrap items-center gap-0.5 p-2 border-b border-white/[0.06] bg-white/[0.02]">
                {[
                  { icon: Heading1, tag: "h1" }, { icon: Heading2, tag: "h2" }, { icon: Type, tag: "p" }, null,
                  { icon: Bold, tag: "bold" }, { icon: Italic, tag: "italic" }, { icon: UnderlineIcon, tag: "underline" }, null,
                  { icon: List, tag: "ul" }, { icon: ListOrdered, tag: "ol" }, { icon: Quote, tag: "quote" }, { icon: Code, tag: "code" }, null,
                  { icon: Link2, tag: "link" }, { icon: Image, tag: "image" }, { icon: Minus, tag: "hr" },
                ].map((item, i) => item === null
                  ? <div key={i} className="w-px h-5 bg-white/[0.06] mx-1" />
                  : <button key={i} onClick={() => insertFormat(item.tag)} className="p-1.5 rounded-lg hover:bg-white/[0.08] text-white/40 hover:text-white/70 transition-all"><item.icon className="w-4 h-4" /></button>
                )}
              </div>
              <textarea id="blog-content" placeholder="Write your blog post..." value={content} onChange={(e) => setContent(e.target.value)}
                className="w-full min-h-[450px] p-5 bg-transparent text-sm text-white/80 placeholder:text-white/15 outline-none resize-y leading-relaxed font-mono" />
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl border border-white/[0.06] bg-[#0c0c14] p-4">
            <label className="block text-xs font-medium text-white/40 uppercase tracking-wider mb-2">Excerpt</label>
            <textarea placeholder="Brief description..." value={excerpt} onChange={(e) => setExcerpt(e.target.value)} rows={3}
              className="w-full bg-white/[0.04] border border-white/[0.06] rounded-xl px-3 py-2.5 text-sm text-white placeholder:text-white/20 outline-none resize-none focus:border-indigo-500/30 transition-colors" />
          </div>
          <div className="rounded-2xl border border-white/[0.06] bg-[#0c0c14] p-4">
            <label className="block text-xs font-medium text-white/40 uppercase tracking-wider mb-2">Category</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-white/[0.04] border border-white/[0.06] rounded-xl px-3 py-2.5 text-sm text-white outline-none focus:border-indigo-500/30 transition-colors appearance-none cursor-pointer">
              {categories.map((c) => <option key={c} value={c} className="bg-[#0c0c14] text-white">{c}</option>)}
            </select>
          </div>
          <div className="rounded-2xl border border-white/[0.06] bg-[#0c0c14] p-4">
            <label className="block text-xs font-medium text-white/40 uppercase tracking-wider mb-2">Tags</label>
            <input type="text" placeholder="tag1, tag2, tag3" value={tags} onChange={(e) => setTags(e.target.value)}
              className="w-full bg-white/[0.04] border border-white/[0.06] rounded-xl px-3 py-2.5 text-sm text-white placeholder:text-white/20 outline-none focus:border-indigo-500/30 transition-colors" />
          </div>
          <div className="rounded-2xl border border-white/[0.06] bg-[#0c0c14] p-4">
            <label className="block text-xs font-medium text-white/40 uppercase tracking-wider mb-2">Status</label>
            <div className="space-y-2">
              {(["draft", "published"] as const).map((s) => (
                <button key={s} onClick={() => setStatus(s)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm capitalize transition-all ${status === s ? "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20" : "bg-white/[0.02] text-white/40 border border-transparent hover:bg-white/[0.04]"}`}>{s}</button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {deleteConfirm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" onClick={() => !deleting && setDeleteConfirm(false)}>
          <div className="w-full max-w-sm rounded-2xl border border-white/[0.08] bg-[#12121a] p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="w-12 h-12 rounded-2xl bg-red-500/10 flex items-center justify-center mb-4 mx-auto"><Trash2 className="w-6 h-6 text-red-400" /></div>
            <h3 className="text-lg font-semibold text-center">Delete this post?</h3>
            <p className="text-sm text-white/40 text-center mt-2">This cannot be undone.</p>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setDeleteConfirm(false)} disabled={deleting} className="flex-1 px-4 py-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] text-sm font-medium transition-colors">Cancel</button>
              <button onClick={handleDelete} disabled={deleting} className="flex-1 px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-sm font-medium transition-colors inline-flex items-center justify-center gap-2">
                {deleting && <Loader2 className="w-4 h-4 animate-spin" />} Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
