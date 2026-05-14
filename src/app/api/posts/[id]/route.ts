import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";

// GET /api/posts/[id] — Get single post
export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const post = await prisma.post.findUnique({
      where: { id },
      include: { socialPublishes: true },
    });
    if (!post) return NextResponse.json({ error: "Post not found" }, { status: 404 });
    return NextResponse.json({
      ...post,
      tags: post.tags ? post.tags.split(",").map((t: string) => t.trim()).filter(Boolean) : [],
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// PUT /api/posts/[id] — Update post
export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { title, content, excerpt, category, tags, status, scheduledFor } = body;

    const existing = await prisma.post.findUnique({ where: { id } });
    if (!existing) return NextResponse.json({ error: "Post not found" }, { status: 404 });

    const updateData: any = {};
    if (title !== undefined) {
      updateData.title = title.trim();
      // Update slug if title changed
      let slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
      const slugConflict = await prisma.post.findFirst({ where: { slug, id: { not: id } } });
      if (slugConflict) slug = `${slug}-${Date.now().toString(36)}`;
      updateData.slug = slug;
    }
    if (content !== undefined) updateData.content = content;
    if (excerpt !== undefined) updateData.excerpt = excerpt;
    if (category !== undefined) updateData.category = category;
    if (tags !== undefined) updateData.tags = Array.isArray(tags) ? tags.join(", ") : tags;
    if (status !== undefined) updateData.status = status;
    if (scheduledFor !== undefined) updateData.scheduledFor = scheduledFor ? new Date(scheduledFor) : null;

    const post = await prisma.post.update({
      where: { id },
      data: updateData,
      include: { socialPublishes: true },
    });

    return NextResponse.json({
      ...post,
      tags: post.tags ? post.tags.split(",").map((t: string) => t.trim()).filter(Boolean) : [],
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE /api/posts/[id] — Delete post (cascades to social publishes)
export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const existing = await prisma.post.findUnique({
      where: { id },
      include: { socialPublishes: true },
    });
    if (!existing) return NextResponse.json({ error: "Post not found" }, { status: 404 });

    // Simulate removing from social platforms
    for (const pub of existing.socialPublishes) {
      if (pub.status === "published") {
        console.log(`[Social] Removing post from ${pub.platform}: ${pub.externalUrl}`);
      }
    }

    await prisma.post.delete({ where: { id } });
    return NextResponse.json({ success: true, message: "Post deleted successfully" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
