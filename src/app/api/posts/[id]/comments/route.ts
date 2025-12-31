import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import clientPromise from "@/config/db";
import { ObjectId } from "mongodb";

export async function POST(request: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db("myportfolio");

    const body = await request.json();
    const headersList = await headers();

    // Auto-approve comments from authenticated users
    const isAuthenticated = !!body.userId;
    const approved = isAuthenticated; // Authenticated users' comments are auto-approved

    const commentData = {
      content: body.content,
      authorName: body.authorName,
      authorEmail: body.authorEmail,
      authorWebsite: body.authorWebsite,
      authorIp: headersList.get("x-forwarded-for") || "unknown",
      postId: new ObjectId(body.postId),
      parentId: body.parentId ? new ObjectId(body.parentId) : null,
      userId: body.userId ? new ObjectId(body.userId) : null,
      approved,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await db.collection("comments").insertOne(commentData);

    // Fetch the created comment with user info if authenticated
    let comment = { _id: result.insertedId, ...commentData };

    if (body.userId) {
      const commentWithUser = await db
        .collection("comments")
        .aggregate([
          { $match: { _id: result.insertedId } },
          {
            $lookup: {
              from: "users",
              localField: "userId",
              foreignField: "_id",
              as: "user",
            },
          },
          { $unwind: { path: "$user", preserveNullAndEmptyArrays: true } },
          {
            $project: {
              _id: 1,
              content: 1,
              authorName: 1,
              authorEmail: 1,
              authorWebsite: 1,
              authorIp: 1,
              postId: 1,
              parentId: 1,
              userId: 1,
              approved: 1,
              createdAt: 1,
              updatedAt: 1,
              user: { name: "$user.name", avatar: "$user.avatar" },
            },
          },
        ])
        .next();
      if (commentWithUser) comment = commentWithUser;
    }

    return NextResponse.json({
      ...comment,
      message: approved
        ? "Comment posted successfully!"
        : "Comment submitted for moderation.",
    });
  } catch (error) {
    console.error("Create comment error:", error);
    return NextResponse.json(
      { error: "Failed to create comment" },
      { status: 500 }
    );
  }
}
