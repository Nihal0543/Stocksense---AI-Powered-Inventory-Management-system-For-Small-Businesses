import { useEffect, useState } from 'react';

export function useDarkMode() {
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    const saved = localStorage.getItem('theme');
    if (saved) return saved === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      root.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      root.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
    }

    const handleSync = () => {
      const current = localStorage.getItem('theme') === 'dark';
      setIsDark(current);
    };

    window.addEventListener('storage', handleSync);
    window.addEventListener('stocksense-theme-change', handleSync);
    return () => {
      window.removeEventListener('storage', handleSync);
      window.removeEventListener('stocksense-theme-change', handleSync);
    };
  }, [isDark]);

  const toggleDarkMode = () => {
    const next = !isDark;
    setIsDark(next);
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('stocksense-theme-change'));
    }
  };

  return [isDark, toggleDarkMode] as const;
}

export default useDarkMode;
