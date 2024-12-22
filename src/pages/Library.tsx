import React, { useEffect, useState } from 'react';
import CategoryCard from '../components/CategoryCard';
import { getCategoryColor, Preferences } from '../helpers/helpers';
import StoryCard from '../components/StoryCard'; // Import the StoryCard component

const Library: React.FC = () => {
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

    // Arrays for images
    const storyImages = [
        '/storylib1.svg',
        '/storylib2.svg',
        '/storylib3.svg',
        '/storylib4.svg',
    ];

    const libraryImages = [
        '/storylib1.svg',
        '/storylib2.svg',
        '/storylib3.svg',
        '/storylib4.svg',
        '/storylib5.svg',
        '/storylib6.svg',
        '/storylib7.svg',
        '/storylib8.svg',
        '/storylib9.svg',
        '/storylib10.svg',
        '/storylib11.svg',
        '/storylib12.svg',
    ];

    // Titles for the library stories
    const libraryTitles = [
        "حالة الطقس لهذا اليوم يا جدي",
        "كوزي",
        "سندراني غواصة الاعماق",
        "البطتان و الثعلب",
        "الجميلة و الوحش",
        "انا ممتنة",
        "بيت ستي",
        "من يساعد الدجاجة",
        "لا تقلق يا بابا",
        "انا مدهشة",
        "اختي الصغيرة",
        "اشارك ألعابي"
    ];

    const handleStoryClick = (index: number) => {
        console.log(`Story ${index + 1} clicked!`);
    };

    return (
        <div className="mx-0"> {/* Remove default container padding */}

            <div className='my-8 px-20 pl-20'> {/* Added pl-4 for left padding */}
                <h3 className="text-[16px] font-semibold text-[#FF1276]">Trending Stories</h3>
                <h3 className="text-[36px] font-bold text-black">Popular Stories</h3>

                <p className="mt-4 text-lg text-gray-600 leading-relaxed max-w-lg">
                    Timeless tales that spark imagination and adventure...
                </p>
            </div>

            {/* First Grid for Trending Stories */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-20 mt-6">
                {storyImages.map((image, index) => (
                    <StoryCard
                        key={index}
                        onClick={() => handleStoryClick(index)}
                        coverImage={image}
                        title={libraryTitles[index]} // Use the title from the array
                    />
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

            {/* Second Grid for Library Stories */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-20 mt-6">
                {libraryImages.map((image, index) => (
                    <StoryCard
                        key={index}
                        onClick={() => handleStoryClick(index)}
                        coverImage={image}
                        title={libraryTitles[index]} // Use the title from the array
                    />
                ))}
            </div>

            <hr className="my-8 border-t border-gray-300" />
        </div>
    );
};

export default Library;