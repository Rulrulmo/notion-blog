import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Header from '@/components/layouts/Header';
import Footer from '@/components/layouts/Footer';
import Providers from './providers';
import Script from 'next/script';
import { GoogleAdSense } from '@/components/GoogleAdSense';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: process.env.NODE_ENV === 'development' ? 'Rulmo(dev)' : 'Rulmo 블로그',
  description: 'FE 개발자 블로그',
  verification: {
    google: 'gTJyk0_O9B8dcbw_uZrVqxDfLXPEx4gPXTM9vnhHOpg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <head>
        {process.env.NODE_ENV === 'production' && (
          <>
            <Script
              id="adsbygoogle-init"
              strategy="beforeInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.adsbygoogle = window.adsbygoogle || [];
                  (adsbygoogle = window.adsbygoogle || []).push({
                    google_ad_client: "ca-pub-2091824784796567",
                    enable_page_level_ads: true
                  });
                `,
              }}
            />
            <GoogleAdSense />
          </>
        )}
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers>
          <div className="flex min-h-screen flex-col">
            {/* Header 영역 */}
            <Header />
            {/* Main 영역 */}
            <main className="flex-1">{children}</main>
            {/* Footer 영역 */}
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
