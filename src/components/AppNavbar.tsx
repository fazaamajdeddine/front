import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faSearch, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'; // Import the logout icon
import { useAuthStore } from "../stores";
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Navbar: React.FC = () => {
  const location = useLocation();
  const [isLanguageDropdownOpen, setLanguageDropdownOpen] = useState(false);
  const [activeLink, setActiveLink] = useState(location.pathname);
  const navigate = useNavigate(); // Initialize the navigate function
  const authStatus = useAuthStore((state) => state.status);


  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Library', path: '/library' },
    { name: 'Videos', path: '/videos' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header className="flex items-start p-4">
      {/* Logo */}
      <div className="flex items-center">
        <img src="/logo.svg" alt="Logo" className="w-[180px] h-auto mr-[20px]" />
      </div>

      {/* Navbar and Search Container */}
      <div className="bg-transparent rounded-lg w-full" style={{ marginTop: '25px' }}>
        <nav className="flex items-center space-x-4 p-4 border-b border-gray-200 pl-60">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setActiveLink(link.path)}
              className={`flex items-center justify-center text-lg pr-20 ${activeLink === link.path
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
          {/* Conditional Rendering for Login/Signup or Kid's Name and Avatar */}
          {authStatus === "unauthorized" ? (
            <>
              <Link
                to="/auth" // Navigate to the login page
                className="mr-2 px-3 py-2 text-black rounded-md text-sm border border-[#FBA628]"
              >
                Login
              </Link>

              <Link
                to="/auth/register" // Navigate to the register page
                className="flex items-center justify-center bg-[#FBA628] text-white rounded-[8px] text-[16px] font-medium"
                style={{ width: '94px', height: '44px' }}
              >
                Sign Up
              </Link>
            </>
          ) : (
            <div className="flex items-center">
              <button
                onClick={() => navigate("/entranceGate")} // Navigate to the entrance gate
                className="flex items-center bg-[#FE207D] text-white rounded-md px-3 py-2"
              >
                <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
                Logout
              </button>
            </div>
          )}

          {/* Language Dropdown */}
          <div className="relative mr-4">
            <button
              onClick={() => setLanguageDropdownOpen(!isLanguageDropdownOpen)}
              className="flex items-center px-3 py-2 bg-[#FE207D] text-white rounded-md text-sm"
            >
              Languages
              <FontAwesomeIcon icon={faChevronDown} className="ml-2" />
            </button>
            {isLanguageDropdownOpen && (
              <div className="absolute mt-2 bg-white shadow-lg rounded-md w-40 p-2">
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
        </nav>

        {/* Search Bar */}
        <div className="flex items-center mt-[25px] p-4">
          <div
            className="flex items-center rounded-lg"
            style={{
              height: '60px',
              backgroundColor: '#FBA628',
              width: '100%',
              padding: '0 20px',
              borderRadius: '8px',
            }}
          >
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#FE207D]">
              <FontAwesomeIcon icon={faSearch} className="text-white" />
            </div>
            <span className="ml-10 text-white rounded-[8px] text-[16px] font-medium">Find your book</span>
            <div className="flex-1" />

            <input
              type="text"
              placeholder="Search..."
              className="h-[40px] w-[821px] px-4 rounded-full bg-white"
              style={{ borderRadius: '8px' }}
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;