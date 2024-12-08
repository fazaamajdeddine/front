import React, { useState } from "react";
import "./Sketch.css";
import GameSuccessPopup from './GameSuccessPopup'; // Adjust the path as necessary

interface Character {
  id: number;
  name: string;
  image: string;
  targetX: number;
  targetY: number;
  width: number;
  height: number;
}

const TOTAL_SCENES = 5;
const POINTS_PER_SCENE = 20;

const DinoSketch: React.FC = () => {
  const [currentScene, setCurrentScene] = useState(1);
  const [characters, setCharacters] = useState<Character[]>(getSceneCharacters(1));
  const [draggedCharacter, setDraggedCharacter] = useState<number | null>(null);
  const [highlightedZone, setHighlightedZone] = useState<number | null>(null);
  const [placedCharacters, setPlacedCharacters] = useState<number[]>([]);
  const [clickCount, setClickCount] = useState(0);
  const [backgroundImage, setBackgroundImage] = useState(`/dinoscene1fergha.svg`);
  const [progress, setProgress] = useState(0);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  function getSceneCharacters(scene: number): Character[] {
    switch (scene) {
      case 1:
        return [
          { id: 1, name: `شخصية 1`, image: `/dinocharachter1scene3.png`, targetX: 1300, targetY: 1250, width: 120, height: 160 },
          { id: 2, name: `شخصية 2`, image: `/dinocharachter2scene1.png`, targetX: 900, targetY: 1200, width: 80, height: 80 },

        ];
      case 2:
        return [
          { id: 1, name: `شخصية 1`, image: `/dinocharachter1scene2.png`, targetX: 975, targetY: 1000, width: 160, height: 160 },
          { id: 2, name: `شخصية 2`, image: `/dinocharachter2scene2.png`, targetX: 1400, targetY: 950, width: 100, height: 200 },
        ];
      case 3:
        return [
          { id: 1, name: `شخصية 1`, image: `/dinocharachter1scene3.png`, targetX: 1350, targetY: 1100, width: 160, height: 160 },
          { id: 2, name: `شخصية 2`, image: `/dinocharachter2scene3.png`, targetX: 1100, targetY: 900, width: 80, height: 160 },

        ];
      case 4:
        return [
          { id: 1, name: `شخصية 1`, image: `/dinocharachter1scene4.png`, targetX: 1250, targetY: 1200, width: 120, height: 160 },
          { id: 2, name: `شخصية 2`, image: `/dinocharachter2scene4.png`, targetX: 1000, targetY: 1300, width: 120, height: 140 },
          { id: 3, name: `شخصية 3`, image: `/dinocharachter3scene4.png`, targetX: 900, targetY:1600 , width: 50, height: 50 },

        ];
      case 5:
        return [
          { id: 1, name: `شخصية 1`, image: `/dinocharachter1scene5.png`, targetX: 1000, targetY: 800, width: 160, height: 160 },
          { id: 2, name: `شخصية 2`, image: `/dinocharachter2scene5.png`, targetX: 1350, targetY: 1400, width: 100, height: 100 },
        ];
      default:
        return [];
    }
  }

  const handleDragStart = (id: number) => {
    setDraggedCharacter(id);
  };

  const handleDragEnd = () => {
    setDraggedCharacter(null);
    setHighlightedZone(null);
  };

  const handleDrop = (targetId: number) => {
    if (!draggedCharacter) return;

    if (targetId === draggedCharacter) {
      setPlacedCharacters((prev) => [...prev, draggedCharacter]);

      setCharacters((prev) =>
        prev.map((char) => {
          if (char.id === draggedCharacter) {
            const originalCharacter = characters.find(c => c.id === draggedCharacter);
            if (originalCharacter) {
              return {
                ...char,
                width: originalCharacter.width,
                height: originalCharacter.height,
                targetX: originalCharacter.targetX,
                targetY: originalCharacter.targetY,
              };
            }
          }
          return char;
        })
      );
    }

    setDraggedCharacter(null);
    setHighlightedZone(null);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>, id: number) => {
    event.preventDefault();
    setHighlightedZone(id);
  };

  const toggleGuide = () => {
    setClickCount((prev) => prev + 1);

    if (clickCount === 1) {
      setBackgroundImage(`/dinoscene${currentScene}kemla.png`);

      setTimeout(() => {
        setBackgroundImage(`/dinoscene${currentScene}fergha.svg`);
      }, 1000);
    }
  };

  const handleNextScene = () => {
    if (currentScene < TOTAL_SCENES) {
      setCurrentScene((prev) => prev + 1);
      setCharacters(getSceneCharacters(currentScene + 1));
      setPlacedCharacters([]);
      setBackgroundImage(`/dinoscene${currentScene + 1}fergha.svg`);
      setClickCount(0);
      setProgress((prev) => prev + POINTS_PER_SCENE);
    } else if (progress === 80) {
      // If it's the last scene and the progress bar is filled
      setShowSuccessPopup(true); // Show the success popup
    }
  };


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
    <div className="relative w-[700px] h-[500px]">
      {/* Progress Bar */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-1/4 h-6 bg-gray-300 rounded-full overflow-hidden">
        <div
          className="h-full bg-green-500 transition-all duration-500"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      {/* Background */}
      <div
        className="w-full h-full relative"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        {/* Drop Zones */}
        {characters.map((char) => (
          <div
            key={char.id}
            className={`absolute ${highlightedZone === char.id ? "drop-zone-highlight" : ""} 
              ${placedCharacters.includes(char.id) ? "opacity-0" : "border-4 border-dashed border-gray-400"}`}
            style={{
              top: `${char.targetY / 4}px`,
              left: `${char.targetX / 4}px`,
              width: "80px",
              height: "80px",
            }}
            onDragOver={(e) => handleDragOver(e, char.id)}
            onDrop={() => handleDrop(char.id)}
          />
        ))}

        {/* Placed Characters */}
        {characters.map((char) =>
          placedCharacters.includes(char.id) ? (
            <img
              key={char.id}
              src={char.image}
              alt={char.name}
              className="absolute"
              style={{
                top: `${char.targetY / 4}px`,
                left: `${char.targetX / 4}px`,
                width: `${char.width}px`,
                height: `${char.height}px`,
              }}
            />
          ) : null
        )}
      </div>

      {/* Sidebar */}
      <div className="absolute right-0 top-0 w-1/6 h-full bg-[#FBA628] bg-opacity-60 flex flex-col items-center justify-start p-4 overflow-y-auto">
        <div className="text-right text-sm font-bold mb-4">اختر الشخصية و ضعها في المكان المناسب</div>
        {characters.map(
          (char) =>
            !placedCharacters.includes(char.id) && (
              <div key={char.id} className="mb-2">
                <img
                  src={char.image}
                  alt={char.name}
                  draggable
                  className={`cursor-pointer transition-transform transform hover:scale-110 ${draggedCharacter === char.id ? "dragging" : ""}`}
                  style={{ width: "60px", height: "60px" }}
                  onDragStart={() => handleDragStart(char.id)}
                  onDragEnd={handleDragEnd}
                />
                <div>{char.name}</div>
              </div>
            )
        )}
        <div className="text-right text-sm font-bold mt-2 mb-4">مساعدة ({clickCount}/2)</div>
        <img
          src="/aws.png"
          alt="Guide"
          className={`cursor-pointer ${clickCount === 2 ? "disabled" : ""}`}
          onClick={clickCount < 2 ? toggleGuide : undefined}
        />
      </div>

      {/* Button */}
      {placedCharacters.length === characters.length && (
        <button
          className="absolute bottom-5 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-green-500 text-white rounded-lg shadow-md transition-all hover:bg-green-600 focus:outline-none"
          onClick={handleNextScene}
        >
          {currentScene === TOTAL_SCENES ? "انهاء" : "التالي"}
        </button>
      )}

      {showSuccessPopup && <GameSuccessPopup onClose={() => setShowSuccessPopup(false)} />}
    </div>
  </div>
  );
};

export default DinoSketch;