'use client';

import { ExtendedRecordMap } from 'notion-types';

export function TableOfContents({
  recordMap,
  onlyHeaders = false,
}: {
  recordMap: ExtendedRecordMap;
  onlyHeaders?: boolean;
}) {
  const blocks = Object.values(recordMap.block);
  const headers = blocks.filter((block) => {
    const value = block.value;
    return (
      value?.type === 'header' || value?.type === 'sub_header' || value?.type === 'sub_sub_header'
    );
  });

  const getHeaderLevel = (type: string) => {
    switch (type) {
      case 'header':
        return 1;
      case 'sub_header':
        return 2;
      case 'sub_sub_header':
        return 3;
      default:
        return 1;
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id.replace(/-/g, ''));
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="space-y-2">
      {headers
        .filter((header) => {
          if (onlyHeaders) {
            return header.value.type === 'sub_header';
          }
          return true;
        })
        .map((header) => {
          const level = getHeaderLevel(header.value.type);
          const text = header.value.properties?.title?.[0]?.[0] || '';
          const cleanText = text.replace(/[\p{Emoji}]/gu, '').trim();
          const id = header.value.id;
          const cleanId = id.replace(/-/g, '');

          return (
            <a
              key={id}
              href={`#${cleanId}`}
              onClick={(e) => handleClick(e, id)}
              className="text-muted-foreground hover:text-foreground block transition-colors"
              style={{ paddingLeft: `${(level - 1) * 1}rem` }}
            >
              {cleanText}
            </a>
          );
        })}
    </div>
  );
}
