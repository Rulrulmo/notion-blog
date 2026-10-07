'use client';

import { useTheme } from 'next-themes';

export default function ThemeSwitch() {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
      className="rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
      aria-label="테마 전환"
    >
      <span className="dark:hidden">☀️</span>
      <span className="hidden dark:inline">🌙</span>
    </button>
  );
}
