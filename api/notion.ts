import { Client } from '@notionhq/client';
import { Post, TagFilterItem } from '@/types/blog';
import { NotionToMarkdown } from 'notion-to-md';
import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import { getMetadataFromPage } from '@/lib/utils';

export const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

const n2m = new NotionToMarkdown({ notionClient: notion });

export const getPublishedPosts = async (tag?: string, sort?: string): Promise<Post[]> => {
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
        ...(tag
          ? [
              {
                property: '태그',
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
        property: '게시일',
        direction: sort === 'oldest' ? 'ascending' : 'descending',
      },
    ],
  });

  return response.results
    .filter((page): page is PageObjectResponse => 'properties' in page)
    .map(getMetadataFromPage);
};

const getTagCounts = async (): Promise<{
  tagCount: Record<string, number>;
  totalCount: number;
}> => {
  const tagCount: Record<string, number> = {};
  const posts = await getPublishedPosts();
  posts.forEach((post) => {
    post.tags?.forEach((tag: { name: string }) => {
      tagCount[tag.name] = (tagCount[tag.name] || 0) + 1;
    });
  });

  return { tagCount, totalCount: posts.length };
};

export const getTags = async (): Promise<{
  totalCount: number;
  tags: TagFilterItem[];
}> => {
  const database = await notion.databases.retrieve({
    database_id: process.env.NOTION_DATABASE_ID!,
  });

  const tagProperty = Object.values(database.properties).find(
    (prop) => prop.type === 'multi_select' && (prop.name === '태그' || prop.id === '태그')
  );

  if (!tagProperty || !('multi_select' in tagProperty)) return { totalCount: 0, tags: [] };
  const tags = tagProperty.multi_select.options.map((option) => option);

  const { tagCount, totalCount } = await getTagCounts();

  return {
    totalCount,
    tags: tags.map((tag) => ({
      ...tag,
      count: tagCount[tag.name] || 0,
    })),
  };
};

export const getPostById = async (id: string): Promise<Post> => {
  const response = await notion.pages.retrieve({ page_id: id });
  const mdBlocks = await n2m.pageToMarkdown(id);
  const mdString = n2m.toMarkdownString(mdBlocks);
  return {
    ...getMetadataFromPage(response as PageObjectResponse),
    content: mdString.parent,
  };
};
