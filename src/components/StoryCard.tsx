// src/components/StoryCard.tsx
import React from 'react';

interface StoryCardProps {
  onClick: () => void; 
  coverImage: string; // Add coverImage prop
}

const StoryCard: React.FC<StoryCardProps> = ({ onClick, coverImage }) => {
  return (
    <div 
      className="relative w-[289px] h-[352px] bg-[#F7EFCC] border border-[#C7C7C7] rounded-lg flex items-center justify-center cursor-pointer" 
      onClick={onClick} 
    >
      {/* Use the coverImage prop for the image source */}
      <img
        src={coverImage}
        alt="Story Icon"
        className="absolute top-1/2 transform -translate-y-1/2 w-auto h-auto"
      />

      {/* Bottom container */}
      <div className="absolute bottom-0 w-full h-[96px] bg-[#FBA628] rounded-b-lg border-t border-[#C7C7C7]" />
    </div>
  );
};

export default StoryCard;