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
      {
        hostname:
          process.env.NEXT_PUBLIC_NOTION_SITE_URL?.replace('https://', '').replace('http://', '') ||
          '',
      },
    ],
  },
};

export default nextConfig;
