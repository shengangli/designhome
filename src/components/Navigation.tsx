'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => pathname === path;
  const isDarkPage = pathname === '/work' || pathname.startsWith('/work/') || pathname === '/contact';
  
  // Determine text colors based on scroll state and page type
  const getTextColor = (isActiveLink: boolean) => {
    if (scrolled) {
      // When scrolled, always use dark colors (same as before)
      return isActiveLink ? 'text-black' : 'text-gray-600 hover:text-black';
    } else {
      // When not scrolled, use white on dark pages, black on light pages
      if (isDarkPage) {
        return isActiveLink ? 'text-white' : 'text-gray-200 hover:text-white';
      } else {
        return isActiveLink ? 'text-black' : 'text-gray-600 hover:text-black';
      }
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-white bg-opacity-95 backdrop-blur-sm shadow-sm' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className={`text-2xl font-light transition-colors duration-200 ${
            scrolled 
              ? 'text-black hover:text-gray-600' 
              : isDarkPage 
                ? 'text-white hover:text-gray-200' 
                : 'text-black hover:text-gray-600'
          }`}>
            dustin studio
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              href="/"
              className={`text-sm font-medium transition-colors duration-200 ${getTextColor(isActive('/'))}`}
            >
              Home
            </Link>
            <Link 
              href="/work"
              className={`text-sm font-medium transition-colors duration-200 ${getTextColor(isActive('/work') || pathname.startsWith('/work/'))}`}
            >
              Work
            </Link>
            <Link 
              href="#pricing-calculator"
              className={`text-sm font-medium transition-colors duration-200 ${getTextColor(isActive('#pricing-calculator'))}`}
            >
              Get Price
            </Link>
            <Link 
              href="/contact"
              className={`text-sm font-medium transition-colors duration-200 ${getTextColor(isActive('/contact'))}`}
            >
              Contact
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`md:hidden inline-flex items-center justify-center p-2 rounded-md transition-colors duration-200 focus:outline-none ${
              scrolled 
                ? 'text-gray-600 hover:text-black focus:text-black' 
                : isDarkPage 
                  ? 'text-gray-200 hover:text-white focus:text-white' 
                  : 'text-gray-600 hover:text-black focus:text-black'
            }`}
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            {!isOpen ? (
              <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            ) : (
              <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
        } overflow-hidden`}>
          <div className="px-2 pt-2 pb-6 space-y-1 bg-white rounded-lg shadow-lg mt-2">
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className={`block px-3 py-2 text-base font-medium transition-colors duration-200 ${
                isActive('/') 
                  ? 'text-black bg-gray-50' 
                  : 'text-gray-600 hover:text-black hover:bg-gray-50'
              }`}
            >
              Home
            </Link>
            <Link
              href="/work"
              onClick={() => setIsOpen(false)}
              className={`block px-3 py-2 text-base font-medium transition-colors duration-200 ${
                isActive('/work') || pathname.startsWith('/work/') 
                  ? 'text-black bg-gray-50' 
                  : 'text-gray-600 hover:text-black hover:bg-gray-50'
              }`}
            >
              Work
            </Link>
            <Link
              href="#pricing-calculator"
              onClick={() => setIsOpen(false)}
              className={`block px-3 py-2 text-base font-medium transition-colors duration-200 ${
                isActive('#pricing-calculator') 
                  ? 'text-black bg-gray-50' 
                  : 'text-gray-600 hover:text-black hover:bg-gray-50'
              }`}
            >
              Get Price
            </Link>
            <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
              className={`block px-3 py-2 text-base font-medium transition-colors duration-200 ${
                isActive('/contact') 
                  ? 'text-black bg-gray-50' 
                  : 'text-gray-600 hover:text-black hover:bg-gray-50'
              }`}
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}