'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FaBook, FaArrowRight, FaStar, FaCheck, FaShieldAlt } from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

export default function Home() {
  const [books, setBooks] = useState([]);
  const [featuredBooks, setFeaturedBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/books')
      .then(res => res.json())
      .then(data => {
        setBooks(data);
        setFeaturedBooks(data.slice(0, 4));
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-linear-to-b from-purple-50 to-white">
      {/* Hero Banner */}
      <section className="bg-linear-to-r from-purple-600 via-indigo-600 to-purple-700 text-white py-20 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 flex items-center justify-center gap-3">
            <FaBook className="text-yellow-300" />
            Find Your Next Read
          </h1>
          <p className="text-lg md:text-xl mb-8 text-purple-100 max-w-2xl mx-auto">
            Explore a curated collection of books across multiple genres. Borrow, read, and discover your next favorite story today.
          </p>
          <Link
            href="/books"
            className="inline-flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-purple-900 font-bold py-3 px-8 rounded-lg transition transform hover:scale-105"
          >
            Browse Now <FaArrowRight />
          </Link>
        </div>
      </section>

      {/* Marquee Section */}
      <section className="bg-purple-900 text-white py-4 overflow-hidden">
        <div className="flex gap-8 whitespace-nowrap animate-scroll">
          {books.slice(0, 6).map((book, idx) => (
            <span key={idx} className="inline-block text-sm md:text-base">
              🆕 New: <strong>{book.title}</strong>
            </span>
          ))}
          {books.slice(0, 6).map((book, idx) => (
            <span key={`repeat-${idx}`} className="inline-block text-sm md:text-base">
              🆕 New: <strong>{book.title}</strong>
            </span>
          ))}
        </div>
      </section>

      {/* Featured Books Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-purple-900 mb-2 text-center">Featured Collections</h2>
          <p className="text-gray-600 text-center mb-12">Handpicked books perfect for your next adventure</p>
          
          {loading ? (
            <div className="text-center py-12">Loading featured books...</div>
          ) : (
            <Swiper
              modules={[Autoplay, Navigation, Pagination]}
              spaceBetween={20}
              pagination={{ clickable: true }}
              navigation
              autoplay={{ delay: 5000 }}
              breakpoints={{
                640: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 4 },
              }}
              className="pb-12"
            >
              {featuredBooks.map((book) => (
                <SwiperSlide key={book.id}>
                  <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition transform hover:scale-105 h-full flex flex-col">
                    <div className="relative overflow-hidden bg-gray-200 h-64">
                      <Image
                        src={book.image_url}
                        alt={book.title}
                        fill
                        loading="eager"
                        className="object-cover"
                        unoptimized
                      />
                      <div className="absolute top-2 right-2 bg-yellow-400 text-purple-900 px-3 py-1 rounded-full text-sm font-bold">
                        {book.category}
                      </div>
                    </div>
                    <div className="p-4 flex-1 flex flex-col">
                      <h3 className="font-bold text-lg text-gray-900 mb-1 line-clamp-2">{book.title}</h3>
                      <p className="text-sm text-gray-600 mb-2">by {book.author}</p>
                      <p className="text-xs text-gray-500 flex-1 line-clamp-2">{book.description}</p>
                      <div className="mt-4 flex justify-between items-center">
                        <span className="text-sm text-green-800 font-semibold">{book.available_quantity} left</span>
                        <Link
                          href={`/books/${book.id}`}
                          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded text-sm font-semibold transition"
                        >
                          Details
                        </Link>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
      </section>

      {/* Why Choose BookBorrow Section */}
      <section className="bg-linear-to-r from-purple-50 to-blue-50 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-purple-900 mb-12">Why Choose BookBorrow?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
              <FaStar className="text-4xl text-yellow-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-purple-900 mb-3">Vast Collection</h3>
              <p className="text-gray-600">Browse thousands of books across multiple genres and categories.</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
              <FaCheck className="text-4xl text-green-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-purple-900 mb-3">Easy Borrowing</h3>
              <p className="text-gray-600">Borrow books instantly with just a click. No waiting, no hassle.</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
              <FaShieldAlt className="text-4xl text-blue-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-purple-900 mb-3">Secure & Safe</h3>
              <p className="text-gray-600">Your data is protected with industry-leading security standards.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Community Statistics Section */}
      <section className="bg-purple-900 text-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Our Community</h2>
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold text-yellow-400 mb-2">12+</div>
              <p className="text-lg text-purple-100">Books Available</p>
            </div>
            <div>
              <div className="text-5xl font-bold text-yellow-400 mb-2">5K+</div>
              <p className="text-lg text-purple-100">Active Users</p>
            </div>
            <div>
              <div className="text-5xl font-bold text-yellow-400 mb-2">50K+</div>
              <p className="text-lg text-purple-100">Books Borrowed</p>
            </div>
            <div>
              <div className="text-5xl font-bold text-yellow-400 mb-2">98%</div>
              <p className="text-lg text-purple-100">Satisfaction Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-linear-to-r from-indigo-600 to-purple-600 text-white py-16 px-4 text-center">
        <h2 className="text-4xl font-bold mb-6">Ready to Start Reading?</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Join thousands of book lovers and discover your next favorite read today.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link
            href="/books"
            className="bg-yellow-400 hover:bg-yellow-500 text-purple-900 font-bold py-3 px-8 rounded-lg transition transform hover:scale-105"
          >
            Explore All Books
          </Link>
          <Link
            href="/register"
            className="bg-white hover:bg-gray-100 text-purple-900 font-bold py-3 px-8 rounded-lg transition transform hover:scale-105"
          >
            Create Account
          </Link>
        </div>
      </section>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
      `}</style>
    </div>
  );
}
