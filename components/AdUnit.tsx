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

    const pushAd = () => {
      try {
        if (adRef.current && window.adsbygoogle) {
          window.adsbygoogle.push({});
        }
      } catch (err) {
        console.error('AdUnit 로드 실패:', err);
      }
    };

    // 광고 컨테이너가 준비되었을 때 초기화
    if (adRef.current) {
      if (window.adsbygoogle) {
        pushAd();
      } else {
        // adsbygoogle이 아직 로드되지 않은 경우 대기
        const interval = setInterval(() => {
          if (window.adsbygoogle) {
            pushAd();
            clearInterval(interval);
          }
        }, 300);

        // 5초 후에도 로드되지 않으면 인터벌 정리
        setTimeout(() => clearInterval(interval), 5000);
      }
    }
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
          minHeight: layout === 'in-article' ? '250px' : '280px',
          width: '100%',
          ...style,
        }}
      >
        <span>광고 영역 (개발 환경)</span>
      </div>
    );
  }

  const adStyle: React.CSSProperties = {
    display: 'block',
    minHeight: layout === 'in-article' ? '250px' : '280px',
    width: '100%',
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
