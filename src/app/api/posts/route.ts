import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";

// GET /api/posts — List posts with filtering, search, pagination
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");
    const search = searchParams.get("search");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "50");
    const skip = (page - 1) * limit;

    const where: any = {};
    if (status && status !== "all") where.status = status;
    if (search) {
      where.OR = [
        { title: { contains: search } },
        { excerpt: { contains: search } },
        { category: { contains: search } },
        { tags: { contains: search } },
      ];
    }

    const [posts, total] = await Promise.all([
      prisma.post.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
        include: { socialPublishes: true },
      }),
      prisma.post.count({ where }),
    ]);

    return NextResponse.json({
      posts: posts.map((p) => ({
        ...p,
        tags: p.tags ? p.tags.split(",").map((t) => t.trim()).filter(Boolean) : [],
      })),
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST /api/posts — Create a new post
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, content, excerpt, category, tags, status, author, scheduledFor, platforms } = body;

    if (!title || !title.trim()) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    // Generate slug
    let slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    // Ensure unique slug
    const existing = await prisma.post.findUnique({ where: { slug } });
    if (existing) slug = `${slug}-${Date.now().toString(36)}`;

    const post = await prisma.post.create({
      data: {
        title: title.trim(),
        content: content || "",
        excerpt: excerpt || title.trim().substring(0, 120) + "...",
        category: category || "General",
        tags: Array.isArray(tags) ? tags.join(", ") : (tags || ""),
        status: status || "draft",
        slug,
        author: author || "Alex Creator",
        scheduledFor: scheduledFor ? new Date(scheduledFor) : null,
      },
    });

    // If platforms specified, publish to social media (simulated)
    if (platforms && platforms.length > 0 && status === "published") {
      for (const platform of platforms) {
        await prisma.socialPublish.create({
          data: {
            postId: post.id,
            platform: platform.toLowerCase(),
            status: "published",
            externalId: `ext_${Date.now().toString(36)}_${Math.random().toString(36).substr(2, 6)}`,
            externalUrl: `https://${platform.toLowerCase()}.com/p/${post.slug}`,
            publishedAt: new Date(),
          },
        });
      }
    }

    const fullPost = await prisma.post.findUnique({
      where: { id: post.id },
      include: { socialPublishes: true },
    });

    return NextResponse.json({
      ...fullPost,
      tags: fullPost?.tags ? fullPost.tags.split(",").map((t) => t.trim()).filter(Boolean) : [],
    }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
