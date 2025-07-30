import React from "react";

const categories = [
  { name: "All", src: "/Icons/pizza.png" },
  { name: "Breakfast", src: "/Icons/hamburger.png" },
  { name: "Lunch", src: "/Icons/noodle.png" },
  { name: "Dinner", src: "/Icons/ice-cream.png" },
  { name: "Snacks", src: "/Icons/drink.png" },
  { name: "Dessert", src: "/Icons/drink.png" },
  { name: "Beverages", src: "/Icons/drink.png" },
  { name: "Vegetarian", src: "/Icons/drink.png" },
];

const Categories = ({ onCategorySelect, selectedCategory = "All" }) => {
  const handleClick = (categoryName) => {
    onCategorySelect(categoryName);
  };

  return (
    <div className="my-8 mx-3 md:mx-8">
      <div className="text-black font-bold text-2xl md:text-3xl mb-6">
        Categories
      </div>
      <div className="flex flex-wrap gap-4 md:gap-6 justify-center">
        {categories.map((category) => (
          <div
            key={category.name}
            className={`flex flex-col items-center gap-2 cursor-pointer font-medium transition-all duration-300 p-3 rounded-xl ${
              selectedCategory === category.name
                ? "text-orange-600 bg-orange-50 shadow-md"
                : "text-gray-700 hover:text-orange-600 hover:bg-orange-50"
            }`}
            onClick={() => handleClick(category.name)}
          >
            <div
              className={`rounded-full p-3 transition-all duration-300 ${
                selectedCategory === category.name
                  ? "bg-orange-500 shadow-lg transform scale-110"
                  : "bg-gray-200 hover:bg-orange-400 hover:shadow-md"
              }`}
            >
              <img
                src={category.src}
                alt={category.name}
                className="w-8 h-8 object-contain"
              />
            </div>
            <p className="text-xs sm:text-sm font-semibold">{category.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
