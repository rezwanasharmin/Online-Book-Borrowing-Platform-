'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaBook, FaHome, FaUser, FaSignOutAlt, FaSignInAlt } from 'react-icons/fa';
import toast from 'react-hot-toast';

const getStoredUser = () => {
  if (typeof window === 'undefined') return null;
  const storedUser = window.localStorage.getItem('bookBorrowUser');
  if (!storedUser) return null;

  try {
    return JSON.parse(storedUser);
  } catch (error) {
    return null;
  }
};

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [session, setSession] = useState(null);
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      setSession(getStoredUser());
    }, 0);
  }, []);

  const handleLogout = async () => {
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem('bookBorrowAuth');
      window.localStorage.removeItem('bookBorrowUser');
    }
    toast.success('Logged out successfully');
    router.push('/');
  };

  return (
    <header className="bg-linear-to-r from-indigo-600 to-purple-600 shadow-lg">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <FaBook className="text-white text-2xl" />
            <span className="text-white font-bold text-xl">BookBorrow</span>
          </Link>

          <div className="hidden md:flex space-x-8">
            <Link href="/" className="text-white hover:text-purple-200 transition">
              Home
            </Link>
            <Link href="/books" className="text-white hover:text-purple-200 transition">
              All Books
            </Link>
            {session && (
              <Link href="/profile" className="text-white hover:text-purple-200 transition">
                My Profile
              </Link>
            )}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {session ? (
              <>
                <span className="text-white">Hi, {session.name}</span>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 transition"
                >
                  <FaSignOutAlt />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="flex items-center space-x-2 bg-green-500 px-4 py-2 rounded-lg hover:bg-green-600 transition"
              >
                <FaSignInAlt />
                <span>Login</span>
              </Link>
            )}
          </div>

          <button
            className="md:hidden text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 space-y-2">
            <Link href="/" className="block text-white py-2">Home</Link>
            <Link href="/books" className="block text-white py-2">All Books</Link>
            {session && (
              <Link href="/profile" className="block text-white py-2">My Profile</Link>
            )}
            {!session && (
              <Link href="/login" className="block text-white py-2">Login</Link>
            )}
          </div>
        )}
      </nav>
    </header>
  );
}