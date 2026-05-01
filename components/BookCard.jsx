import Link from 'next/link';
import Image from 'next/image';

export default function BookCard({ book }) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="relative h-64">
        <Image
          src={book.image_url}
          alt={book.title}
          fill
          loading="eager"
          className="object-cover"
          unoptimized
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2 line-clamp-2">{book.title}</h3>
        <p className="text-gray-600 text-sm mb-2">by {book.author}</p>
        <p className="text-green-600 text-sm mb-4">
          Available: {book.available_quantity} copies
        </p>
        <Link
          href={`/books/${book.id}`}
          className="block text-center bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}