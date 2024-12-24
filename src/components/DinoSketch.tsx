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

// Define a type for the scene keys
type SceneKey = 1 | 2 | 3 | 4 | 5;

const SCENE_TEXTS: Record<SceneKey, string> = {
  1: "في صباح مشمس، يركض دينو الصغير بين الأشجار ويقفز بحماس محاولًا إمساك حشرة تطير بالقرب منه. يحاول القفز عدة مرات، لكنه لا يتمكن من الوصول إليها.\nدينـو (ببراءة): \"أوه، يا ليتني أستطيع الطيران مثل هذه الحشرة! لكن... لماذا لهذه الحشرة أجنحة، بينما أنا لا؟\"",
  2: "يعود دينو إلى والدته في المنزل ويسألها عن سبب امتلاك بعض الحيوانات أجنحة.\nدينـو: \"ماما، لماذا لبعض الحيوانات أجنحة؟ أريد أن أطير أيضًا!\"\nالأم (تبتسم): \"حسنًا، يا دينو، بعض الحيوانات لديها أجنحة لتساعدها في الطيران أو الانتقال من مكان إلى آخر. هذا يجعلها قادرة على رؤية العالم من الأعلى، أو الهروب من الحيوانات المفترسة.\"",
  3: "بينما تتحدث الأم مع دينو، يظهر طائر صغير (دعنا نسميه \"توتو\") ويهبط بجانبهم.\nتوتو: \"مرحبًا، يا دينو! سمعت أنك تتحدث عن الأجنحة. أنا لدي أجنحة، وأستطيع الطيران!\"\nدينـو (بتحمس): \"واو! كيف تشعر وأنت تطير، توتو؟ هل بإمكانك أن تريني كيف تطير؟\"",
  4: "حاول دينو تقليد توتو، ويقفز في الهواء عدة مرات محاولًا الطيران، لكنه يسقط على الأرض في كل مرة. الجميع يضحك بلطف، حتى دينو نفسه يضحك من محاولاته الطريفة.",
  5: "بعدما استمتع بتجربته وتعلم أكثر عن الأجنحة، يشعر دينو بالرضا ويشكر توتو وأمه على الشرح.\nدينـو (بفرح): \"لقد فهمت الآن! بعض الحيوانات لديها أجنحة لتساعدها على الطيران، بينما أنا لدي أشياء أخرى تجعلني مميزًا. سأستمتع بالجري واللعب بدلًا من الطيران!\"\nالأم: \"هذا صحيح يا دينو! والأهم أن تتقبل نفسك كما أنت وتكتشف العالم بطريقتك الخاصة.\""
};

const DinoSketch: React.FC = () => {
  const [currentScene, setCurrentScene] = useState<SceneKey>(1);
  const [characters, setCharacters] = useState<Character[]>(getSceneCharacters(1));
  const [draggedCharacter, setDraggedCharacter] = useState<number | null>(null);
  const [highlightedZone, setHighlightedZone] = useState<number | null>(null);
  const [placedCharacters, setPlacedCharacters] = useState<number[]>([]);
  const [clickCount, setClickCount] = useState(0);
  const [backgroundImage, setBackgroundImage] = useState(`/dinoscene1fergha.svg`);
  const [progress, setProgress] = useState(0);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  function getSceneCharacters(scene: SceneKey): Character[] {
    switch (scene) {
      case 1:
        return [
          { id: 1, name: `شخصية 1`, image: `/dinocharachter1scene3.png`, targetX: 1300, targetY: 1250, width: 120, height: 160 },
          { id: 2, name: `شخصية 2`, image: `/dinocharachter2scene1.png`, targetX: 900, targetY: 1200, width: 80, height: 80 },
        ];
      case 2:
        return [
          { id: 1, name: `شخص ية 1`, image: `/dinocharachter1scene2.png`, targetX: 975, targetY: 1000, width: 160, height: 160 },
          { id: 2, name: `شخصية 2`, image: `/dinocharachter2scene2.png`, targetX: 1400, targetY: 950, width: 100, height: 200 },
        ];
      case 3:
        return [
          { id: 1, name: `شخصية 1`, image: `/dinocharachter1scene3.png`, targetX: 1350, targetY: 1100, width: 160, height: 160 },
          { id: 2, name: `شخصية 2`, image: `/dinocharachter2scene3.png`, targetX: 1100, targetY: 900, width: 80, height: 160 },
        ];
      case 4:
        return [
          { id: 1, name: `شخصية 1`, image: `/dinocharachter1scene4.png`, targetX: 1250, targetY: 1050, width: 120, height: 160 },
          { id: 2, name: `شخصية 2`, image: `/dinocharachter2scene4.png`, targetX: 1000, targetY: 1150, width: 120, height: 140 },
          { id: 3, name: `شخصية 3`, image: `/dinocharachter3scene4.png`, targetX: 900, targetY: 1450, width: 50, height: 50 },
        ];
      case 5:
        return [
          { id: 1, name: `شخصية 1`, image: `/dinocharachter1scene5.png`, targetX: 850, targetY: 1000, width: 160, height: 160 },
          { id: 2, name: `شخصية 2`, image: `/dinocharachter2scene5.png`, targetX: 1350, targetY: 1250, width: 100, height: 100 },
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
      const nextScene = currentScene + 1 as SceneKey; // Cast to SceneKey
      setCurrentScene(nextScene);
      setCharacters(getSceneCharacters(nextScene));
      setPlacedCharacters([]);
      setBackgroundImage(`/dinoscene${currentScene + 1}fergha.svg`);
      setClickCount(0);
      setProgress((prev) => prev + POINTS_PER_SCENE);
    } else if (progress === 80) {
      setShowSuccessPopup(true);
    }
  };

  return (
    <div className="flex flex-col items-center">
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

      {/* Scene Text Container */}
      <div className="mt-4 w-[700px] bg-white p-4 rounded-lg border border-[#F9A293] shadow-lg text-right">
        <p>{SCENE_TEXTS[currentScene]}</p>
      </div>
    </div>
  );
};

export default DinoSketch;