import { Post } from '@/types/blog';
import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getMetadataFromPage = (page: PageObjectResponse): Post => {
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
    modifiedDate: page.last_edited_time || '',
    author:
      properties.작성자.type === 'created_by'
        ? ((properties.작성자.created_by as { name: string })?.name ?? '')
        : '',
  };
};

export const checkUUID = (id: string) => {
  const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return UUID_REGEX.test(id);
};
