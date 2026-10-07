import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Post } from '@/types/blog';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface IProps {
  prevPost?: Post;
  nextPost?: Post;
}

export function PostNavigation({ prevPost, nextPost }: IProps) {
  return (
    <nav className="mt-10 grid grid-cols-2 gap-8">
      <div>
        {prevPost && (
          <Link href={`/blog/${prevPost.slug}`}>
            <Card className="group hover:bg-muted/50 transition-colors">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base font-medium">
                  <ChevronLeft className="h-4 w-4" />
                  <span>이전 글</span>
                </CardTitle>
                <CardDescription className="line-clamp-2">{prevPost.title}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        )}
      </div>

      <div>
        {nextPost && (
          <Link href={`/blog/${nextPost.slug}`} className="text-right">
            <Card className="group hover:bg-muted/50 transition-colors">
              <CardHeader>
                <CardTitle className="flex items-center justify-end gap-2 text-base font-medium">
                  <span>다음 글</span>
                  <ChevronRight className="h-4 w-4" />
                </CardTitle>
                <CardDescription className="line-clamp-2">{nextPost.title}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        )}
      </div>
    </nav>
  );
}
