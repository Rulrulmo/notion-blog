'use client';
import Giscus from '@giscus/react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function GiscusComments() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Giscus
      repo="Rulrulmo/notion-blog-giscus"
      repoId="R_kgDOOlwMow"
      category="Announcements"
      categoryId="DIC_kwDOOlwMo84Cp2ny"
      mapping="pathname"
      strict="0"
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="top"
      theme={theme === 'dark' ? 'dark' : 'light'}
      lang="ko"
    />
  );
}
