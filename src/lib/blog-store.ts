import { create } from "zustand";

export interface SocialPublish {
  id: string;
  postId: string;
  platform: string;
  status: string;
  externalId: string | null;
  externalUrl: string | null;
  publishedAt: string | null;
  error: string | null;
}

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  category: string;
  tags: string[];
  status: "draft" | "published" | "scheduled";
  slug: string;
  coverImage: string;
  author: string;
  createdAt: string;
  updatedAt: string;
  scheduledFor: string | null;
  views: number;
  likes: number;
  socialPublishes: SocialPublish[];
}

interface BlogStore {
  posts: BlogPost[];
  loading: boolean;
  error: string | null;
  total: number;
  seeded: boolean;

  fetchPosts: (status?: string, search?: string) => Promise<void>;
  addPost: (data: { title: string; content: string; excerpt: string; category: string; tags: string[]; status: string; platforms?: string[] }) => Promise<BlogPost>;
  updatePost: (id: string, data: Partial<BlogPost>) => Promise<void>;
  deletePost: (id: string) => Promise<void>;
  getPost: (id: string) => Promise<BlogPost | null>;
  publishToSocial: (id: string, platforms: string[]) => Promise<any>;
  unpublishFromSocial: (id: string, platform: string) => Promise<void>;
  seedDatabase: () => Promise<void>;
}

export const useBlogStore = create<BlogStore>((set, get) => ({
  posts: [],
  loading: false,
  error: null,
  total: 0,
  seeded: false,

  seedDatabase: async () => {
    if (get().seeded) return;
    try {
      await fetch("/api/posts/seed", { method: "POST" });
      set({ seeded: true });
    } catch {}
  },

  fetchPosts: async (status?: string, search?: string) => {
    set({ loading: true, error: null });
    try {
      const params = new URLSearchParams();
      if (status && status !== "all") params.set("status", status);
      if (search) params.set("search", search);
      params.set("limit", "100");

      const res = await fetch(`/api/posts?${params.toString()}`);
      if (!res.ok) throw new Error("Failed to fetch posts");
      const data = await res.json();
      set({ posts: data.posts, total: data.total, loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  addPost: async (data) => {
    set({ loading: true, error: null });
    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to create post");
      }
      const newPost = await res.json();
      set((state) => ({ posts: [newPost, ...state.posts], total: state.total + 1, loading: false }));
      return newPost;
    } catch (error: any) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  updatePost: async (id, data) => {
    set({ loading: true, error: null });
    try {
      const res = await fetch(`/api/posts/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to update post");
      const updated = await res.json();
      set((state) => ({
        posts: state.posts.map((p) => (p.id === id ? updated : p)),
        loading: false,
      }));
    } catch (error: any) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  deletePost: async (id) => {
    set({ loading: true, error: null });
    try {
      const res = await fetch(`/api/posts/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete post");
      set((state) => ({
        posts: state.posts.filter((p) => p.id !== id),
        total: state.total - 1,
        loading: false,
      }));
    } catch (error: any) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  getPost: async (id) => {
    try {
      const res = await fetch(`/api/posts/${id}`);
      if (!res.ok) return null;
      return await res.json();
    } catch {
      return null;
    }
  },

  publishToSocial: async (id, platforms) => {
    try {
      const res = await fetch(`/api/posts/${id}/publish`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ platforms }),
      });
      if (!res.ok) throw new Error("Failed to publish");
      const result = await res.json();
      // Refresh the post in state
      if (result.post) {
        set((state) => ({
          posts: state.posts.map((p) => (p.id === id ? result.post : p)),
        }));
      }
      return result;
    } catch (error: any) {
      throw error;
    }
  },

  unpublishFromSocial: async (id, platform) => {
    try {
      const res = await fetch(`/api/posts/${id}/publish?platform=${platform}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to unpublish");
      // Update state
      set((state) => ({
        posts: state.posts.map((p) => {
          if (p.id !== id) return p;
          return {
            ...p,
            socialPublishes: p.socialPublishes.map((sp) =>
              sp.platform === platform ? { ...sp, status: "removed" } : sp
            ),
          };
        }),
      }));
    } catch (error: any) {
      throw error;
    }
  },
}));
