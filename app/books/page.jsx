'use client';

import { useEffect, useMemo, useState } from 'react';
import CategorySidebar from '@/components/CategorySidebar';
import BookCard from '@/components/BookCard';
import { FaSearch, FaTimes, FaBookOpen } from 'react-icons/fa';

export default function AllBooks() {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/books')
      .then((res) => res.json())
      .then((data) => {
        setBooks(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  // Filter books by category and search title
  const filteredBooks = useMemo(() => {
    let filtered = [...books];

    if (selectedCategory !== 'All') {
      filtered = filtered.filter((book) => book.category === selectedCategory);
    }

    if (searchTerm.trim()) {
      filtered = filtered.filter((book) =>
        book.title.toLowerCase().includes(searchTerm.trim().toLowerCase())
      );
    }

    return filtered;
  }, [searchTerm, selectedCategory, books]);

  const handleClearSearch = () => {
    setSearchTerm('');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#030712] py-10 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="container mx-auto max-w-7xl">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-500/30 text-blue-600 dark:text-cyan-300 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-3 shadow-xs">
            <FaBookOpen className="text-xs" />
            <span>Digital Library Catalog</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            All Books
          </h1>
          <p className="mt-2 text-base text-slate-600 dark:text-slate-400">
            Browse our complete collection. Filter by genre or search directly by book title.
          </p>
        </div>

        {/* Requirement: Search Bar - A large input at the top to search for books by title */}
        <div className="max-w-3xl mx-auto mb-10">
          <div className="relative shadow-sm hover:shadow-md dark:shadow-blue-500/5 rounded-2xl bg-white dark:bg-[#080f26]/90 border border-slate-200 dark:border-blue-500/30 focus-within:border-blue-500 dark:focus-within:border-cyan-400 focus-within:ring-4 focus-within:ring-blue-500/10 dark:focus-within:ring-cyan-500/20 transition-all">
            <div className="absolute inset-y-0 left-0 pl-4.5 flex items-center pointer-events-none text-blue-600 dark:text-cyan-400">
              <FaSearch className="text-lg sm:text-xl" />
            </div>
            <input
              type="text"
              placeholder="Search books by title... (e.g. Clean Code, Dune, Sapiens)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-12 py-4 sm:py-4.5 text-base sm:text-lg text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 bg-transparent rounded-2xl focus:outline-none"
              aria-label="Search books by title"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={handleClearSearch}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 focus:outline-none"
                aria-label="Clear search input"
              >
                <div className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-xs">
                  <FaTimes />
                </div>
              </button>
            )}
          </div>

          {/* Results Summary Counter */}
          <div className="flex items-center justify-between mt-3 px-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            <span>
              Showing <strong className="text-blue-600 dark:text-cyan-400 font-bold">{filteredBooks.length}</strong> of{' '}
              <strong className="text-slate-800 dark:text-slate-200">{books.length}</strong> books
            </span>
            {selectedCategory !== 'All' && (
              <span className="bg-blue-100 dark:bg-blue-950/80 text-blue-800 dark:text-cyan-300 font-semibold px-2.5 py-0.5 rounded-full text-xs border border-blue-200 dark:border-blue-500/30">
                Category: {selectedCategory}
              </span>
            )}
          </div>
        </div>

        {/* Content Layout: Category Sidebar + Books Grid */}
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Category Sidebar */}
          <div className="lg:w-1/4">
            <div className="sticky top-24">
              <CategorySidebar
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
              />
            </div>
          </div>

          {/* Book Cards Grid */}
          <div className="lg:w-3/4">
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <div key={n} className="bg-white dark:bg-[#080f26]/80 rounded-2xl p-4 shadow-sm border border-slate-200 dark:border-blue-500/20 animate-pulse">
                    <div className="bg-slate-200 dark:bg-slate-800 h-64 rounded-xl mb-4"></div>
                    <div className="h-5 bg-slate-200 dark:bg-slate-800 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/2 mb-4"></div>
                    <div className="h-10 bg-slate-200 dark:bg-slate-800 rounded-lg"></div>
                  </div>
                ))}
              </div>
            ) : filteredBooks.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredBooks.map((book) => (
                  <BookCard key={book.id} book={book} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-white dark:bg-[#080f26]/80 rounded-2xl border border-slate-200 dark:border-blue-500/20 shadow-sm p-8">
                <div className="w-16 h-16 bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-cyan-400 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl border border-blue-500/20">
                  <FaSearch />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">No books found</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto mb-6">
                  We couldn&apos;t find any books matching &quot;{searchTerm}&quot;
                  {selectedCategory !== 'All' ? ` in the ${selectedCategory} category.` : '.'}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('All');
                  }}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold text-sm py-2.5 px-6 rounded-xl transition shadow-md hover:shadow-cyan-500/30"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}