import { NextResponse } from "next/server";
import clientPromise from "@/config/db";
import { auth } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Name, email, and password are required" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db('myportfolio');

    // Check if user already exists
    const existingUser = await db.collection('users').findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "User with this email already exists" },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await auth.hashPassword(password);

    // Create user
    const user = {
      name,
      email,
      username: email.split("@")[0], // Simple username generation
      password: hashedPassword,
      role: "USER", // Default role
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await db.collection('users').insertOne(user);

    // Don't return password
    const { password: _, ...userWithoutPassword } = user;
    const userWithId = { ...userWithoutPassword, id: result.insertedId.toString() };

    return NextResponse.json({ user: userWithId }, { status: 201 });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 }
    );
  }
}
