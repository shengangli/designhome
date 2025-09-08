import Link from 'next/link';
import Image from 'next/image';
import { Project } from '@/lib/projects';

interface ProjectNavigationProps {
  prevProject: Project | null;
  nextProject: Project | null;
}

export default function ProjectNavigation({ prevProject, nextProject }: ProjectNavigationProps) {
  if (!prevProject && !nextProject) {
    return null;
  }

  return (
    <div className="border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Previous Project */}
          <div className="border-r border-gray-200">
            {prevProject ? (
              <Link href={`/work/${prevProject.slug}`} className="group block p-8 hover:bg-gray-50 transition-colors duration-200">
                <div className="flex items-center mb-4">
                  <svg className="mr-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  <span className="text-sm text-gray-500 uppercase tracking-wide">Previous Project</span>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="relative w-16 h-16 flex-shrink-0 overflow-hidden rounded">
                    <Image
                      src={prevProject.heroImage}
                      alt={prevProject.title}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg group-hover:text-gray-600 transition-colors duration-200">
                      {prevProject.title}
                    </h3>
                    <p className="text-sm text-gray-500">{prevProject.category}</p>
                  </div>
                </div>
              </Link>
            ) : (
              <div className="p-8 text-center text-gray-400">
                <span className="text-sm">No previous project</span>
              </div>
            )}
          </div>

          {/* Next Project */}
          <div>
            {nextProject ? (
              <Link href={`/work/${nextProject.slug}`} className="group block p-8 hover:bg-gray-50 transition-colors duration-200">
                <div className="flex items-center justify-end mb-4">
                  <span className="text-sm text-gray-500 uppercase tracking-wide">Next Project</span>
                  <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
                
                <div className="flex items-start space-x-4 justify-end text-right">
                  <div>
                    <h3 className="font-medium text-lg group-hover:text-gray-600 transition-colors duration-200">
                      {nextProject.title}
                    </h3>
                    <p className="text-sm text-gray-500">{nextProject.category}</p>
                  </div>
                  <div className="relative w-16 h-16 flex-shrink-0 overflow-hidden rounded">
                    <Image
                      src={nextProject.heroImage}
                      alt={nextProject.title}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </div>
                </div>
              </Link>
            ) : (
              <div className="p-8 text-center text-gray-400">
                <span className="text-sm">No next project</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}