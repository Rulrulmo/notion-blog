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
    <div className="container py-6 md:py-12">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-[minmax(0,1fr)_240px] md:gap-8">
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

          <Separator className="my-16" />

          {/* 댓글 */}
          <GiscusComments />
        </section>
        <aside className="hidden md:sticky md:top-[var(--sticky-top)] md:block md:self-start">
          <div className="space-y-8">
            <PcTableOfContents recordMap={post.recordMap} />
            <RelatedPosts currentPost={post} allPosts={allPosts} />
          </div>
        </aside>
      </div>
    </div>
  );
}
