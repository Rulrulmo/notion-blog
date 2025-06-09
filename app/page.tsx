import ProfileSection from './_components/ProfileSection';
import { getTags } from '@/lib/notion';
import HeaderSection from './_components/HeaderSection';
import PostList from '@/components/features/PostList';
import TagSection from './_components/TagSection';

interface IProps {
  searchParams: Promise<{
    tag?: string;
    sort?: string;
  }>;
}

export default async function Home({ searchParams }: IProps) {
  const { tag, sort } = await searchParams;
  const { tags, totalCount } = await getTags();
  return (
    <div className="container max-w-full py-8">
      <div className="mx-auto grid grid-cols-1 gap-6 md:grid-cols-[1fr_220px]">
        <div className="order-3 w-full space-y-8 md:order-none">
          <HeaderSection selectedTag={tag || '전체'} />
          <PostList tag={tag || 'all'} sort={sort || 'latest'} />
        </div>
        <aside className="order-1 flex flex-col gap-6 md:sticky md:top-[var(--sticky-top)] md:order-none md:self-start">
          <ProfileSection />
          <TagSection tags={tags} selectedTag={tag || ''} totalCount={totalCount} />
        </aside>
      </div>
    </div>
  );
}
