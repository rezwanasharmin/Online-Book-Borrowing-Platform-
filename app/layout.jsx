import { Inter } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import 'animate.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'BookBorrow - Modern Digital Library & Book Borrowing Platform',
  description: 'Borrow your favorite books across Story, Tech, and Science online anytime, anywhere.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <Script
          id="theme-initializer"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var saved = localStorage.getItem('theme');
                if (saved === 'light') {
                  document.documentElement.classList.remove('dark');
                } else {
                  document.documentElement.classList.add('dark');
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className={`${inter.className} min-h-screen bg-[#f8fafc] text-slate-900 dark:bg-[#030712] dark:text-slate-100 transition-colors duration-300 antialiased`}>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="grow">
            {children}
          </main>
          <Footer />
        </div>
        <Toaster
          position="top-right"
          toastOptions={{
            className: 'dark:!bg-[#0a122c] dark:!text-white dark:!border dark:!border-cyan-500/30 dark:!shadow-[0_0_20px_rgba(56,189,248,0.2)]',
          }}
        />
      </body>
    </html>
  );
}