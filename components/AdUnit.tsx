'use client';

import { useEffect, useRef } from 'react';

interface AdUnitProps {
  slot: string;
  style?: React.CSSProperties;
  className?: string;
  layout?: 'in-article' | 'display';
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

export function AdUnit({ slot, style, className, layout = 'display' }: AdUnitProps) {
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') return;

    const initAd = () => {
      if (!adRef.current) return;

      try {
        const adElement = adRef.current.querySelector('ins.adsbygoogle');
        if (!adElement) return;

        // 이미 초기화된 광고는 건너뛰기
        if (adElement.getAttribute('data-adsbygoogle-status')) return;

        // 컨테이너가 충분한 너비를 가지고 있는지 확인
        const containerWidth = adRef.current.offsetWidth;
        if (layout === 'in-article' && containerWidth < 250) {
          console.warn('광고 컨테이너가 너무 좁습니다:', containerWidth);
          return;
        }

        window.adsbygoogle.push({});
      } catch (err) {
        console.error('AdUnit 초기화 실패:', err);
      }
    };

    // DOM이 완전히 로드되고 레이아웃이 계산된 후 광고 초기화
    const timeoutId = setTimeout(initAd, 1000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [layout]);

  if (process.env.NODE_ENV !== 'production') {
    return (
      <div
        className={className}
        style={{
          backgroundColor: '#f0f0f0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: layout === 'display' ? '250px' : '100%',
          minWidth: layout === 'in-article' ? '250px' : 'auto',
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
    width: layout === 'display' ? '250px' : '100%',
    minWidth: layout === 'in-article' ? '250px' : 'auto',
    height: layout === 'display' ? '600px' : '250px',
    backgroundColor: 'transparent',
    overflow: 'hidden',
    ...style,
  };

  const containerStyle: React.CSSProperties = {
    minWidth: layout === 'in-article' ? '250px' : 'auto',
    width: '100%',
    overflow: 'hidden',
  };

  return (
    <div ref={adRef} className={className} style={containerStyle}>
      <ins
        className="adsbygoogle"
        style={adStyle}
        data-ad-client="ca-pub-2091824784796567"
        data-ad-slot={slot}
        data-ad-format={layout === 'in-article' ? 'fluid' : 'fixed'}
        data-full-width-responsive={layout === 'in-article' ? 'true' : 'false'}
      />
    </div>
  );
}
