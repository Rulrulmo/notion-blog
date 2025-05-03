import { getPublishedPosts } from '@/lib/notion';
import { NextResponse, type NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const tag = searchParams.get('tag');
  const sort = searchParams.get('sort');
  const posts = await getPublishedPosts(tag!, sort!);
  return NextResponse.json({ posts });
}
