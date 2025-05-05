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
      <div className="grid grid-cols-[200px_1fr_220px] gap-6">
        <aside>
          <Suspense fallback={<TagSectionSkeleton />}>
            <TagSection selectedTag={tag!} />
          </Suspense>
        </aside>

        <div className="space-y-8">
          <HeaderSection selectedTag={tag || '전체'} />
          <Suspense fallback={<PostListSkeleton />}>
            <PostList postsPromise={postsPromise} />
          </Suspense>
        </div>

        <aside className="flex flex-col gap-6">
          <ProfileSection />
          {/* <ContactSection /> */}
        </aside>
      </div>
    </div>
  );
}
