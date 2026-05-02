'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

const getStoredUser = () => {
  if (typeof window === 'undefined') return null;
  const storedUser = window.localStorage.getItem('bookBorrowUser');
  if (!storedUser) return null;

  try {
    return JSON.parse(storedUser);
  } catch {
    return null;
  }
};

export default function ProfilePage() {
  const [user] = useState(getStoredUser);

  if (!user) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold">You are not logged in</h1>
          <p className="mt-4 text-gray-600">Please login to view your profile.</p>
          <Link href="/login" className="mt-6 inline-flex bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition">
            Go to Login
          </Link>
        </div>
      </main>
    );
  }

  const userEntries = Object.entries(user || {});

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-3xl p-8">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900">My Profile</h1>
          <p className="mt-2 text-gray-700">Manage your BookBorrow account information.</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-4">
            {userEntries.map(([key, value]) => (
              <div key={key}>
                <h2 className="text-lg font-semibold text-gray-900">
                  {key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}
                </h2>
                <p className="text-gray-800">{String(value)}</p>
              </div>
            ))}
          </div>

          <div className="rounded-3xl bg-purple-700 text-white p-6 flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-bold">Welcome back!</h2>
              <p className="mt-3 text-purple-200">Keep your account details up-to-date and borrow your favorite books quickly.</p>
            </div>
            <Link href="/profile/edit" className="mt-6 inline-flex items-center justify-center rounded-full bg-white text-purple-700 px-5 py-3 font-semibold hover:bg-gray-100 transition">
              Edit Profile
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
