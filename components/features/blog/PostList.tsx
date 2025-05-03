import Link from 'next/link';
import { PostCard } from './PostCard';
import { Post } from '@/types/blog';

interface IProps {
  posts: Post[];
}

export default function PostList({ posts }: IProps) {
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
