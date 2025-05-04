import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div className="container py-8">
      <div className="grid grid-cols-[200px_1fr_220px] gap-6">
        {/* 태그 목록 */}
        <aside>
          <div className="flex flex-col gap-4">
            <Skeleton className="mb-2 h-6 w-20" /> {/* "태그 목록" 타이틀 */}
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-5 w-16" />
            ))}
          </div>
        </aside>

        {/* 블로그 카드 목록 */}
        <div className="space-y-8">
          {/* 헤더 */}
          <Skeleton className="mb-4 h-8 w-32" /> {/* "블로그 목록" 타이틀 */}
          {/* 카드 2개 예시 */}
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex flex-col gap-4 rounded-xl border p-4">
              <Skeleton className="h-48 w-full rounded-lg" /> {/* 이미지 */}
              <div className="flex items-center gap-2">
                <Skeleton className="h-5 w-10" /> {/* 태그 */}
                <Skeleton className="h-5 w-40" /> {/* 제목 */}
              </div>
              <div className="flex items-center gap-2">
                <Skeleton className="h-4 w-8 rounded-full" /> {/* 작성자 */}
                <Skeleton className="h-4 w-24" /> {/* 날짜 */}
              </div>
            </div>
          ))}
        </div>

        {/* 프로필 카드 */}
        <aside>
          <div className="flex flex-col items-center gap-4 rounded-xl border p-6">
            <Skeleton className="h-24 w-24 rounded-full" /> {/* 프로필 이미지 */}
            <Skeleton className="h-5 w-16" /> {/* 이름 */}
            <Skeleton className="h-4 w-32" /> {/* 소개 */}
            <div className="mt-2 flex gap-2">
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} className="h-8 w-8 rounded-full" />
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
