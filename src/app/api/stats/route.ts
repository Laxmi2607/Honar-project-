import { NextResponse } from "next/server";
import prisma from "@/lib/db";

// GET /api/stats — Get dashboard statistics
export async function GET() {
  try {
    const [totalPosts, published, drafts, scheduled, totalViews, totalLikes, recentPosts, socialPublishes] = await Promise.all([
      prisma.post.count(),
      prisma.post.count({ where: { status: "published" } }),
      prisma.post.count({ where: { status: "draft" } }),
      prisma.post.count({ where: { status: "scheduled" } }),
      prisma.post.aggregate({ _sum: { views: true } }),
      prisma.post.aggregate({ _sum: { likes: true } }),
      prisma.post.findMany({
        orderBy: { createdAt: "desc" },
        take: 5,
        include: { socialPublishes: true },
      }),
      prisma.socialPublish.count({ where: { status: "published" } }),
    ]);

    return NextResponse.json({
      totalPosts,
      published,
      drafts,
      scheduled,
      totalViews: totalViews._sum.views || 0,
      totalLikes: totalLikes._sum.likes || 0,
      socialPublishes,
      recentPosts: recentPosts.map((p) => ({
        ...p,
        tags: p.tags ? p.tags.split(",").map((t: string) => t.trim()).filter(Boolean) : [],
      })),
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
