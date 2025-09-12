'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getAllProjects } from '@/lib/projects';

export default function PortfolioPreview() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const projects = getAllProjects().slice(0, 6); // Show first 6 projects

  return (
    <section className="relative py-20 px-6 sm:px-8 lg:px-12 bg-gradient-to-br from-white via-gray-50 to-gray-100 overflow-hidden" ref={ref}>
      {/* Background Design Elements */}
      <div className="absolute inset-0 opacity-25">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full blur-3xl transform -translate-y-1/2" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-gradient-to-r from-pink-100 to-orange-100 rounded-full blur-3xl transform translate-y-1/2" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-4 mb-8">
            <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-gray-300" />
            <span className="text-sm font-medium text-gray-500 uppercase tracking-[0.2em]">Portfolio</span>
            <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-gray-300" />
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light mb-6 text-black leading-tight">
            Selected Work
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6 leading-relaxed">
            A showcase of our latest projects across different industries and disciplines, 
            each crafted with precision and creative excellence
          </p>
          <Link 
            href="/work"
            className="group inline-flex items-center px-4 py-2 bg-white/60 backdrop-blur-sm text-black hover:bg-white/80 transition-all duration-300 font-medium rounded-full border border-white/20 hover:border-white/40 shadow-lg hover:shadow-xl text-sm"
          >
            <span>View All Projects</span>
            <svg 
              className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" 
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
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ 
                duration: 0.8, 
                delay: 0.2 + index * 0.1, 
                ease: "easeOut" 
              }}
            >
              <Link href={`/work/${project.slug}`} className="group block">
                <div className="relative bg-white/40 backdrop-blur-md rounded-2xl p-4 border border-white/10 shadow-sm hover:shadow-md hover:bg-white/50 hover:border-white/20 transition-all duration-700 ease-out h-full">
                  {/* Decorative Elements */}
                  <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-gray-100/50 to-transparent rounded-2xl transform rotate-45 translate-x-6 -translate-y-6" />
                  
                  {/* Project Image */}
                  <div className="relative overflow-hidden rounded-xl mb-4 aspect-[4/3] bg-gray-900">
                    <Image
                      src={project.heroImage}
                      alt={project.title}
                      fill
                      className="object-cover transition-all duration-700 ease-out group-hover:scale-102"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent group-hover:from-black/30 transition-all duration-300" />
                    
                    {/* Category Badge */}
                    <div className="absolute top-3 left-3">
                      <div className="px-2 py-1 bg-black/50 backdrop-blur-sm rounded-full">
                        <span className="text-white/90 text-xs font-medium uppercase tracking-wider">
                          {project.category}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Project Info */}
                  <div className="space-y-2 relative z-10">
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-black transition-colors duration-300 leading-tight">
                      {project.title}
                    </h3>
                    <p className="text-sm text-gray-600 group-hover:text-gray-700 transition-colors duration-300 line-clamp-2 leading-relaxed">
                      {project.description}
                    </p>
                    
                    {/* Decorative Line */}
                    <div className="pt-2">
                      <div className="w-8 h-[2px] bg-gradient-to-r from-gray-300 to-gray-400 group-hover:from-gray-600 group-hover:to-gray-800 transition-all duration-300" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}