import React from 'react';
import { useTranslation } from 'react-i18next';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const HeroCarousel: React.FC = () => {
  const { t } = useTranslation();

  // Carousel settings
  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false
        }
      }
    ]
  };

  return (
    <div className="w-full">
      <Slider {...carouselSettings}>
        {/* Slide 1: Palmyra Platform */}
        <div className="px-4 py-8 md:py-16">
          <div className="flex flex-col md:flex-row items-center max-w-6xl mx-auto">
            <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#FE207D] mb-4">
                {t('landing.heroCarousel.slide1.title')}
              </h2>
              <p className="text-lg md:text-xl text-gray-700 mb-6">
                {t('landing.heroCarousel.slide1.description')}
              </p>
              <a 
                href="/home" 
                className="inline-block px-6 py-3 bg-[#FBA628] text-white rounded-md hover:bg-[#FE207D] transition duration-300"
              >
                {t('landing.heroCarousel.slide1.button')}
              </a>
            </div>
            <div className="md:w-1/2">
              <img 
                src="/slide1.webp" 
                alt="Kids using tablet" 
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>

        {/* Slide 2: Mayra EduServ */}
        <div className="px-4 py-8 md:py-16">
          <div className="flex flex-col md:flex-row items-center max-w-6xl mx-auto">
            <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#75B936] mb-4">
                {t('landing.heroCarousel.slide2.title')}
              </h2>
              <p className="text-lg md:text-xl text-gray-700 mb-6">
                {t('landing.heroCarousel.slide2.description')}
              </p>
              <a 
                href="/home" 
                className="inline-block px-6 py-3 bg-[#75B936] text-white rounded-md hover:bg-[#FE207D] transition duration-300"
              >
                {t('landing.heroCarousel.slide2.button')}
              </a>
            </div>
            <div className="md:w-1/2">
              <img 
                src="/slide2.webp" 
                alt="Teachers on laptops" 
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>

        {/* Slide 3: Palmyra Store */}
        <div className="px-4 py-8 md:py-16">
          <div className="flex flex-col md:flex-row items-center max-w-6xl mx-auto">
            <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#FBA628] mb-4">
                {t('landing.heroCarousel.slide3.title')}
              </h2>
              <p className="text-lg md:text-xl text-gray-700 mb-6">
                {t('landing.heroCarousel.slide3.description')}
              </p>
              <a 
                href="/home" 
                className="inline-block px-6 py-3 bg-[#FBA628] text-white rounded-md hover:bg-[#FE207D] transition duration-300"
              >
                {t('landing.heroCarousel.slide3.button')}
              </a>
            </div>
            <div className="md:w-1/2">
              <img 
                src="/slide3.webp" 
                alt="Product mockups" 
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>

        {/* Slide 4: Mayra Parents */}
        <div className="px-4 py-8 md:py-16">
          <div className="flex flex-col md:flex-row items-center max-w-6xl mx-auto">
            <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#FE207D] mb-4">
                {t('landing.heroCarousel.slide4.title')}
              </h2>
              <p className="text-lg md:text-xl text-gray-700 mb-6">
                {t('landing.heroCarousel.slide4.description')}
              </p>
              <div className="flex flex-wrap gap-4">
                <a 
                  href="#" 
                  className="inline-block px-6 py-3 bg-[#000000] text-white rounded-md hover:bg-[#333333] transition duration-300"
                >
                  <span className="flex items-center">
                    <span className="mr-2">🍎</span>
                    {t('landing.heroCarousel.slide4.buttons.ios')}
                  </span>
                </a>
                <a 
                  href="#" 
                  className="inline-block px-6 py-3 bg-[#75B936] text-white rounded-md hover:bg-[#5a9029] transition duration-300"
                >
                  <span className="flex items-center">
                    <span className="mr-2">🤖</span>
                    {t('landing.heroCarousel.slide4.buttons.android')}
                  </span>
                </a>
              </div>
            </div>
            <div className="md:w-1/2">
              <img 
                src="/slide4.jpeg" 
                alt="Parent using app" 
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </Slider>
    </div>
  );
};

export default HeroCarousel;
