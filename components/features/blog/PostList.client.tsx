'use client';

import Link from 'next/link';
import { PostCard } from './PostCard';
import { Post } from '@/types/blog';
import { useState, useEffect } from 'react';

export default function PostList() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch('/api/posts');
      const data = await res.json();
      setPosts(data.posts);
    };
    fetchPosts();
  }, []);

  return (
    <div className="grid gap-4">
      {posts?.map((post, index) => (
        <Link href={post.id ? `/blog/${String(post.id)}` : '/blog'} key={post.id}>
          <PostCard post={post} key={post.id} isFirst={index === 0} />
        </Link>
      ))}
    </div>
  );
}
