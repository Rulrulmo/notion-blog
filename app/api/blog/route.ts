import { createServerSideClient } from '@/lib/supabase.server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const supabase = await createServerSideClient();
  const pathname = searchParams.get('pathname');
  if (!pathname) {
    return NextResponse.json({ error: 'Pathname is required' }, { status: 400 });
  }

  const { data, error } = await supabase.rpc('get_views', {
    page_pathname: pathname,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const pathname = searchParams.get('pathname');

    if (!pathname) {
      return NextResponse.json({ error: 'Pathname is required' }, { status: 400 });
    }

    const supabase = await createServerSideClient();
    const ip = (request.headers.get('x-forwarded-for') ?? '127.0.0.1').split(',')[0];

    if (ip === '127.0.0.1' || ip === '::1') {
      return NextResponse.json({ error: 'Invalid IP address' }, { status: 400 });
    }

    const { data, error } = await supabase.rpc('new_visitor', {
      page_pathname: pathname,
      user_ip: ip,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ error: `Webhook error: ${error}` }, { status: 400 });
  }
}
