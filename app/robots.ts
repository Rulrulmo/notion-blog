import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: '/blog/add',
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: '/blog/add',
      },
    ],
    sitemap: 'https://rulmo.vercel.app/sitemap.xml',
  };
}
