'use client';

import { useEffect, useMemo, useState } from 'react';
import CategorySidebar from '@/components/CategorySidebar';
import BookCard from '@/components/BookCard';
import { FaSearch } from 'react-icons/fa';

export default function AllBooks() {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    fetch('/api/books')
      .then(res => res.json())
      .then(data => {
        setBooks(data);
      });
  }, []);

  const filteredBooks = useMemo(() => {
    let filtered = [...books];

    if (selectedCategory !== 'All') {
      filtered = filtered.filter((book) => book.category === selectedCategory);
    }

    if (searchTerm) {
      filtered = filtered.filter((book) =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  }, [searchTerm, selectedCategory, books]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">All Books</h1>
      
      <div className="mb-8">
        <div className="relative">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search books by title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/4">
          <CategorySidebar
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
        </div>

        <div className="md:w-3/4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBooks.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
          
          {filteredBooks.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No books found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}