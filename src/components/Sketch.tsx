import React, { useState } from "react";
import "./Sketch.css";
import GameSuccessPopup from "./GameSuccessPopup"; // Adjust the path as necessary
import { useNavigate } from "react-router";

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

// Define a type for the scene keys
type SceneKey = 1 | 2 | 3 | 4 | 5;

const SCENE_TEXTS: Record<SceneKey, string> = {
  1: "تشكّيات الحرفاء أصبحت تهدّد تجارتي... يجب أن أجد حلّا لهذه المشكلة دون أن أستعمل دواء. الدواء قد يضرّ بالمنتوجات ويؤثر ذلك سلبيا على صحة الحرفاء. ... (تتأمّل) أظنني وجدت الحلّ (تغلق باب الدكان من الخارج وتمشي في الشارع الطويل الذي يحوي بعض الدكاكين وبعض العربات التي تبيع الخضر، وهناك اشخاص يظهرون في الشارع...)",
  2: "(الباب في منزل امي سيسي يطرق، القط بوبي نائم على حشيّة وراء الباب، يرفع رأسه منزعجا ويطلق مواء لتنبيه صاحبة البيت) (في سقيفة المنزل، تقف امي سيسي والأم خيرة متقابلتين)",
  3: "(تسير أمي سيسي في الطريق المؤدّية لدكان الأم خيرة وهي تحمل قفّة يطلّ منها رأس بوبي القط وعلامات الحيرة بادية على وجهه، بينما تسير عبر الشارع الضيق والمبلط بالأحجار. ترى الأطفال يلعبون في الحديقة والشمس تميل نحو الغروب...)",
  4: "الأم خيرة: • شكرًا لك، أمي سيسي! بوبي، أرحب بك في الدكان! أتمنى أن يكون لدينا وقت ممتع سويًا.",
  5: "مشهد ختامي: بوبي يقف على رف في الدكان، والأطفال يضحكون وهم يشترون من دكان الأم خيرة. أمي سيسي تبتسم بينما تعود أدراجها إلى منزلها."
};

const Sketch: React.FC = () => {
  const [currentScene, setCurrentScene] = useState<SceneKey>(1);
  const [characters, setCharacters] = useState<Character[]>(getSceneCharacters(1));
  const [draggedCharacter, setDraggedCharacter] = useState<number | null>(null);
  const [highlightedZone, setHighlightedZone] = useState<number | null>(null);
  const [placedCharacters, setPlacedCharacters] = useState<number[]>([]);
  const [clickCount, setClickCount] = useState(0);
  const [backgroundImage, setBackgroundImage] = useState(`/scene1fergha.svg`);
  const [progress, setProgress] = useState(0);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  function getSceneCharacters(scene: SceneKey): Character[] {
    switch (scene) {
      case 1:
        return [
          { id: 1, name: "شخصية 1", image: "/charachter1scene1.png", targetX: 1155, targetY: 675, width: 120, height: 120 },
        ];
      case 2:
        return [
          { id: 1, name: "شخصية 1", image: "/charachter1schene2.png", targetX: 1000, targetY: 850, width: 160, height: 160 },
          { id: 2, name: "شخصية 2", image: "/charachter2schene2.png", targetX: 1400, targetY: 1000, width: 85, height: 85 },
        ];
      case 3:
        return [
          { id: 1, name: "شخصية 1", image: "/charachter1scene3.png", targetX: 1650, targetY: 1100, width: 80, height: 120 },
        ];
      case 4:
        return [
          { id: 1, name: "شخصية 1", image: "/charachter1scene4.png", targetX: 1000, targetY: 1275, width: 80, height: 80 },
          {
            id: 2, name: "شخصية 2", image: "/charachter2scene4.png", targetX: 1375, targetY: 900, width: 160, height: 160
          },
          { id: 3, name: "شخصية 3", image: "/charachter3scene4.png", targetX: 1125, targetY: 850, width: 140, height: 220 },
        ];
      case 5:
        return [
          { id: 1, name: "شخصية 1", image: "/charachter1scene5.png", targetX: 1000, targetY: 1350, width: 120, height: 120 },
          { id: 2, name: "شخصية 2", image: "/charachter2scene5.png", targetX: 1350, targetY: 1350, width: 100, height: 100 },
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
            const originalCharacter = characters.find((c) => c.id === draggedCharacter);
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
  const history = useNavigate(); // Initialize useHistory

  const toggleGuide = () => {
    setClickCount((prev) => prev + 1);

    if (clickCount === 1) {
      setBackgroundImage(`/scene${currentScene}kemla.png`);

      setTimeout(() => {
        setBackgroundImage(`/scene${currentScene}fergha.svg`);
      }, 1000);
    }
  };
  const handleExitClick = () => {
    history("/"); // Navigate to the home page
  };
  const handleNextScene = () => {
    if (currentScene < TOTAL_SCENES) {
      const nextScene = currentScene + 1 as SceneKey; // Cast to SceneKey
      setCurrentScene(nextScene);
      setCharacters(getSceneCharacters(nextScene));
      setPlacedCharacters([]);
      setBackgroundImage(`/scene${nextScene}fergha.svg`);
      setClickCount(0);
      setProgress((prev) => prev + POINTS_PER_SCENE);
    } else if (currentScene === TOTAL_SCENES && placedCharacters.length === characters.length) {
      setShowSuccessPopup(true);
    }
  };

  const handlePreviousScene = () => {
    if (currentScene > 1) {
      const previousScene = currentScene - 1 as SceneKey; // Cast to SceneKey
      setCurrentScene(previousScene);
      setCharacters(getSceneCharacters(previousScene));
      setPlacedCharacters([]);
      setBackgroundImage(`/scene${previousScene}fergha.svg`);
      setClickCount(0);
    }
  };

  return (
    <div className="flex flex-col items-center">
      {/* Exit Button */}
      <button
        className="absolute top-4 right-4 px-4 py-2 text-white font-bold bg-red-500 rounded-full transition duration-200 hover:bg-red-600"
        onClick={handleExitClick} // Navigate to home page
      >
        خروج
      </button>
      <div className="relative flex items-center justify-center w-[700px] h-[500px] border border-[#A6AD84] rounded-[32px] border-[10px]">
        <div
          className="w-full h-full relative"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        >
          {/* Progress Bar */}
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-[150px] h-4 bg-gray-300 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#75B936] opacity-80 transition-all duration-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          {/* Drop Zones */}
          {characters.map((char) => (
            <div
              key={char.id}
              className={`absolute ${highlightedZone === char.id ? "drop-zone-highlight" : ""
                } transition-opacity duration-1000 ${placedCharacters.includes(char.id) ? "opacity-0" : "border-4 border-dashed border-gray-400"
                }`}
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
                    className={`cursor-pointer transition-transform transform hover:scale-110 ${draggedCharacter === char.id ? "dragging" : ""
                      }`}
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

        {/* Buttons */}
        <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex space-x-4">
          {currentScene > 1 && (
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md transition-all hover:bg-blue-600 focus:outline-none"
              onClick={handlePreviousScene}
            >
              السابق
            </button>
          )}
          {placedCharacters.length === characters.length && (
            <button
              className="px-4 py-2 bg-green-500 text-white rounded-lg shadow-md transition-all hover:bg-green-600 focus:outline-none"
              onClick={handleNextScene}
            >
              {currentScene === TOTAL_SCENES ? "انهاء" : "التالي"}
            </button>
          )}
        </div>

        {showSuccessPopup && <GameSuccessPopup onClose={() => setShowSuccessPopup(false)} />}
      </div>

      {/* Scene Text Container */}
      <div className="mt-4 w-[700px] bg-white p-4 rounded-lg border border-[#F9A293] shadow-lg text-right">
        <p>{SCENE_TEXTS[currentScene]}</p>
      </div>
    </div>
  );
};

export default Sketch;