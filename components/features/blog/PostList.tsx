import Link from 'next/link';
import { PostCard } from './PostCard';
import { Post } from '@/types/blog';
import { getPublishedPosts } from '@/lib/notion';
interface IProps {
  tag?: string;
  sort?: string;
}

export default async function PostList({ tag, sort }: IProps) {
  const posts = await getPublishedPosts(tag, sort);
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
