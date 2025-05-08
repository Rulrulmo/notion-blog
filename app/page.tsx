import ProfileSection from './_components/ProfileSection';
import { getPublishedPosts } from '@/lib/notion';
import HeaderSection from './_components/HeaderSection';
import PostList from '@/components/features/blog/PostList';
import { Suspense } from 'react';
import PostListSkeleton from '@/components/features/blog/PostListSkeleton';
import TagsPage from './@tags/page';

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
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 lg:grid-cols-[200px_1fr_220px]">
        <aside className="order-2 lg:sticky lg:top-[var(--sticky-top)] lg:order-none lg:self-start">
          <Suspense>
            <TagsPage selectedTag={tag!} />
          </Suspense>
        </aside>

        <div className="order-3 space-y-8 lg:order-none">
          <HeaderSection selectedTag={tag || '전체'} />
          <Suspense fallback={<PostListSkeleton />}>
            <PostList postsPromise={postsPromise} />
          </Suspense>
        </div>

        <aside className="order-1 flex flex-col gap-6 lg:sticky lg:top-[var(--sticky-top)] lg:order-none lg:self-start">
          <ProfileSection />
          {/* <ContactSection /> */}
        </aside>
      </div>
    </div>
  );
}
