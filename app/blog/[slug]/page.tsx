import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { CalendarDays, User } from 'lucide-react';
import { getPostBySlug, getPublishedPosts } from '@/lib/notion';
import { MDXRemote } from 'next-mdx-remote-client/rsc';
import remarkGfm from 'remark-gfm';
import rehypeSanitize from 'rehype-sanitize';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import { compile } from '@mdx-js/mdx';
import withSlugs from 'rehype-slug';
import withToc from '@stefanprobst/rehype-extract-toc';
import withTocExport from '@stefanprobst/rehype-extract-toc/mdx';
import { GiscusComments } from '@/components/GiscusComments';
import { notFound } from 'next/navigation';
import { PostNavigation } from './_components/PostNavigation';
import { Suspense } from 'react';
import TagsPage from '@/app/@tags/page';
interface TocEntry {
  value: string;
  depth: number;
  id?: string;
  children?: Array<TocEntry>;
}

export const generateStaticParams = async () => {
  const { posts } = await getPublishedPosts({});
  return posts.map((post) => ({ slug: String(post.slug) }));
};

export const revalidate = 180;

function TableOfContentsLink({ item }: { item: TocEntry }) {
  return (
    <div className="space-y-2">
      <Link
        key={item.id}
        href={`#${item.id}`}
        className={`hover:text-foreground text-muted-foreground block font-medium transition-colors`}
      >
        {item.value}
      </Link>
      {item.children && item.children.length > 0 && (
        <div className="space-y-2 pl-4">
          {item.children.map((subItem) => (
            <TableOfContentsLink key={subItem.id} item={subItem} />
          ))}
        </div>
      )}
    </div>
  );
}

export default async function BlogPost({ params }: { params: Promise<{ slug: number }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(Number(slug));

  if (!post) {
    notFound();
  }

  const { data } = await compile(post.content ?? '', {
    rehypePlugins: [
      withSlugs,
      withToc,
      withTocExport,
      rehypeSanitize,
      /** Optionally, provide a custom name for the export. */
      // [withTocExport, { name: 'toc' }],
    ],
  });

  return (
    <div className="container py-6 lg:py-12">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[200px_minmax(0,1fr)_240px] lg:gap-8">
        {/* <aside className="hidden lg:block"></aside> */}
        <aside className="order-2 hidden lg:sticky lg:top-[var(--sticky-top)] lg:order-none lg:block lg:self-start">
          <Suspense>
            <TagsPage searchParams={Promise.resolve({ tag: post.tags?.[0]?.name ?? '' })} />
          </Suspense>
        </aside>
        <section>
          {/* 블로그 헤더 */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Badge>{post.tags?.map((tag) => tag.name).join(', ') ?? ''}</Badge>
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
            </div>
          </div>

          <Separator className="my-8" />

          {/* 모바일 전용 목차 */}
          <div className="sticky top-[var(--sticky-top)] mb-6 lg:hidden">
            <details className="bg-muted/60 rounded-lg p-3 backdrop-blur-sm">
              <summary className="cursor-pointer text-lg font-semibold">목차</summary>
              <nav className="mt-3 space-y-3 text-sm">
                {data?.toc?.map((item) => <TableOfContentsLink key={item.id} item={item} />)}
              </nav>
            </details>
          </div>

          {/* 블로그 본문 */}
          <div className="prose prose-slate dark:prose-invert prose-headings:scroll-mt-[var(--sticky-top)] max-w-3xl">
            <MDXRemote
              source={post.content ?? ''}
              options={{
                mdxOptions: {
                  remarkPlugins: [remarkGfm],
                  rehypePlugins: [rehypeSanitize, rehypePrettyCode, rehypeSlug],
                },
              }}
            />
          </div>

          {/* 이전/다음 포스트 네비게이션 */}
          <PostNavigation post={post} />

          <Separator className="my-16" />

          {/* 댓글 */}
          <GiscusComments />
        </section>
        <aside className="hidden lg:block">
          <div className="sticky top-[var(--sticky-top)]">
            <div className="bg-muted/40 space-y-4 rounded-lg p-6 backdrop-blur-sm">
              <h3 className="text-lg font-semibold">목차</h3>
              <nav className="space-y-3 text-sm">
                {data?.toc?.map((item) => <TableOfContentsLink key={item.id} item={item} />)}
              </nav>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
