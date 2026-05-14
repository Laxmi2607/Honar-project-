-- CreateTable
CREATE TABLE "Post" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL DEFAULT '',
    "excerpt" TEXT NOT NULL DEFAULT '',
    "category" TEXT NOT NULL DEFAULT 'General',
    "tags" TEXT NOT NULL DEFAULT '',
    "status" TEXT NOT NULL DEFAULT 'draft',
    "slug" TEXT NOT NULL,
    "coverImage" TEXT NOT NULL DEFAULT '',
    "author" TEXT NOT NULL DEFAULT 'Alex Creator',
    "views" INTEGER NOT NULL DEFAULT 0,
    "likes" INTEGER NOT NULL DEFAULT 0,
    "scheduledFor" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "SocialPublish" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "postId" TEXT NOT NULL,
    "platform" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "externalId" TEXT,
    "externalUrl" TEXT,
    "publishedAt" DATETIME,
    "error" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "SocialPublish_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "SocialAccount" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "platform" TEXT NOT NULL,
    "handle" TEXT NOT NULL,
    "followers" TEXT NOT NULL DEFAULT '0',
    "status" TEXT NOT NULL DEFAULT 'connected',
    "avatarUrl" TEXT NOT NULL DEFAULT '',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Post_slug_key" ON "Post"("slug");

-- CreateIndex
CREATE INDEX "Post_status_idx" ON "Post"("status");

-- CreateIndex
CREATE INDEX "Post_category_idx" ON "Post"("category");

-- CreateIndex
CREATE INDEX "Post_createdAt_idx" ON "Post"("createdAt");

-- CreateIndex
CREATE INDEX "SocialPublish_postId_idx" ON "SocialPublish"("postId");

-- CreateIndex
CREATE INDEX "SocialPublish_platform_idx" ON "SocialPublish"("platform");

-- CreateIndex
CREATE UNIQUE INDEX "SocialPublish_postId_platform_key" ON "SocialPublish"("postId", "platform");

-- CreateIndex
CREATE UNIQUE INDEX "SocialAccount_platform_key" ON "SocialAccount"("platform");
