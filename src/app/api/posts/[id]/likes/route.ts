import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import clientPromise from "@/config/db";
import { ObjectId } from "mongodb";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const client = await clientPromise;
    const db = client.db("myportfolio");

    const { id: postId } = await params;
    const body = await request.json();
    const headersList = await headers();

    const likeData = {
      postId: new ObjectId(postId),
      userId: body.userId ? new ObjectId(body.userId) : null,
      userIp: headersList.get("x-forwarded-for") || "unknown",
      userAgent: headersList.get("user-agent") || "unknown",
      createdAt: new Date(),
    };

    const result = await db.collection("likes").insertOne(likeData);

    const like = { _id: result.insertedId, ...likeData };

    return NextResponse.json(like);
  } catch (error) {
    console.error("Like error:", error);
    return NextResponse.json({ error: "Failed to like post" }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const client = await clientPromise;
    const db = client.db("myportfolio");

    const { id: postId } = await params;
    const body = await request.json();

    const deleteConditions: any = {
      postId: new ObjectId(postId),
    };

    if (body.userId) {
      deleteConditions.userId = new ObjectId(body.userId);
    } else if (body.userIp) {
      deleteConditions.userIp = body.userIp;
    }

    await db.collection("likes").deleteMany(deleteConditions);

    return NextResponse.json({ message: "Unliked successfully" });
  } catch (error) {
    console.error("Unlike error:", error);
    return NextResponse.json(
      { error: "Failed to unlike post" },
      { status: 500 }
    );
  }
}
