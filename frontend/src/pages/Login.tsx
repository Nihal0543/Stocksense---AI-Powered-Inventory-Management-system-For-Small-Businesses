import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { LogIn, UserPlus, AlertCircle, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import LanguageToggle from '../components/LanguageToggle';
import DarkModeToggle from '../components/DarkModeToggle';

export const Login: React.FC = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { t } = useLanguage();

  useEffect(() => {
    // If token exists, direct to home
    if (localStorage.getItem('stocksense_token')) {
      navigate('/');
    }
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isRegister) {
        // Register flow
        await api.register({ name, email, password });
        // Auto login after registration
        const formData = new FormData();
        formData.append('username', email);
        formData.append('password', password);
        const loginRes = await api.login(formData);
        
        localStorage.setItem('stocksense_token', loginRes.access_token);
        localStorage.setItem('stocksense_user', JSON.stringify({ name, email }));
        navigate('/');
      } else {
        // Login flow
        const formData = new FormData();
        formData.append('username', email);
        formData.append('password', password);
        const loginRes = await api.login(formData);
        
        localStorage.setItem('stocksense_token', loginRes.access_token);
        localStorage.setItem('stocksense_user', JSON.stringify({ name: email.split('@')[0], email }));
        navigate('/');
      }
    } catch (err: any) {
      setError(err.message || 'Operation failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-screen flex flex-col items-center justify-center bg-zinc-50 dark:bg-zinc-950 px-4 relative overflow-hidden transition-colors duration-300">
      {/* Top right quick controls */}
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6 flex items-center space-x-2 z-20">
        <LanguageToggle />
        <DarkModeToggle />
      </div>

      {/* Decorative Glow Elements */}
      <div className="absolute top-10 left-10 w-72 h-72 rounded-full bg-emerald-500/10 blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-teal-500/10 blur-[120px] pointer-events-none"></div>

      <div className="w-full max-w-md glass-panel p-8 rounded-3xl border border-white/40 dark:border-zinc-800/60 shadow-glass-light dark:shadow-glass-dark relative z-10">
        <div className="flex flex-col items-center mb-8 text-center">
          <div className="h-12 w-12 rounded-2xl bg-emerald-600 flex items-center justify-center text-white font-extrabold text-2xl shadow-lg shadow-emerald-500/30 mb-3">
            S
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
            {isRegister ? t('registerWelcome') : t('loginWelcome')}
          </h2>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-2 max-w-xs leading-relaxed">
            {isRegister ? t('registerSubtitle') : t('loginSubtitle')}
          </p>
        </div>

        {error && (
          <div className="bg-red-500/10 dark:bg-red-500/5 text-red-600 dark:text-red-400 border border-red-500/20 p-4 rounded-xl text-sm mb-6 space-y-2">
            <div className="flex items-start space-x-2">
              <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
              <div className="flex-1 text-xs leading-relaxed font-medium">
                {error}
              </div>
            </div>
          </div>
        )}

        {/* Demo Credentials Box */}
        <div className="mb-6 p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-between text-xs">
          <div>
            <span className="font-semibold text-emerald-700 dark:text-emerald-400 block flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              {t('demoManagerBtn')}:
            </span>
            <span className="text-zinc-500 dark:text-zinc-400 font-mono text-[11px]">manager@retailstore.com / password123</span>
          </div>
          <button
            type="button"
            onClick={() => {
              setEmail('manager@retailstore.com');
              setPassword('password123');
              setError('');
            }}
            className="px-3 py-1.5 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-500 transition text-[11px] cursor-pointer shadow-sm"
          >
            Auto-Fill
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegister && (
            <div>
              <label className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1.5">
                {t('nameLabel')}
              </label>
              <input
                type="text"
                required
                className="w-full glass-input"
                placeholder="Ramesh Sharma"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1.5">
              {t('emailLabel')}
            </label>
            <input
              type="email"
              required
              className="w-full glass-input"
              placeholder="manager@retailstore.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1.5">
              {t('passwordLabel')}
            </label>
            <input
              type="password"
              required
              className="w-full glass-input"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-3 px-4 rounded-xl flex items-center justify-center space-x-2 shadow-lg shadow-emerald-600/25 transition-all duration-150 disabled:opacity-50 mt-6 cursor-pointer"
          >
            {loading ? (
              <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : isRegister ? (
              <>
                <UserPlus size={18} />
                <span>{t('signUpBtn')}</span>
              </>
            ) : (
              <>
                <LogIn size={18} />
                <span>{t('signInBtn')}</span>
              </>
            )}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-zinc-200 dark:border-zinc-800 text-center">
          <button
            onClick={() => {
              setIsRegister(!isRegister);
              setError('');
            }}
            className="text-xs sm:text-sm font-semibold text-emerald-600 dark:text-emerald-400 hover:underline cursor-pointer"
          >
            {isRegister
              ? t('alreadyHaveAccountLink')
              : t('createAccountLink')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
