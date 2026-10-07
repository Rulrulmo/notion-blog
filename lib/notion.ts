import { Client } from '@notionhq/client';
import { Post, TagFilterItem } from '@/types/blog';
import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import { getMetadataFromPage } from '@/lib/utils';
import { unstable_cache } from 'next/cache';
import { NotionAPI } from 'notion-client';

export const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

const notionApi = new NotionAPI();

// 발행된 글 전체 (최신순). 목록, 태그, 상세, 이전/다음 글이 모두 이 결과를 공유한다.
export const getPublishedPosts = unstable_cache(
  async (): Promise<Post[]> => {
    const posts: Post[] = [];
    let cursor: string | undefined;

    do {
      const response = await notion.databases.query({
        database_id: process.env.NOTION_DATABASE_ID!,
        filter: {
          property: 'status',
          select: {
            equals: 'Published',
          },
        },
        sorts: [
          {
            property: 'publishDate',
            direction: 'descending',
          },
        ],
        page_size: 100,
        start_cursor: cursor,
      });

      posts.push(
        ...response.results
          .filter((page): page is PageObjectResponse => 'properties' in page)
          .map(getMetadataFromPage)
      );
      cursor = response.next_cursor ?? undefined;
    } while (cursor);

    return posts;
  },
  ['published-posts'],
  {
    revalidate: 180,
    tags: ['posts'],
  }
);

export const getTags = (posts: Post[]): TagFilterItem[] => {
  const tagCount = new Map<string, number>();

  posts.forEach((post) => {
    post.tags.forEach((tag) => {
      tagCount.set(tag.name, (tagCount.get(tag.name) ?? 0) + 1);
    });
  });

  return Array.from(tagCount, ([name, count]) => ({ id: name, name, count }));
};

export const getPostBySlug = async (slug: number) => {
  const posts = await getPublishedPosts();
  return posts.find((post) => post.slug === slug);
};

export const getPostContent = (pageId: string) => notionApi.getPage(pageId);
