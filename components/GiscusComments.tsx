'use client';
import Giscus from '@giscus/react';
import { useTheme } from 'next-themes';
import { useMounted } from '@/lib/useMounted';

export function GiscusComments() {
  const { resolvedTheme } = useTheme();
  const mounted = useMounted();

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
      theme={resolvedTheme === 'dark' ? 'dark' : 'light'}
      lang="ko"
    />
  );
}
