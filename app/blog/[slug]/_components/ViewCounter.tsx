'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { viewsApi } from '@/lib/supabase.client';
import { Eye } from 'lucide-react';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
export function ViewCounter() {
  const queryClient = useQueryClient();
  const isDev = process.env.NODE_ENV === 'development';
  const pathname = usePathname();

  const { data: viewData } = useQuery({
    queryKey: ['viewCount', pathname],
    queryFn: () => viewsApi.getViewCount(pathname),
    initialData: { viewCount: 0 },
  });

  const { mutate: incrementViewCount } = useMutation({
    mutationFn: () => viewsApi.incrementViewCount(pathname),
    onSuccess: (data) => {
      queryClient.setQueryData(['viewCount', pathname], data);
    },
  });

  useEffect(() => {
    incrementViewCount();
  }, [incrementViewCount, pathname]);

  return isDev ? (
    <div className="flex items-center gap-1">
      <Eye className="h-4 w-4" />
      <span>{viewData.viewCount} views</span>
    </div>
  ) : null;
}
