import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faSearch, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

const Navbar: React.FC = () => {
  const location = useLocation();
  const [isLanguageDropdownOpen, setLanguageDropdownOpen] = useState(false);
  const [activeLink, setActiveLink] = useState(location.pathname);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Library', path: '/library' },
    { name: 'Videos', path: '/videos' },
    { name: 'Contact', path: '/contact' },
  ];

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="flex flex-col md:flex-row md:items-start p-2 md:p-4">
      {/* Logo and Mobile Menu Button */}
      <div className="flex items-center justify-between w-full md:w-auto">
        <img src="/logo.svg" alt="Logo" className="w-32 md:w-40 lg:w-[180px] h-auto mr-2 md:mr-4" />
        <button 
          className="md:hidden text-2xl p-2" 
          onClick={toggleMobileMenu}
        >
          <FontAwesomeIcon icon={mobileMenuOpen ? faTimes : faBars} />
        </button>
      </div>

      {/* Navbar and Search Container */}
      <div className="bg-transparent rounded-lg w-full mt-2 md:mt-6">
        {/* Mobile Menu */}
        <div className={`md:hidden ${mobileMenuOpen ? 'block' : 'hidden'} bg-white shadow-md rounded-lg p-4 mb-4`}>
          <nav className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => {
                  setActiveLink(link.path);
                  setMobileMenuOpen(false);
                }}
                className={`flex items-center text-lg py-2 ${
                  activeLink === link.path
                    ? 'text-black font-bold bg-gray-100 rounded-lg px-4 py-2'
                    : 'text-gray-700'
                }`}
              >
                {link.name}
              </Link>
            ))}
            
            {/* Language Dropdown in Mobile */}
            <div className="relative py-2">
              <button
                onClick={() => setLanguageDropdownOpen(!isLanguageDropdownOpen)}
                className="flex items-center w-full px-3 py-2 bg-[#FE207D] text-white rounded-md text-sm"
              >
                Languages
                <FontAwesomeIcon icon={faChevronDown} className="ml-2" />
              </button>
              {isLanguageDropdownOpen && (
                <div className="mt-2 bg-white shadow-lg rounded-md w-full p-2">
                  <div className="flex items-center p-2">
                    <span className="fi fi-arab"></span>
                    <span>Arabic</span>
                  </div>
                  <div className="flex items-center p-2">
                    <span className="fi fi-fr"></span>
                    <span>French</span>
                  </div>
                  <div className="flex items-center p-2">
                    <span className="fi fi-gb"></span>
                    <span>English</span>
                  </div>
                </div>
              )}
            </div>
            
            {/* Auth Buttons in Mobile */}
            <div className="flex flex-col space-y-2">
              <Link
                to="/login"
                className="px-3 py-2 text-black rounded-md text-sm border border-[#FBA628] text-center"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="flex items-center justify-center bg-[#FBA628] text-white rounded-[8px] text-[16px] font-medium py-2"
              >
                Sign Up
              </Link>
            </div>
          </nav>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-2 lg:space-x-4 p-4 border-b border-gray-200 pl-4 lg:pl-10 xl:pl-20">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setActiveLink(link.path)}
              className={`flex items-center justify-center text-base lg:text-lg pr-2 lg:pr-6 xl:pr-10 ${
                activeLink === link.path
                  ? 'text-black rounded-lg shadow-[0px 1px 4px rgba(251, 166, 40, 0.5)] px-4 py-2 relative'
                  : 'text-gray-700'
              } ${activeLink === link.path ? 'opacity-100' : 'opacity-80'} h-full`}
              style={{
                textShadow: activeLink === link.path ? '1px 1px 0 rgba(251, 166, 40, 0.5)' : 'none',
              }}
            >
              <span className={`${activeLink === link.path ? 'absolute inset-0 rounded-lg shadow-[0px 1px 4px rgba(251, 166, 40, 0.5)] pointer-events-none' : ''}`} />
              {link.name}
            </Link>
          ))}

          <div className="flex-1" />

          {/* Language Dropdown */}
          <div className="relative mr-2 lg:mr-4">
            <button
              onClick={() => setLanguageDropdownOpen(!isLanguageDropdownOpen)}
              className="flex items-center px-3 py-2 bg-[#FE207D] text-white rounded-md text-sm"
            >
              Languages
              <FontAwesomeIcon icon={faChevronDown} className="ml-2" />
            </button>
            {isLanguageDropdownOpen && (
              <div className="absolute mt-2 bg-white shadow-lg rounded-md w-40 p-2 z-10">
                <div className="flex items-center p-2">
                  <span className="fi fi-arab"></span>
                  <span>Arabic</span>
                </div>
                <div className="flex items-center p-2">
                  <span className="fi fi-fr"></span>
                  <span>French</span>
                </div>
                <div className="flex items-center p-2">
                  <span className="fi fi-gb"></span>
                  <span>English</span>
                </div>
              </div>
            )}
          </div>

          {/* Login and Sign Up Buttons */}
          <Link
            to="/login"
            className="mr-2 px-3 py-2 text-black rounded-md text-sm border border-[#FBA628]"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="flex items-center justify-center bg-[#FBA628] text-white rounded-[8px] text-[16px] font-medium px-4 py-2"
          >
            Sign Up
          </Link>
        </nav>

        {/* Search Bar */}
        <div className="flex items-center mt-2 md:mt-4 p-2 md:p-4">
          <div
            className="flex flex-col md:flex-row items-center rounded-lg bg-[#FBA628] w-full p-2 md:p-4 lg:px-6"
          >
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#FE207D] mb-2 md:mb-0">
              <FontAwesomeIcon icon={faSearch} className="text-white" />
            </div>
            <span className="md:ml-4 lg:ml-10 text-white rounded-[8px] text-[16px] font-medium mb-2 md:mb-0">Find your book</span>
            <div className="hidden md:block flex-1" />

            <input
              type="text"
              placeholder="Search..."
              className="h-10 w-full md:w-1/2 lg:w-2/3 px-4 rounded-lg bg-white"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
