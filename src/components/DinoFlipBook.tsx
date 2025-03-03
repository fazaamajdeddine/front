import React, { useRef, useState } from "react";
import HTMLFlipBook from "react-pageflip";
import LandingPage from "./LandingPage"; // Import the LandingPage component
import "./Book.css";

const LastPageStory = ({ onStartGame, onExit }: { onStartGame: () => void; onExit: () => void }) => {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center bg-gray-100">
      <p
        style={{
          textAlign: "center",
          fontSize: "24px",
          fontWeight: "bold",
        }}
      >
        احسنت اقد اكملت قراة قصة دينو لا يملك أجنحة

        <br />
        الان يمكنك البدئ بالعب
        <br />
        اللعبة سوف تكون مبنية على مشاهد من القصة
      </p>
      <div className="flex justify-center space-x-4 mt-6">
        <button
          className="px-8 py-3 text-white font-bold bg-[#FBA628] opacity-60 hover:opacity-100 rounded-full text-lg transition duration-300"
          onClick={onStartGame}
        >
          إبدء اللعب
        </button>
        <button
          className="px-8 py-3 text-white font-bold bg-[#75B936] opacity-60 hover:opacity-100 rounded-full text-lg transition duration-300"
          onClick={onExit}
        >
          خروج
        </button>
      </div>
    </div>
  );
};

const DinoBook = (props: any) => {
  const bookRef = useRef<any>();
  const [editModeOn, setEditModeOn] = useState<boolean>(false);
  const [showLandingPage, setShowLandingPage] = useState<boolean>(false);
  const [showLastPageStory, setShowLastPageStory] = useState<boolean>(false); // Show the last page story

  // Array of image paths
  const imagePaths = [
    "/dino1.svg",
    "/dino2.svg",
    "/dino3.svg",
    "/dino4.svg",
    "/dino5.svg",
    "/dino6.svg",
    "/dino7.svg",
    "/dino8.svg",
  ];

  const handleFlip = (index: number) => {
    if (index === 0) {
      // When the last page is clicked, show the LastPageStory
      setShowLastPageStory(true);
    } else if (index % 2 === 0) {
      bookRef.current.pageFlip().flipPrev("bottom");
    } else {
      bookRef.current.pageFlip().flipNext("bottom");
    }
  };

  const handleStartGame = () => {
    setShowLandingPage(true); // Show the landing page (which will show the game when Play is clicked)
  };


  const handleExit = () => {
    window.close(); // Close the window
  };

  if (showLandingPage) {
    return <LandingPage />; // Show the game when Play button is clicked
  }

  if (showLastPageStory) {
    return <LastPageStory onStartGame={handleStartGame} onExit={handleExit} />;
  }

  return (
    <div className="root">
      <h1 style={{ textAlign: "center" }}>دينو لا يملك أجنحة</h1>
      <HTMLFlipBook

        {...props}
        ref={bookRef}
        width={550}
        height={733}
        useMouseEvents={false}
        direction="rtl"
        style={{ direction: "rtl" }}
        startPage={imagePaths.length - 1} // Start from the last page
      >
        {imagePaths.slice().reverse().map((imagePath, index) => (
          <div
            key={index}
            className="page"
            onClick={() => {
              if (!editModeOn) {
                handleFlip(index);
              }
            }}
            style={{ direction: "rtl" }}
          >
            <div className="page-content">
              <img
                src={imagePath}
                alt={`Page ${index + 1}`}
                className="page-image"
              />
              <p className="page-footer" style={{ textAlign: "center" }}>
                {imagePaths.length - index}
              </p>
            </div>
          </div>
        ))}
      </HTMLFlipBook>
    </div>
  );
};

export default DinoBook;
