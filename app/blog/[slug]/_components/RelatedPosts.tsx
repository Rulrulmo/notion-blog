import Link from 'next/link';
import { Post } from '@/types/blog';

interface RelatedPostsProps {
  currentPost: Post;
  allPosts: Post[];
}

export function RelatedPosts({ currentPost, allPosts }: RelatedPostsProps) {
  // 현재 포스트의 태그가 없는 경우 처리
  if (!currentPost.tags?.length) {
    return null;
  }

  // 현재 포스트의 태그들
  const currentTags = new Set(currentPost.tags.map((tag) => tag.name));

  // 관련 포스트 찾기 (같은 태그를 가진 글들)
  const relatedPosts = allPosts
    .filter((post) => {
      // 현재 포스트 제외
      if (post.slug === currentPost.slug) return false;

      // 태그가 없는 포스트 제외
      if (!post.tags?.length) return false;

      // 태그가 하나라도 일치하는 포스트 찾기
      return post.tags.some((tag) => currentTags.has(tag.name));
    })
    .slice(0, 5); // 최대 5개까지만 표시

  if (relatedPosts.length === 0) {
    return null;
  }

  return (
    <div className="bg-muted/40 rounded-lg p-6 backdrop-blur-sm">
      <h2 className="text-lg font-semibold">
        {currentPost.tags.map((tag) => tag.name).join(', ') + ' 관련 글'}
      </h2>
      <ul className="mt-4 space-y-2 text-sm">
        {relatedPosts.map((post) => (
          <li key={post.slug}>
            <Link
              href={`/blog/${post.slug}`}
              className="text-muted-foreground hover:text-foreground line-clamp-1 transition-colors"
            >
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
