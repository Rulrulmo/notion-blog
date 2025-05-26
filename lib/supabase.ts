import { createBrowserClient } from '@supabase/ssr';

export async function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

export const viewsApi = {
  getViewCount: async (slug: string) => {
    const response = await fetch(`/api/blog?slug=${slug}`);
    if (!response.ok) {
      throw new Error('Failed to fetch view count');
    }
    return response.json();
  },

  incrementViewCount: async (slug: string) => {
    const response = await fetch(`/api/blog?slug=${slug}`, {
      method: 'POST',
    });
    if (!response.ok) {
      throw new Error('Failed to increment view count');
    }
    return response.json();
  },
};
