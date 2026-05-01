'use client';

import { FaBook, FaLaptopCode, FaFlask } from 'react-icons/fa';

const categories = [
  { name: 'All', icon: FaBook },
  { name: 'Story', icon: FaBook },
  { name: 'Tech', icon: FaLaptopCode },
  { name: 'Science', icon: FaFlask },
];

export default function CategorySidebar({ selectedCategory, onCategoryChange }) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">Categories</h3>
      <div className="space-y-2">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <button
              key={category.name}
              onClick={() => onCategoryChange(category.name)}
              className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg transition ${
                selectedCategory === category.name
                  ? 'bg-purple-600 text-white'
                  : 'hover:bg-gray-100'
              }`}
            >
              <Icon />
              <span>{category.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}