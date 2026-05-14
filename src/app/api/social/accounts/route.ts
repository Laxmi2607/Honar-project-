import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";

// GET /api/social/accounts — List connected accounts
export async function GET() {
  try {
    const accounts = await prisma.socialAccount.findMany({
      orderBy: { createdAt: "asc" },
    });
    return NextResponse.json(accounts);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST /api/social/accounts — Connect new account
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { platform, handle } = body;

    if (!platform || !handle) {
      return NextResponse.json({ error: "Platform and handle are required" }, { status: 400 });
    }

    // Check if already exists
    const existing = await prisma.socialAccount.findUnique({
      where: { platform: platform.toLowerCase() },
    });

    if (existing) {
      // Reconnect
      const updated = await prisma.socialAccount.update({
        where: { id: existing.id },
        data: { handle, status: "connected" },
      });
      return NextResponse.json(updated);
    }

    const account = await prisma.socialAccount.create({
      data: {
        platform: platform.toLowerCase(),
        handle,
        status: "connected",
        followers: "0",
      },
    });
    return NextResponse.json(account, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE /api/social/accounts?platform=xxx — Disconnect account
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const platform = searchParams.get("platform");

    if (!platform) {
      return NextResponse.json({ error: "Platform is required" }, { status: 400 });
    }

    const account = await prisma.socialAccount.findUnique({
      where: { platform: platform.toLowerCase() },
    });
    if (!account) {
      return NextResponse.json({ error: "Account not found" }, { status: 404 });
    }

    await prisma.socialAccount.update({
      where: { id: account.id },
      data: { status: "disconnected" },
    });

    return NextResponse.json({ success: true, message: `Disconnected ${platform}` });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
