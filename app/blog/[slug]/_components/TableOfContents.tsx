'use client';

import { Block, ExtendedRecordMap } from 'notion-types';
import { getBlockValue } from 'notion-utils';

export function TableOfContents({
  recordMap,
  onlyHeaders = false,
}: {
  recordMap: ExtendedRecordMap;
  onlyHeaders?: boolean;
}) {
  const headers = Object.values(recordMap.block)
    .map((block) => getBlockValue(block.value))
    .filter(
      (block): block is Block =>
        block?.type === 'header' || block?.type === 'sub_header' || block?.type === 'sub_sub_header'
    );

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

  // onlyHeaders면 H2만 보여주되, H2가 없는 글은 전체 소제목을 보여준다
  const subHeaders = headers.filter((header) => header.type === 'sub_header');
  const visibleHeaders = onlyHeaders && subHeaders.length ? subHeaders : headers;

  return (
    <div className="space-y-2">
      {visibleHeaders.map((header) => {
        const level = getHeaderLevel(header.type);
        const text = header.properties?.title?.[0]?.[0] || '';
        const cleanText = text.replace(/[\p{Emoji}]/gu, '').trim();
        const id = header.id;
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
