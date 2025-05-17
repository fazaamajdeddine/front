import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Preferences, getCategoryColor } from "../helpers/helpers";
import { Loader } from "../components/Loader";
import CategoryCard from "../components/CategoryCard";
import StoryCard from "../components/StoryCard";

export const HomePage = () => {
  const [categories, setCategories] = useState<
    { name: keyof typeof Preferences; color: string }[] | null
  >(null);

  const history = useNavigate();

  // Dynamically create the categories based on the enum
  useEffect(() => {
    const categoryData = Object.entries(Preferences).map(([name]) => ({
      name: name as keyof typeof Preferences,
      color: getCategoryColor(Preferences[name as keyof typeof Preferences]),
    }));
    setCategories(categoryData);
  }, []);

  if (!categories) {
    return <Loader />;
  }

  const handleStoryCardClick = (id: string) => {
    history(`/story/${id}`);
  };

  return (
    <div className="mx-0">
      {/* Explore Section */}
      <div className="flex flex-col items-center">
        <div className="flex flex-col md:flex-row justify-center items-center my-4 md:my-8 px-4 md:px-8 lg:px-20 gap-y-6 md:gap-x-8 lg:gap-x-12">
          {/* Titles and Text Section */}
          <div className="flex flex-col items-center md:items-start space-y-4 w-full md:w-1/2">
            <div
              className="flex items-center"
              style={{ transform: 'rotate(-8.72deg)' }}
            >
              <div
                className="border-dashed border-2 border-[#FF1276] rounded-lg md:rounded-[12px] flex items-center justify-center w-full max-w-[280px] sm:max-w-[350px] md:max-w-[410px] py-2 md:py-3"
              >
                <h2
                  className="font-bold text-[#ADDCEB] text-xl sm:text-2xl md:text-3xl lg:text-4xl"
                  style={{
                    textShadow:
                      '2px 2px 0 rgba(255, 18, 118, 0.5), 4px 4px 0 rgba(255, 255, 255, 0.3)',
                  }}
                >
                  Fun to Create
                </h2>
              </div>
            </div>

            {/* Main Content */}
            <h3 className="text-xl md:text-2xl lg:text-[32px] font-bold text-[#FBA628] pt-4 md:pt-6">READ AND PLAY</h3>
            <p className="mt-2 md:mt-4 text-base md:text-lg text-gray-600 leading-relaxed max-w-lg text-center md:text-left">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vitae
              justo ac sapien cursus viverra nec at enim.
            </p>
            <button className="mt-4 md:mt-8 text-base md:text-lg font-bold text-white bg-[#FBA628] rounded-md px-6 md:px-8 py-3 md:py-4">
              Explore
            </button>
          </div>

          {/* Image Section with Fade Animation */}
          <div className="relative w-full md:w-1/2 flex justify-center md:justify-end">
            <img 
              src="/explore-photo.svg" 
              alt="Explore" 
              className="w-[250px] sm:w-[300px] md:w-[350px] lg:w-[400px] h-auto"
            />
          </div>
        </div>
      </div>

      {/* Top picks Section */}
      <div className="bg-[#FBA628] w-full py-8 md:py-12 flex flex-col items-center justify-center">
        <p className="text-[#FF1276] text-sm md:text-[16px] font-semibold mb-1">TOP PICKS</p>
        <h2 className="text-[#ffffff] text-2xl md:text-[32px] font-bold mb-1">Sort by category</h2>
        <p className="text-center text-black max-w-lg px-4">
          Exciting journeys that ignite curiosity. Whimsical worlds filled with
          magic and wonder.
        </p>
      </div>

      {/* Categories Section */}
      <div className="py-6 md:py-10">
        <h1 className="text-center text-xl md:text-2xl mb-4 md:mb-6">Categories</h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4 px-4">
          {categories.map((category, index) => (
            <CategoryCard key={index} categoryName={category.name} color={category.color} />
          ))}
        </div>
      </div>

      {/* Grid with StoryCards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5 px-4 md:px-8 lg:px-20 mt-6">
        <StoryCard
          onClick={() => handleStoryCardClick('story-0')}
          coverImage="/story.svg"
          title="بوبي في الدكان"
        />
        <StoryCard
          onClick={() => handleStoryCardClick('story-1')}
          coverImage="/dinocover.svg"
          title="دينو لا يملك أجنحة"
        />
      </div>

      {/* Divider */}
      <hr className="my-6 md:my-8 border-dashed border-1 border-[#FF1276]" />

      {/* Floating Button to Top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-4 right-4 p-3 bg-[#FF1276] text-white rounded-full hover:bg-[#FF1276] shadow-lg focus:outline-none"
      >
        <span className="text-2xl font-bold">↑</span>
      </button>
    </div>
  );
};
