import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="text-xl font-light mb-3 block">
              dustin studio
            </Link>
            <p className="text-sm text-gray-300 leading-relaxed max-w-md">
              Complete digital solutions from concept to launch. We design, develop, 
              and deploy exceptional digital experiences with Japanese design influence.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-base font-medium mb-3">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/work" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Work
                </Link>
              </li>
              {/* <li>
                <Link href="/about" className="text-gray-300 hover:text-white transition-colors duration-200">
                  About
                </Link>
              </li> */}
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-base font-medium mb-3">Connect</h3>
            <ul className="space-y-2">
              <li>
                <span className="text-sm text-gray-200">
                  contact@dustinstudio.tech
                </span>
              </li>
              <li>
                <span className="text-sm text-gray-300">
                  Available in EN, JP, CN
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-6 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {currentYear} dustin studio. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 sm:mt-0">
          </div>
        </div>
      </div>
    </footer>
  );
}