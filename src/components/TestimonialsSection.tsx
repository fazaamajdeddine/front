import React from 'react';
import { useTranslation } from 'react-i18next';

const TestimonialsSection: React.FC = () => {
  const { t } = useTranslation();

  // Testimonial data
  const testimonials = [
    { id: 1, text: t('landing.testimonials.testimonial1'), author: 'Sarah M.', image: '/testimonial1.svg' },
    { id: 2, text: t('landing.testimonials.testimonial2'), author: 'Ahmed K.', image: '/testimonial2.svg' },
    { id: 3, text: t('landing.testimonials.testimonial3'), author: 'Leila B.', image: '/testimonial3.svg' },
    { id: 4, text: t('landing.testimonials.testimonial4'), author: 'Youssef T.', image: '/testimonial4.svg' }
  ];

  return (
    <section className="py-12 md:py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-[#FE207D] mb-10">
          {t('landing.testimonials.title')}
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map(testimonial => (
            <div 
              key={testimonial.id} 
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.author}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/user-placeholder.svg';
                    }}
                  />
                </div>
              </div>
              <p className="text-gray-700 italic mb-4 text-center">"{testimonial.text}"</p>
              <p className="text-[#FBA628] font-semibold text-center">{testimonial.author}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
