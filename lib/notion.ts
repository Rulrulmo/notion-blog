import { Client } from '@notionhq/client';
import { Post, TagFilterItem } from '@/types/blog';
import { NotionToMarkdown } from 'notion-to-md';
import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import { getMetadataFromPage } from '@/lib/utils';
import { unstable_cache } from 'next/cache';

export const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

const n2m = new NotionToMarkdown({ notionClient: notion });

export interface IGetPublishedPosts {
  tag?: string;
  sort?: string;
  pageSize?: number;
  startCursor?: string;
}

export interface IGetPublishedPostsResponse {
  posts: Post[];
  hasMore: boolean;
  nextCursor: string;
}

export const getPublishedPosts = unstable_cache(
  async ({
    tag = '전체',
    sort = 'latest',
    pageSize = 4,
    startCursor,
  }: IGetPublishedPosts): Promise<IGetPublishedPostsResponse> => {
    const response = await notion.databases.query({
      database_id: process.env.NOTION_DATABASE_ID!,
      filter: {
        and: [
          {
            property: 'status',
            select: {
              equals: 'Published',
            },
          },
          ...(tag !== '전체'
            ? [
                {
                  property: 'tags',
                  multi_select: {
                    contains: tag,
                  },
                },
              ]
            : []),
        ],
      },
      sorts: [
        {
          property: 'publishDate',
          direction: sort === 'oldest' ? 'ascending' : 'descending',
        },
      ],
      page_size: pageSize,
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

const getTagCounts = async (): Promise<{
  tagCount: Record<string, number>;
}> => {
  const tagCount: Record<string, number> = {};
  const { posts } = await getPublishedPosts({ pageSize: 999999 });
  posts.forEach((post) => {
    post.tags?.forEach((tag: { name: string }) => {
      tagCount[tag.name] = (tagCount[tag.name] || 0) + 1;
    });
  });

  return { tagCount };
};

export const getTags = async (): Promise<{
  tags: TagFilterItem[];
}> => {
  const database = await notion.databases.retrieve({
    database_id: process.env.NOTION_DATABASE_ID!,
  });

  const tagProperty = Object.values(database.properties).find(
    (prop) => prop.type === 'multi_select' && (prop.name === 'tags' || prop.id === 'tags')
  );

  if (!tagProperty || !('multi_select' in tagProperty)) return { tags: [] };
  const tags = tagProperty.multi_select.options.map((option) => option);

  const { tagCount } = await getTagCounts();

  return {
    tags: tags.map((tag) => ({
      ...tag,
      count: tagCount[tag.name] || 0,
    })),
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

  // 현재 글, 이전 글, 다음 글을 구분
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
  const mdBlocks = await n2m.pageToMarkdown(currentPost.id);
  const mdString = n2m.toMarkdownString(mdBlocks);

  // 이전 글과 다음 글의 제목 가져오기
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
    content: mdString.parent,
    prevPostTitle,
    nextPostTitle,
  };
};

// export const getPostById = async (id: string): Promise<Post> => {
//   const response = await notion.pages.retrieve({ page_id: id });
//   const mdBlocks = await n2m.pageToMarkdown(id);
//   const mdString = n2m.toMarkdownString(mdBlocks);
//   return {
//     ...getMetadataFromPage(response as PageObjectResponse),
//     content: mdString.parent,
//   };
// };

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
