import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import DarkModeToggle from '../components/DarkModeToggle';
import LanguageToggle from '../components/LanguageToggle';
import { useLanguage } from '../context/LanguageContext';

export const MainLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [userName, setUserName] = useState('Store Manager');
  const [loading, setLoading] = useState(true);
  const { t } = useLanguage();

  useEffect(() => {
    const token = localStorage.getItem('stocksense_token');
    const userStr = localStorage.getItem('stocksense_user');
    
    if (!token) {
      navigate('/login');
    } else {
      if (userStr) {
        try {
          const user = JSON.parse(userStr);
          setUserName(user.name || 'Store Manager');
        } catch {
          // ignore
        }
      }
      setLoading(false);
    }
  }, [navigate, location]);

  if (loading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-950">
        <div className="flex flex-col items-center space-y-4">
          <div className="h-10 w-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm font-medium">Securing session...</p>
        </div>
      </div>
    );
  }

  // Get Page Titles dynamically based on pathname and language
  const getPageHeader = () => {
    const path = location.pathname;
    if (path === '/') return { title: t('headerDashTitle'), subtitle: t('headerDashSubtitle') };
    if (path === '/inventory') return { title: t('headerInvTitle'), subtitle: t('headerInvSubtitle') };
    if (path === '/forecast') return { title: t('headerForecastTitle'), subtitle: t('headerForecastSubtitle') };
    if (path === '/recommendations') return { title: t('headerRecTitle'), subtitle: t('headerRecSubtitle') };
    if (path === '/simulator') return { title: t('headerSimTitle'), subtitle: t('headerSimSubtitle') };
    if (path === '/chat') return { title: t('headerChatTitle'), subtitle: t('headerChatSubtitle') };
    if (path === '/settings') return { title: t('headerSettingsTitle'), subtitle: t('headerSettingsSubtitle') };
    return { title: t('appName'), subtitle: t('appTagline') };
  };

  const header = getPageHeader();

  return (
    <div className="flex min-h-screen bg-zinc-50 dark:bg-zinc-950">
      {/* Sidebar Navigation */}
      <Sidebar userName={userName} />

      {/* Main Content Pane */}
      <div className="flex-1 flex flex-col min-w-0 md:pl-0 pt-16 md:pt-0">
        {/* Top Header Panel */}
        <header className="flex items-center justify-between p-4 md:p-6 border-b border-zinc-200/80 dark:border-zinc-800/40 bg-white/70 dark:bg-zinc-900/60 backdrop-blur-md sticky top-0 z-20 transition-colors">
          <div>
            <h1 className="text-xl md:text-2xl font-extrabold tracking-tight text-zinc-950 dark:text-white">
              {header.title}
            </h1>
            <p className="text-xs md:text-sm text-zinc-500 dark:text-zinc-400 mt-0.5 max-w-2xl">
              {header.subtitle}
            </p>
          </div>
          <div className="flex items-center space-x-2 md:space-x-3">
            <LanguageToggle />
            <DarkModeToggle />
          </div>
        </header>

        {/* Page Inner Container */}
        <main className="flex-1 p-4 md:p-8 max-w-[1600px] w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
