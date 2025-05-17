import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const LanguageDropdown: React.FC = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setIsOpen(false);
  };
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setIsOpen(false);
    };
    
    if (isOpen) {
      document.addEventListener('click', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative" onClick={(e) => e.stopPropagation()}>
      <button
        onClick={toggleDropdown}
        className="flex items-center px-3 py-2 bg-[#FE207D] text-white rounded-md text-sm"
      >
        {i18n.language === 'ar' ? 'العربية' : i18n.language === 'fr' ? 'Français' : 'English'}
        <svg className="ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>
      
      {isOpen && (
        <div className="absolute mt-2 bg-white shadow-lg rounded-md w-40 p-2 z-50">
          <div 
            className={`flex items-center p-2 cursor-pointer hover:bg-gray-100 ${i18n.language === 'ar' ? 'bg-gray-100' : ''}`}
            onClick={() => changeLanguage('ar')}
          >
            <span>العربية</span>
          </div>
          <div 
            className={`flex items-center p-2 cursor-pointer hover:bg-gray-100 ${i18n.language === 'en' ? 'bg-gray-100' : ''}`}
            onClick={() => changeLanguage('en')}
          >
            <span>English</span>
          </div>
          <div 
            className={`flex items-center p-2 cursor-pointer hover:bg-gray-100 ${i18n.language === 'fr' ? 'bg-gray-100' : ''}`}
            onClick={() => changeLanguage('fr')}
          >
            <span>Français</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageDropdown;
