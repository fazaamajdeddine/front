import React from 'react';
import { useTranslation } from 'react-i18next';

const StatisticsSection: React.FC = () => {
  const { t } = useTranslation();

  // Statistics data
  const statistics = [
    { id: 1, value: t('landing.statistics.stat1'), icon: '📚' },
    { id: 2, value: t('landing.statistics.stat2'), icon: '📱' },
    { id: 3, value: t('landing.statistics.stat3'), icon: '📈' },
    { id: 4, value: t('landing.statistics.stat4'), icon: '🚀' }
  ];

  return (
    <section className="py-12 md:py-16 px-4 bg-[#FBA628]">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-white mb-10">
          {t('landing.statistics.title')}
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {statistics.map(stat => (
            <div 
              key={stat.id} 
              className="bg-white p-6 rounded-lg shadow-md text-center transform transition-transform duration-300 hover:scale-105"
            >
              <div className="text-4xl mb-4">{stat.icon}</div>
              <p className="text-lg md:text-xl font-bold text-[#FE207D]">{stat.value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatisticsSection;
