'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';

const pillars = [
  {
    title: "World-Class Design Talent",
    description: "We connect you with Japan's exceptional designers who blend minimalism with functionality",
    image: "/images/pillars/ashes-sitoula-c-B3L8NkDa4-unsplash.jpg",
    alt: "Design tools and Japanese minimalist elements"
  },
  {
    title: "Quality Without Compromise", 
    description: "Not just beautiful designs or just clean code - we deliver both through rigorous quality control",
    image: "/images/pillars/tim-schmidbauer-E8F-reiR14w-unsplash.jpg",
    alt: "Code review and quality assurance processes"
  },
  {
    title: "Global Market Ready",
    description: "Native support for Japanese, Chinese, and English markets with built-in SEO optimization",
    image: "/images/pillars/shubham-dhage-gC_aoAjQl2Q-unsplash.jpg",
    alt: "Global connectivity with multiple language support"
  }
];

export default function ThreePillars() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative py-32 px-6 sm:px-8 lg:px-12 bg-gradient-to-br from-gray-50 via-white to-gray-100 overflow-hidden" ref={ref}>
      {/* Background Design Elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full blur-3xl transform -translate-y-1/2" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-gradient-to-r from-orange-100 to-pink-100 rounded-full blur-3xl transform translate-y-1/2" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-24"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-4 mb-8">
            <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-gray-300" />
            <span className="text-sm font-medium text-gray-500 uppercase tracking-[0.2em]">Foundation</span>
            <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-gray-300" />
          </div>
          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light mb-8 text-black leading-tight">
            Three Pillars of Excellence
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We use AI to make it affordale for our clients, but we have core principles that drives the quality of our work.
          </p>
        </motion.div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
          {pillars.map((pillar, index) => (
            <motion.div
              key={index}
              className="group relative"
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ 
                duration: 0.8, 
                delay: 0.3 + index * 0.15, 
                ease: "easeOut" 
              }}
            >
              {/* Card Container */}
              <div className="relative bg-white/40 backdrop-blur-md rounded-2xl p-8 border border-white/10 shadow-sm hover:shadow-md hover:bg-white/50 hover:border-white/20 transition-all duration-700 ease-out h-full">
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-gray-100/50 to-transparent rounded-2xl transform rotate-45 translate-x-8 -translate-y-8" />
                <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-gray-100/30 to-transparent rounded-full transform -translate-x-4 translate-y-4" />
                {/* Image Section */}
                <div className="relative mb-8">
                  <div className="relative w-full h-48 mx-auto mb-6 overflow-hidden rounded-xl">
                    <Image
                      src={pillar.image}
                      alt={pillar.alt}
                      fill
                      className="object-cover filter grayscale brightness-95 contrast-110 group-hover:grayscale-0 group-hover:brightness-100 group-hover:contrast-105 transition-all duration-700 ease-out group-hover:scale-102"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent group-hover:from-black/30 group-hover:via-transparent transition-all duration-700 ease-out" />
                    
                    {/* Decorative Frame */}
                    <div className="absolute inset-3 border border-white/15 rounded-lg group-hover:border-white/25 transition-all duration-700 ease-out" />
                    
                    {/* Index Number */}
                    <div className="absolute top-4 left-4 w-12 h-12 bg-white/8 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 group-hover:bg-white/12 group-hover:border-white/30 transition-all duration-700 ease-out">
                      <span className="text-white font-light text-lg">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                    </div>
                    
                    {/* Category Label */}
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="inline-block px-4 py-2 bg-black/50 backdrop-blur-sm rounded-full">
                        <span className="text-white/90 text-sm font-medium uppercase tracking-wider">
                          {index === 0 ? 'Design Excellence' : index === 1 ? 'Quality Assurance' : 'Global Reach'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Content Section */}
                <div className="relative z-10 text-center">
                  <h3 className="text-2xl font-medium mb-4 text-gray-800 leading-tight group-hover:text-gray-900 transition-colors duration-700 ease-out">
                    {pillar.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed text-lg group-hover:text-gray-700 transition-colors duration-700 ease-out">
                    {pillar.description}
                  </p>
                  
                  {/* Decorative Line */}
                  <div className="mt-6 mx-auto w-8 h-[1px] bg-gradient-to-r from-gray-200 to-gray-300 group-hover:w-12 group-hover:from-gray-400 group-hover:to-gray-500 transition-all duration-700 ease-out" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}