import { Separator } from '@/components/ui/separator';
import { getPostBySlug, getPublishedPosts } from '@/lib/notion';
import { GiscusComments } from '@/components/GiscusComments';
import { notFound } from 'next/navigation';
import { PostNavigation } from './_components/PostNavigation';
import NotionContent from './_components/NotionRenderer';
import { MobileTableOfContents } from './_components/MobileTableOfContents';
import { PcTableOfContents } from './_components/PcTableOfContents';
import { RelatedPosts } from './_components/RelatedPosts';
import { PostHeader } from './_components/PostHeader';
import { AdUnit } from '@/components/AdUnit';

export const generateStaticParams = async () => {
  const { posts } = await getPublishedPosts();
  return posts.map((post) => ({ slug: String(post.slug) }));
};

export const revalidate = 180;

export default async function BlogPost({ params }: { params: Promise<{ slug: number }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(Number(slug));
  const { posts: allPosts } = await getPublishedPosts();

  if (!post) {
    notFound();
  }

  return (
    <div className="container py-6 lg:py-12">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[200px_minmax(0,1fr)_240px] lg:gap-8">
        <aside className="hidden lg:block">
          {/* 데스크탑 광고 */}
          <div className="sticky top-[var(--sticky-top)] space-y-8">
            <div className="mx-auto w-[200px]">
              <AdUnit slot="5007143515" layout="display" />
            </div>
          </div>
        </aside>
        <section>
          <PostHeader
            title={post.title}
            tags={post.tags}
            author={post.author}
            createdDate={post.createdDate}
          />

          <Separator className="my-8" />

          {/* 모바일용 목차 토글 버튼 */}
          <MobileTableOfContents recordMap={post.recordMap} />
          {/* 블로그 본문 */}
          <NotionContent recordMap={post.recordMap} />
          {/* 이전/다음 포스트 네비게이션 */}
          <PostNavigation post={post} />

          {/* 모바일 광고 */}
          <div className="my-8 w-full min-w-[250px] lg:hidden">
            <AdUnit slot="5007143515" layout="in-article" />
          </div>

          <Separator className="my-16" />

          {/* 댓글 */}
          <GiscusComments />
        </section>
        <aside className="hidden lg:block">
          <div className="space-y-8">
            <PcTableOfContents recordMap={post.recordMap} />
            <RelatedPosts currentPost={post} allPosts={allPosts} />
          </div>
        </aside>
      </div>
    </div>
  );
}
