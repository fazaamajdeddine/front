// src/components/CategoryCard.tsx
import React from 'react';

interface CategoryCardProps {
  categoryName: string;  // We expect the category name as a string
  color: string;         // The color associated with this category
}

const CategoryCard: React.FC<CategoryCardProps> = ({ categoryName, color }) => {
  // Get the background and icon for the category
  const categoryBackground = `/${categoryName.toLowerCase()}-bg.svg`; // Dynamically create background path
  const categoryIcon = `/icon-${categoryName.toLowerCase()}.svg`; // Dynamically create icon path

  return (
    <div className="flex flex-col items-center space-y-2">
      {/* Category Background with Color Overlay */}
      <div className="relative w-[150px] h-[150px] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <img
          src={categoryBackground}
          alt={`${categoryName} background`}
          className="absolute inset-0 w-full h-full "
          style={{ mixBlendMode: 'multiply' }}
        />
        {/* Icon Overlay */}
        <img
          src={categoryIcon}
          alt={categoryName}
          className="relative w-[100px] h-[100px] z-10" // Adjust size as needed
        />
      </div>

      {/* Category Button */}
      <button
        className="text-black font-semibold px-4 py-2 rounded-full"
        style={{ backgroundColor: color }} // Dynamically apply the color
      >
        {categoryName} {/* Display category name in black */}
      </button>
    </div>
  );
};

export default CategoryCard;
