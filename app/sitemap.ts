import { MetadataRoute } from 'next';
import { getPublishedPosts } from '@/lib/notion';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // 기본 URL
  const baseUrl = `${process.env.NEXT_PUBLIC_URL}`;

  // 정적 페이지 목록
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
  ] as const;

  const { posts } = await getPublishedPosts();

  const blogPosts = posts.map((post) => {
    // 최근 1주일 이내에 작성/수정된 포스트는 더 자주 크롤링
    const isRecent = new Date(post.modifiedDate).getTime() > Date.now() - 7 * 24 * 60 * 60 * 1000;

    return {
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: post.modifiedDate ? new Date(post.modifiedDate) : new Date(),
      changeFrequency: isRecent ? 'daily' : ('weekly' as const),
      priority: isRecent ? 0.9 : 0.8,
    };
  });

  return [...staticPages, ...blogPosts] as MetadataRoute.Sitemap;
}
