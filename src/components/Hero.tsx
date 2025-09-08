'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 sm:px-8 lg:px-12 overflow-hidden bg-gradient-to-br from-white via-gray-50 to-gray-100">
      {/* Background Design Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 right-1/3 w-80 h-80 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-gradient-to-r from-orange-100 to-pink-100 rounded-full blur-3xl" />
      </div>

      {/* Decorative Lines */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gray-400 to-transparent transform -rotate-12" />
        <div className="absolute top-1/3 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gray-300 to-transparent transform rotate-12" />
      </div>

      <div className="relative max-w-6xl mx-auto text-center z-10">
        {/* Small label above main heading */}
        <motion.div 
          className="inline-flex items-center gap-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="w-8 h-[1px] bg-gradient-to-r from-transparent to-gray-300" />
          <span className="text-sm font-medium text-gray-500 uppercase tracking-[0.2em]">Digital Studio</span>
          <div className="w-8 h-[1px] bg-gradient-to-l from-transparent to-gray-300" />
        </motion.div>

        <motion.h1 
          className="text-5xl sm:text-7xl lg:text-8xl xl:text-9xl font-extralight leading-[0.85] tracking-tight mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
        >
          <span className="block text-black mb-2">Design</span>
          <span className="block text-gray-300 text-lg sm:text-2xl lg:text-3xl font-thin tracking-[0.3em] my-4">•••</span>
          <span className="block text-black mb-2">Develop</span>
          <span className="block text-gray-300 text-lg sm:text-2xl lg:text-3xl font-thin tracking-[0.3em] my-4">•••</span>
          <span className="block text-black">Deploy</span>
        </motion.h1>
        
        <motion.p 
          className="text-xl sm:text-2xl lg:text-3xl text-gray-500 max-w-4xl mx-auto mb-20 font-light leading-relaxed tracking-wide"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          Hard to bridge design to product? <br /> -We handle everything at the lowest price.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        >
          <Link 
            href="/work"
            className="group relative inline-flex items-center px-8 py-4 bg-black/90 backdrop-blur-sm text-white rounded-full hover:bg-black transition-all duration-300 text-lg font-medium border border-black/20 hover:border-black/40 shadow-lg hover:shadow-xl"
          >
            <span className="relative z-10">View Portfolio</span>
            <svg 
              className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300 relative z-10" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M17 8l4 4m0 0l-4 4m4-4H3" 
              />
            </svg>
            {/* Subtle highlight effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}