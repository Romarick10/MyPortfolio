import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import clientPromise from "@/config/db";
import { ObjectId } from "mongodb";

// GET: Get all published posts
export async function GET(request: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db('myportfolio');

    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const category = searchParams.get("category");
    const tag = searchParams.get("tag");

    const skip = (page - 1) * limit;

    // Build match conditions
    const matchConditions: any = { published: true };

    if (category) {
      matchConditions.categories = { $in: [new ObjectId(category)] };
    }

    if (tag) {
      matchConditions.tags = { $in: [new ObjectId(tag)] };
    }

    // Get total count
    const total = await db.collection('posts').countDocuments(matchConditions);

    // Build aggregation pipeline
    const pipeline = [
      { $match: matchConditions },
      // Lookup author
      {
        $lookup: {
          from: 'users',
          localField: 'authorId',
          foreignField: '_id',
          as: 'author'
        }
      },
      { $unwind: { path: '$author', preserveNullAndEmptyArrays: true } },
      // Lookup categories
      {
        $lookup: {
          from: 'categories',
          localField: 'categories',
          foreignField: '_id',
          as: 'categories'
        }
      },
      // Lookup tags
      {
        $lookup: {
          from: 'tags',
          localField: 'tags',
          foreignField: '_id',
          as: 'tags'
        }
      },
      // Lookup comments count
      {
        $lookup: {
          from: 'comments',
          let: { postId: '$_id' },
          pipeline: [
            { $match: { $expr: { $and: [{ $eq: ['$postId', '$$postId'] }, { $eq: ['$approved', true] }] } } },
            { $count: 'count' }
          ],
          as: 'commentsCount'
        }
      },
      // Lookup likes count
      {
        $lookup: {
          from: 'likes',
          let: { postId: '$_id' },
          pipeline: [
            { $match: { $expr: { $eq: ['$postId', '$$postId'] } } },
            { $count: 'count' }
          ],
          as: 'likesCount'
        }
      },
      // Project fields
      {
        $project: {
          _id: 1,
          title: 1,
          slug: 1,
          excerpt: 1,
          content: 1,
          coverImage: 1,
          published: 1,
          featured: 1,
          readTime: 1,
          views: 1,
          createdAt: 1,
          updatedAt: 1,
          publishedAt: 1,
          author: { id: '$author._id', name: '$author.name', avatar: '$author.avatar' },
          categories: 1,
          tags: 1,
          _count: {
            comments: { $ifNull: [{ $arrayElemAt: ['$commentsCount.count', 0] }, 0] },
            likes: { $ifNull: [{ $arrayElemAt: ['$likesCount.count', 0] }, 0] }
          }
        }
      },
      { $sort: { publishedAt: -1 } },
      { $skip: skip },
      { $limit: limit }
    ];

    const posts = await db.collection('posts').aggregate(pipeline).toArray();

    return NextResponse.json({
      posts,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Get posts error:", error);
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 }
    );
  }
}

// POST: Create new post (admin/author only)
export async function POST(request: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db('myportfolio');

    const user = await auth.requireAuth();

    if (!(await auth.isAuthor())) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const body = await request.json();

    // Generate slug from title
    const slug = (body.slug || body.title)
      .toLowerCase()
      .replace(/[^\w\s]/g, "")
      .replace(/\s+/g, "-");

    // Handle categories - assume they are ObjectIds
    const categoryIds = body.categories?.map((id: string) => new ObjectId(id)) || [];

    // Handle tags - create if they don't exist
    const tagIds: ObjectId[] = [];
    if (body.tags && body.tags.length > 0) {
      for (const tagName of body.tags) {
        let tag = await db.collection('tags').findOne({ name: tagName });
        if (!tag) {
          const tagSlug = tagName.toLowerCase().replace(/\s+/g, "-");
          const result = await db.collection('tags').insertOne({
            name: tagName,
            slug: tagSlug,
            createdAt: new Date(),
            updatedAt: new Date()
          });
          tag = { _id: result.insertedId, name: tagName, slug: tagSlug };
        }
        tagIds.push(tag._id);
      }
    }

    const postData = {
      title: body.title,
      slug,
      excerpt: body.excerpt,
      content: body.content,
      coverImage: body.coverImage,
      published: body.published || false,
      featured: body.featured || false,
      readTime: body.readTime || calculateReadTime(body.content),
      authorId: new ObjectId(user.id),
      categories: categoryIds,
      tags: tagIds,
      publishedAt: body.published ? new Date() : null,
      createdAt: new Date(),
      updatedAt: new Date(),
      views: 0
    };

    const result = await db.collection('posts').insertOne(postData);

    // Fetch the created post with populated fields
    const post = await db.collection('posts').aggregate([
      { $match: { _id: result.insertedId } },
      {
        $lookup: {
          from: 'users',
          localField: 'authorId',
          foreignField: '_id',
          as: 'author'
        }
      },
      { $unwind: { path: '$author', preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          from: 'categories',
          localField: 'categories',
          foreignField: '_id',
          as: 'categories'
        }
      },
      {
        $lookup: {
          from: 'tags',
          localField: 'tags',
          foreignField: '_id',
          as: 'tags'
        }
      }
    ]).next();

    return NextResponse.json(post, { status: 201 });
  } catch (error: any) {
    console.error("Create post error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create post" },
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
