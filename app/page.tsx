import TagSection from './_components/TagSection';
import ProfileSection from './_components/ProfileSection';
import { getPublishedPosts, getTags } from '@/lib/notion';
import HeaderSection from './_components/HeaderSection';
import PostList from '@/components/features/blog/PostList';
import PostListClient from '@/components/features/blog/PostList.client';
interface IProps {
  searchParams: Promise<{
    tag?: string;
    sort?: string;
  }>;
}

export default async function Home({ searchParams }: IProps) {
  const { tag, sort } = await searchParams;
  const [posts, { tags, totalCount }] = await Promise.all([
    getPublishedPosts(tag, sort),
    getTags(),
  ]);

  return (
    <div className="container py-8">
      <div className="grid grid-cols-[200px_1fr_220px] gap-6">
        <aside>
          <TagSection tags={tags} selectedTag={tag!} totalCount={totalCount} />
        </aside>

        <div className="space-y-8">
          <HeaderSection selectedTag={tag || '전체'} />
          {/* <PostList posts={posts} /> */}
          <PostListClient />
        </div>

        <aside className="flex flex-col gap-6">
          <ProfileSection />
          {/* <ContactSection /> */}
        </aside>
      </div>
    </div>
  );
}
