import type { Metadata } from 'next';
import { Separator } from '@/components/ui/separator';
import { getPostBySlug, getPostContent, getPublishedPosts } from '@/lib/notion';
import { GiscusComments } from '@/components/GiscusComments';
import { notFound } from 'next/navigation';
import { PostNavigation } from './_components/PostNavigation';
import NotionContent from './_components/NotionRenderer';
import { MobileTableOfContents } from './_components/MobileTableOfContents';
import { PcTableOfContents } from './_components/PcTableOfContents';
import { RelatedPosts } from './_components/RelatedPosts';
import { PostHeader } from './_components/PostHeader';

interface IProps {
  params: Promise<{ slug: string }>;
}

export const generateStaticParams = async () => {
  const posts = await getPublishedPosts();
  return posts.map((post) => ({ slug: String(post.slug) }));
};

export const revalidate = 180;

export async function generateMetadata({ params }: IProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(Number(slug));
  if (!post) return {};

  return {
    title: post.title,
    openGraph: {
      type: 'article',
      title: post.title,
      publishedTime: post.createdDate,
      tags: post.tags.map((tag) => tag.name),
    },
  };
}

export default async function BlogPost({ params }: IProps) {
  const { slug } = await params;
  const allPosts = await getPublishedPosts();
  // allPosts는 최신순이라 index + 1이 이전 글, index - 1이 다음 글
  const index = allPosts.findIndex((post) => post.slug === Number(slug));

  if (index === -1) {
    notFound();
  }

  const post = allPosts[index];
  const recordMap = await getPostContent(post.id);

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
          <MobileTableOfContents recordMap={recordMap} />
          {/* 블로그 본문 */}
          <NotionContent recordMap={recordMap} />
          {/* 이전/다음 포스트 네비게이션 */}
          <PostNavigation prevPost={allPosts[index + 1]} nextPost={allPosts[index - 1]} />

          <Separator className="my-16" />

          {/* 댓글 */}
          <GiscusComments />
        </section>
        <aside className="hidden md:sticky md:top-[var(--sticky-top)] md:block md:self-start">
          <div className="space-y-8">
            <PcTableOfContents recordMap={recordMap} />
            <RelatedPosts currentPost={post} allPosts={allPosts} />
          </div>
        </aside>
      </div>
    </div>
  );
}
