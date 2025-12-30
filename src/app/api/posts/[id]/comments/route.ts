import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/prisma'
import { headers } from 'next/headers'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const headersList = await headers()

    // Auto-approve comments from authenticated users
    const isAuthenticated = !!body.userId
    const approved = isAuthenticated // Authenticated users' comments are auto-approved

    const comment = await db.comment.create({
      data: {
        content: body.content,
        authorName: body.authorName,
        authorEmail: body.authorEmail,
        authorWebsite: body.authorWebsite,
        authorIp: headersList.get('x-forwarded-for') || 'unknown',
        postId: body.postId,
        parentId: body.parentId,
        userId: body.userId,
        approved,
      },
      include: {
        user: { select: { name: true, avatar: true } },
      },
    })

    return NextResponse.json({
      ...comment,
      message: approved ? 'Comment posted successfully!' : 'Comment submitted for moderation.'
    })
  } catch (error) {
    console.error('Create comment error:', error)
    return NextResponse.json(
      { error: 'Failed to create comment' },
      { status: 500 }
    )
  }
}
