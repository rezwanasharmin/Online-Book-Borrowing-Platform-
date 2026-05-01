import Link from 'next/link';
import { FaFacebook, FaTwitter, FaInstagram, FaEnvelope, FaPhone } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8  justify-items-center">
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold mb-4">Follow Us</h3>
            <div className="flex justify-center md:justify-start space-x-4">
              <a href="#" className="hover:text-blue-400 transition">
                <FaFacebook size={24} />
              </a>
              <a href="#" className="hover:text-blue-400 transition">
                <FaTwitter size={24} />
              </a>
              <a href="#" className="hover:text-pink-500 transition">
                <FaInstagram size={24} />
              </a>
            </div>
          </div>

          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <div className="space-y-2">
              <p className="flex items-center justify-center md:justify-start space-x-2">
                <FaEnvelope />
                <span>support@bookborrow.com</span>
              </p>
              <p className="flex items-center justify-center md:justify-start space-x-2">
                <FaPhone />
                <span>+0 (013) 123-4567</span>
              </p>
            </div>
          </div>

          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover:text-gray-300">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/books" className="hover:text-gray-300">
                  All Books
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-gray-300">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-gray-300">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p>&copy; 2026 BookBorrow. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}