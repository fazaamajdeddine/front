import React, { useEffect, useState } from 'react';
import CategoryCard from '../components/CategoryCard';
import { getCategoryColor, Preferences } from '../helpers/helpers';

const Library: React.FC = () => {
    const [currentSlide, setCurrentSlide] = useState(0); // State to track the current slide index
    const [categories, setCategories] = useState<
        { name: keyof typeof Preferences; color: string }[] | null
    >(null);

    useEffect(() => {
        const categoryData = Object.entries(Preferences).map(([name]) => ({
            name: name as keyof typeof Preferences,
            color: getCategoryColor(Preferences[name as keyof typeof Preferences]),
        }));
        setCategories(categoryData);
    }, []);

    return (
        <div className="mx-0"> {/* Remove default container padding */}

            <div className='my-8 px-20 pl-20'> {/* Added pl-4 for left padding */}
                <h3 className="text-[16px] font-semibold text-[#FF1276]">Trending Stories</h3>
                <h3 className="text-[36px] font-bold text-black">Popular Stories</h3>

                <p className="m  const [currentSlide, setCurrentSlide] = useState(0); // State to track the current slide index
t-4 text-lg text-gray-600 leading-relaxed max-w-lg">
                    Timeless tales that spark imagination and adventure...
                </p>

            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-20 mt-6">
                {Array.from({ length: 4 }).map((_, index) => (
                    <div
                        className="relative w-[289px] h-[352px] bg-[#F7EFCC] border border-[#C7C7C7] rounded-lg flex items-center justify-center cursor-pointer"
                    //onClick={onClick} 
                    >
                        {/* Use the coverImage prop for the image source */}
                        <img
                            src="/story.svg"
                            alt="Story Icon"
                            className="absolute top-1/2 transform -translate-y-1/2 w-auto h-auto"
                        />

                        {/* Bottom container */}
                        <div className="absolute bottom-0 w-full h-[96px] bg-[#FBA628] rounded-b-lg border-t border-[#C7C7C7]" />
                    </div>
                ))}
            </div>
            {/* Categories Section */}
            <div className="py-10">
                <h1 className="text-center text-2xl mb-6">Categories</h1>
                <div className="grid grid-cols-3 md:grid-cols-5 gap-4 px-4">
                    {categories?.map((category, index) => (
                        <CategoryCard key={index} categoryName={category.name} color={category.color} />
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-20 mt-6">
                {Array.from({ length: 12 }).map((_, index) => (
                    <div
                        className="relative w-[289px] h-[352px] bg-[#F7EFCC] border border-[#C7C7C7] rounded-lg flex items-center justify-center cursor-pointer"
                    // onClick={onClick} 
                    >
                        {/* Use the coverImage prop for the image source */}
                        <img
                            src="/story.svg"
                            alt="Story Icon"
                            className="absolute top-1/2 transform -translate-y-1/2 w-auto h-auto"
                        />

                        {/* Bottom container */}
                        <div className="absolute bottom-0 w-full h-[96px] bg-[#FBA628] rounded-b-lg border-t border-[#C7C7C7]" />
                    </div>
                ))}
            </div>
            <hr className="my-8 border-t border-gray-300" />

        </div>
    );
};

export default Library;