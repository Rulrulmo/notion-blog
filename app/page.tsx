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
      <div className="mx-auto grid grid-cols-1 gap-6 lg:grid-cols-[1fr_220px]">
        <div className="order-3 w-full space-y-8 lg:order-none">
          <HeaderSection selectedTag={tag || '전체'} />
          <PostList tag={tag || 'all'} sort={sort || 'latest'} />
        </div>
        <aside className="order-1 flex flex-col gap-6 lg:sticky lg:top-[var(--sticky-top)] lg:order-none lg:self-start">
          <ProfileSection />
          <TagSection tags={tags} selectedTag={tag || ''} totalCount={totalCount} />
        </aside>
      </div>
    </div>
  );
}
