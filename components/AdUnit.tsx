'use client';

import { useEffect, useRef } from 'react';
import Script from 'next/script';

interface AdUnitProps {
  slot: string;
  style?: React.CSSProperties;
  className?: string;
  layout?: 'in-article' | 'display';
}

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

export function AdUnit({ slot, style, className, layout = 'display' }: AdUnitProps) {
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') return;

    // ResizeObserver를 사용하여 컨테이너 크기 변화 감지
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.contentRect.width > 0) {
          try {
            if (window.adsbygoogle) {
              window.adsbygoogle.push({});
            }
          } catch (err) {
            console.error('AdUnit 로드 실패:', err);
          }
          // 크기가 확인되면 observer 해제
          observer.disconnect();
        }
      }
    });

    if (adRef.current) {
      observer.observe(adRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  if (process.env.NODE_ENV !== 'production') {
    return (
      <div
        className={className}
        style={{
          backgroundColor: '#f0f0f0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: layout === 'display' ? '200px' : '100%',
          height: layout === 'display' ? '600px' : '250px',
          ...style,
        }}
      >
        <span>광고 영역 (개발 환경)</span>
      </div>
    );
  }

  const adStyle: React.CSSProperties = {
    display: 'block',
    width: layout === 'display' ? '200px' : '100%',
    height: layout === 'display' ? '600px' : '250px',
    backgroundColor: 'transparent',
    ...style,
  };

  return (
    <>
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2091824784796567"
        strategy="afterInteractive"
        crossOrigin="anonymous"
      />
      <div ref={adRef} className={className}>
        <ins
          className="adsbygoogle"
          style={adStyle}
          data-ad-client="ca-pub-2091824784796567"
          data-ad-slot={slot}
          data-ad-format={layout === 'in-article' ? 'fluid' : 'auto'}
          data-full-width-responsive="true"
        />
      </div>
    </>
  );
}
