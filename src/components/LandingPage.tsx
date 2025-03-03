import React, { useState } from "react";
import { useLocation } from "react-router-dom"; // Import useHistory for navigation
import Sketch from "./Sketch";
import DinoSketch from "./DinoSketch";

const LandingPage: React.FC = () => {
    const [showSketch, setShowSketch] = useState(false);
    const location = useLocation();

    const handlePlayClick = () => {
        setShowSketch(true); // Trigger fullscreen Sketch view
    };

    const isDinoRoute = location.pathname === "/story/story-1";


    if (showSketch) {
        // Render Sketch or DinoSketch fullscreen
        return isDinoRoute ? <DinoSketch /> : <Sketch />;
    }

    return (
        <div className="w-full h-screen flex justify-center items-center relative">


            {/* Main Container */}
            <div
                className={`relative rounded-[64px] transition-all duration-300 border-8 border-[#F9A293]`}
                style={{
                    width: "700px",
                    height: "550px",
                    backgroundImage: "url('/bg-landing-game.svg')",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                }}
            >
                {/* Landing Page Content */}
                <div className="absolute inset-0 flex flex-col justify-center items-center space-y-4">
                    <button
                        className="px-8 py-3 text-white font-bold bg-[#FBA628] opacity-80 hover:opacity-100 rounded-full text-lg transition duration-200"
                        onClick={handlePlayClick} // Trigger Sketch view
                    >
                        Play
                    </button>
                    <button
                        className="px-8 py-3 text-white font-bold bg-[#FE207D] opacity-80 hover:opacity-100 rounded-full text-lg transition duration-200"
                    >
                        Continue
                    </button>
                    <button
                        className="px-8 py-3 text-white font-bold bg-[#75B936] opacity-80 hover:opacity-100 rounded-full text-lg transition duration-200"
                    >
                        Exit
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;