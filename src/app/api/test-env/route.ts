import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    DATABASE_URL: process.env.DATABASE_URL ? 'SET' : 'NOT SET',
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL || 'NOT SET',
    SUPABASE_KEY_EXISTS: !!process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY,
    JWT_SECRET_EXISTS: !!process.env.JWT_SECRET,
    NODE_ENV: process.env.NODE_ENV,
  });
}