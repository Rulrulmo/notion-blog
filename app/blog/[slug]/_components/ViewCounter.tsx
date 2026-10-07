'use client';

import { Eye } from 'lucide-react';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export function ViewCounter() {
  const pathname = usePathname();
  const [viewCount, setViewCount] = useState<number>();

  useEffect(() => {
    fetch(`/api/views?pathname=${encodeURIComponent(pathname)}`, { method: 'POST' })
      .then((response) => (response.ok ? response.json() : undefined))
      .then((data) => setViewCount(data?.viewCount))
      .catch(() => {});
  }, [pathname]);

  if (viewCount === undefined) {
    return null;
  }

  return (
    <div className="flex items-center gap-1">
      <Eye className="h-4 w-4" />
      <span>{viewCount} views</span>
    </div>
  );
}
