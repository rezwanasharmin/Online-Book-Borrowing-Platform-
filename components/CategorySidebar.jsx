'use client';

import { FaBook, FaLaptopCode, FaFlask, FaThLarge } from 'react-icons/fa';

const categories = [
  { name: 'All', icon: FaThLarge },
  { name: 'Story', icon: FaBook },
  { name: 'Tech', icon: FaLaptopCode },
  { name: 'Science', icon: FaFlask },
];

export default function CategorySidebar({ selectedCategory, onCategoryChange }) {
  return (
    <div className="bg-white dark:bg-[#080f26]/85 backdrop-blur-md rounded-2xl shadow-sm border border-slate-200/80 dark:border-blue-500/20 p-6 transition-all duration-300">
      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 pb-3 border-b border-slate-100 dark:border-blue-500/20 flex items-center justify-between">
        <span>Filter by Genre</span>
        <span className="text-xs uppercase tracking-wider text-blue-600 dark:text-cyan-400 font-bold bg-blue-50 dark:bg-blue-950/60 px-2.5 py-0.5 rounded-full border border-blue-500/20">
          Categories
        </span>
      </h3>
      <div className="space-y-2">
        {categories.map((category) => {
          const Icon = category.icon;
          const isSelected = selectedCategory === category.name;
          return (
            <button
              key={category.name}
              type="button"
              onClick={() => onCategoryChange(category.name)}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl font-semibold text-sm transition-all duration-200 ${
                isSelected
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md shadow-blue-500/25 border border-cyan-400/40'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-blue-900/30 hover:text-blue-600 dark:hover:text-cyan-300'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Icon className={isSelected ? 'text-white' : 'text-slate-400 dark:text-slate-500'} />
                <span>{category.name}</span>
              </div>
              {isSelected && (
                <span className="w-2 h-2 rounded-full bg-cyan-300 shadow-[0_0_8px_rgba(56,189,248,0.8)]"></span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}