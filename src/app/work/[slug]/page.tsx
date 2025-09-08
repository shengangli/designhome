import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getProject, getAllProjects } from '@/lib/projects';
import ProjectNavigation from '@/components/ProjectNavigation';
import { Metadata } from 'next';

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  
  if (!project) {
    return {
      title: 'Project Not Found'
    };
  }

  return {
    title: `${project.title} | dustin studio`,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      images: [project.heroImage],
    },
  };
}

export async function generateStaticParams() {
  const projects = getAllProjects();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProject(slug);
  
  if (!project) {
    notFound();
  }

  const allProjects = getAllProjects();
  const currentIndex = allProjects.findIndex(p => p.slug === slug);
  const prevProject = currentIndex > 0 ? allProjects[currentIndex - 1] : null;
  const nextProject = currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : null;

  return (
    <main className="min-h-screen">
      {/* Hero Image */}
      <div className="relative h-[50vh] md:h-[60vh] lg:h-[70vh] overflow-hidden">
        <Image
          src={project.heroImage}
          alt={project.title}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
      </div>

      {/* Project Content */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="mb-12">
              <p className="text-sm text-gray-500 uppercase tracking-wide mb-4">
                {project.category}
              </p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-light mb-6">
                {project.title}
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* Challenge Section */}
            <div className="mb-12">
              <h2 className="text-2xl font-medium mb-6">The Challenge</h2>
              <p className="text-gray-600 leading-relaxed">
                {project.challenge}
              </p>
            </div>

            {/* Solution Section */}
            <div className="mb-12">
              <h2 className="text-2xl font-medium mb-6">The Solution</h2>
              <p className="text-gray-600 leading-relaxed">
                {project.solution}
              </p>
            </div>

            {/* Gallery */}
            {project.galleryImages && project.galleryImages.length > 0 && (
              <div className="mb-12">
                <h2 className="text-2xl font-medium mb-8">Project Gallery</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {project.galleryImages.map((image, index) => (
                    <div key={index} className="relative aspect-[4/3] overflow-hidden rounded-lg">
                      <Image
                        src={image}
                        alt={`${project.title} gallery image ${index + 1}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <div className="bg-gray-50 rounded-lg p-8">
                <h3 className="text-xl font-medium mb-6">Project Details</h3>
                
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500 uppercase tracking-wide mb-1">Client</p>
                    <p className="font-medium">{project.client}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500 uppercase tracking-wide mb-1">Category</p>
                    <p className="font-medium">{project.category}</p>
                  </div>

                  {project.services && project.services.length > 0 && (
                    <div>
                      <p className="text-sm text-gray-500 uppercase tracking-wide mb-2">Services</p>
                      <div className="space-y-1">
                        {project.services.map((service, index) => (
                          <p key={index} className="text-sm">{service}</p>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Project Navigation */}
      <ProjectNavigation prevProject={prevProject} nextProject={nextProject} />
    </main>
  );
}