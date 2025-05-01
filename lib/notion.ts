import { Client } from '@notionhq/client';
import { Post } from '@/types/blog';
import { NotionToMarkdown } from 'notion-to-md';

export const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

const n2m = new NotionToMarkdown({ notionClient: notion });

const getMetadataFromPage = (page: PageObjectResponse): Post => {
  const { properties } = page;

  const getCoverImage = (cover: PageObjectResponse['cover']) => {
    if (!cover) return '';

    switch (cover.type) {
      case 'external':
        return cover.external.url;
      case 'file':
        return cover.file.url;
      default:
        return '';
    }
  };

  return {
    id: page.id,
    title: properties.제목.type === 'title' ? (properties.제목.title[0]?.plain_text ?? '') : '',
    coverImage: getCoverImage(page.cover),
    tags: properties.태그.type === 'multi_select' ? properties.태그.multi_select : [],
    createdDate: properties.게시일.type === 'date' ? (properties.게시일.date?.start ?? '') : '',
    modifiedDate: page.properties.updated_at.last_edited_time || '',
    author: properties.작성자.type === 'people' ? (properties.작성자.people[0]?.name ?? '') : '',
  };
};

export const getPublishedPosts = async (tag?: string): Promise<Post[]> => {
  const response = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID,
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
        direction: 'descending',
      },
    ],
  });

  return response.results
    .filter((page): page is PageObjectResponse => 'properties' in page)
    .map(getMetadataFromPage);
};

const getTagCounts = async (): Promise<Record<string, number>> => {
  const tagCount: Record<string, number> = {};
  const posts = await getPublishedPosts();
  posts.forEach((post) => {
    post.tags.forEach((tag: { name: string }) => {
      tagCount[tag.name] = (tagCount[tag.name] || 0) + 1;
    });
  });

  return tagCount;
};

export const getTags = async (): Promise<{
  posts: Post[];
  tags: TagFilterItem[];
}> => {
  const database = await notion.databases.retrieve({
    database_id: process.env.NOTION_DATABASE_ID!,
  });

  const tagProperty = Object.values(database.properties).find(
    (prop) => prop.type === 'multi_select' && (prop.name === '태그' || prop.id === '태그')
  );

  if (!tagProperty || !('multi_select' in tagProperty)) return [];
  const tags = tagProperty.multi_select.options.map((option) => option) as TagFilterItem[];

  const tagCounts = await getTagCounts();

  return tags.map((tag) => ({
    ...tag,
    count: tagCounts[tag.name] || 0,
  }));
};

export const getPostById = async (id: string): Promise<Post> => {
  const response = await notion.pages.retrieve({ page_id: id });
  const mdBlocks = await n2m.pageToMarkdown(id);
  const mdString = n2m.toMarkdownString(mdBlocks);
  return {
    ...getMetadataFromPage(response),
    content: mdString.parent,
  };
};
