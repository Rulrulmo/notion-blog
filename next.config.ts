import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'picsum.photos',
      },
      {
        hostname: 'images.unsplash.com',
      },
      {
        hostname: 'prod-files-secure.s3.us-west-2.amazonaws.com',
        protocol: 'https',
        port: '',
        pathname: '/**',
      },
      {
        hostname: 'www.notion.so',
      },
      // 빈 hostname은 Next 16 빌드에서 에러가 나므로 env가 있을 때만 추가
      ...(process.env.NEXT_PUBLIC_NOTION_SITE_URL
        ? [{ hostname: new URL(process.env.NEXT_PUBLIC_NOTION_SITE_URL).hostname }]
        : []),
    ],
  },
};

export default nextConfig;
