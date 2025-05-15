import { getPublishedPosts } from '@/lib/notion';
import { NextResponse, type NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const startCursor = searchParams.get('startCursor') || undefined;

  const response = await getPublishedPosts(startCursor);
  return NextResponse.json(response);
}
