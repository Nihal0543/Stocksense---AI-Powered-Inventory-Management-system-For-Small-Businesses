import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useDarkMode } from '../hooks/useDarkMode';

export const DarkModeToggle: React.FC<{ className?: string }> = ({ className = '' }) => {
  const [isDark, toggleDarkMode] = useDarkMode();

  return (
    <button
      onClick={toggleDarkMode}
      className={`p-2 rounded-xl bg-white/70 dark:bg-zinc-900/70 hover:bg-white dark:hover:bg-zinc-800 border border-zinc-200/80 dark:border-zinc-800 text-zinc-600 dark:text-zinc-300 transition-all duration-200 shadow-sm flex items-center justify-center cursor-pointer select-none ${className}`}
      aria-label="Toggle Dark Mode"
      title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
    >
      {isDark ? (
        <Sun className="h-4 w-4 text-amber-400 transition-transform hover:rotate-45" />
      ) : (
        <Moon className="h-4 w-4 text-indigo-600 transition-transform hover:-rotate-12" />
      )}
    </button>
  );
};

export default DarkModeToggle;
