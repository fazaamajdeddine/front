import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-app-background p-8 text-gray-600">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start text-left text-gray-700 gap-8 md:gap-4">
          {/* Logo - Takes full width on small screens, auto width on medium+ */}
          <div className="w-full md:w-auto mb-6 md:mb-0">
            <img src="/logo.svg" alt="Logo" className="w-24 mb-4 mx-auto md:mx-0" />
          </div>

          {/* Contact Details - Stacked on small screens */}
          <div className="w-full md:w-auto space-y-2 text-center md:text-left">
            <p>123 Market St.<br />Sousse</p>
            <p>(434) 546-4356</p>
            <p>palmyra2025@gmail.com</p>
          </div>

          {/* Column Links - Stacked on small screens */}
          <div className="w-full md:w-auto text-center md:text-left">
            <h4 className="font-semibold mb-2">About</h4>
            <ul className="space-y-2">
              <li><a href="/library" className="hover:text-gray-900">Library</a></li>
              <li><a href="/contact" className="hover:text-gray-900">Contact</a></li>
              <li><a href="/library" className="hover:text-gray-900">Books</a></li> {/* Assuming Books links to Library */} 
            </ul>
          </div>

          {/* Social Media Links - Stacked on small screens */}
          <div className="w-full md:w-auto text-center md:text-left">
            <h4 className="font-semibold mb-2">Follow Us</h4>
            <ul className="space-y-2">
              <li><a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900">Facebook</a></li>
              <li><a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900">LinkedIn</a></li>
              <li><a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900">Instagram</a></li>
              <li><a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900">Twitter</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright Text */}
        <p className="mt-8 text-center text-sm">&copy; {new Date().getFullYear()} Palmyra. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;

