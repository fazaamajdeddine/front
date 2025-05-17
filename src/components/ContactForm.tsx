import React from 'react';
import { useTranslation } from 'react-i18next';

const ContactForm: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <section id="contact" className="py-12 md:py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-[#FE207D] mb-10">
          {t('landing.contact.title')}
        </h2>
        
        <form className="bg-white p-6 md:p-8 rounded-lg shadow-md">
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 mb-2">
              {t('landing.contact.name')}
            </label>
            <input 
              type="text" 
              id="name" 
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FBA628]"
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 mb-2">
              {t('landing.contact.email')}
            </label>
            <input 
              type="email" 
              id="email" 
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FBA628]"
            />
          </div>
          
          <div className="mb-6">
            <label htmlFor="message" className="block text-gray-700 mb-2">
              {t('landing.contact.message')}
            </label>
            <textarea 
              id="message" 
              rows={5}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FBA628]"
            ></textarea>
          </div>
          
          <button 
            type="submit" 
            className="w-full px-6 py-3 bg-[#FBA628] text-white rounded-md hover:bg-[#FE207D] transition duration-300"
          >
            {t('landing.contact.submit')}
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactForm;
