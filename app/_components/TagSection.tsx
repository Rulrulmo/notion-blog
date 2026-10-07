import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { TagFilterItem } from '@/types/blog';
import Link from 'next/link';

interface IProps {
  tags: TagFilterItem[];
  selectedTag: string;
  totalCount: number;
}

export default function TagSection({ tags, selectedTag, totalCount }: IProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>태그 목록</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-1">
          <Link href="/" className="block">
            <TagItem
              tag={{ id: '', name: '전체', count: totalCount }}
              selectedTag={selectedTag}
              isAll
            />
          </Link>
          {tags?.map((tag: TagFilterItem) => (
            <Link href={`/?tag=${encodeURIComponent(tag.name)}`} key={tag.name} className="block">
              <TagItem tag={tag} selectedTag={selectedTag} />
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

// 모바일용: 가로 스크롤 태그 칩
export function TagBar({ tags, selectedTag, totalCount }: IProps) {
  const items = [{ id: '', name: '전체', count: totalCount }, ...tags];

  return (
    <nav aria-label="태그" className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1">
      {items.map((tag) => {
        const isAll = tag.id === '';
        const isSelected = isAll ? selectedTag === '' : selectedTag === tag.name;

        return (
          <Link
            key={tag.name}
            href={isAll ? '/' : `/?tag=${encodeURIComponent(tag.name)}`}
            className={`shrink-0 rounded-full border px-3 py-1 text-sm transition-colors ${
              isSelected
                ? 'border-primary bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {tag.name} <span className="text-xs opacity-70">{tag.count}</span>
          </Link>
        );
      })}
    </nav>
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
          ? 'bg-muted-foreground/10 text-foreground font-bold'
          : ''
      }`}
    >
      <span>{tag.name}</span>
      <span>{tag.count || ''}</span>
    </div>
  );
};
