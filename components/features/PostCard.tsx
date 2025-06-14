'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { Calendar, User } from 'lucide-react';
import Image from 'next/image';
import { Post } from '@/types/blog';
import { isValidImageUrl } from '@/lib/utils';

interface IProps {
  post: Post;
  isFirst: boolean;
}

export function PostCard({ post, isFirst }: IProps) {
  return (
    <Card className="group bg-card/50 border-border/40 hover:border-primary/20 m-0 w-full max-w-full gap-1 overflow-hidden border p-0 backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
      {post.coverImage && isValidImageUrl(post.coverImage) && (
        <div className="relative aspect-[2/1] w-full overflow-hidden">
          <div className="from-background/20 absolute inset-0 z-10 bg-gradient-to-t to-transparent" />
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={isFirst}
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      )}
      <CardContent className="p-4">
        <div className="mb-4 flex flex-wrap gap-2">
          {post.tags?.map((tag) => (
            <Badge
              key={tag.id}
              variant="secondary"
              className="bg-primary/10 text-primary hover:bg-primary/20 font-medium transition-colors"
            >
              {tag.name}
            </Badge>
          ))}
        </div>
        <h2 className="group-hover:text-primary mb-1 line-clamp-1 max-w-[100%] text-lg font-bold tracking-tight transition-colors">
          {post.title}
        </h2>
        <div className="text-muted-foreground mt-1 flex items-center gap-x-4 text-sm">
          {post.author && (
            <div className="flex items-center gap-1.5">
              <User className="h-4 w-4" />
              <span>{post.author}</span>
            </div>
          )}
          {post.createdDate && (
            <div className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              <time>{format(new Date(post.createdDate), 'PPP', { locale: ko })}</time>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
