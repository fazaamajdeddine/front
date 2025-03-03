import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="h-[322px] bg-app-background p-8 text-center text-gray-600 flex flex-col justify-between">
      <div className="flex justify-between items-start text-left text-gray-700 mx-10">
        {/* Logo */}
        <div>
          <img src="logo.svg" alt="Logo" className="w-24 mb-4" />
        </div>

        {/* Contact Details */}
        <div className="space-y-2">
          <p>123 Market St.<br />Sousse</p>
          <p>(434) 546-4356</p>
          <p>palmyra2025@gmail.com</p>
        </div>

        {/* Column Links */}
        <div>
          <h4 className="font-semibold">About</h4>
          <ul className="space-y-2 mt-2">
            <li><a href="#">Library</a></li>
            <li><a href="#">Contact</a></li>
            <li><a href="#">Books</a></li>
          </ul>
        </div>

        {/* Social Media Links */}
        <div>
          <h4 className="font-semibold">Follow Us</h4>
          <ul className="space-y-2 mt-2">
            <li><a href="#">Facebook</a></li>
            <li><a href="#">LinkedIn</a></li>
            <li><a href="#">Instagram</a></li>
            <li><a href="#">Twitter</a></li>
          </ul>
        </div>
      </div>

      {/* Bottom Copyright Text */}
      <p className="mt-6">&copy; {new Date().getFullYear()} Palmyra. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
