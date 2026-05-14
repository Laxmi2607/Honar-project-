import { NextResponse } from "next/server";
import prisma from "@/lib/db";

// POST /api/posts/seed — Seed the database with sample data
export async function POST() {
  try {
    const existingCount = await prisma.post.count();
    if (existingCount > 0) {
      return NextResponse.json({ message: `Database already has ${existingCount} posts. Skipping seed.`, count: existingCount });
    }

    // Seed social accounts
    const accounts = [
      { platform: "instagram", handle: "@alexcreator", followers: "845K", status: "connected" },
      { platform: "twitter", handle: "@alexcreates", followers: "234K", status: "connected" },
      { platform: "youtube", handle: "Alex Creator", followers: "1.2M", status: "connected" },
      { platform: "linkedin", handle: "Alex Creator", followers: "56K", status: "connected" },
    ];
    for (const acc of accounts) {
      await prisma.socialAccount.upsert({
        where: { platform: acc.platform },
        update: acc,
        create: acc,
      });
    }

    // Seed blog posts
    const posts = [
      {
        title: "10 Tips for Growing Your Instagram in 2025",
        content: `<h2>Introduction</h2><p>Growing your Instagram presence in 2025 requires a strategic approach that combines authentic content creation with smart algorithm optimization. In this comprehensive guide, we'll explore the top 10 strategies that successful creators are using right now.</p><h2>1. Leverage Reels Over Static Posts</h2><p>Instagram's algorithm heavily favors short-form video content. Reels consistently receive 2-3x more reach than static image posts. Focus on creating engaging 15-30 second videos that hook viewers in the first 3 seconds.</p><h2>2. Optimize Your Posting Schedule</h2><p>Use Instagram Insights to identify when your audience is most active. Generally, posting between 6-9 AM and 6-9 PM in your audience's timezone yields the best engagement rates.</p><h2>3. Build a Content Pillar Strategy</h2><p>Organize your content into 3-5 core themes or "pillars" that align with your brand. This helps maintain consistency while giving you creative freedom within each category.</p><h2>4. Engage Authentically</h2><p>Spend 15-20 minutes before and after each post engaging with your community. Reply to comments, visit your followers' profiles, and leave meaningful comments on posts in your niche.</p><h2>5. Use Strategic Hashtags</h2><p>Mix a combination of large (1M+ posts), medium (100K-1M posts), and small (under 100K posts) hashtags. Use 20-25 hashtags per post for maximum discoverability.</p><h2>Conclusion</h2><p>Growing on Instagram in 2025 is all about consistency, authenticity, and adapting to the platform's evolving features. Start implementing these strategies today and watch your engagement soar.</p>`,
        excerpt: "A comprehensive guide to growing your Instagram presence with proven strategies for 2025.",
        category: "Growth", tags: "instagram, social-media, growth, marketing",
        status: "published", slug: "10-tips-for-growing-your-instagram-in-2025",
        views: 12400, likes: 2100, author: "Alex Creator",
      },
      {
        title: "Why Next.js 15 Changes Everything for Developers",
        content: `<h2>The Next Evolution of React</h2><p>Next.js 15 represents a paradigm shift in how we build web applications. With the introduction of the stable App Router, Server Components, and revolutionary caching strategies, this release is the most significant update since the framework's inception.</p><h2>Key Features</h2><p><strong>Server Components by Default:</strong> Every component is now a Server Component unless explicitly marked with "use client". This dramatically reduces the JavaScript bundle sent to the browser.</p><p><strong>Streaming &amp; Suspense:</strong> Built-in streaming support means your pages load progressively, showing content as it becomes available.</p><h2>Performance Benchmarks</h2><p>In our testing, Next.js 15 applications showed a 35% improvement in Time to First Byte (TTFB) and a 50% reduction in Total Blocking Time (TBT) compared to Next.js 14.</p>`,
        excerpt: "An in-depth look at how Next.js 15 is revolutionizing web development.",
        category: "Tech", tags: "nextjs, react, web-development, javascript",
        status: "published", slug: "why-nextjs-15-changes-everything",
        views: 8200, likes: 1300, author: "Alex Creator",
      },
      {
        title: "The Future of AI Content Creation",
        content: `<h2>AI is Reshaping Content</h2><p>Artificial intelligence is no longer just a tool for content creation — it's becoming a creative partner. From blog posts to video scripts, AI is transforming how creators produce content at scale.</p><h2>Current State of AI Writing</h2><p>Models like GPT-4 and Claude can generate human-quality text, but the real power lies in using AI as a collaborative tool rather than a replacement for human creativity.</p><h2>What's Coming Next</h2><p>Expect to see AI tools that can maintain your unique voice across platforms, automatically repurpose long-form content into social media posts, and even predict which topics will trend before they go viral.</p>`,
        excerpt: "Exploring how AI is transforming content creation for influencers and brands.",
        category: "AI", tags: "ai, content-creation, future, technology",
        status: "draft", slug: "the-future-of-ai-content-creation",
        views: 0, likes: 0, author: "Alex Creator",
      },
      {
        title: "How I Made $10K from Newsletter Sponsorships",
        content: `<h2>The Newsletter Monetization Playbook</h2><p>When I started my newsletter 18 months ago, I had zero subscribers and zero revenue. Today, it generates over $10,000 per month through sponsorships alone. Here's exactly how I did it.</p><h2>Building the Audience First</h2><p>The first 6 months were all about growth. I focused on providing incredible value — actionable tips, original research, and insider insights.</p><h2>Landing Your First Sponsor</h2><p>Once I hit 5,000 subscribers, I created a simple media kit and started reaching out to brands. My first sponsorship was $200 for a single mention. Today, a primary placement costs $2,500.</p><h2>Key Lessons</h2><p>1. Never sacrifice content quality for sponsorship revenue. 2. Be selective — only promote products you genuinely use. 3. Provide sponsors with detailed analytics.</p>`,
        excerpt: "A transparent breakdown of how I built a $10K/month newsletter business.",
        category: "Monetization", tags: "newsletter, monetization, sponsorships, income",
        status: "published", slug: "how-i-made-10k-from-newsletter-sponsorships",
        views: 24100, likes: 4700, author: "Alex Creator",
      },
      {
        title: "Building a Personal Brand on LinkedIn in 2025",
        content: `<h2>Why LinkedIn Matters More Than Ever</h2><p>LinkedIn has evolved from a job-hunting platform to the world's largest professional content network. With over 1 billion users and significantly lower competition than Instagram or TikTok, LinkedIn offers creators an unprecedented opportunity to build authority.</p><h2>The Content Formula</h2><p>The most successful LinkedIn creators follow a simple formula: Personal Story + Professional Insight + Actionable Takeaway. This combination drives engagement because it's relatable, valuable, and shareable.</p>`,
        excerpt: "How to leverage LinkedIn for massive professional growth.",
        category: "Growth", tags: "linkedin, personal-brand, professional, networking",
        status: "published", slug: "building-personal-brand-linkedin-2025",
        views: 5600, likes: 890, author: "Alex Creator",
      },
      {
        title: "The Complete Guide to Content Repurposing",
        content: `<h2>Work Smarter, Not Harder</h2><p>Content repurposing is the art of taking one piece of content and adapting it for multiple platforms. A single blog post can become 10+ pieces of content across different channels.</p><h2>The Repurposing Pyramid</h2><p>Start with long-form content (blog posts, YouTube videos, podcast episodes) at the top, then break it down into: Twitter threads, Instagram carousels, LinkedIn posts, TikTok clips, email newsletters, and Pinterest pins.</p>`,
        excerpt: "Turn one blog post into 10+ pieces of content across all platforms.",
        category: "Marketing", tags: "content, repurposing, strategy, productivity",
        status: "scheduled", slug: "complete-guide-content-repurposing",
        views: 0, likes: 0, author: "Alex Creator",
      },
    ];

    for (const postData of posts) {
      const post = await prisma.post.create({ data: postData });

      // Add some social publishes to published posts
      if (postData.status === "published") {
        const platforms = ["instagram", "twitter"];
        for (const platform of platforms) {
          await prisma.socialPublish.create({
            data: {
              postId: post.id,
              platform,
              status: "published",
              externalId: `ext_${Date.now().toString(36)}_${Math.random().toString(36).substr(2, 6)}`,
              externalUrl: `https://${platform}.com/p/${post.slug}`,
              publishedAt: new Date(),
            },
          });
        }
      }
    }

    return NextResponse.json({ message: "Database seeded successfully", postsCreated: posts.length, accountsCreated: accounts.length });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
