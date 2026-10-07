import React from 'react';
import { Languages } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const LanguageToggle: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      className={`relative inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold
        bg-white/70 dark:bg-zinc-900/70 hover:bg-white dark:hover:bg-zinc-800
        border border-zinc-200/80 dark:border-zinc-800
        text-zinc-700 dark:text-zinc-200 shadow-sm
        transition-all duration-200 cursor-pointer select-none ${className}`}
      aria-label="Toggle language between English and Hindi"
      title={language === 'en' ? 'हिन्दी में बदलें (Switch to Hindi)' : 'Switch to English'}
    >
      <Languages className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
      <span className="flex items-center gap-1">
        <span className={language === 'en' ? 'text-emerald-600 dark:text-emerald-400 font-bold' : 'text-zinc-400'}>
          EN
        </span>
        <span className="text-zinc-300 dark:text-zinc-600">/</span>
        <span className={language === 'hi' ? 'text-emerald-600 dark:text-emerald-400 font-bold font-["Noto_Sans_Devanagari"]' : 'text-zinc-400 font-["Noto_Sans_Devanagari"]'}>
          हिन्दी
        </span>
      </span>
    </button>
  );
};

export default LanguageToggle;
