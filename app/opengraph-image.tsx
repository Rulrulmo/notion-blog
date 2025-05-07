import { ImageResponse } from 'next/og';

// 이미지 크기 정의
export const size = {
  width: 1200,
  height: 630,
};

// 이미지 콘텐츠 타입 정의
export const contentType = 'image/png';

// 배포 도메인에 맞게 수정하세요!
const BASE_URL = process.env.NEXT_PUBLIC_URL;

// OG 이미지 생성 함수
export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column' as const,
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px',
          position: 'relative' as const,
        }}
      >
        <img
          src={`${BASE_URL}/logo.png`}
          alt="Rulmo Logo"
          width={120}
          height={120}
          style={{
            objectFit: 'contain' as const,
            marginBottom: '32px',
          }}
        />

        <img
          src={`${BASE_URL}/rulmoblog.png`}
          alt="Rulmo Blog"
          width={500}
          height={100}
          style={{
            objectFit: 'contain' as const,
            marginBottom: '32px',
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  );
}
