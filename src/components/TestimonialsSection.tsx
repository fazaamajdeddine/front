import React from 'react';
import { useTranslation } from 'react-i18next';

const TestimonialsSection: React.FC = () => {
    const { t } = useTranslation();

    // Testimonial data
    const testimonials = [
        { id: 1, text: t('landing.testimonials.testimonial1'), author: 'Sarah M.', image: '/testemonial1.jpeg' },
        { id: 2, text: t('landing.testimonials.testimonial2'), author: 'Ahmed K.', image: '/testemonial2.jpeg' },
        { id: 3, text: t('landing.testimonials.testimonial3'), author: 'Leila B.', image: '/testemonial3.jpeg' },
        { id: 4, text: t('landing.testimonials.testimonial4'), author: 'Youssef T.', image: '/testemonial4.jpeg' }
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
                            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col h-full"
                        >
                            {/* Image section with increased height */}
                            <div className="h-48 overflow-hidden rounded-t-lg">
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

                            {/* Text content */}
                            <div className="p-6 flex flex-col flex-grow">
                                <p className="text-gray-700 italic mb-4 text-center flex-grow">"{testimonial.text}"</p>
                                <p className="text-[#FBA628] font-semibold text-center">{testimonial.author}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TestimonialsSection;
