import Link from 'next/link';
import Image from 'next/image';
import { FaArrowRight } from 'react-icons/fa';

export default function BookCard({ book }) {
  return (
    <div className="bg-white dark:bg-[#080f26]/85 backdrop-blur-md rounded-2xl shadow-sm hover:shadow-2xl border border-slate-200/80 dark:border-blue-500/20 hover:border-blue-400 dark:hover:border-cyan-400/50 hover:shadow-blue-500/10 dark:hover:shadow-[0_0_30px_rgba(56,189,248,0.2)] overflow-hidden flex flex-col transition-all duration-300 transform hover:-translate-y-1.5 group">
      
      {/* Book Image */}
      <div className="relative h-64 w-full bg-slate-100 dark:bg-slate-900/60 overflow-hidden">
        <Image
          src={book.image_url}
          alt={book.title}
          fill
          loading="eager"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          unoptimized
        />
        <div className="absolute top-3 right-3 bg-blue-950/80 dark:bg-[#060b1e]/90 backdrop-blur-md text-cyan-300 text-xs font-bold px-3 py-1 rounded-full shadow-md border border-cyan-400/30">
          {book.category}
        </div>
      </div>

      {/* Book Information */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Book Title */}
          <h3 className="text-lg font-bold text-slate-900 dark:text-white line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors" title={book.title}>
            {book.title}
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 mb-2 font-medium">by {book.author}</p>
          <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed mb-4">
            {book.description}
          </p>
        </div>

        <div className="pt-3 border-t border-slate-100 dark:border-blue-500/20">
          <div className="flex items-center justify-between mb-3 text-xs">
            <span className="text-slate-500 dark:text-slate-400">Available:</span>
            <span
              className={`font-semibold px-2 py-0.5 rounded-full border ${
                book.available_quantity > 0
                  ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500/20'
                  : 'text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 border-rose-500/20'
              }`}
            >
              {book.available_quantity} copies left
            </span>
          </div>

          {/* Requirement: "Details" Button - Navigates to the specific Book Details page */}
          <Link
            href={`/books/${book.id}`}
            className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold py-2.5 px-4 rounded-xl text-sm transition-all duration-300 shadow-md shadow-blue-500/20 hover:shadow-cyan-400/30 group-hover:scale-[1.01]"
          >
            <span>Details</span>
            <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}