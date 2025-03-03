import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faTimes } from '@fortawesome/free-solid-svg-icons';

const RadioPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="fixed bottom-4 right-4 flex flex-col items-end space-y-4">
      {/* Radio Button */}
      <button
        onClick={togglePlay}
        className="flex items-center space-x-2 p-3 bg-[#FF1276] rounded-full hover:bg-[#FF1276] shadow-lg focus:outline-none"
      >
        <FontAwesomeIcon icon={isPlaying ? faTimes : faPlay} className="w-5 h-5 text-white" />
        <span className="text-white font-medium">Radio</span>
      </button>

      {/* Scroll to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="p-3 bg-[#FF1276] rounded-full hover:bg-[#FF1276] shadow-lg focus:outline-none"
      >
        <img src="/up.svg" alt="Scroll to top" className="w-6 h-6" />
      </button>

      {/* YouTube Iframe */}
      {isPlaying && (
        <iframe
          width="200"
          height="100"
          src="https://www.youtube.com/embed/videoseries?list=PLqqdL3FTtSnCeBRyHMO9rjHLDeM_eZH-y&autoplay=1" title="YouTube Playlist"
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
          className="mt-2"
        ></iframe>
      )}
    </div>
  );
};

export default RadioPlayer;
