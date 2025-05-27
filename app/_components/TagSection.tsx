'use client';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { TagFilterItem } from '@/types/blog';
import Link from 'next/link';

interface IProps {
  tags: TagFilterItem[];
  selectedTag: string;
}

export default function TagSection({ tags, selectedTag }: IProps) {
  const totalCount = tags.reduce((acc, tag) => acc + (tag.count || 0), 0);
  return (
    <Card>
      <CardHeader>
        <CardTitle>태그 목록</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-1">
          <Link href={`/?tag=`} className="block">
            <TagItem
              tag={{ id: '', name: '전체', count: totalCount }}
              selectedTag={selectedTag}
              isAll
            />
          </Link>
          {tags?.map((tag: TagFilterItem) => (
            <Link href={`/?tag=${tag.name}`} key={tag.name} className="block">
              <TagItem tag={tag} selectedTag={selectedTag} />
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

const TagItem = ({
  tag,
  selectedTag,
  isAll = false,
}: {
  tag: TagFilterItem;
  selectedTag?: string;
  isAll?: boolean;
}) => {
  return (
    <div
      className={`hover:bg-muted-foreground/10 text-muted-foreground flex items-center justify-between rounded-md p-1.5 text-sm transition-colors ${
        selectedTag === tag.name || (isAll && selectedTag === '')
          ? 'bg-muted-foreground/10 font-bold text-black'
          : ''
      }`}
    >
      <span>{tag.name}</span>
      <span>{tag.count || ''}</span>
    </div>
  );
};
