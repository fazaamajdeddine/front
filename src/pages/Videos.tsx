import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const Tabs = ['All videos', 'videos', 'Wishlist', 'Completed'];

// VideoCard component
const VideoCard: React.FC<{ type: string; coverImage: string; title: string }> = ({ type, coverImage, title }) => (
  <div className="rounded-lg overflow-hidden p-4 relative group">
    <div className="relative">
      <img
        src={coverImage} // Use the provided video thumbnail
        alt="Video Thumbnail"
        className="w-full h-[180px] object-cover rounded-lg transition-opacity duration-300 group-hover:opacity-70"
        style={{ borderRadius: '22px' }}
      />
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <img src="/play.svg" alt="Play" className="w-12 h-12" />
      </div>
    </div>
    <div className="p-2">
      <h2 className="font-bold text-sm mb-1">{title} - {type}</h2>
      <div className="flex items-center text-green-600 text-xs mb-1">
        <FontAwesomeIcon icon={faUser} className="mr-1" />
        <span>Ahmed</span>
      </div>
      <p className="text-gray-500 text-xs">4/10 videos completed</p>
    </div>
  </div>
);

const Videos: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('All Courses');
  const [currentPage, setCurrentPage] = useState(1);
  const videosPerPage = 12; // Number of videos per page

  // Arrays for images and titles
  const videoImages = [
    '/storylib1.svg',
    '/storylib2.svg',
    '/storylib3.svg',
    '/storylib4.svg',
    '/storylib5.svg',
    '/storylib6.svg',
    '/storylib7.svg',
    '/storylib8.svg',
    '/storylib9.svg',
    '/storylib10.svg',
    '/storylib11.svg',
    '/storylib12.svg',
  ];

  const videoTitles = [
    "حالة الطقس لهذا اليوم يا جدي",
    "كوزي",
    "سندراني غواصة الاعماق",
    "البطتان و الثعلب",
    "الجميلة و الوحش",
    "انا ممتنة",
    "بيت ستي",
    "من يساعد الدجاجة",
    "لا تقلق يا بابا",
    "انا مدهشة",
    "اختي الصغيرة",
    "اشارك ألعابي"
  ];

  const totalPages = Math.ceil(videoImages.length / videosPerPage);

  const handlePrevPage = () => {
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : totalPages));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => (prev < totalPages ? prev + 1 : 1));
  };

  // Get videos for current page
  const currentVideos = videoImages.slice(
    (currentPage - 1) * videosPerPage,
    currentPage * videosPerPage
  );

  // Get titles for current page
  const currentTitles = videoTitles.slice(
    (currentPage - 1) * videosPerPage,
    currentPage * videosPerPage
  );

  return (
    <div className="flex flex-col items-center mt-8">
      {/* Title */}
      <h1 className="text-3xl font-bold text-center mb-6">Videos</h1>

      {/* Tab Bar */}
      <div className="flex space-x-8 mb-6">
        {Tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => {
              setSelectedTab(tab);
              setCurrentPage(1); // Reset to first page when tab changes
            }}
            className={`text-lg font-semibold ${selectedTab === tab ? 'text-[#FE207D] border-b-2 border-[#3DCBB1]' : 'text-black'
              } pb-2`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Video Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full px-4">
        {currentVideos.map((image, index) => (
          <VideoCard key={index} type={selectedTab} coverImage={image} title={currentTitles[index]} />
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center space-x-4 mt-6">
        {/* Left Arrow */}
        <button onClick={handlePrevPage}>
          <img src="/arrow-circle-broken-left.svg" alt="Previous" className="w-6 h-6" />
        </button>

        {/* Page Indicator */}
        <div className="flex space-x-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <div
              key={i}
              className={`w-3 h-3 rounded-full ${currentPage === i + 1 ? 'bg-[#FE207D]' : 'bg-gray-300'
                }`}
            ></div>
          ))}
        </div>

        {/* Right Arrow */}
        <button onClick={handleNextPage}>
          <img src="/arrow-circle-broken-right.svg" alt="Next" className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default Videos;