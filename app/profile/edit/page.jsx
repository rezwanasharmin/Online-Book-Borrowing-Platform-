'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

const getStoredUser = () => {
  if (typeof window === 'undefined') {
    return null;
  }
  const storedUser = window.localStorage.getItem('bookBorrowUser');
  if (!storedUser) return null;

  try {
    return JSON.parse(storedUser);
  } catch {
    return null;
  }
};

export default function ProfileEditPage() {
  const router = useRouter();
  const storedUser = getStoredUser();
  const [user, setUser] = useState(storedUser);
  const [name, setName] = useState(storedUser?.name || '');
  const [email, setEmail] = useState(storedUser?.email || '');

  const handleSave = (e) => {
    e.preventDefault();

    const updatedUser = { ...user, name, email };
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('bookBorrowUser', JSON.stringify(updatedUser));
    }

    toast.success('Profile updated successfully');
    router.push('/profile');
  };

  if (!user) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold">You are not logged in</h1>
          <p className="mt-4 text-gray-600">Please login to update your profile.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-3xl p-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900">Edit Profile</h1>
          <p className="mt-2 text-gray-600">Update your account details below.</p>
        </div>

        <form className="space-y-6" onSubmit={handleSave}>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full rounded-xl border border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm px-3 py-2"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full rounded-xl border border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm px-3 py-2"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full inline-flex justify-center rounded-xl bg-purple-600 py-3 px-6 text-white font-semibold hover:bg-purple-700 transition"
          >
            Save Changes
          </button>
        </form>
      </div>
    </main>
  );
}
