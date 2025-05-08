import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Post } from '@/types/blog';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface IProps {
  post: Post;
}

export function PostNavigation({ post }: IProps) {
  return (
    <nav className="mt-10 grid grid-cols-2 gap-8">
      {post.prevSlug && (
        <Link href={`/blog/${post.prevSlug}`}>
          <Card className="group hover:bg-muted/50 transition-colors">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base font-medium">
                <ChevronLeft className="h-4 w-4" />
                <span>이전 글</span>
              </CardTitle>
              <CardDescription className="line-clamp-2">{post.prevPostTitle}</CardDescription>
            </CardHeader>
          </Card>
        </Link>
      )}

      {post.nextSlug && (
        <Link href={`/blog/${post.nextSlug}`} className="text-right">
          <Card className="group hover:bg-muted/50 transition-colors">
            <CardHeader>
              <CardTitle className="flex items-center justify-end gap-2 text-base font-medium">
                <span>다음 글</span>
                <ChevronRight className="h-4 w-4" />
              </CardTitle>
              <CardDescription className="line-clamp-2">{post.nextPostTitle}</CardDescription>
            </CardHeader>
          </Card>
        </Link>
      )}
    </nav>
  );
}
