import { ExtendedRecordMap } from 'notion-types';
import { TableOfContents } from './TableOfContents';

interface IProps {
  recordMap?: ExtendedRecordMap;
}

export function PcTableOfContents({ recordMap }: IProps) {
  return (
    <div className="sticky top-[var(--sticky-top)]">
      <div className="bg-muted/40 space-y-4 rounded-lg p-6 backdrop-blur-sm">
        <h3 className="text-lg font-semibold">목차</h3>
        <nav className="space-y-3 text-sm">
          {recordMap?.block && <TableOfContents recordMap={recordMap} />}
        </nav>
      </div>
    </div>
  );
}
