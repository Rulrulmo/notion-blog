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
    ],
    unoptimized: true,
  },
};

export default withMDX(nextConfig);
