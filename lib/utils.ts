import { Post } from '@/types/blog';
import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

const DEFAULT_COVER_IMAGE = '/images/default-cover.jpeg';

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
    coverImage: page.cover ? getImageUrl(getCoverImage(page.cover), page.id) : DEFAULT_COVER_IMAGE,
    tags: properties.tags.type === 'multi_select' ? properties.tags.multi_select : [],
    createdDate:
      properties.publishDate.type === 'date' ? (properties.publishDate.date?.start ?? '') : '',
    modifiedDate: page.last_edited_time || '',
    author:
      properties.author.type === 'created_by'
        ? ((properties.author.created_by as { name: string })?.name ?? '')
        : '',
    slug:
      properties.slug.type === 'unique_id'
        ? properties.slug.unique_id.number || undefined
        : undefined,
    prevSlug:
      properties.prevSlug.type === 'number' ? properties.prevSlug.number || undefined : undefined,
    nextSlug:
      properties.nextSlug.type === 'number' ? properties.nextSlug.number || undefined : undefined,
  };
};

export const checkUUID = (id: string) => {
  const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return UUID_REGEX.test(id);
};

export const getImageUrl = (notionCoverUrl: string, pageId: string) => {
  const encodedUrl = encodeURIComponent(notionCoverUrl.split('?')[0]);
  return `${process.env.NEXT_PUBLIC_NOTION_SITE_URL}/image/${encodedUrl}?table=block&id=${pageId}&cache=v2`;
};

export const isValidImageUrl = (url: string) => {
  try {
    if (url === DEFAULT_COVER_IMAGE) return true;
    new URL(url);
    return true;
  } catch {
    return false;
  }
};
