import React from 'react';
import { useTranslation } from 'react-i18next';

interface LanguageSelectorProps {
  className?: string;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ className }) => {
  const { i18n } = useTranslation();
  
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className={`relative inline-block text-left ${className}`}>
      <div>
        <button
          type="button"
          className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-[#FE207D] text-sm font-medium text-white hover:bg-[#e01c6f] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FE207D]"
          id="language-menu"
          aria-expanded="true"
          aria-haspopup="true"
        >
          {i18n.language === 'ar' ? 'العربية' : i18n.language === 'fr' ? 'Français' : 'English'}
          <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>

      <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
        <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="language-menu">
          <button
            onClick={() => changeLanguage('ar')}
            className={`block w-full text-left px-4 py-2 text-sm ${i18n.language === 'ar' ? 'bg-gray-100 text-gray-900' : 'text-gray-700'} hover:bg-gray-100`}
            role="menuitem"
          >
            العربية
          </button>
          <button
            onClick={() => changeLanguage('en')}
            className={`block w-full text-left px-4 py-2 text-sm ${i18n.language === 'en' ? 'bg-gray-100 text-gray-900' : 'text-gray-700'} hover:bg-gray-100`}
            role="menuitem"
          >
            English
          </button>
          <button
            onClick={() => changeLanguage('fr')}
            className={`block w-full text-left px-4 py-2 text-sm ${i18n.language === 'fr' ? 'bg-gray-100 text-gray-900' : 'text-gray-700'} hover:bg-gray-100`}
            role="menuitem"
          >
            Français
          </button>
        </div>
      </div>
    </div>
  );
};

export default LanguageSelector;
