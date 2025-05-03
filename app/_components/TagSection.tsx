import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { TagFilterItem } from '@/types/blog';

interface IProps {
  selectedTag: string;
  tags: TagFilterItem[];
  totalCount: number;
}

export default async function TagSection({ tags, selectedTag, totalCount }: IProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>태그 목록</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-3">
          <Link href={`?tag=`}>
            <TagItem tag={{ name: '전체', count: totalCount }} selectedTag={selectedTag} isAll />
          </Link>
          {tags?.map((tag) => (
            <Link href={`?tag=${tag.name}`} key={tag.name}>
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
  selectedTag: string;
  isAll?: boolean;
}) => {
  return (
    <Link href={`?tag=${isAll ? '' : tag.name}`} key={tag.name}>
      <div
        className={`hover:bg-muted-foreground/10 text-muted-foreground flex items-center justify-between rounded-md p-1.5 text-sm transition-colors ${
          selectedTag === tag.name || (isAll && selectedTag === '')
            ? 'bg-muted-foreground/10 font-bold text-black'
            : ''
        }`}
      >
        <span>{tag.name}</span>
        <span>{tag.count}</span>
      </div>
    </Link>
  );
};
