'use client';

import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function Error() {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <h1 className="text-4xl font-bold">문제가 발생했습니다</h1>
      <p className="text-muted-foreground">잠시 후 다시 시도해주세요.</p>
      <Link href="/" className="mt-4">
        <Button variant="outline">
          <ArrowLeft className="mr-2 h-4 w-4" />
          블로그로 돌아가기
        </Button>
      </Link>
    </div>
  );
}
