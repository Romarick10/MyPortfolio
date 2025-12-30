import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import clientPromise from '@/config/db'

export async function GET() {
  try {
    const user = await auth.requireAuth()

    if (user.role !== 'ADMIN' && user.role !== 'AUTHOR' && user.role !== 'EDITOR') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 403 }
      )
    }

    const client = await clientPromise
    const db = client.db('myportfolio')

    // Build aggregation pipeline for posts with author and categories
    const pipeline = [
      // Filter posts by author if not admin
      ...(user.role === 'ADMIN' ? [] : [{ $match: { authorId: user.id } }]),
      // Lookup author information
      {
        $lookup: {
          from: 'users',
          localField: 'authorId',
          foreignField: '_id',
          as: 'author'
        }
      },
      // Unwind author array (assuming one author per post)
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
      // Sort by creation date descending
      { $sort: { createdAt: -1 } },
      // Project only needed fields
      {
        $project: {
          _id: 1,
          title: 1,
          slug: 1,
          excerpt: 1,
          published: 1,
          featured: 1,
          views: 1,
          createdAt: 1,
          updatedAt: 1,
          publishedAt: 1,
          author: { name: '$author.name' },
          categories: { name: 1 }
        }
      }
    ]

    const posts = await db.collection('posts').aggregate(pipeline).toArray()

    return NextResponse.json({ posts })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to fetch posts' },
      { status: 500 }
    )
  }
}
