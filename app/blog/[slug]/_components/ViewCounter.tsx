'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { viewsApi } from '@/lib/supabase';
import { Eye } from 'lucide-react';
import { useEffect } from 'react';

export function ViewCounter({ slug }: { slug: string }) {
  const queryClient = useQueryClient();
  const isDev = process.env.NODE_ENV === 'development';

  const { data: viewData } = useQuery({
    queryKey: ['viewCount', slug],
    queryFn: () => viewsApi.getViewCount(slug),
    initialData: { viewCount: 0 },
  });

  const { mutate: incrementViewCount } = useMutation({
    mutationFn: () => viewsApi.incrementViewCount(slug),
    onSuccess: (data) => {
      queryClient.setQueryData(['viewCount', slug], data);
    },
  });

  useEffect(() => {
    incrementViewCount();
  }, [incrementViewCount, slug]);

  return isDev ? (
    <div className="flex items-center gap-1">
      <Eye className="h-4 w-4" />
      <span>{viewData.viewCount} views</span>
    </div>
  ) : null;
}
