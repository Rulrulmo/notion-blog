import { PostCard } from '@/components/features/blog/PostCard';
import TagSection from './_components/TagSection';
import ProfileSection from './_components/ProfileSection';
import SortSelect from './_components/SortSelect.client';
import Link from 'next/link';
import { getPublishedPosts, getTags } from '@/api/notion';

interface IProps {
  searchParams: Promise<{
    tag?: string;
    sort?: string;
  }>;
}

export default async function Home({ searchParams }: IProps) {
  const { tag, sort } = await searchParams;
  const [posts, { tags, totalCount }] = await Promise.all([getPublishedPosts(tag, sort), getTags()]);

  return (
    <div className="container py-8">
      <div className="grid grid-cols-[200px_1fr_220px] gap-6">
        <aside>
          <TagSection tags={tags} selectedTag={tag!} totalCount={totalCount} />
        </aside>

        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold tracking-tight">블로그 목록</h2>
            <SortSelect />
          </div>
          <div className="grid gap-4">
            {posts?.map((post) => (
              <Link href={post.id ? `/blog/${String(post.id)}` : '/blog'} key={post.id}>
                <PostCard post={post} key={post.id} />
              </Link>
            ))}
          </div>
        </div>

        <aside className="flex flex-col gap-6">
          <ProfileSection />
          {/* <ContactSection /> */}
        </aside>
      </div>
    </div>
  );
}
