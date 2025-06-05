import { Badge } from '@/components/ui/badge';
import { CalendarDays, User } from 'lucide-react';
import { ViewCounter } from './ViewCounter';

interface PostHeaderProps {
  title: string;
  tags?: Array<{ id: string; name: string }>;
  author: string;
  createdDate: string;
}

export function PostHeader({ title, tags, author, createdDate }: PostHeaderProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        {tags?.map((tag) => (
          <Badge variant="secondary" key={tag.id}>
            {tag.name}
          </Badge>
        ))}
        <h1 className="text-3xl font-bold sm:text-4xl">{title}</h1>
      </div>

      {/* 메타 정보 */}
      <div className="text-muted-foreground flex gap-4 text-sm">
        <div className="flex items-center gap-1">
          <User className="h-4 w-4" />
          <span>{author}</span>
        </div>
        <div className="flex items-center gap-1">
          <CalendarDays className="h-4 w-4" />
          <span>{createdDate}</span>
        </div>
        <ViewCounter />
      </div>
    </div>
  );
}
