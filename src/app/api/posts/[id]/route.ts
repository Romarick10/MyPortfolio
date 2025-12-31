import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import clientPromise from "@/config/db";
import { ObjectId } from "mongodb";

// GET: Get single post
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const client = await clientPromise;
    const db = client.db("myportfolio");

    const { id } = await params;

    // Try to find by _id first, then by slug
    let post;
    if (ObjectId.isValid(id)) {
      post = await db.collection("posts").findOne({ _id: new ObjectId(id) });
    }
    if (!post) {
      post = await db.collection("posts").findOne({ slug: id });
    }

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    const currentUser = await auth.getCurrentUser();
    if (!post.published && !currentUser) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    // Increment view count only for published posts and for public views
    if (post.published) {
      await db
        .collection("posts")
        .updateOne({ _id: post._id }, { $inc: { views: 1 } });
      post.views += 1; // Update the local object
    }

    return NextResponse.json(post);
  } catch (error) {
    console.error("Get post error:", error);
    return NextResponse.json(
      { error: "Failed to fetch post" },
      { status: 500 }
    );
  }
}

// PUT: Update post
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const client = await clientPromise;
    const db = client.db("myportfolio");

    const user = await auth.requireAuth();
    const { id } = await params;

    // Find existing post
    let existingPost;
    if (ObjectId.isValid(id)) {
      existingPost = await db
        .collection("posts")
        .findOne({ _id: new ObjectId(id) });
    }
    if (!existingPost) {
      existingPost = await db.collection("posts").findOne({ slug: id });
    }

    if (!existingPost) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    const isAdmin = await auth.isAdmin();
    if (existingPost.authorId.toString() !== user.id && !isAdmin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const body = await request.json();

    // Handle categories
    const categoryIds =
      body.categories?.map((id: string) => new ObjectId(id)) ||
      existingPost.categories;

    // Handle tags
    let tagIds = existingPost.tags || [];
    if (body.tags) {
      tagIds = [];
      for (const tagName of body.tags) {
        let tag = await db.collection("tags").findOne({ name: tagName });
        if (!tag) {
          const tagSlug = tagName.toLowerCase().replace(/\s+/g, "-");
          const result = await db.collection("tags").insertOne({
            name: tagName,
            slug: tagSlug,
            createdAt: new Date(),
            updatedAt: new Date(),
          });
          tag = { _id: result.insertedId };
        }
        tagIds.push(tag._id);
      }
    }

    const updateData: any = {
      title: body.title,
      excerpt: body.excerpt,
      content: body.content,
      slug: (body.slug || body.title)
        .toLowerCase()
        .replace(/[^\w\s]/g, "")
        .replace(/\s+/g, "-"),
      coverImage: body.coverImage,
      published: body.published,
      featured: body.featured,
      readTime: body.readTime || calculateReadTime(body.content),
      categories: categoryIds,
      tags: tagIds,
      updatedAt: new Date(),
    };

    if (body.published && !existingPost.publishedAt) {
      updateData.publishedAt = new Date();
    }

    await db
      .collection("posts")
      .updateOne({ _id: existingPost._id }, { $set: updateData });

    // Fetch updated post with populated fields
    const post = await db
      .collection("posts")
      .aggregate([
        { $match: { _id: existingPost._id } },
        {
          $lookup: {
            from: "users",
            localField: "authorId",
            foreignField: "_id",
            as: "author",
          },
        },
        { $unwind: { path: "$author", preserveNullAndEmptyArrays: true } },
        {
          $lookup: {
            from: "categories",
            localField: "categories",
            foreignField: "_id",
            as: "categories",
          },
        },
        {
          $lookup: {
            from: "tags",
            localField: "tags",
            foreignField: "_id",
            as: "tags",
          },
        },
      ])
      .next();

    return NextResponse.json(post);
  } catch (error: any) {
    console.error("Update post error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to update post" },
      { status: 500 }
    );
  }
}

// DELETE: Delete post
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const client = await clientPromise;
    const db = client.db("myportfolio");

    await auth.requireAuth();
    const { id } = await params;

    if (!(await auth.isAdmin())) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    // Find the post first
    let post;
    if (ObjectId.isValid(id)) {
      post = await db.collection("posts").findOne({ _id: new ObjectId(id) });
    }
    if (!post) {
      post = await db.collection("posts").findOne({ slug: id });
    }

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    await db.collection("posts").deleteOne({ _id: post._id });

    return NextResponse.json({ message: "Post deleted successfully" });
  } catch (error: any) {
    console.error("Delete post error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to delete post" },
      { status: 500 }
    );
  }
}

function calculateReadTime(content: string): number {
  if (!content) return 0;
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}
