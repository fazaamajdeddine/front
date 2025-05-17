import React from 'react';
import { useTranslation } from 'react-i18next';
import HeroCarousel from '../components/HeroCarousel';
import TestimonialsSection from '../components/TestimonialsSection';
import StatisticsSection from '../components/StatisticsSection';
import ContactForm from '../components/ContactForm';
import LanguageDropdown from '../components/LanguageDropdown';

const Landing: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-[#F6F8E1]">
      {/* Top Navigation */}
      <nav className="flex flex-col md:flex-row justify-between items-center p-4 md:p-6">
        <div className="flex items-center mb-4 md:mb-0">
          <img src="/logo.svg" alt={t('landing.topNav.logo')} className="w-32 md:w-40 h-auto" />
          <h1 className="text-xl md:text-2xl font-bold ml-2 text-[#FE207D]">{t('landing.topNav.logo')}</h1>
        </div>
        
        <div className="flex flex-wrap justify-center md:justify-end items-center gap-2 md:gap-4">
          <a href="#" className="px-3 py-2 text-gray-700 hover:text-[#FE207D]">{t('landing.topNav.home')}</a>
          <a href="#contact" className="px-3 py-2 text-gray-700 hover:text-[#FE207D]">{t('landing.topNav.contactUs')}</a>
          <LanguageDropdown />
          <a 
            href="/home" 
            className="px-4 py-2 bg-[#FBA628] text-white rounded-md hover:bg-[#FE207D] transition duration-300"
          >
            {t('landing.topNav.getStarted')}
          </a>
        </div>
      </nav>

      {/* Hero Carousel */}
      <HeroCarousel />

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Statistics Section */}
      <StatisticsSection />

      {/* Contact Form */}
      <ContactForm />

    
    </div>
  );
};

export default Landing;
