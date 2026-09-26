'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { FaSignOutAlt, FaSignInAlt, FaBars, FaTimes, FaUserCircle } from 'react-icons/fa';
import toast from 'react-hot-toast';
import ThemeToggle from '@/components/ThemeToggle';

const getStoredUser = () => {
  if (typeof window === 'undefined') return null;
  const storedUser = window.localStorage.getItem('bookBorrowUser');
  if (!storedUser) return null;

  try {
    return JSON.parse(storedUser);
  } catch {
    return null;
  }
};

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [session, setSession] = useState(null);
  const router = useRouter();
  const pathname = usePathname();

  const syncUser = useCallback(() => {
    setSession(getStoredUser());
  }, []);

  useEffect(() => {
    syncUser();

    const handleAuthChange = () => {
      syncUser();
    };

    window.addEventListener('storage', handleAuthChange);
    window.addEventListener('authChange', handleAuthChange);

    return () => {
      window.removeEventListener('storage', handleAuthChange);
      window.removeEventListener('authChange', handleAuthChange);
    };
  }, [syncUser, pathname]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem('bookBorrowAuth');
      window.localStorage.removeItem('bookBorrowUser');
      window.dispatchEvent(new Event('authChange'));
    }
    setSession(null);
    toast.success('Logged out successfully');
    router.push('/');
  };

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'All Books', href: '/books' },
    { label: 'My Profile', href: '/profile' },
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/85 dark:bg-[#060b1e]/85 border-b border-slate-200/80 dark:border-blue-500/20 shadow-xs dark:shadow-[0_4px_25px_rgba(2,132,199,0.12)] transition-colors duration-300">
      <nav className="container mx-auto px-4 py-3.5">
        <div className="flex items-center justify-between">
          
          {/* Left: Website Logo (links to Home) with NowX-style glowing 3D shield icon */}
          <div className="flex items-center">
            <Link
              href="/"
              className="flex items-center space-x-3 group"
            >
              {/* Custom SVG logo inspired by NowX futuristic shield */}
              <div className="relative w-10 h-10 flex items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-900 shadow-md shadow-blue-500/30 group-hover:shadow-blue-400/50 group-hover:scale-105 transition-all duration-300 border border-cyan-400/40">
                <svg
                  className="w-6 h-6 text-white drop-shadow-[0_0_8px_rgba(56,189,248,0.8)]"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 22L3 7L6 3H18L21 7L12 22Z"
                    fill="url(#shieldGrad)"
                    stroke="rgba(56,189,248,0.8)"
                    strokeWidth="1.2"
                  />
                  <path
                    d="M12 18L6.5 7.5H17.5L12 18Z"
                    fill="white"
                    fillOpacity="0.9"
                  />
                  <path
                    d="M12 14L8.5 7.5H15.5L12 14Z"
                    fill="#0066FF"
                  />
                  <defs>
                    <linearGradient id="shieldGrad" x1="3" y1="3" x2="21" y2="22" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#0066FF" />
                      <stop offset="0.5" stopColor="#0284c7" />
                      <stop offset="1" stopColor="#00d2ff" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              <div className="flex flex-col">
                <span className="font-extrabold text-2xl tracking-tight text-slate-900 dark:text-white flex items-center">
                  Book<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-400 dark:from-cyan-400 dark:to-blue-500">Borrow</span>
                </span>
                <span className="text-[10px] tracking-wider uppercase font-semibold text-slate-400 dark:text-cyan-400/80 -mt-1 hidden sm:block">
                  Digital Library
                </span>
              </div>
            </Link>
          </div>

          {/* Center: Navigation links for Home, All Books, and My Profile */}
          <div className="hidden md:flex items-center space-x-1.5 p-1 rounded-xl bg-slate-100/80 dark:bg-[#0a122c]/80 border border-slate-200/80 dark:border-blue-500/20">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30 dark:bg-gradient-to-r dark:from-blue-600 dark:to-cyan-600'
                      : 'text-slate-600 hover:text-blue-600 hover:bg-slate-200/60 dark:text-slate-300 dark:hover:text-cyan-300 dark:hover:bg-blue-900/30'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Right: Theme Toggle & Conditional Auth */}
          <div className="hidden md:flex items-center space-x-3">
            {/* Theme Toggle (Light / Dark Mood) */}
            <ThemeToggle />

            {session ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2.5 bg-slate-100 dark:bg-[#0a122c] pl-1.5 pr-4 py-1.5 rounded-full border border-slate-200 dark:border-blue-500/30 shadow-xs">
                  {session.photoUrl ? (
                    <div className="relative w-7 h-7 rounded-full overflow-hidden shrink-0 border border-cyan-400/40">
                      <Image
                        src={session.photoUrl}
                        alt={session.name || 'User'}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                  ) : (
                    <FaUserCircle className="text-cyan-500 dark:text-cyan-400 text-xl ml-1" />
                  )}
                  <span className="text-slate-800 dark:text-white text-sm font-semibold max-w-[130px] truncate" title={session.name || 'User'}>
                    {session.name || 'User'}
                  </span>
                </div>

                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 bg-red-500/10 hover:bg-red-500 text-red-600 hover:text-white border border-red-500/20 text-sm font-semibold px-4 py-2 rounded-xl transition-all shadow-xs duration-200"
                >
                  <FaSignOutAlt className="text-xs" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="flex items-center space-x-2.5 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white text-sm font-bold px-5 py-2.5 rounded-xl transition-all shadow-lg shadow-blue-500/25 hover:shadow-cyan-400/40 hover:scale-[1.02] active:scale-[0.98] border border-cyan-400/30"
              >
                <FaSignInAlt className="text-sm" />
                <span>Login</span>
              </Link>
            )}
          </div>

          {/* Mobile hamburger button + Theme toggle */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle className="scale-90" />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-slate-700 dark:text-slate-200 p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-[#0a122c] border border-slate-200 dark:border-blue-500/20 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-3 pt-3 border-t border-slate-200 dark:border-blue-500/20 space-y-2 pb-2">
            <div className="space-y-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`block px-3 py-2 rounded-xl text-base font-semibold transition ${
                      isActive
                        ? 'bg-blue-600 text-white dark:bg-gradient-to-r dark:from-blue-600 dark:to-cyan-600'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#0a122c]'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>

            <div className="pt-3 border-t border-slate-200 dark:border-blue-500/20">
              {session ? (
                <div className="space-y-3 px-2">
                  <div className="flex items-center space-x-2.5 text-slate-800 dark:text-white">
                    {session.photoUrl ? (
                      <div className="relative w-8 h-8 rounded-full overflow-hidden shrink-0 border border-cyan-400/40">
                        <Image
                          src={session.photoUrl}
                          alt={session.name || 'User'}
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      </div>
                    ) : (
                      <FaUserCircle className="text-cyan-400 text-2xl" />
                    )}
                    <span className="font-semibold text-sm">
                      Signed in as <strong>{session.name || 'User'}</strong>
                    </span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center space-x-2 bg-red-500 hover:bg-red-600 text-white py-2.5 px-4 rounded-xl font-semibold transition shadow-sm"
                  >
                    <FaSignOutAlt />
                    <span>Logout</span>
                  </button>
                </div>
              ) : (
                <Link
                  href="/login"
                  className="flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold py-2.5 px-4 rounded-xl transition shadow-lg shadow-blue-500/25"
                >
                  <FaSignInAlt />
                  <span>Login</span>
                </Link>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}