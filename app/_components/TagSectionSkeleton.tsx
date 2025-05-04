import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function TagSectionSkeleton() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <Skeleton className="h-6 w-20" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-3">
          {/* '전체' 태그 스켈레톤 */}
          <TagItemSkeleton />
          {/* 태그 목록 스켈레톤 */}
          {Array.from({ length: 2 }).map((_, i) => (
            <TagItemSkeleton key={i} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function TagItemSkeleton() {
  return (
    <div className="flex items-center justify-between rounded-md p-1.5 text-sm">
      <Skeleton className="h-5 w-16" />
      <Skeleton className="h-5 w-6" />
    </div>
  );
}
