import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";

// POST /api/posts/[id]/publish — Publish to social media platforms
export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { platforms } = body; // ["instagram", "twitter", "youtube", etc.]

    if (!platforms || !Array.isArray(platforms) || platforms.length === 0) {
      return NextResponse.json({ error: "Platforms array is required" }, { status: 400 });
    }

    const post = await prisma.post.findUnique({ where: { id } });
    if (!post) return NextResponse.json({ error: "Post not found" }, { status: 404 });

    // Ensure post is published
    if (post.status !== "published") {
      await prisma.post.update({ where: { id }, data: { status: "published" } });
    }

    const results = [];
    for (const platform of platforms) {
      const platformLower = platform.toLowerCase();

      // Check if already published
      const existing = await prisma.socialPublish.findUnique({
        where: { postId_platform: { postId: id, platform: platformLower } },
      });

      if (existing && existing.status === "published") {
        results.push({ platform: platformLower, status: "already_published", id: existing.id });
        continue;
      }

      // Simulate publishing (2-3 second delay simulation)
      const externalId = `ext_${Date.now().toString(36)}_${Math.random().toString(36).substr(2, 6)}`;
      const externalUrl = `https://${platformLower}.com/p/${post.slug}`;

      if (existing) {
        // Re-publish
        await prisma.socialPublish.update({
          where: { id: existing.id },
          data: {
            status: "published",
            externalId,
            externalUrl,
            publishedAt: new Date(),
            error: null,
          },
        });
        results.push({ platform: platformLower, status: "republished", externalUrl });
      } else {
        // New publish
        const pub = await prisma.socialPublish.create({
          data: {
            postId: id,
            platform: platformLower,
            status: "published",
            externalId,
            externalUrl,
            publishedAt: new Date(),
          },
        });
        results.push({ platform: platformLower, status: "published", externalUrl, id: pub.id });
      }
    }

    const updatedPost = await prisma.post.findUnique({
      where: { id },
      include: { socialPublishes: true },
    });

    return NextResponse.json({
      message: `Published to ${results.length} platform(s)`,
      results,
      post: {
        ...updatedPost,
        tags: updatedPost?.tags ? updatedPost.tags.split(",").map((t: string) => t.trim()).filter(Boolean) : [],
      },
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE /api/posts/[id]/publish — Unpublish from specific platforms
export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const { searchParams } = new URL(req.url);
    const platform = searchParams.get("platform");

    if (!platform) {
      return NextResponse.json({ error: "Platform query parameter is required" }, { status: 400 });
    }

    const pub = await prisma.socialPublish.findUnique({
      where: { postId_platform: { postId: id, platform: platform.toLowerCase() } },
    });

    if (!pub) {
      return NextResponse.json({ error: "Not published on this platform" }, { status: 404 });
    }

    // Simulate removal from platform
    console.log(`[Social] Removing post ${id} from ${platform}`);

    await prisma.socialPublish.update({
      where: { id: pub.id },
      data: { status: "removed" },
    });

    return NextResponse.json({ success: true, message: `Removed from ${platform}` });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
