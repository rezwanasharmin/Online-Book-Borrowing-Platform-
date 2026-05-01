import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'BookBorrow - Online Book Borrowing Platform',
  description: 'Borrow your favorite books online',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="grow">
              {children}
            </main>
            <Footer />
          </div>
          <Toaster position="top-right" />
        </body>
      </html>
    );
  }