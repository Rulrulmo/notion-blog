'use client';

import { useEffect } from 'react';

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
  useEffect(() => {
    try {
      if (process.env.NODE_ENV === 'production') {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (err) {
      console.error('AdUnit 로드 실패:', err);
    }
  }, []);

  if (process.env.NODE_ENV !== 'production') {
    return null;
  }

  return (
    <div className={className}>
      <ins
        className="adsbygoogle"
        style={style || { display: 'block' }}
        data-ad-client="ca-pub-2091824784796567"
        data-ad-slot={slot}
        data-ad-format={layout === 'in-article' ? 'fluid' : 'auto'}
        data-full-width-responsive="true"
      />
    </div>
  );
}
