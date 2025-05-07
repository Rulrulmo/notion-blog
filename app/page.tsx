import ProfileSection from './_components/ProfileSection';
import { getPublishedPosts, getTags } from '@/lib/notion';
import HeaderSection from './_components/HeaderSection';
import PostList from '@/components/features/blog/PostList';
import { Suspense } from 'react';
import TagSection from './_components/TagSection';
import TagSectionSkeleton from './_components/TagSectionSkeleton';
import PostListSkeleton from '@/components/features/blog/PostListSkeleton';
interface IProps {
  searchParams: Promise<{
    tag?: string;
    sort?: string;
  }>;
}

export default async function Home({ searchParams }: IProps) {
  const { tag, sort } = await searchParams;
  const postsPromise = getPublishedPosts({ tag, sort });

  return (
    <div className="container py-8">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-[200px_1fr_220px]">
        <aside className="order-2 md:order-none">
          <Suspense fallback={<TagSectionSkeleton />}>
            <TagSection selectedTag={tag!} />
          </Suspense>
        </aside>

        <div className="order-3 space-y-8 md:order-none">
          <HeaderSection selectedTag={tag || '전체'} />
          <Suspense fallback={<PostListSkeleton />}>
            <PostList postsPromise={postsPromise} />
          </Suspense>
        </div>

        <aside className="order-1 flex flex-col gap-6 md:order-none">
          <ProfileSection />
          {/* <ContactSection /> */}
        </aside>
      </div>
    </div>
  );
}
