import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

const POST_PATHNAME_REGEX = /^\/blog\/\d+$/;

// 방문을 기록(IP 기준)하고 현재 조회수를 돌려준다.
export async function POST(request: NextRequest) {
  const pathname = request.nextUrl.searchParams.get('pathname');

  if (!pathname || !POST_PATHNAME_REGEX.test(pathname)) {
    return NextResponse.json({ error: 'Invalid pathname' }, { status: 400 });
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0].trim();

  // 로컬 요청은 조회수에 반영하지 않는다.
  if (ip && ip !== '127.0.0.1' && ip !== '::1') {
    const { error } = await supabase.rpc('new_visitor', {
      page_pathname: pathname,
      user_ip: ip,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }

  const { data, error } = await supabase.rpc('get_views', {
    page_pathname: pathname,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
