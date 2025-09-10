import { Building2, Mail, Phone } from 'lucide-react';

interface FooterProps {
  scrollToSection: (sectionId: string) => void;
}

export function Footer({ scrollToSection }: FooterProps) {
  const quickLinks = [
    { label: 'Home', id: 'hero' },
    { label: 'Room Status', id: 'room-status' },
    { label: 'Report Problem', id: 'report-problem' },
  ];

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <Building2 className="h-8 w-8 text-blue-400" />
              <div>
                <h3 className="text-lg font-semibold">CSE Smart Classroom Manager</h3>
                <p className="text-sm text-gray-400">Computer Science & Engineering</p>
              </div>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              Streamlining classroom management for the CSE department with real-time 
              availability tracking and anonymous issue reporting.
            </p>
            <div className="text-sm text-gray-400">
              <p className="mb-1">Campus-only • Beginner version</p>
              <p>Built for Modern Campus Management</p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollToSection(link.id)}
                    className="text-gray-300 hover:text-blue-400 transition-colors duration-200 focus:outline-none focus:text-blue-400"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-gray-300">
                <Mail className="h-4 w-4 text-blue-400" />
                <span className="text-sm">cse.dept@university.edu</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <Phone className="h-4 w-4 text-blue-400" />
                <span className="text-sm">+91 XXX XXX XXXX</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <Building2 className="h-4 w-4 text-blue-400" />
                <span className="text-sm">P-Block, Main Campus</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400">
              © 2024 Modern Campus Management. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm text-gray-400">
              <button className="hover:text-blue-400 transition-colors duration-200 focus:outline-none focus:text-blue-400">
                Privacy Policy
              </button>
              <button className="hover:text-blue-400 transition-colors duration-200 focus:outline-none focus:text-blue-400">
                Terms of Service
              </button>
              <button className="hover:text-blue-400 transition-colors duration-200 focus:outline-none focus:text-blue-400">
                Help
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}