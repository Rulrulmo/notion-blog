import { ImageResponse } from 'next/og';
import { getPostBySlug } from '@/lib/notion';

// 이미지 크기 정의
export const size = {
  width: 1200,
  height: 630,
};

// 이미지 콘텐츠 타입 정의
export const contentType = 'image/png';

// OG 이미지 생성 함수
export default async function OgImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(Number(slug));

  // 기본 커버는 상대 경로라 ImageResponse가 불러올 수 없음
  if (!post?.coverImage.startsWith('http')) {
    return new ImageResponse(
      (
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#000',
            color: '#fff',
            fontSize: 48,
            fontWeight: 'bold',
          }}
        >
          Rulmo Blog
        </div>
      ),
      {
        ...size,
      }
    );
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <img
          src={post.coverImage}
          alt={post.title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover' as const,
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  );
}
