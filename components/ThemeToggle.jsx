'use client';

import { useEffect, useState } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';

export default function ThemeToggle({ className = '' }) {
  const [theme, setTheme] = useState('dark');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    localStorage.setItem('theme', nextTheme);

    if (nextTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    window.dispatchEvent(new Event('themeChange'));
  };

  if (!mounted) {
    return (
      <div className={`w-9 h-9 rounded-xl bg-blue-950/40 border border-blue-500/20 ${className}`} />
    );
  }

  return (
    <button
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
      title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
      className={`relative inline-flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-300 ${
        theme === 'dark'
          ? 'bg-[#0a122c] text-cyan-400 border border-cyan-500/30 hover:border-cyan-400 hover:shadow-[0_0_15px_rgba(56,189,248,0.35)]'
          : 'bg-slate-100 text-amber-500 border border-slate-300 hover:border-amber-400 hover:shadow-md'
      } ${className}`}
    >
      <div className="relative w-5 h-5 flex items-center justify-center transition-transform duration-500 transform">
        {theme === 'dark' ? (
          <FaSun className="text-lg text-amber-300 animate-spin-slow transition-transform hover:scale-110" />
        ) : (
          <FaMoon className="text-lg text-indigo-600 transition-transform hover:scale-110" />
        )}
      </div>
    </button>
  );
}
