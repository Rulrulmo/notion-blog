import { ExtendedRecordMap } from 'notion-types';

export interface TagFilterItem {
  id: string;
  name: string;
  color?: string;
  count?: number;
}

export interface Tag {
  id: string;
  name: string;
  color: string;
}

export interface Post {
  id: string;
  title: string;
  coverImage: string;
  tags: Array<{ name: string; id: string }>;
  createdDate: string;
  modifiedDate: string;
  author: string;
  slug?: number;
  prevSlug?: number;
  nextSlug?: number;
  prevPostTitle?: string;
  nextPostTitle?: string;
  recordMap?: ExtendedRecordMap;
}
