'use client';

import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { TableOfContents } from './TableOfContents';
import { ExtendedRecordMap } from 'notion-types';

interface IProps {
  recordMap?: ExtendedRecordMap;
}

export function MobileTableOfContents({ recordMap }: IProps) {
  const [isOpen, setIsOpen] = useState(false);

  return recordMap?.block ? (
    <div className="sticky top-[var(--sticky-top)] z-10 mb-4 md:hidden">
      <div className="mt-2">
        <div className="bg-muted/40 space-y-4 rounded-lg p-1 backdrop-blur-sm">
          <Button
            variant="ghost"
            className="flex w-full items-center justify-between"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span>목차</span>
            <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          </Button>
          {isOpen && (
            <nav className="space-y-3 text-sm">
              <TableOfContents recordMap={recordMap} onlyHeaders />
            </nav>
          )}
        </div>
      </div>
    </div>
  ) : null;
}
