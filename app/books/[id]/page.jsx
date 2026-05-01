'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function BookDetails() {
  const params = useParams();
  const id = params?.id || '';
  const router = useRouter();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(Boolean(id));
  const [isAuthenticated] = useState(() => {
    if (typeof window === 'undefined') {
      return false;
    }
    return Boolean(window.localStorage.getItem('bookBorrowAuth'));
  });

  useEffect(() => {
    if (!id) {
      return;
    }

    fetch(`/api/books/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setBook(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [id]);

  const handleBorrow = () => {
    if (!isAuthenticated) {
      toast.error('Please login to borrow books');
      router.push('/login');
      return;
    }

    if (!book) {
      toast.error('Unable to borrow this book');
      return;
    }

    toast.success(`You have borrowed "${book.title}"!`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-700">Book not found</h2>
      </div>
    );
  }

  const imageUrl = book?.image_url?.trim();
  const imageAlt = book?.title?.trim() || 'Book cover';

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2 relative min-h-[400px]">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={imageAlt}
                fill
                loading="eager"
                className="object-cover"
                unoptimized
              />
            ) : (
              <div className="absolute inset-0 bg-gray-100 flex items-center justify-center text-gray-500">
                No cover available
              </div>
            )}
          </div>

          <div className="md:w-1/2 p-8">
            <h1 className="text-3xl font-bold mb-4">{book.title}</h1>
            <p className="text-xl text-gray-600 mb-4">by {book.author}</p>

            <div className="mb-4">
              <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                {book.category}
              </span>
            </div>

            <p className="text-gray-700 mb-6 leading-relaxed">{book.description}</p>

            <div className="mb-6">
              <p className="text-lg font-semibold">
                Available Quantity:
                <span className={`ml-2 ${book.available_quantity > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {book.available_quantity} copies left
                </span>
              </p>
            </div>

            <button
              onClick={handleBorrow}
              className="w-full bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition transform hover:scale-105"
            >
              Borrow This Book
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
