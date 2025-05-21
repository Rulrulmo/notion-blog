'use client';

import dynamic from 'next/dynamic';
import { NotionRenderer } from 'react-notion-x';
import 'react-notion-x/src/styles.css';
import 'prismjs/themes/prism-tomorrow.css';
import 'katex/dist/katex.min.css';
import { ExtendedRecordMap } from 'notion-types';
import { useTheme } from 'next-themes';
const Code = dynamic(() => import('react-notion-x/build/third-party/code').then((m) => m.Code));

// const Collection = dynamic(() =>
//   import('react-notion-x/build/third-party/collection').then((m) => m.Collection)
// );

const Equation = dynamic(() =>
  import('react-notion-x/build/third-party/equation').then((m) => m.Equation)
);

const Modal = dynamic(() => import('react-notion-x/build/third-party/modal').then((m) => m.Modal), {
  ssr: false,
});

interface NotionContentProps {
  recordMap?: ExtendedRecordMap;
}

export default function NotionContent({ recordMap }: NotionContentProps) {
  const { theme } = useTheme();
  return (
    <div className="notion-container">
      <NotionRenderer
        recordMap={recordMap || ({} as ExtendedRecordMap)}
        components={{
          Code,
          // Collection,
          Equation,
          Modal,
        }}
        fullPage={false}
        darkMode={theme === 'dark'}
      />
    </div>
  );
}
