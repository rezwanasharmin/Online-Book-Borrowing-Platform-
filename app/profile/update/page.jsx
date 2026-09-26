'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import toast from 'react-hot-toast';
import { FaUser, FaImage, FaArrowLeft, FaCheckCircle, FaUserCircle } from 'react-icons/fa';
// Requirement: Follow BetterAuth documentation
import { authClient } from '@/lib/auth-client';

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

export default function UpdateInformationPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  // Requirement: 2 input fields (image and Name)
  const [image, setImage] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);

  // Private route check
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isAuth = Boolean(window.localStorage.getItem('bookBorrowAuth'));
      const currentUser = getStoredUser();

      if (!isAuth || !currentUser) {
        toast.error('Access restricted: Please login to update information');
        router.push('/login');
        return;
      }

      setUser(currentUser);
      setName(currentUser.name || '');
      setImage(currentUser.image || currentUser.photoUrl || '');
      setAuthChecked(true);
    }
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!name.trim()) {
      toast.error('Name cannot be empty');
      setLoading(false);
      return;
    }

    try {
      // Requirement: Follow BetterAuth documentation: authClient.updateUser({ image, name })
      const result = await authClient.updateUser({
        image: image.trim(),
        name: name.trim(),
      });

      if (result?.error) {
        toast.error(result.error.message || 'Failed to update information');
        setLoading(false);
        return;
      }

      toast.success('Information updated successfully!');
      router.push('/profile');
    } catch (err) {
      console.error(err);
      toast.error('An error occurred while updating information');
      setLoading(false);
    }
  };

  if (!authChecked) {
    return (
      <main className="min-h-[60vh] flex flex-col items-center justify-center bg-slate-50 dark:bg-[#030712]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400 mb-4"></div>
        <p className="text-sm font-medium text-slate-600 dark:text-cyan-300">Verifying session...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-[#030712] py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-xl mx-auto bg-white dark:bg-[#080f26]/90 backdrop-blur-md shadow-xl dark:shadow-[0_0_35px_rgba(2,132,199,0.15)] rounded-3xl p-6 sm:p-10 border border-slate-200/80 dark:border-blue-500/25">
        
        {/* Navigation Back */}
        <div className="mb-6">
          <Link
            href="/profile"
            className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 dark:text-cyan-400 hover:text-blue-700 dark:hover:text-cyan-300 mb-3 transition group"
          >
            <FaArrowLeft className="text-xs group-hover:-translate-x-1 transition-transform" />
            <span>Back to My Profile</span>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Update Information
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Update your profile name and avatar image as per BetterAuth documentation.
          </p>
        </div>

        {/* Live Avatar Preview */}
        <div className="mb-6 p-4 rounded-2xl bg-blue-50/60 dark:bg-[#0a122c]/80 border border-blue-100 dark:border-blue-500/20 flex items-center gap-4">
          <div className="relative w-16 h-16 rounded-full overflow-hidden bg-blue-100 dark:bg-blue-950 border-2 border-blue-300 dark:border-cyan-400/40 shadow-sm shrink-0">
            {image ? (
              <Image
                src={image}
                alt={name || 'Avatar preview'}
                fill
                className="object-cover"
                unoptimized
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-blue-600 dark:text-cyan-400 text-3xl">
                <FaUserCircle />
              </div>
            )}
          </div>
          <div>
            <p className="text-xs uppercase font-bold tracking-wider text-blue-600 dark:text-cyan-400">Avatar Preview</p>
            <p className="text-sm font-semibold text-slate-800 dark:text-white">{name || 'Your Name'}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 truncate max-w-[240px]" title={image || 'No image URL provided'}>
              {image || 'Default placeholder avatar'}
            </p>
          </div>
        </div>

        {/* Requirement: Form with 2 input fields (image and Name) */}
        <form className="space-y-5" onSubmit={handleSubmit}>
          
          {/* Field 1: Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              Name <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 dark:text-cyan-500">
                <FaUser className="text-sm" />
              </div>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-[#0a122c] border border-slate-300 dark:border-blue-500/30 rounded-xl text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-cyan-500 focus:bg-white dark:focus:bg-[#060b1e] transition"
                placeholder="Enter your full name"
              />
            </div>
          </div>

          {/* Field 2: image */}
          <div>
            <label htmlFor="image" className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              image (Image URL)
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 dark:text-cyan-500">
                <FaImage className="text-sm" />
              </div>
              <input
                id="image"
                name="image"
                type="url"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-[#0a122c] border border-slate-300 dark:border-blue-500/30 rounded-xl text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-cyan-500 focus:bg-white dark:focus:bg-[#060b1e] transition"
                placeholder="https://example.com/image.jpg"
              />
            </div>
            <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-1">
              Provide a valid image link for your profile picture.
            </p>
          </div>

          {/* Requirement: An Update Information button */}
          <div className="pt-4 flex flex-col sm:flex-row gap-3">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold py-3 px-6 text-sm shadow-md shadow-blue-500/25 hover:shadow-cyan-400/40 transition-all disabled:opacity-60"
            >
              <FaCheckCircle className="text-xs" />
              <span>{loading ? 'Updating...' : 'Update Information'}</span>
            </button>
            <Link
              href="/profile"
              className="inline-flex items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold py-3 px-6 text-sm transition"
            >
              Cancel
            </Link>
          </div>

        </form>

      </div>
    </main>
  );
}
