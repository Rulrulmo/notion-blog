import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div className="container py-12">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[240px_1fr_240px] lg:gap-8">
        <aside></aside>
        <section>
          {/* 헤더 */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Skeleton className="h-6 w-12" /> {/* 태그 */}
              <Skeleton className="h-10 w-2/3" /> {/* 제목 */}
            </div>
            <div className="flex gap-4 text-sm">
              <Skeleton className="h-4 w-16" /> {/* 작성자 */}
              <Skeleton className="h-4 w-20" /> {/* 날짜 */}
            </div>
          </div>
          <Skeleton className="my-8 h-px w-full" /> {/* 구분선 */}
          {/* 본문 */}
          <div className="space-y-4">
            {[...Array(7)].map((_, i) => (
              <Skeleton key={i} className="h-4 w-full" />
            ))}
            <Skeleton className="h-6 w-1/2" /> {/* 소제목 */}
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-4 w-5/6" />
            ))}
          </div>
          <Skeleton className="my-16 h-px w-full" /> {/* 구분선 */}
          {/* 이전/다음 포스트 네비 */}
          <nav className="grid grid-cols-2 gap-8">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="space-y-2 rounded-lg border p-4">
                <Skeleton className="h-5 w-24" /> {/* 제목 */}
                <Skeleton className="h-4 w-32" /> {/* 설명 */}
              </div>
            ))}
          </nav>
        </section>
        <aside>
          <div className="sticky top-[var(--sticky-top)]">
            <div className="bg-muted/40 space-y-4 rounded-lg p-6 backdrop-blur-sm">
              <Skeleton className="mb-2 h-6 w-16" /> {/* 목차 타이틀 */}
              <div className="space-y-2">
                {[...Array(6)].map((_, i) => (
                  <Skeleton key={i} className="h-4 w-28" />
                ))}
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
