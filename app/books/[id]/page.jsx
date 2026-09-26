'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import Link from 'next/link';
import {
  FaArrowLeft,
  FaBookOpen,
  FaCheckCircle,
  FaExclamationCircle,
  FaShieldAlt,
  FaClock,
} from 'react-icons/fa';

export default function BookDetails() {
  const params = useParams();
  const id = params?.id || '';
  const router = useRouter();

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [borrowed, setBorrowed] = useState(false);
  const [availableQuantity, setAvailableQuantity] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);

  // Requirement: PRIVATE ROUTE - Only logged-in users can view this
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const auth = Boolean(window.localStorage.getItem('bookBorrowAuth'));
      setIsAuthenticated(auth);
      setAuthChecked(true);

      if (!auth) {
        toast.error('Access restricted: Please login to view book details');
        router.push('/login');
        return;
      }
    }
  }, [router]);

  // Fetch book details
  useEffect(() => {
    if (!id) return;

    fetch(`/api/books/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Book not found');
        return res.json();
      })
      .then((data) => {
        setBook(data);
        
        // Check if there is an overridden quantity in localStorage
        let qty = data.available_quantity;
        if (typeof window !== 'undefined') {
          const customStock = window.localStorage.getItem(`bookStock_${data.id}`);
          if (customStock !== null) {
            qty = parseInt(customStock, 10);
          }
          
          // Check if already borrowed by current user
          const currentUserStr = window.localStorage.getItem('bookBorrowUser');
          if (currentUserStr) {
            try {
              const currentUser = JSON.parse(currentUserStr);
              const loansKey = `bookBorrow_loans_${currentUser.email}`;
              const loans = JSON.parse(window.localStorage.getItem(loansKey) || '[]');
              if (loans.some((loan) => loan.bookId === data.id)) {
                setBorrowed(true);
              }
            } catch {}
          }
        }
        
        setAvailableQuantity(qty);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [id]);

  // Requirement: "Borrow This Book" Button
  const handleBorrow = () => {
    const isAuth = typeof window !== 'undefined' && Boolean(window.localStorage.getItem('bookBorrowAuth'));
    if (!isAuth) {
      toast.error('Please login to borrow books');
      router.push('/login');
      return;
    }

    if (!book) {
      toast.error('Unable to process request');
      return;
    }

    if (borrowed) {
      toast('You have already borrowed a copy of this book.', { icon: 'ℹ️' });
      return;
    }

    if (availableQuantity <= 0) {
      toast.error('Sorry, this book is currently out of stock.');
      return;
    }

    const newQty = availableQuantity - 1;
    setAvailableQuantity(newQty);
    setBorrowed(true);

    if (typeof window !== 'undefined') {
      window.localStorage.setItem(`bookStock_${book.id}`, String(newQty));

      const currentUserStr = window.localStorage.getItem('bookBorrowUser');
      if (currentUserStr) {
        try {
          const currentUser = JSON.parse(currentUserStr);
          const loansKey = `bookBorrow_loans_${currentUser.email}`;
          const existingLoans = JSON.parse(window.localStorage.getItem(loansKey) || '[]');
          
          const newLoan = {
            bookId: book.id,
            title: book.title,
            author: book.author,
            category: book.category,
            image_url: book.image_url,
            borrowDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            dueDate: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          };

          existingLoans.push(newLoan);
          window.localStorage.setItem(loansKey, JSON.stringify(existingLoans));
        } catch {}
      }
    }

    toast.success(`Confirmation: You have successfully borrowed "${book.title}"!`);
  };

  if (!authChecked || (loading && isAuthenticated)) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[60vh] bg-slate-50 dark:bg-[#030712]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400 mb-4"></div>
        <p className="text-sm font-medium text-slate-600 dark:text-cyan-300">Loading book details...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[60vh] bg-slate-50 dark:bg-[#030712] text-center px-4">
        <FaExclamationCircle className="text-amber-500 text-4xl mb-3" />
        <h2 className="text-xl font-bold text-slate-800 dark:text-white">Private Route</h2>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Redirecting to login page...</p>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-md mx-auto bg-white dark:bg-[#080f26] p-8 rounded-2xl shadow-sm border border-slate-200 dark:border-blue-500/20">
          <FaBookOpen className="text-slate-400 dark:text-cyan-500 text-4xl mx-auto mb-3" />
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Book Not Found</h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm mt-2 mb-6">
            The book you are looking for does not exist or has been removed.
          </p>
          <Link
            href="/books"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold py-2.5 px-6 rounded-xl transition shadow-md"
          >
            <FaArrowLeft className="text-xs" />
            <span>Back to All Books</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#030712] py-10 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="container mx-auto max-w-6xl">
        
        {/* Back navigation */}
        <div className="mb-6">
          <Link
            href="/books"
            className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 dark:text-cyan-400 hover:text-blue-700 dark:hover:text-cyan-300 transition group"
          >
            <FaArrowLeft className="text-xs group-hover:-translate-x-1 transition-transform" />
            <span>Back to All Books</span>
          </Link>
        </div>

        {/* Book Details Container */}
        {/* Requirement: Visuals - Large Book Cover on the left, text/details on the right */}
        <div className="bg-white dark:bg-[#080f26]/90 backdrop-blur-md rounded-3xl shadow-xl dark:shadow-[0_0_40px_rgba(2,132,199,0.15)] border border-slate-200/80 dark:border-blue-500/25 overflow-hidden">
          <div className="flex flex-col md:flex-row">
            
            {/* Visuals: Large Book Cover on the left */}
            <div className="md:w-1/2 relative min-h-[420px] md:min-h-[560px] bg-slate-100 dark:bg-slate-900/60">
              <Image
                src={book.image_url}
                alt={book.title}
                fill
                loading="eager"
                className="object-cover"
                unoptimized
              />
              <div className="absolute top-4 left-4">
                <span className="bg-[#060b1e]/90 backdrop-blur-md text-cyan-300 text-xs font-extrabold uppercase tracking-wider px-3.5 py-1.5 rounded-full shadow-md border border-cyan-400/30">
                  {book.category}
                </span>
              </div>
            </div>

            {/* Visuals: Text/details on the right */}
            {/* Info: Title, Author, Description, and Available Quantity */}
            <div className="md:w-1/2 p-6 sm:p-10 flex flex-col justify-between">
              <div>
                
                {/* Title */}
                <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
                  {book.title}
                </h1>

                {/* Author */}
                <p className="text-lg text-blue-600 dark:text-cyan-400 font-semibold mt-2 mb-4">
                  by {book.author}
                </p>

                {/* Description */}
                <div className="mb-6">
                  <h3 className="text-xs uppercase font-bold tracking-wider text-slate-400 dark:text-slate-500 mb-2">
                    Synopsis / Overview
                  </h3>
                  <p className="text-slate-700 dark:text-slate-300 text-base leading-relaxed">
                    {book.description}
                  </p>
                </div>

                {/* Available Quantity */}
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#0a122c]/80 border border-slate-100 dark:border-blue-500/20 mb-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs uppercase font-bold tracking-wider text-slate-500 dark:text-slate-400">
                        Availability Status
                      </p>
                      <p className="text-base font-bold text-slate-900 dark:text-white mt-0.5">
                        <span
                          className={`inline-block mr-2 w-2.5 h-2.5 rounded-full ${
                            availableQuantity > 0 ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.7)]' : 'bg-red-500'
                          }`}
                        ></span>
                        <span
                          className={
                            availableQuantity > 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'
                          }
                        >
                          {availableQuantity} copies left
                        </span>
                      </p>
                    </div>

                    <div className="text-right text-xs text-slate-500 dark:text-slate-400 flex flex-col items-end">
                      <span className="flex items-center gap-1 text-slate-600 dark:text-slate-300">
                        <FaClock className="text-blue-500 dark:text-cyan-400" />
                        Loan Duration: 21 Days
                      </span>
                      <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold mt-0.5">
                        Free Digital Access
                      </span>
                    </div>
                  </div>
                </div>

                {/* Additional Perks */}
                <div className="grid grid-cols-2 gap-3 mb-6 text-xs text-slate-600 dark:text-slate-300">
                  <div className="flex items-center gap-2">
                    <FaCheckCircle className="text-blue-500 dark:text-cyan-400 shrink-0" />
                    <span>Instant Digital Loan</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaCheckCircle className="text-blue-500 dark:text-cyan-400 shrink-0" />
                    <span>Renewable Anytime</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaCheckCircle className="text-blue-500 dark:text-cyan-400 shrink-0" />
                    <span>Zero Overdue Fees</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaShieldAlt className="text-blue-500 dark:text-cyan-400 shrink-0" />
                    <span>Verified Edition</span>
                  </div>
                </div>

              </div>

              {/* Requirement: The Action Button - "Borrow This Book" */}
              <div className="pt-4 border-t border-slate-100 dark:border-blue-500/20">
                <button
                  type="button"
                  onClick={handleBorrow}
                  disabled={borrowed || availableQuantity <= 0}
                  className={`w-full py-3.5 px-6 rounded-xl font-bold text-base shadow-lg transition-all flex items-center justify-center gap-2 ${
                    borrowed
                      ? 'bg-emerald-600 text-white cursor-default shadow-emerald-600/30'
                      : availableQuantity <= 0
                      ? 'bg-slate-300 dark:bg-slate-800 text-slate-500 cursor-not-allowed'
                      : 'bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white shadow-blue-500/25 hover:shadow-cyan-400/40 transform hover:-translate-y-0.5 active:translate-y-0'
                  }`}
                >
                  <FaBookOpen />
                  <span>
                    {borrowed
                      ? 'You Have Borrowed This Book'
                      : availableQuantity <= 0
                      ? 'Out of Stock'
                      : 'Borrow This Book'}
                  </span>
                </button>
              </div>

            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
