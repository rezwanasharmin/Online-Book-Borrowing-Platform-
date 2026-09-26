import Link from 'next/link';
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaGithub,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
} from 'react-icons/fa';

export default function Footer() {
  const socialLinks = [
    { name: 'Facebook', icon: FaFacebookF, href: 'https://facebook.com', color: 'hover:bg-blue-600 hover:text-white hover:border-blue-500' },
    { name: 'Twitter', icon: FaTwitter, href: 'https://twitter.com', color: 'hover:bg-sky-500 hover:text-white hover:border-sky-400' },
    { name: 'Instagram', icon: FaInstagram, href: 'https://instagram.com', color: 'hover:bg-pink-600 hover:text-white hover:border-pink-500' },
    { name: 'LinkedIn', icon: FaLinkedinIn, href: 'https://linkedin.com', color: 'hover:bg-blue-700 hover:text-white hover:border-blue-600' },
    { name: 'GitHub', icon: FaGithub, href: 'https://github.com', color: 'hover:bg-cyan-600 hover:text-white hover:border-cyan-500' },
  ];

  return (
    <footer className="bg-slate-950 dark:bg-[#030712] text-slate-300 mt-auto border-t border-slate-800 dark:border-blue-500/20 transition-colors duration-300">
      <div className="container mx-auto px-4 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Brand & About */}
          <div className="space-y-4">
            <Link href="/" className="inline-flex items-center space-x-3 text-white group">
              <div className="relative w-9 h-9 flex items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 shadow-md shadow-blue-500/30 border border-cyan-400/40">
                <svg
                  className="w-5 h-5 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 22L3 7L6 3H18L21 7L12 22Z"
                    fill="url(#footShieldGrad)"
                    stroke="rgba(56,189,248,0.8)"
                    strokeWidth="1.2"
                  />
                  <path
                    d="M12 18L6.5 7.5H17.5L12 18Z"
                    fill="white"
                    fillOpacity="0.9"
                  />
                  <path
                    d="M12 14L8.5 7.5H15.5L12 14Z"
                    fill="#0066FF"
                  />
                  <defs>
                    <linearGradient id="footShieldGrad" x1="3" y1="3" x2="21" y2="22" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#0066FF" />
                      <stop offset="0.5" stopColor="#0284c7" />
                      <stop offset="1" stopColor="#00d2ff" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <span className="font-extrabold text-2xl tracking-tight text-white">
                Book<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Borrow</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed">
              Your gateway to endless knowledge. Explore, discover, and borrow your next favorite read from our curated digital collection anytime, anywhere.
            </p>
            {/* Social Media Links */}
            <div>
              <p className="text-xs uppercase tracking-wider text-slate-400 font-semibold mb-3">Connect With Us</p>
              <div className="flex flex-wrap gap-2.5">
                {socialLinks.map((item) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={item.name}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={item.name}
                      className={`w-9 h-9 rounded-xl bg-slate-900 dark:bg-[#0a122c] border border-slate-800 dark:border-blue-500/20 flex items-center justify-center text-slate-400 transition-all duration-200 transform hover:-translate-y-0.5 hover:shadow-lg ${item.color}`}
                    >
                      <Icon className="text-sm" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div>
            <h3 className="text-white text-base font-bold uppercase tracking-wider mb-4 border-l-4 border-blue-500 pl-3">
              Explore
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="hover:text-cyan-400 transition-colors inline-block">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/books" className="hover:text-cyan-400 transition-colors inline-block">
                  All Books
                </Link>
              </li>
              <li>
                <Link href="/profile" className="hover:text-cyan-400 transition-colors inline-block">
                  My Profile
                </Link>
              </li>
              <li>
                <Link href="/books" className="hover:text-cyan-400 transition-colors inline-block">
                  Featured Books
                </Link>
              </li>
            </ul>
          </div>

          {/* Book Categories */}
          <div>
            <h3 className="text-white text-base font-bold uppercase tracking-wider mb-4 border-l-4 border-cyan-400 pl-3">
              Categories
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/books" className="hover:text-cyan-400 transition-colors inline-block">
                  Story & Fiction
                </Link>
              </li>
              <li>
                <Link href="/books" className="hover:text-cyan-400 transition-colors inline-block">
                  Technology & Programming
                </Link>
              </li>
              <li>
                <Link href="/books" className="hover:text-cyan-400 transition-colors inline-block">
                  Science & Discovery
                </Link>
              </li>
              <li>
                <Link href="/books" className="hover:text-cyan-400 transition-colors inline-block">
                  New Arrivals
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Us Section */}
          <div>
            <h3 className="text-white text-base font-bold uppercase tracking-wider mb-4 border-l-4 border-blue-400 pl-3">
              Contact Us
            </h3>
            <div className="space-y-3 text-sm text-slate-400">
              <div className="flex items-start space-x-3">
                <FaMapMarkerAlt className="text-cyan-400 mt-1 shrink-0" />
                <span>124 Library Avenue, Knowledge Park, NY 10001</span>
              </div>
              <div className="flex items-center space-x-3">
                <FaEnvelope className="text-cyan-400 shrink-0" />
                <a href="mailto:support@bookborrow.com" className="hover:text-white transition-colors">
                  support@bookborrow.com
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <FaPhoneAlt className="text-cyan-400 shrink-0" />
                <a href="tel:+100131234567" className="hover:text-white transition-colors">
                  +0 (013) 123-4567
                </a>
              </div>
              <div className="pt-2 text-xs text-slate-500">
                Support Hours: Mon - Fri, 9:00 AM - 6:00 PM EST
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-900 dark:border-blue-950 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} BookBorrow. All rights reserved.</p>
          <div className="flex space-x-6">
            <Link href="/privacy" className="hover:text-slate-400 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-slate-400 transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}