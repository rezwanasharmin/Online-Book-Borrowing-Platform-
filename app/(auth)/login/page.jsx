'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { FaGoogle, FaEnvelope, FaLock, FaBookOpen } from 'react-icons/fa';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!email.trim() || !password) {
      const msg = 'Please enter both email and password';
      setError(msg);
      toast.error(msg);
      setLoading(false);
      return;
    }

    try {
      const storedUsers = typeof window !== 'undefined' ? window.localStorage.getItem('bookBorrowUsers') : null;
      const users = storedUsers ? JSON.parse(storedUsers) : [];
      const user = users.find(
        (u) => u.email.toLowerCase() === email.trim().toLowerCase() && u.password === password
      );

      // If login fails -> show error with toast / error message in form
      if (!user) {
        const msg = 'Invalid email or password. Please check your credentials and try again.';
        setError(msg);
        toast.error(msg);
        setLoading(false);
        return;
      }

      // If user logins successfully -> set session and navigate to Home page
      if (typeof window !== 'undefined') {
        window.localStorage.setItem('bookBorrowAuth', 'true');
        window.localStorage.setItem(
          'bookBorrowUser',
          JSON.stringify({
            name: user.name,
            email: user.email,
            photoUrl: user.photoUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
          })
        );
        window.dispatchEvent(new Event('authChange'));
      }

      toast.success(`Welcome back, ${user.name}!`);
      setLoading(false);
      router.push('/');
    } catch (err) {
      console.error(err);
      const msg = 'Login failed. Please try again.';
      setError(msg);
      toast.error(msg);
      setLoading(false);
    }
  };

  // Requirement: Social Login Button (Google only) - on clicking authenticate and navigate to Home
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
        
        {/* Title for Login */}
        <div className="text-center">
          <div className="inline-flex p-3 bg-blue-50 dark:bg-blue-950/80 border border-blue-200 dark:border-cyan-400/40 text-blue-600 dark:text-cyan-400 rounded-2xl mb-3 shadow-sm">
            <FaBookOpen className="text-2xl" />
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Login to Your Account
          </h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            Welcome back! Please sign in to borrow books
          </p>
        </div>

        {/* Inline Error Message */}
        {error && (
          <div className="p-3 bg-rose-50 dark:bg-rose-950/60 border-l-4 border-rose-500 rounded-r text-sm text-rose-700 dark:text-rose-300 font-medium">
            {error}
          </div>
        )}

        {/* Form with Email, Password, Login button */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Email field */}
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

          {/* Password field */}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-[#0a122c] border border-slate-300 dark:border-blue-500/30 rounded-xl text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-cyan-500 focus:bg-white dark:focus:bg-[#060b1e] transition"
                placeholder="••••••••"
              />
            </div>
          </div>

          {/* Login Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-xl text-white font-bold text-sm bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 shadow-md shadow-blue-500/25 hover:shadow-cyan-400/40 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? 'Logging in...' : 'Login'}
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
            <span>Sign in with Google</span>
          </button>
        </div>

        {/* Link for Register */}
        <div className="text-center pt-2 border-t border-slate-100 dark:border-blue-500/20">
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Don&apos;t have an account?{' '}
            <Link href="/register" className="text-blue-600 dark:text-cyan-400 hover:underline font-bold">
              Register here
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
}
