import Link from 'next/link';
import { PostCard } from '@/components/features/PostCard';
import { Post } from '@/types/blog';

interface IProps {
  posts: Post[];
}

export default function PostList({ posts }: IProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((post, index) => (
        <Link href={`/blog/${post.slug}`} key={post.id} className="block w-full">
          <PostCard post={post} isFirst={index === 0} />
        </Link>
      ))}
    </div>
  );
}
