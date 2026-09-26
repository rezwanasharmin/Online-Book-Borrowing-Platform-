'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { FaGoogle, FaUser, FaEnvelope, FaImage, FaLock, FaBookOpen } from 'react-icons/fa';

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!name.trim() || !email.trim() || !password) {
      const msg = 'Please fill in all required fields (Name, Email, Password)';
      setError(msg);
      toast.error(msg);
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      const msg = 'Password must be at least 6 characters long';
      setError(msg);
      toast.error(msg);
      setLoading(false);
      return;
    }

    const finalPhotoUrl = photoUrl.trim() || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150';

    try {
      const storedUsers = typeof window !== 'undefined' ? window.localStorage.getItem('bookBorrowUsers') : null;
      const users = storedUsers ? JSON.parse(storedUsers) : [];
      const existingUser = users.find((u) => u.email.toLowerCase() === email.trim().toLowerCase());

      if (existingUser) {
        const msg = 'This email is already registered. Please login instead.';
        setError(msg);
        toast.error(msg);
        setLoading(false);
        return;
      }

      const newUser = {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        photoUrl: finalPhotoUrl,
        password,
      };

      users.push(newUser);
      if (typeof window !== 'undefined') {
        window.localStorage.setItem('bookBorrowUsers', JSON.stringify(users));
      }

      toast.success('Registration successful! Please login to your account.');
      setLoading(false);
      router.push('/login');
    } catch (err) {
      console.error(err);
      const msg = 'Registration failed. Please try again.';
      setError(msg);
      toast.error(msg);
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    try {
      const googleUser = {
        name: 'Google Reader',
        email: 'google.reader@gmail.com',
        photoUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
      };

      if (typeof window !== 'undefined') {
        const storedUsers = window.localStorage.getItem('bookBorrowUsers');
        const users = storedUsers ? JSON.parse(storedUsers) : [];
        if (!users.some((u) => u.email === googleUser.email)) {
          users.push({ ...googleUser, password: 'google-oauth-demo-user' });
          window.localStorage.setItem('bookBorrowUsers', JSON.stringify(users));
        }

        window.localStorage.setItem('bookBorrowAuth', 'true');
        window.localStorage.setItem('bookBorrowUser', JSON.stringify(googleUser));
        window.dispatchEvent(new Event('authChange'));
      }

      toast.success('Successfully authenticated with Google!');
      router.push('/');
    } catch (err) {
      console.error(err);
      toast.error('Google authentication failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-[#030712] py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-md w-full space-y-6 bg-white dark:bg-[#080f26]/90 backdrop-blur-md p-8 sm:p-10 rounded-3xl shadow-xl dark:shadow-[0_0_40px_rgba(2,132,199,0.15)] border border-slate-200 dark:border-blue-500/25">
        
        {/* Header Title */}
        <div className="text-center">
          <div className="inline-flex p-3 bg-blue-50 dark:bg-blue-950/80 border border-blue-200 dark:border-cyan-400/40 text-blue-600 dark:text-cyan-400 rounded-2xl mb-3 shadow-sm">
            <FaBookOpen className="text-2xl" />
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Create Your Account
          </h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            Sign up to borrow books and access your digital library
          </p>
        </div>

        {/* Inline Error Message */}
        {error && (
          <div className="p-3 bg-rose-50 dark:bg-rose-950/60 border-l-4 border-rose-500 rounded-r text-sm text-rose-700 dark:text-rose-300 font-medium">
            {error}
          </div>
        )}

        {/* Registration Form */}
        <form className="space-y-4" onSubmit={handleRegister}>
          {/* Field 1: Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Full Name <span className="text-rose-500">*</span>
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
                placeholder="e.g. John Doe"
              />
            </div>
          </div>

          {/* Field 2: Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Email Address <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 dark:text-cyan-500">
                <FaEnvelope className="text-sm" />
              </div>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-[#0a122c] border border-slate-300 dark:border-blue-500/30 rounded-xl text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-cyan-500 focus:bg-white dark:focus:bg-[#060b1e] transition"
                placeholder="you@example.com"
              />
            </div>
          </div>

          {/* Field 3: Photo-url(link) */}
          <div>
            <label htmlFor="photoUrl" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Photo-url (Link)
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 dark:text-cyan-500">
                <FaImage className="text-sm" />
              </div>
              <input
                id="photoUrl"
                name="photoUrl"
                type="url"
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-[#0a122c] border border-slate-300 dark:border-blue-500/30 rounded-xl text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-cyan-500 focus:bg-white dark:focus:bg-[#060b1e] transition"
                placeholder="https://images.unsplash.com/photo-..."
              />
            </div>
            <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-1">Provide an image URL for your profile photo (optional).</p>
          </div>

          {/* Field 4: Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Password <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 dark:text-cyan-500">
                <FaLock className="text-sm" />
              </div>
              <input
                id="password"
                name="password"
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-[#0a122c] border border-slate-300 dark:border-blue-500/30 rounded-xl text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-cyan-500 focus:bg-white dark:focus:bg-[#060b1e] transition"
                placeholder="At least 6 characters"
              />
            </div>
          </div>

          {/* Register Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-xl text-white font-bold text-sm bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 shadow-md shadow-blue-500/25 hover:shadow-cyan-400/40 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating account...' : 'Register'}
            </button>
          </div>
        </form>

        {/* Divider */}
        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200 dark:border-blue-500/20"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase tracking-wider">
            <span className="px-3 bg-white dark:bg-[#080f26] text-slate-500 dark:text-slate-400 font-semibold">Or continue with</span>
          </div>
        </div>

        {/* Social Login Button (Google only) */}
        <div>
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-3 py-2.5 px-4 border border-slate-300 dark:border-blue-500/30 rounded-xl shadow-xs text-sm font-bold text-slate-700 dark:text-slate-200 bg-white dark:bg-[#0a122c] hover:bg-slate-50 dark:hover:bg-blue-900/30 transition-all"
          >
            <FaGoogle className="text-red-500 text-base" />
            <span>Sign up with Google</span>
          </button>
        </div>

        {/* Link for Login */}
        <div className="text-center pt-2 border-t border-slate-100 dark:border-blue-500/20">
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Already have an account?{' '}
            <Link href="/login" className="text-blue-600 dark:text-cyan-400 hover:underline font-bold">
              Login here
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
}
