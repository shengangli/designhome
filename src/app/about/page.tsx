import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About | Design Studio',
  description: 'Learn about our design philosophy, team, and approach to creating exceptional digital experiences.',
  openGraph: {
    title: 'About | Design Studio',
    description: 'Learn about our design philosophy, team, and approach to creating exceptional digital experiences.',
  },
};

export default function AboutPage() {
  return (
    <main className="min-h-screen py-24 px-6 sm:px-8 lg:px-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light mb-6">
            About Us
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
            We are a design studio dedicated to creating meaningful digital experiences 
            that connect brands with their audiences.
          </p>
        </div>

        {/* Main Content */}
        <div className="prose prose-lg prose-gray max-w-none">
          <div className="mb-16">
            <h2 className="text-3xl font-light mb-6">Our Story</h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Founded on the belief that great design is both beautiful and functional, 
              our studio brings together creativity and technical excellence to solve 
              complex problems for forward-thinking companies.
            </p>
            <p className="text-gray-600 leading-relaxed">
              We specialize in creating digital experiences that not only look stunning 
              but also perform exceptionally well across all devices and markets, 
              with particular expertise in Japanese, Chinese, and English-speaking regions.
            </p>
          </div>

          <div className="mb-16">
            <h2 className="text-3xl font-light mb-6">Our Philosophy</h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              We believe that exceptional design is born from the intersection of 
              aesthetic beauty and functional purpose. Every pixel, every interaction, 
              and every line of code is crafted with intention and precision.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Our approach is collaborative, iterative, and always focused on delivering 
              results that exceed expectations. We don&apos;t just create pretty things—we 
              create solutions that drive business growth and user satisfaction.
            </p>
          </div>

          <div className="mb-16">
            <h2 className="text-3xl font-light mb-6">What We Do</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-medium mb-3">Design</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Brand identity, UI/UX design, visual systems, and digital strategy 
                  that creates lasting impressions and drives engagement.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-medium mb-3">Development</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Custom web applications, e-commerce platforms, and digital solutions 
                  built with modern technologies and best practices.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-medium mb-3">Strategy</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Market research, user experience planning, and digital transformation 
                  consulting to ensure your project&apos;s success.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-medium mb-3">Optimization</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Performance optimization, SEO, and continuous improvement to maximize 
                  your digital presence and business results.
                </p>
              </div>
            </div>
          </div>

          <div className="text-center py-16 bg-gray-50 rounded-lg">
            <h2 className="text-3xl font-light mb-6">Let&apos;s Work Together</h2>
            <p className="text-gray-600 mb-8 max-w-xl mx-auto">
              Ready to create something exceptional? We&apos;d love to hear about your project 
              and explore how we can help bring your vision to life.
            </p>
            <a 
              href="/contact"
              className="inline-flex items-center px-8 py-4 bg-black text-white rounded-full hover:bg-gray-800 transition-colors duration-200 text-lg font-medium"
            >
              Get in Touch
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
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}