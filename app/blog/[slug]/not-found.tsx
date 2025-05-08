import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '페이지를 찾을 수 없습니다',
  description: '주소가 올바르지 않거나, 페이지가 삭제되었을 수 있습니다.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <h1 className="text-4xl font-bold">404 - 페이지를 찾을 수 없습니다</h1>
      <p className="text-muted-foreground">
        주소가 올바르지 않거나, 페이지가 삭제되었을 수 있습니다.
      </p>
      <Link href="/blog" className="mt-4">
        <Button variant="outline">
          <ArrowLeft className="mr-2 h-4 w-4" />
          블로그로 돌아가기
        </Button>
      </Link>
    </div>
  );
}
