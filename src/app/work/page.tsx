import Image from 'next/image';
import Link from 'next/link';
import { getAllProjects } from '@/lib/projects';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Work | dustin studio',
  description: 'Explore our portfolio of creative projects spanning web design, development, and branding.',
  openGraph: {
    title: 'Work | dustin studio',
    description: 'Explore our portfolio of creative projects spanning web design, development, and branding.',
  },
};

export default function WorkPage() {
  const projects = getAllProjects();
  const categories = [...new Set(projects.map(project => project.category))];

  return (
    <main className="min-h-screen py-24 px-6 sm:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light mb-6">
            Our Work
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            A collection of projects that showcase our commitment to exceptional design, 
            innovative development, and strategic thinking.
          </p>
        </div>

        {/* Categories Filter (Future enhancement) */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          <button className="px-6 py-2 bg-black text-white rounded-full text-sm font-medium">
            All Projects
          </button>
          {categories.map((category) => (
            <button 
              key={category}
              className="px-6 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors duration-200"
            >
              {category}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {projects.map((project) => (
            <div key={project.slug} className="group">
              <Link href={`/work/${project.slug}`}>
                {/* Project Image */}
                <div className="relative overflow-hidden rounded-lg mb-6 aspect-[4/3] bg-gray-100">
                  <Image
                    src={project.heroImage}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-102"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                  
                  {/* Overlay Content */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-black bg-opacity-80 px-4 py-2 rounded-full">
                      <span className="text-sm font-medium text-white">View Project</span>
                    </div>
                  </div>
                </div>

                {/* Project Info */}
                <div className="space-y-2">
                  <div>
                    <p className="text-xs text-gray-00 uppercase tracking-wide">
                      {project.category}
                    </p>
                  </div>
                  
                  <h3 className="text-xl font-medium text-gray-200 group-hover:text-gray-600 transition-colors duration-200">
                    {project.title}
                  </h3>
                  
                  <p className="text-gray-400 text-sm leading-relaxed line-clamp-2">
                    {project.description}
                  </p>
                  
                  <p className="text-xs text-gray-300">
                    {project.client}
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-20">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-medium mb-4">
              Ready to start your project?
            </h2>
            <p className="text-gray-300 mb-8">
              Let&apos;s discuss how we can bring your vision to life with exceptional design and development.
            </p>
            <Link 
              href="/contact"
              className="inline-flex items-center px-8 py-4 bg-black text-white rounded-full hover:bg-gray-800 transition-colors duration-200 text-lg font-medium"
            >
              Start a Project
              <svg 
                className="ml-2 w-5 h-5" 
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
          </div>
        </div>
      </div>
    </main>
  );
}