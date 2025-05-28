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

export interface IGetPublishedPosts {
  pageSize?: number;
  startCursor?: string;
  tag?: string;
  sort?: 'latest' | 'oldest';
}

export interface IGetPublishedPostsResponse {
  posts: Post[];
  hasMore: boolean;
  nextCursor: string;
}

export const getPublishedPosts = unstable_cache(
  async ({
    startCursor,
    tag,
    sort,
  }: IGetPublishedPosts = {}): Promise<IGetPublishedPostsResponse> => {
    const filters: any[] = [
      {
        property: 'status',
        select: {
          equals: 'Published',
        },
      },
    ];

    if (tag && tag !== 'all') {
      filters.push({
        property: 'tags',
        multi_select: {
          contains: tag,
        },
      });
    }

    const response = await notion.databases.query({
      database_id: process.env.NOTION_DATABASE_ID!,
      filter: {
        and: filters,
      },
      sorts: [
        {
          property: 'publishDate',
          direction: sort === 'oldest' ? 'ascending' : 'descending',
        },
      ],
      page_size: 100,
      start_cursor: startCursor,
    });

    const posts = response.results
      .filter((page): page is PageObjectResponse => 'properties' in page)
      .map(getMetadataFromPage);

    return {
      posts,
      hasMore: response.has_more,
      nextCursor: response.next_cursor || '',
    };
  },
  undefined,
  {
    tags: ['posts'],
  }
);

export const getTags = async (): Promise<{
  tags: TagFilterItem[];
  totalCount: number;
}> => {
  const { posts } = await getPublishedPosts();
  const tagSet = new Set<string>();
  const tagCount: Record<string, number> = {};

  posts.forEach((post) => {
    const postTags = new Set(post.tags?.map((tag) => tag.name) || []);
    postTags.forEach((tagName) => {
      tagSet.add(tagName);
      tagCount[tagName] = (tagCount[tagName] || 0) + 1;
    });
  });

  return {
    tags: Array.from(tagSet).map((tagName) => ({
      id: tagName,
      name: tagName,
      count: tagCount[tagName] || 0,
    })),
    totalCount: posts.length,
  };
};

export const getPostBySlug = async (slug: number): Promise<Post> => {
  const response = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID!,
    filter: {
      or: [
        {
          property: 'slug',
          number: {
            equals: slug,
          },
        },
        {
          property: 'nextSlug',
          number: {
            equals: slug,
          },
        },
        {
          property: 'prevSlug',
          number: {
            equals: slug,
          },
        },
      ],
    },
  });

  if (!response.results.length) {
    throw new Error('Post not found');
  }

  const currentPost = response.results.find((page) => {
    const prop = (page as PageObjectResponse).properties.slug;
    return prop.type === 'unique_id' && prop.unique_id.number === slug;
  }) as PageObjectResponse;

  const prevPost = response.results.find((page) => {
    const prop = (page as PageObjectResponse).properties.nextSlug;
    return prop.type === 'number' && prop.number === slug;
  }) as PageObjectResponse;

  const nextPost = response.results.find((page) => {
    const prop = (page as PageObjectResponse).properties.prevSlug;
    return prop.type === 'number' && prop.number === slug;
  }) as PageObjectResponse;

  if (!currentPost) {
    throw new Error('Post not found');
  }

  const metadata = getMetadataFromPage(currentPost);
  const recordMap = await notionApi.getPage(currentPost.id);

  const prevPostTitle = prevPost
    ? prevPost.properties.제목.type === 'title'
      ? (prevPost.properties.제목.title[0]?.plain_text ?? '')
      : ''
    : '';

  const nextPostTitle = nextPost
    ? nextPost.properties.제목.type === 'title'
      ? (nextPost.properties.제목.title[0]?.plain_text ?? '')
      : ''
    : '';

  return {
    ...metadata,
    recordMap,
    prevPostTitle,
    nextPostTitle,
  };
};

export interface CreatePostParams {
  title: string;
  tag: string;
  content: string;
}

export const createPost = async ({ title, tag, content }: CreatePostParams) => {
  const response = await notion.pages.create({
    parent: {
      database_id: process.env.NOTION_DATABASE_ID!,
    },
    properties: {
      Title: {
        title: [
          {
            text: {
              content: title,
            },
          },
        ],
      },
      Description: {
        rich_text: [
          {
            text: {
              content: content,
            },
          },
        ],
      },
      Tags: {
        multi_select: [{ name: tag }],
      },
      Status: {
        select: {
          name: 'Published',
        },
      },
      Date: {
        date: {
          start: new Date().toISOString(),
        },
      },
    },
  });

  return response;
};
