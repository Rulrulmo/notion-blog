import Script from 'next/script';

export function GoogleAdSense() {
  if (process.env.NODE_ENV !== 'production') {
    return null;
  }

  return (
    <>
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2091824784796567"
        strategy="lazyOnload"
        crossOrigin="anonymous"
      />
    </>
  );
}
