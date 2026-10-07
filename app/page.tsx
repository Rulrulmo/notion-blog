import ProfileSection from './_components/ProfileSection';
import { getPublishedPosts, getTags } from '@/lib/notion';
import HeaderSection from './_components/HeaderSection';
import PostList from '@/components/features/PostList';
import TagSection, { TagBar } from './_components/TagSection';

interface IProps {
  searchParams: Promise<{
    tag?: string;
    sort?: string;
  }>;
}

export default async function Home({ searchParams }: IProps) {
  const { tag, sort } = await searchParams;
  const allPosts = await getPublishedPosts();
  const filteredPosts = tag
    ? allPosts.filter((post) => post.tags.some((postTag) => postTag.name === tag))
    : allPosts;
  const posts = sort === 'oldest' ? filteredPosts.toReversed() : filteredPosts;
  const featuredPosts = tag ? [] : allPosts.filter((post) => post.featured);
  const tags = getTags(allPosts);

  return (
    <div className="container max-w-full py-8">
      <div className="mx-auto grid grid-cols-1 gap-6 md:grid-cols-[1fr_220px]">
        <div className="w-full space-y-8">
          {featuredPosts.length > 0 && (
            <section className="space-y-4">
              <h2 className="text-2xl font-bold tracking-tight">대표 글</h2>
              <PostList posts={featuredPosts} />
            </section>
          )}
          <HeaderSection selectedTag={tag || '전체'} />
          <div className="md:hidden">
            <TagBar tags={tags} selectedTag={tag || ''} totalCount={allPosts.length} />
          </div>
          <PostList posts={posts} />
        </div>
        <aside className="flex flex-col gap-6 md:sticky md:top-[var(--sticky-top)] md:self-start">
          <ProfileSection />
          <div className="hidden md:block">
            <TagSection tags={tags} selectedTag={tag || ''} totalCount={allPosts.length} />
          </div>
        </aside>
      </div>
    </div>
  );
}
