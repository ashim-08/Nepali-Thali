// Categories based on recipe cuisines from DummyJSON API
export const getCategoryFromProduct = (cuisine) => {
  const categoryMap = {
    italian: "Italian",
    american: "American",
    asian: "Asian",
    mexican: "Mexican",
    mediterranean: "Mediterranean",
    indian: "Indian",
    thai: "Thai",
    japanese: "Japanese",
    chinese: "Chinese",
    french: "French",
    greek: "Greek",
    "middle eastern": "Middle Eastern",
    korean: "Korean",
    lebanese: "Lebanese",
    moroccan: "Moroccan",
    turkish: "Turkish",
    pakistani: "Pakistani",
  };

  return (
    categoryMap[cuisine?.toLowerCase()] ||
    (cuisine
      ? cuisine.charAt(0).toUpperCase() + cuisine.slice(1)
      : "Traditional")
  );
};

export const getAllCategories = (products) => {
  const categories = new Set();
  categories.add("All");

  products.forEach((product) => {
    if (product.category) {
      categories.add(getCategoryFromProduct(product.category));
    }
  });

  return Array.from(categories).sort();
};

