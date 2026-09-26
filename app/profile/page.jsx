'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import {
  FaUserCircle,
  FaEnvelope,
  FaUser,
  FaEdit,
  FaBookOpen,
  FaBook,
  FaUndoAlt,
  FaCheckCircle,
} from 'react-icons/fa';

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Requirement: PRIVATE ROUTE - Only logged-in users can view this
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const auth = Boolean(window.localStorage.getItem('bookBorrowAuth'));
      const storedUser = window.localStorage.getItem('bookBorrowUser');

      if (!auth || !storedUser) {
        toast.error('Access restricted: Please login to view your profile');
        router.push('/login');
        return;
      }

      try {
        const parsed = JSON.parse(storedUser);
        setUser(parsed);
        setIsAuthenticated(true);

        // Load borrowed books for this user
        const loansKey = `bookBorrow_loans_${parsed.email}`;
        const storedLoans = JSON.parse(window.localStorage.getItem(loansKey) || '[]');
        setLoans(storedLoans);
      } catch {
        toast.error('Session error, please login again');
        router.push('/login');
      } finally {
        setLoading(false);
      }
    }
  }, [router]);

  // Handle returning a book
  const handleReturn = (bookId, title) => {
    if (!user) return;

    const loansKey = `bookBorrow_loans_${user.email}`;
    const updatedLoans = loans.filter((l) => l.bookId !== bookId);
    setLoans(updatedLoans);

    if (typeof window !== 'undefined') {
      window.localStorage.setItem(loansKey, JSON.stringify(updatedLoans));

      // Restore stock in localStorage
      const stockKey = `bookStock_${bookId}`;
      const currentStock = window.localStorage.getItem(stockKey);
      if (currentStock !== null) {
        const restored = parseInt(currentStock, 10) + 1;
        window.localStorage.setItem(stockKey, String(restored));
      }
    }

    toast.success(`You have successfully returned "${title}"!`);
  };

  if (loading || !isAuthenticated) {
    return (
      <main className="min-h-[60vh] flex flex-col items-center justify-center bg-slate-50 dark:bg-[#030712]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400 mb-4"></div>
        <p className="text-sm font-medium text-slate-600 dark:text-cyan-300">Checking authentication...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-[#030712] py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Profile Card Header */}
        <div className="bg-white dark:bg-[#080f26]/90 backdrop-blur-md shadow-xl dark:shadow-[0_0_35px_rgba(2,132,199,0.15)] rounded-3xl p-6 sm:p-10 border border-slate-200/80 dark:border-blue-500/25">
          <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6 pb-8 border-b border-slate-100 dark:border-blue-500/20">
            
            <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
              <div className="relative w-24 h-24 rounded-full overflow-hidden bg-blue-50 dark:bg-blue-950/80 border-4 border-blue-200 dark:border-cyan-400/40 shadow-md shrink-0">
                {user.photoUrl ? (
                  <Image
                    src={user.photoUrl}
                    alt={user.name || 'User avatar'}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-blue-600 dark:text-cyan-400 text-5xl">
                    <FaUserCircle />
                  </div>
                )}
              </div>

              <div>
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                    {user.name || 'Member'}
                  </h1>
                  <span className="bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-500/30 text-xs font-bold px-2.5 py-0.5 rounded-full">
                    Active Member
                  </span>
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 flex items-center justify-center sm:justify-start gap-1.5">
                  <FaEnvelope className="text-xs text-blue-500 dark:text-cyan-400" />
                  <span>{user.email}</span>
                </p>
                <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                  Member ID: #BB-{user.email ? user.email.slice(0, 4).toUpperCase() : 'USER'}-982
                </p>
              </div>
            </div>

            <div className="shrink-0">
              <Link
                href="/profile/update"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white px-5 py-2.5 font-bold text-sm shadow-md shadow-blue-500/25 transition-all transform hover:-translate-y-0.5"
              >
                <FaEdit />
                <span>Update Information</span>
              </Link>
            </div>

          </div>

          {/* User Information Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <div className="bg-slate-50 dark:bg-[#0a122c]/80 p-4 rounded-2xl border border-slate-100 dark:border-blue-500/20">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-1.5">
                <FaUser className="text-blue-500 dark:text-cyan-400" />
                <span>Full Name</span>
              </p>
              <p className="text-base font-bold text-slate-800 dark:text-white mt-1 truncate">{user.name || 'N/A'}</p>
            </div>

            <div className="bg-slate-50 dark:bg-[#0a122c]/80 p-4 rounded-2xl border border-slate-100 dark:border-blue-500/20">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-1.5">
                <FaEnvelope className="text-blue-500 dark:text-cyan-400" />
                <span>Email Address</span>
              </p>
              <p className="text-base font-bold text-slate-800 dark:text-white mt-1 truncate" title={user.email}>{user.email || 'N/A'}</p>
            </div>

            <div className="bg-slate-50 dark:bg-[#0a122c]/80 p-4 rounded-2xl border border-slate-100 dark:border-blue-500/20">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-1.5">
                <FaBook className="text-blue-500 dark:text-cyan-400" />
                <span>Borrowed Books</span>
              </p>
              <p className="text-base font-bold text-blue-600 dark:text-cyan-400 mt-1">{loans.length} active loans</p>
            </div>

            <div className="bg-slate-50 dark:bg-[#0a122c]/80 p-4 rounded-2xl border border-slate-100 dark:border-blue-500/20">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-1.5">
                <FaCheckCircle className="text-emerald-500 dark:text-emerald-400" />
                <span>Account Status</span>
              </p>
              <p className="text-base font-bold text-emerald-600 dark:text-emerald-400 mt-1">Verified Reader</p>
            </div>
          </div>
        </div>

        {/* Borrowed Books Section */}
        <div className="bg-white dark:bg-[#080f26]/90 backdrop-blur-md shadow-xl dark:shadow-[0_0_35px_rgba(2,132,199,0.15)] rounded-3xl p-6 sm:p-10 border border-slate-200/80 dark:border-blue-500/25">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-blue-500/20 mb-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                <FaBookOpen className="text-blue-500 dark:text-cyan-400" />
                <span>My Borrowed Books ({loans.length})</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                Books you currently have borrowed from the library.
              </p>
            </div>
            
            <Link
              href="/books"
              className="text-xs sm:text-sm font-bold text-blue-600 dark:text-cyan-400 hover:text-blue-700 dark:hover:text-cyan-300 transition"
            >
              Browse More Books →
            </Link>
          </div>

          {loans.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {loans.map((loan) => (
                <div
                  key={loan.bookId}
                  className="flex gap-4 p-4 rounded-2xl border border-slate-100 dark:border-blue-500/20 bg-slate-50/70 dark:bg-[#0a122c]/60 hover:shadow-md transition-shadow"
                >
                  <div className="relative w-20 h-28 rounded-xl overflow-hidden bg-slate-200 dark:bg-slate-800 shrink-0">
                    <Image
                      src={loan.image_url}
                      alt={loan.title}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                  
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 dark:text-cyan-300 bg-blue-100 dark:bg-blue-950/80 border border-blue-500/20 px-2 py-0.5 rounded">
                        {loan.category}
                      </span>
                      <h3 className="font-bold text-slate-900 dark:text-white text-sm mt-1 line-clamp-1">
                        {loan.title}
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400">by {loan.author}</p>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 space-y-0.5">
                        <p>Borrowed: <strong>{loan.borrowDate}</strong></p>
                        <p className="text-amber-600 dark:text-amber-400 font-semibold">Due: {loan.dueDate}</p>
                      </div>
                    </div>

                    <div className="mt-2 pt-2 border-t border-slate-200/60 dark:border-blue-500/20 flex items-center justify-between">
                      <Link
                        href={`/books/${loan.bookId}`}
                        className="text-xs text-blue-600 dark:text-cyan-400 hover:underline font-semibold"
                      >
                        View Details
                      </Link>
                      <button
                        type="button"
                        onClick={() => handleReturn(loan.bookId, loan.title)}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-600 dark:text-rose-400 hover:text-rose-700 bg-rose-50 dark:bg-rose-950/40 border border-rose-500/20 px-3 py-1 rounded-lg transition"
                      >
                        <FaUndoAlt className="text-[10px]" />
                        <span>Return Book</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-slate-50 dark:bg-[#0a122c]/40 rounded-2xl border border-dashed border-slate-200 dark:border-blue-500/20 p-8">
              <FaBookOpen className="text-slate-300 dark:text-slate-600 text-4xl mx-auto mb-3" />
              <h3 className="text-base font-bold text-slate-700 dark:text-slate-300">No books currently borrowed</h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-sm mx-auto mt-1 mb-5">
                Explore our catalog across Story, Tech, and Science, and borrow books with a single click.
              </p>
              <Link
                href="/books"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold text-sm py-2 px-5 rounded-xl transition shadow-sm"
              >
                Browse Books Catalog
              </Link>
            </div>
          )}

        </div>

      </div>
    </main>
  );
}
