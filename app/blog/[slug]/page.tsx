import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { CalendarDays, User } from 'lucide-react';
import { getPostBySlug, getPublishedPosts } from '@/lib/notion';
import { GiscusComments } from '@/components/GiscusComments';
import { notFound } from 'next/navigation';
import { PostNavigation } from './_components/PostNavigation';
import NotionContent from './_components/NotionRenderer';
import { ViewCounter } from './_components/ViewCounter';
import { MobileTableOfContents } from './_components/MobileTableOfContents';
import { PcTableOfContents } from './_components/PcTableOfContents';

export const generateStaticParams = async () => {
  const { posts } = await getPublishedPosts();
  return posts.map((post) => ({ slug: String(post.slug) }));
};

export const revalidate = 180;

export default async function BlogPost({ params }: { params: Promise<{ slug: number }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(Number(slug));

  if (!post) {
    notFound();
  }

  return (
    <div className="container py-6 lg:py-12">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[200px_minmax(0,1fr)_240px] lg:gap-8">
        <aside className="hidden lg:block"></aside>
        <section>
          {/* 블로그 헤더 */}
          <div className="space-y-4">
            <div className="space-y-2">
              {post.tags?.map((tag) => (
                <Badge variant="secondary" key={tag.id}>
                  {tag.name}
                </Badge>
              ))}
              <h1 className="text-3xl font-bold sm:text-4xl">{post.title}</h1>
            </div>

            {/* 메타 정보 */}
            <div className="text-muted-foreground flex gap-4 text-sm">
              <div className="flex items-center gap-1">
                <User className="h-4 w-4" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-1">
                <CalendarDays className="h-4 w-4" />
                <span>{post.createdDate}</span>
              </div>
              <ViewCounter />
            </div>
          </div>

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
        <aside className="hidden lg:block">
          <PcTableOfContents recordMap={post.recordMap} />
        </aside>
      </div>
    </div>
  );
}
