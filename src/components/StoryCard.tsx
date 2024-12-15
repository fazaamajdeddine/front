// src/components/StoryCard.tsx
import React from 'react';

interface StoryCardProps {
  onClick: () => void; 
  coverImage: string; // Cover image for the story
  title: string; // Title for the story
}

const StoryCard: React.FC<StoryCardProps> = ({ onClick, coverImage, title }) => {
  return (
    <div 
      className="relative w-[289px] h-[352px] bg-[#F7EFCC] border border-[#C7C7C7] rounded-lg cursor-pointer overflow-hidden" 
      onClick={onClick} 
    >
      {/* Cover image */}
      <img
        src={coverImage}
        alt="Story Cover"
        className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[193px] h-[309px] object-cover z-10"
      />

      {/* Bottom container with title */}
      <div className="absolute bottom-0 w-full h-[96px] bg-[#FBA628] rounded-b-lg border-t border-[#C7C7C7] flex items-end pb-2">
        <p className="text-white text-center font-semibold w-full">{title}</p>
      </div>
    </div>
  );
};

export default StoryCard;
