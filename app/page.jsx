'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  FaBook,
  FaArrowRight,
  FaStar,
  FaCheck,
  FaShieldAlt,
  FaSearch,
  FaBookReader,
  FaUndoAlt,
  FaQuoteLeft,
  FaChevronDown,
  FaChevronUp,
  FaTags,
  FaFire,
  FaLaptopCode,
  FaFlask,
  FaUsers,
  FaAward,
  FaClock,
  FaCrown,
  FaMagic,
  FaAtom,
  FaBrain,
  FaCompass,
} from 'react-icons/fa';

export default function Home() {
  const [books, setBooks] = useState([]);
  const [featuredBooks, setFeaturedBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openFaq, setOpenFaq] = useState(0);

  useEffect(() => {
    fetch('/api/books')
      .then((res) => res.json())
      .then((data) => {
        setBooks(data);
        // Requirement: Top 4 books fetched from server/local data
        setFeaturedBooks(data.slice(0, 4));
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? -1 : index);
  };

  // 3-Step How It Works Guide
  const steps = [
    {
      step: '01',
      title: 'Search & Discover',
      description: 'Explore our rich catalog across Story, Tech, and Science genres with real-time filtering and search.',
      icon: FaSearch,
      glow: 'from-blue-600 to-cyan-500',
    },
    {
      step: '02',
      title: '1-Click Instant Borrow',
      description: 'Borrow any available book in seconds with zero hidden fees. Instant digital access to your reading device.',
      icon: FaBookReader,
      glow: 'from-cyan-500 to-blue-700',
    },
    {
      step: '03',
      title: 'Read & Return Easily',
      description: 'Track your borrowed books on your profile, renew your borrowing time, and return effortlessly.',
      icon: FaUndoAlt,
      glow: 'from-blue-500 to-indigo-600',
    },
  ];

  // Testimonials
  const testimonials = [
    {
      name: 'Sarah Jenkins',
      role: 'Full-Stack Developer',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
      comment: 'BookBorrow has been a game changer for my programming career. Finding "Clean Code" and "You Don\'t Know JS" in one place is fantastic!',
      rating: 5,
      favoriteBook: 'Clean Code',
    },
    {
      name: 'Dr. David Kim',
      role: 'Astrophysics Researcher',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      comment: 'The Science collection is phenomenal! Borrowing Hawking\'s and Dawkins\' books was seamless. The interface is exceptionally intuitive.',
      rating: 5,
      favoriteBook: 'A Brief History of Time',
    },
    {
      name: 'Emily Watson',
      role: 'Literature Enthusiast',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
      comment: 'I love the membership perks and community features. The Midnight Library was the best read of my month. Highly recommend BookBorrow!',
      rating: 5,
      favoriteBook: 'The Midnight Library',
    },
  ];

  // FAQs
  const faqs = [
    {
      question: 'How many books can I borrow at a single time?',
      answer: 'Standard registered members can borrow up to 5 books simultaneously. Once you return a book, your allowance immediately resets.',
    },
    {
      question: 'Is borrowing books completely free on BookBorrow?',
      answer: 'Yes! Standard borrowing from our digital collection is 100% free for all registered users with no hidden costs.',
    },
    {
      question: 'What is the standard borrowing duration for each title?',
      answer: 'Each book can be borrowed for 21 days. If you need more time, you can easily renew the loan directly from your My Profile dashboard.',
    },
    {
      question: 'How do I return a book after reading?',
      answer: 'Navigate to your "My Profile" page, view your list of currently borrowed books, and click the "Return Book" button. The inventory updates automatically.',
    },
  ];

  // Extra Section 1: Genre Explorer
  const genres = [
    {
      name: 'Story & Fiction',
      category: 'Story',
      count: '4 Titles',
      icon: FaBook,
      gradient: 'from-blue-600/30 to-cyan-500/20',
      border: 'border-blue-500/30',
      tags: ['Novels', 'Fantasy', 'Dystopian', 'Bestsellers'],
      desc: 'Immerse yourself in captivating narratives, modern classics, and timeless human journeys.',
    },
    {
      name: 'Tech & Programming',
      category: 'Tech',
      count: '4 Titles',
      icon: FaLaptopCode,
      gradient: 'from-cyan-500/20 to-blue-700/30',
      border: 'border-cyan-400/30',
      tags: ['Clean Code', 'Web Dev', 'Algorithms', 'AI'],
      desc: 'Master cutting-edge software architecture, best engineering practices, and emerging tech.',
    },
    {
      name: 'Science & Cosmos',
      category: 'Science',
      count: '4 Titles',
      icon: FaAtom,
      gradient: 'from-indigo-600/20 to-cyan-600/30',
      border: 'border-indigo-500/30',
      tags: ['Astrophysics', 'Biology', 'Cosmology', 'Space'],
      desc: 'Unlock mysteries of the universe, quantum reality, and human evolutionary history.',
    },
    {
      name: 'Mind & Growth',
      category: 'All',
      count: '12 Titles',
      icon: FaBrain,
      gradient: 'from-blue-600/25 to-indigo-600/20',
      border: 'border-blue-400/30',
      tags: ['Habits', 'Psychology', 'Focus', 'Productivity'],
      desc: 'Transform your daily mental habits and accelerate personal and career excellence.',
    },
  ];

  // Extra Section 2: Live Activity Feed
  const liveActivities = [
    { user: 'Sarah Jenkins', action: 'borrowed', book: 'Clean Code', time: '2 mins ago', badge: 'Tech' },
    { user: 'Dr. David Kim', action: 'borrowed', book: 'A Brief History of Time', time: '5 mins ago', badge: 'Science' },
    { user: 'Elena Rostova', action: 'borrowed', book: 'The Midnight Library', time: '9 mins ago', badge: 'Story' },
    { user: 'Alex Morgan', action: 'returned', book: 'Atomic Habits', time: '14 mins ago', badge: 'Story' },
  ];

  // Extra Section 3: Membership Tiers
  const pricingPlans = [
    {
      name: 'Free Explorer',
      price: '$0',
      period: 'forever',
      description: 'Ideal for casual readers exploring digital literature.',
      features: [
        'Borrow up to 5 books at once',
        'Standard 21-day reading loans',
        'Full access to all genres',
        'Community discussion access',
      ],
      buttonText: 'Get Started Free',
      popular: false,
    },
    {
      name: 'Avid Bookworm',
      price: '$9',
      period: 'per month',
      description: 'Perfect for passionate readers and lifelong learners.',
      features: [
        'Borrow up to 15 books at once',
        'Extended 45-day reading loans',
        'Priority access to new releases',
        'Audiobook digital accompaniment',
        'Offline read pass syncing',
      ],
      buttonText: 'Claim 14-Day Free Pass',
      popular: true,
    },
    {
      name: 'Scholar Pro',
      price: '$19',
      period: 'per month',
      description: 'Designed for researchers, teams, and academic power users.',
      features: [
        'Unlimited simultaneous borrows',
        'No return deadlines / keep forever',
        'Direct author Q&A sessions',
        'High-res annotated PDF exports',
        'Dedicated 24/7 VIP concierge',
      ],
      buttonText: 'Join Scholar Pro',
      popular: false,
    },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-[#030712] text-slate-800 dark:text-slate-100 transition-colors duration-300">
      
      {/* 1. Hero Banner with Futuristic Background Image & Animations */}
      <section className="relative overflow-hidden py-24 sm:py-32 lg:py-36 px-4 sm:px-6 lg:px-8 border-b border-slate-200/80 dark:border-blue-500/20">
        
        {/* Background Image with Cinematic Cosmic Gradient Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-bg.jpg"
            alt="Cosmic Cyber Library Background"
            fill
            priority
            className="object-cover object-center scale-105"
            unoptimized
          />
          {/* Multi-layer gradient overlays to guarantee perfect text contrast */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#030712]/92 via-[#030712]/75 to-[#030712] dark:from-[#030712]/92 dark:via-[#060b1e]/80 dark:to-[#030712]"></div>
          {/* Radiant radial glow in center matching user picture */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,102,255,0.28),transparent_70%)]"></div>
          {/* Subtle grid accent */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(56,189,248,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(56,189,248,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
        </div>

        {/* Floating Glowing Orbs for dynamic animation */}
        <div className="absolute top-1/4 left-1/10 w-72 h-72 bg-blue-600/20 rounded-full blur-3xl pointer-events-none animate-pulse-glow"></div>
        <div className="absolute bottom-1/4 right-1/10 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none animate-pulse-glow" style={{ animationDelay: '2s' }}></div>

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          
          {/* Animated Floating Pill Badge */}
          <div className="inline-flex items-center gap-2.5 bg-[#060b1e]/80 backdrop-blur-xl border border-cyan-400/40 px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold text-cyan-300 mb-8 shadow-[0_0_20px_rgba(56,189,248,0.25)] animate-float">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
            <FaFire className="text-cyan-400 text-sm" />
            <span>Over 5,000+ Readers Borrowing Books Daily</span>
          </div>

          {/* Large "Find Your Next Read" Heading */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-white mb-6 leading-[1.08] drop-shadow-md">
            Find Your Next{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-sky-200 drop-shadow-[0_0_35px_rgba(56,189,248,0.45)]">
              Read
            </span>
          </h1>

          {/* Subtitle Description */}
          <p className="text-lg md:text-xl lg:text-2xl text-slate-300 max-w-3xl mx-auto mb-10 leading-relaxed font-light drop-shadow">
            Experience next-generation digital library borrowing across Story, Tech, and Science. Reserve curated titles instantly with zero fees.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            
            {/* Requirement: "Browse Now" Button leading to the All Books page */}
            <Link
              href="/books"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-extrabold text-base py-4 px-9 rounded-2xl shadow-[0_0_30px_rgba(0,102,255,0.45)] hover:shadow-[0_0_40px_rgba(56,189,248,0.6)] transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0 border border-cyan-300/40"
            >
              <span>Browse Now</span>
              <FaArrowRight className="text-sm group-hover:translate-x-1 transition-transform" />
            </Link>

            <a
              href="#featured-books"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#0a122c]/80 hover:bg-[#132048] text-white font-semibold text-base py-4 px-8 rounded-2xl border border-blue-500/40 hover:border-cyan-400/60 backdrop-blur-md transition-all duration-300 shadow-md transform hover:-translate-y-0.5"
            >
              <span>Featured Books</span>
            </a>
          </div>

          {/* Value Badges with NowX Glassmorphic Style */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-3xl mx-auto mt-16 pt-8 border-t border-blue-500/20 text-center">
            <div className="p-3 rounded-2xl bg-[#060b1e]/50 backdrop-blur-sm border border-blue-500/20">
              <div className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">12+</div>
              <div className="text-xs sm:text-sm text-slate-300 mt-1 font-medium">Curated Titles</div>
            </div>
            <div className="p-3 rounded-2xl bg-[#060b1e]/50 backdrop-blur-sm border border-blue-500/20">
              <div className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">100% Free</div>
              <div className="text-xs sm:text-sm text-slate-300 mt-1 font-medium">Digital Borrowing</div>
            </div>
            <div className="col-span-2 sm:col-span-1 p-3 rounded-2xl bg-[#060b1e]/50 backdrop-blur-sm border border-blue-500/20">
              <div className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">24/7 Access</div>
              <div className="text-xs sm:text-sm text-slate-300 mt-1 font-medium">Read on Any Device</div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Marquee Section with High-Tech Glow */}
      <section className="bg-[#05091a] dark:bg-[#040817] text-white py-4 overflow-hidden border-y border-blue-500/20 shadow-inner">
        <div className="marquee-container flex items-center">
          <div className="animate-marquee flex items-center gap-12 whitespace-nowrap text-sm sm:text-base font-medium">
            {/* Dynamic Items showing required structure: New Arrivals: [Book Name] | Special Discount on Memberships... */}
            {(books.length > 0 ? books.slice(0, 6) : [
              { title: 'The Midnight Library' },
              { title: 'Atomic Habits' },
              { title: 'Clean Code' },
              { title: 'A Brief History of Time' },
            ]).map((book, idx) => (
              <span key={`mq-1-${idx}`} className="inline-flex items-center gap-3">
                <span className="bg-cyan-400/15 border border-cyan-400/30 text-cyan-300 px-2.5 py-0.5 rounded-full text-xs uppercase font-extrabold tracking-wider">
                  New Arrival
                </span>
                <span className="text-slate-300">
                  New Arrivals: <strong className="text-white font-bold">{book.title}</strong>
                </span>
                <span className="text-cyan-400">|</span>
                <span className="text-sky-300 font-semibold flex items-center gap-1.5">
                  <FaTags className="text-xs text-cyan-400" />
                  Special Discount on Memberships: 20% off annual reading passes!
                </span>
                <span className="text-blue-500">✦</span>
              </span>
            ))}

            {/* Repeat exact items for seamless infinite scroll */}
            {(books.length > 0 ? books.slice(0, 6) : [
              { title: 'The Midnight Library' },
              { title: 'Atomic Habits' },
              { title: 'Clean Code' },
              { title: 'A Brief History of Time' },
            ]).map((book, idx) => (
              <span key={`mq-2-${idx}`} className="inline-flex items-center gap-3">
                <span className="bg-cyan-400/15 border border-cyan-400/30 text-cyan-300 px-2.5 py-0.5 rounded-full text-xs uppercase font-extrabold tracking-wider">
                  New Arrival
                </span>
                <span className="text-slate-300">
                  New Arrivals: <strong className="text-white font-bold">{book.title}</strong>
                </span>
                <span className="text-cyan-400">|</span>
                <span className="text-sky-300 font-semibold flex items-center gap-1.5">
                  <FaTags className="text-xs text-cyan-400" />
                  Special Discount on Memberships: 20% off annual reading passes!
                </span>
                <span className="text-blue-500">✦</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Featured Books Section (Top 4 books fetched from server/local data) */}
      <section id="featured-books" className="py-20 lg:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-950/70 border border-blue-200 dark:border-blue-500/30 text-blue-600 dark:text-cyan-300 text-xs uppercase font-bold tracking-widest px-3.5 py-1.5 rounded-full mb-3 shadow-xs">
            <FaCrown className="text-cyan-400" />
            <span>Handpicked Reads</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            Featured Books
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600 dark:text-slate-400">
            Explore the top 4 most popular and highly recommended books selected by our editorial team.
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="bg-white dark:bg-[#080f26]/80 rounded-2xl p-4 shadow-sm border border-slate-200 dark:border-blue-500/20 animate-pulse">
                <div className="bg-slate-200 dark:bg-slate-800 h-64 rounded-xl mb-4"></div>
                <div className="h-5 bg-slate-200 dark:bg-slate-800 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/2 mb-4"></div>
                <div className="h-10 bg-slate-200 dark:bg-slate-800 rounded-lg"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {featuredBooks.map((book) => (
              <div
                key={book.id}
                className="bg-white dark:bg-[#080f26]/85 backdrop-blur-md rounded-2xl shadow-sm hover:shadow-2xl border border-slate-200/80 dark:border-blue-500/20 hover:border-blue-400 dark:hover:border-cyan-400/50 hover:shadow-blue-500/10 dark:hover:shadow-[0_0_30px_rgba(56,189,248,0.2)] overflow-hidden flex flex-col transition-all duration-300 transform hover:-translate-y-2 group"
              >
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
                  <div className="absolute top-3 right-3 bg-slate-900/85 dark:bg-[#060b1e]/90 backdrop-blur-md text-cyan-300 text-xs font-bold px-3 py-1 rounded-full shadow-md border border-cyan-400/30">
                    {book.category}
                  </div>
                </div>

                {/* Book Details */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors">
                      {book.title}
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 mb-2 font-medium">by {book.author}</p>
                    <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed mb-4">
                      {book.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 dark:border-blue-500/20">
                    <div className="flex items-center justify-between mb-3 text-xs">
                      <span className="text-slate-500 dark:text-slate-400">Availability:</span>
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                        {book.available_quantity} copies left
                      </span>
                    </div>

                    {/* View Details Button */}
                    <Link
                      href={`/books/${book.id}`}
                      className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold py-2.5 px-4 rounded-xl text-sm transition-all duration-300 shadow-md shadow-blue-500/20 hover:shadow-cyan-400/30 group-hover:scale-[1.01]"
                    >
                      <span>View Details</span>
                      <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-14 text-center">
          <Link
            href="/books"
            className="inline-flex items-center gap-2 text-blue-600 dark:text-cyan-400 hover:text-blue-700 dark:hover:text-cyan-300 font-bold text-base transition-colors group"
          >
            <span>See All Available Books in Catalog</span>
            <FaArrowRight className="text-sm group-hover:translate-x-1.5 transition-transform" />
          </Link>
        </div>
      </section>

      {/* 4. NEW EXTRA SECTION 1: Explore Trending Genres (Interactive Category Showcase) */}
      <section className="py-20 bg-slate-100/60 dark:bg-[#060b1e]/60 border-y border-slate-200/80 dark:border-blue-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-950/70 border border-blue-200 dark:border-blue-500/30 text-blue-600 dark:text-cyan-300 text-xs uppercase font-bold tracking-widest px-3.5 py-1.5 rounded-full mb-3">
              <FaCompass className="text-cyan-400" />
              <span>Genre Horizons</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
              Explore By Genre
            </h2>
            <p className="mt-3 text-base sm:text-lg text-slate-600 dark:text-slate-400">
              Discover specialized collections tailored to ignite your imagination and technical mastery.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {genres.map((genre, idx) => {
              const Icon = genre.icon;
              return (
                <div
                  key={idx}
                  className={`bg-white dark:bg-[#080f26]/85 backdrop-blur-md rounded-3xl p-6 border ${genre.border} shadow-sm hover:shadow-xl dark:hover:shadow-[0_0_25px_rgba(56,189,248,0.2)] transition-all duration-300 transform hover:-translate-y-2 flex flex-col justify-between group`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${genre.gradient} border border-cyan-400/30 flex items-center justify-center text-cyan-400 text-2xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-md`}>
                        <Icon />
                      </div>
                      <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-100 dark:bg-blue-950/80 text-blue-600 dark:text-cyan-300 border border-blue-500/20">
                        {genre.count}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors mb-2">
                      {genre.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                      {genre.desc}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {genre.tags.map((tag, tIdx) => (
                        <span key={tIdx} className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-[#0a122c] text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-blue-500/20">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <Link
                    href={`/books`}
                    className="inline-flex items-center justify-between w-full pt-3 border-t border-slate-100 dark:border-blue-500/20 text-xs font-bold text-blue-600 dark:text-cyan-400 group-hover:text-blue-700 dark:group-hover:text-cyan-300 transition-colors"
                  >
                    <span>Browse Collection</span>
                    <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. NEW EXTRA SECTION 2: Live Platform Activity & Reader Stats */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Stats Grid */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-950/70 border border-blue-200 dark:border-blue-500/30 text-blue-600 dark:text-cyan-300 text-xs uppercase font-bold tracking-widest px-3.5 py-1.5 rounded-full">
              <FaUsers className="text-cyan-400" />
              <span>Real-Time Impact</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
              A Thriving Community of Lifelong Readers
            </h2>
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
              Every single second, readers around the world are learning new programming languages, exploring cosmic mysteries, and diving into fictional worlds through BookBorrow.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
              <div className="p-4 rounded-2xl bg-white dark:bg-[#080f26]/85 border border-slate-200/80 dark:border-blue-500/20 shadow-sm text-center">
                <div className="text-2xl sm:text-3xl font-black text-blue-600 dark:text-cyan-400">15.2k+</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-semibold">Active Readers</div>
              </div>
              <div className="p-4 rounded-2xl bg-white dark:bg-[#080f26]/85 border border-slate-200/80 dark:border-blue-500/20 shadow-sm text-center">
                <div className="text-2xl sm:text-3xl font-black text-blue-600 dark:text-cyan-400">48.5k+</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-semibold">Books Borrowed</div>
              </div>
              <div className="p-4 rounded-2xl bg-white dark:bg-[#080f26]/85 border border-slate-200/80 dark:border-blue-500/20 shadow-sm text-center">
                <div className="text-2xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-400">99.8%</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-semibold">On-Time Returns</div>
              </div>
              <div className="p-4 rounded-2xl bg-white dark:bg-[#080f26]/85 border border-slate-200/80 dark:border-blue-500/20 shadow-sm text-center">
                <div className="text-2xl sm:text-3xl font-black text-blue-600 dark:text-cyan-400">120+</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-semibold">Partner Hubs</div>
              </div>
            </div>
          </div>

          {/* Right Live Ticker Card */}
          <div className="lg:col-span-5">
            <div className="bg-white dark:bg-[#080f26]/90 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-blue-500/30 shadow-xl dark:shadow-[0_0_35px_rgba(2,132,199,0.15)] relative overflow-hidden">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-blue-500/20 mb-5">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
                  <span className="font-extrabold text-sm text-slate-900 dark:text-white uppercase tracking-wider">
                    Live Borrow Activity
                  </span>
                </div>
                <span className="text-[11px] font-bold text-cyan-400 bg-blue-950/80 px-2.5 py-0.5 rounded-full border border-cyan-400/30">
                  Real-time
                </span>
              </div>

              <div className="space-y-3.5">
                {liveActivities.map((act, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 dark:bg-[#0a122c]/80 border border-slate-100 dark:border-blue-500/20 hover:border-cyan-400/40 transition-all duration-200"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-xs font-bold text-cyan-400">
                        {act.user.charAt(0)}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-900 dark:text-white">
                          {act.user}{' '}
                          <span className={`text-[11px] font-normal ${act.action === 'borrowed' ? 'text-blue-500 dark:text-cyan-400' : 'text-emerald-500'}`}>
                            {act.action}
                          </span>
                        </p>
                        <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400 truncate max-w-[170px] sm:max-w-[210px]">
                          &quot;{act.book}&quot;
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] text-slate-400 dark:text-slate-500 block">
                        {act.time}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-5 pt-4 border-t border-slate-100 dark:border-blue-500/20 text-center">
                <Link
                  href="/books"
                  className="text-xs font-bold text-blue-600 dark:text-cyan-400 hover:underline"
                >
                  Join the reading stream today →
                </Link>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 6. EXTRA SECTION: How BookBorrow Works (3-Step Guide) */}
      <section className="py-20 bg-slate-100/60 dark:bg-[#060b1e]/60 border-y border-slate-200/80 dark:border-blue-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-950/70 border border-blue-200 dark:border-blue-500/30 text-blue-600 dark:text-cyan-300 text-xs uppercase font-bold tracking-widest px-3.5 py-1.5 rounded-full mb-3">
              <FaMagic className="text-cyan-400" />
              <span>Simple & Fast</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
              How BookBorrow Works
            </h2>
            <p className="mt-3 text-base sm:text-lg text-slate-600 dark:text-slate-400">
              Borrowing your favorite book takes less than 60 seconds with our streamlined digital system.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {steps.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.step}
                  className="bg-white dark:bg-[#080f26]/85 backdrop-blur-md rounded-3xl p-8 shadow-sm hover:shadow-xl dark:hover:shadow-[0_0_30px_rgba(56,189,248,0.2)] border border-slate-200/80 dark:border-blue-500/20 transition-all duration-300 relative group flex flex-col justify-between transform hover:-translate-y-2"
                >
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.glow} flex items-center justify-center text-white text-2xl shadow-md group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 border border-cyan-400/40`}>
                        <Icon />
                      </div>
                      <span className="text-4xl font-black text-slate-200 dark:text-slate-800 group-hover:text-blue-500 dark:group-hover:text-cyan-400 transition-colors">
                        {item.step}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                      {item.title}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 dark:border-blue-500/20 flex items-center text-xs font-semibold text-blue-600 dark:text-cyan-400">
                    <span>Step {idx + 1} of 3</span>
                    <FaArrowRight className="ml-2 text-xs opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7. NEW EXTRA SECTION 3: Reader Membership Passes & VIP Perks */}
      <section className="py-20 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-950/70 border border-blue-200 dark:border-blue-500/30 text-blue-600 dark:text-cyan-300 text-xs uppercase font-bold tracking-widest px-3.5 py-1.5 rounded-full mb-3">
            <FaCrown className="text-cyan-400" />
            <span>Reader Passes</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            Choose Your Reading Pass
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600 dark:text-slate-400">
            Start free or upgrade for unlimited simultaneous reads, offline sync, and author masterclasses.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {pricingPlans.map((plan, idx) => (
            <div
              key={idx}
              className={`rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 relative ${
                plan.popular
                  ? 'bg-gradient-to-b from-[#0a153a] to-[#060b1e] border-2 border-cyan-400 shadow-[0_0_40px_rgba(56,189,248,0.3)] transform md:-translate-y-3'
                  : 'bg-white dark:bg-[#080f26]/85 backdrop-blur-md border border-slate-200/80 dark:border-blue-500/20 shadow-sm hover:shadow-xl'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-blue-600 to-cyan-400 text-white text-xs font-black uppercase tracking-wider py-1 px-4 rounded-full shadow-md">
                    Most Popular Pass
                  </span>
                </div>
              )}

              <div>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2">
                  {plan.name}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mb-6">
                  {plan.description}
                </p>

                <div className="flex items-baseline gap-1.5 mb-8">
                  <span className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white">
                    {plan.price}
                  </span>
                  <span className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                    /{plan.period}
                  </span>
                </div>

                <div className="space-y-3 mb-8">
                  {plan.features.map((feature, fIdx) => (
                    <div key={fIdx} className="flex items-center gap-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                      <FaCheck className="text-cyan-400 shrink-0 text-xs" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Link
                  href="/books"
                  className={`w-full inline-flex items-center justify-center gap-2 py-3 px-6 rounded-2xl font-bold text-sm transition-all duration-300 shadow-md ${
                    plan.popular
                      ? 'bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white shadow-cyan-400/30'
                      : 'bg-slate-100 dark:bg-[#0a122c] hover:bg-slate-200 dark:hover:bg-blue-900/40 text-slate-900 dark:text-white border border-slate-200 dark:border-blue-500/30'
                  }`}
                >
                  <span>{plan.buttonText}</span>
                  <FaArrowRight className="text-xs" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. EXTRA SECTION: Reader Reviews & Testimonials */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-200/80 dark:border-blue-500/20">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-950/70 border border-blue-200 dark:border-blue-500/30 text-blue-600 dark:text-cyan-300 text-xs uppercase font-bold tracking-widest px-3.5 py-1.5 rounded-full mb-3">
            <FaStar className="text-amber-400" />
            <span>Community Voices</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            Loved by Readers Everywhere
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600 dark:text-slate-400">
            See what active readers and book enthusiasts are saying about their borrowing experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testi, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-[#080f26]/85 backdrop-blur-md rounded-3xl p-7 shadow-sm hover:shadow-xl dark:hover:shadow-[0_0_25px_rgba(56,189,248,0.2)] border border-slate-200/80 dark:border-blue-500/20 transition-all flex flex-col justify-between relative transform hover:-translate-y-1.5"
            >
              <div>
                <FaQuoteLeft className="text-blue-500/20 dark:text-cyan-400/20 text-3xl mb-4" />
                <div className="flex gap-1 mb-4">
                  {[...Array(testi.rating)].map((_, i) => (
                    <FaStar key={i} className="text-amber-400 text-sm" />
                  ))}
                </div>
                <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed mb-6 italic">
                  &quot;{testi.comment}&quot;
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-blue-500/20 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative w-11 h-11 rounded-full overflow-hidden bg-blue-100 dark:bg-blue-950 border border-cyan-400/40">
                    <Image
                      src={testi.image}
                      alt={testi.name}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white">{testi.name}</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{testi.role}</p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] uppercase font-bold text-blue-600 dark:text-cyan-300 bg-blue-50 dark:bg-blue-950/80 border border-blue-500/20 px-2 py-0.5 rounded-full">
                    {testi.favoriteBook}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 9. EXTRA SECTION: Frequently Asked Questions (FAQ Accordion) */}
      <section className="py-20 bg-slate-100/60 dark:bg-[#060b1e]/60 border-t border-slate-200/80 dark:border-blue-500/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-950/70 border border-blue-200 dark:border-blue-500/30 text-blue-600 dark:text-cyan-300 text-xs uppercase font-bold tracking-widest px-3.5 py-1.5 rounded-full mb-3">
              <span>Have Questions?</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="mt-3 text-base text-slate-600 dark:text-slate-400">
              Everything you need to know about borrowing, memberships, and return policies.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="bg-white dark:bg-[#080f26]/90 backdrop-blur-md rounded-2xl border border-slate-200/80 dark:border-blue-500/20 overflow-hidden shadow-xs transition-all duration-200"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full flex items-center justify-between p-5 text-left font-bold text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-cyan-400 transition-colors focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <span className="text-base sm:text-lg pr-4">{faq.question}</span>
                    <span className="text-blue-600 dark:text-cyan-400 shrink-0">
                      {isOpen ? <FaChevronUp /> : <FaChevronDown />}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-sm text-slate-600 dark:text-slate-300 border-t border-slate-100 dark:border-blue-500/20 leading-relaxed">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 10. Call To Action Banner with Cosmic Glow */}
      <section className="relative overflow-hidden py-20 px-4 sm:px-6 lg:px-8 text-center bg-gradient-to-r from-blue-900 via-[#060b1e] to-blue-950 text-white border-t border-blue-500/20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,102,255,0.3),transparent_70%)] pointer-events-none"></div>

        <div className="max-w-4xl mx-auto relative z-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mb-4">
            Ready to Dive into a New Horizon?
          </h2>
          <p className="text-base sm:text-lg text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            Join our growing reading community today. Explore titles, reserve copies, and start borrowing with zero fees.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/books"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-extrabold text-base py-4 px-8 rounded-2xl shadow-[0_0_25px_rgba(56,189,248,0.4)] transition-all transform hover:-translate-y-0.5 active:translate-y-0 border border-cyan-400/40"
            >
              <span>Explore All Books</span>
              <FaArrowRight className="text-sm" />
            </Link>
            <Link
              href="/register"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#0a122c]/80 hover:bg-[#132048] text-white font-semibold text-base py-4 px-8 rounded-2xl border border-blue-500/40 transition-all backdrop-blur-md"
            >
              <span>Create Free Account</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Marquee Keyframes */}
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          display: flex;
          width: max-content;
          animation: marquee 35s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
