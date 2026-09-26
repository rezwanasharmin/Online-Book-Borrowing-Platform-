'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ProfileEditRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/profile/update');
  }, [router]);

  return (
    <main className="min-h-[60vh] flex flex-col items-center justify-center bg-slate-50">
      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-purple-700 mb-3"></div>
      <p className="text-sm text-gray-500 font-medium">Redirecting to Update Information...</p>
    </main>
  );
}
