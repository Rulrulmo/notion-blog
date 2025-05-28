'use client';

import Link from 'next/link';
import { PostCard } from '@/components/features/PostCard';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { Loader2 } from 'lucide-react';
import PostListSkeleton from './PostListSkeleton';
interface IProps {
  tag?: string;
  sort?: string;
}

export default function PostList({ tag, sort }: IProps) {
  const [ref, inView] = useInView({ threshold: 0.5 });

  const fetchPosts = async ({ pageParam }: { pageParam: string | undefined }) => {
    const params = new URLSearchParams();
    if (pageParam) params.set('startCursor', pageParam);
    if (tag && tag !== 'all') params.set('tag', tag);
    if (sort) params.set('sort', sort);

    const response = await fetch(`/api/posts?${params.toString()}`);
    if (!response.ok) {
      throw new Error('Failed to fetch posts');
    }
    const data = await response.json();
    return data;
  };

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useInfiniteQuery({
    queryKey: ['posts', tag, sort],
    queryFn: fetchPosts,
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => {
      return lastPage.hasMore ? lastPage.nextCursor : undefined;
    },
  });

  const posts = data?.pages.flatMap((page) => page.posts) ?? [];

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isLoading) {
    return <PostListSkeleton />;
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 lg:grid-cols-3">
        {posts.map((post, index) => (
          <Link href={`/blog/${post.slug}`} key={post.id} className="block w-full">
            <PostCard post={post} isFirst={index === 0} />
          </Link>
        ))}
      </div>
      {hasNextPage && !isFetchingNextPage && <div className="h-10" ref={ref}></div>}
      {isFetchingNextPage && (
        <div className="text-muted-foreground flex items-center justify-center">
          <Loader2 className="animate-spin" /> 로딩중...
        </div>
      )}
    </div>
  );
}
