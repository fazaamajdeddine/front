import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

const LanguageDropdown: React.FC<{ isOpen: boolean; toggle: () => void }> = ({ isOpen, toggle }) => (
  <div className="relative">
    <button onClick={toggle} className="flex items-center px-3 py-2 bg-[#FE207D] text-white rounded-md text-sm">
      Languages
      <FontAwesomeIcon icon={faChevronDown} className="ml-2" />
    </button>
    {isOpen && (
      <div className="absolute mt-2 bg-white shadow-lg rounded-md w-40 p-2">
        {["Arabic", "French", "English"].map((lang) => (
          <div key={lang} className="flex items-center p-2">
            <span>{lang}</span>
          </div>
        ))}
      </div>
    )}
  </div>
);

export default LanguageDropdown;
