import type { NextConfig } from 'next';
import createMDX from '@next/mdx';

const withMDX = createMDX({
  //
});

const nextConfig: NextConfig = {
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
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
    // unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'header',
            key: 'x-prerender',
          },
        ],
        destination: '/:path*',
        permanent: true,
      },
    ];
  },
};

export default withMDX(nextConfig);
