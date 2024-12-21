import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";  // Import useHistory for navigation
import { Preferences, getCategoryColor } from "../helpers/helpers";
import { Loader } from "../components/Loader";
import CategoryCard from "../components/CategoryCard";
import StoryCard from "../components/StoryCard";

export const HomePage = () => {
  const [categories, setCategories] = useState<
    { name: keyof typeof Preferences; color: string }[] | null
  >(null);
  const [fadeIn, setFadeIn] = useState(false); // State for fade animation

  const history = useNavigate(); // Initialize the history object for navigation

  // Dynamically create the categories based on the enum
  useEffect(() => {
    const categoryData = Object.entries(Preferences).map(([name]) => ({
      name: name as keyof typeof Preferences,
      color: getCategoryColor(Preferences[name as keyof typeof Preferences]),
    }));
    setCategories(categoryData);
  }, []);

  // Fade-in effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeIn(true); // Set fadeIn to true after a delay
    }, 100); // Adjust the delay as needed

    return () => clearTimeout(timer); // Cleanup the timer
  }, []);

  if (!categories) {
    return <Loader />;
  }

  const handleStoryCardClick = (id: string) => {
    history(`/story/${id}`); // Navigate based on the specific ID
  };

  return (
    <div className="mx-0">
      {/* Explore Section */}
      <div className="flex flex-col items-center">
        <div className="flex justify-center items-center my-8 px-20 gap-x-12">
          {/* Titles and Text Section */}
          <div className="flex flex-col items-start space-y-4">
            <div
              className="flex items-center space-x-4"
              style={{ transform: 'rotate(-8.72deg)' }}
            >
              <div
                className="border-dashed border-2 border-[#FF1276] rounded-[12px] flex items-center justify-center"
                style={{ width: '410px', height: '40px' }}
              >
                <h2
                  className="font-bold text-[#ADDCEB]"
                  style={{
                    fontSize: '36px',
                    textShadow:
                      '2px 2px 0 rgba(255, 18, 118, 0.5), 4px 4px 0 rgba(255, 255, 255, 0.3)',
                  }}
                >
                  Fun to Create
                </h2>
              </div>
            </div>

            {/* Main Content */}
            <h3 className="text-[32px] font-bold text-[#FBA628] pt-6">READ AND PLAY</h3>
            <p className="mt-4 text-lg text-gray-600 leading-relaxed max-w-lg">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vitae
              justo ac sapien cursus viverra nec at enim.
            </p>
            <button className="mt-8 text-[18px] font-bold text-white bg-[#FBA628] rounded-md px-8 py-4 h-[60] w-[189]">
              Explore
            </button>
          </div>

          {/* Image Section with Fade Animation */}
          <div className="relative w-1/2 h-auto">
            <img
              src="/explore-photo.svg"
              alt="Explore"
              className={`w-[400px] h-auto transition-opacity duration-500 ${fadeIn ? 'opacity-100' : 'opacity-0'}`} // Apply fade effect
            />
          </div>
        </div>
      </div>

      {/* Top picks Section */}
      <div className="bg-[#FBA628] w-full h-[183px] flex flex-col items-center justify-center">
        <p className="text-[#FF1276] text-[16px] font-semibold mb-1">TOP PICKS</p>
        <h2 className="text-[#ffffff] text-[32px ] font-bold mb-1">Sort by category</h2>
        <p className="text-center text-black max-w-lg">
          Exciting journeys that ignite curiosity. Whimsical worlds filled with
          magic and wonder.
        </p>
      </div>

      {/* Categories Section */}
      <div className="py-10">
        <h1 className="text-center text-2xl mb-6">Categories</h1>
        <div className="grid grid-cols-3 md:grid-cols-5 gap-4 px-4">
          {categories.map((category, index) => (
            <CategoryCard key={index} categoryName={category.name} color={category.color} />
          ))}
        </div>
      </div>

      {/* Grid with StoryCards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5 px-20 mt-6">
        <StoryCard
          onClick={() => handleStoryCardClick('story-0')}
          coverImage="/story.svg" // Cover for the first story
          title="بوبي في الدكان"
        />
        <StoryCard
          onClick={() => handleStoryCardClick('story-1')}
          coverImage="/dinocover.svg" // Cover for the Dino story
          title="دينو لا يملك أجنحة"
        />
      </div>

      {/* Divider */}
      <hr className="my-8 border-dashed border-1 border-[#FF1276]" />

      {/* Floating Button to Top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-4 right-4 p-3 bg-[#FF1276] text-white rounded-full hover:bg-[#FF1276] shadow-lg focus:outline-none "
      >
        <span className="text-2xl font-bold">↑</span>
      </button>
    </div>
  );
};