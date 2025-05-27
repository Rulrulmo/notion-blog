import { getPublishedPosts } from '@/lib/notion';
import { NextResponse, type NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const startCursor = searchParams.get('startCursor') || undefined;
  const tag = searchParams.get('tag') || undefined;
  const sort = (searchParams.get('sort') as 'latest' | 'oldest') || undefined;

  const response = await getPublishedPosts({ startCursor, tag, sort });
  return NextResponse.json(response);
}
