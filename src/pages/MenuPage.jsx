import React, { useState, useEffect } from "react";
import Card from "../components/Product/Card";
import Categories from "../components/Categories/Categories";
import productDataApi from "../data/productData";
import { useSearch } from "../context/SearchContext";
import { Search } from "lucide-react";

const MenuPage = () => {
  console.log("MenuPage");

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { searchQuery } = useSearch();

  useEffect(() => {
    setLoading(true);
    productDataApi((fetchedProducts) => {
      setProducts(fetchedProducts);
      setLoading(false);
    });
  }, []);

  const filterProductsByCategory = (products, category) => {
    if (category === "All") return products;

    return products.filter((product) => {
      const mealTypes = product.mealType || [];
      const tags = product.tags || [];

      if (
        mealTypes.some((type) =>
          type.toLowerCase().includes(category.toLowerCase())
        )
      ) {
        return true;
      }

      if (
        tags.some((tag) => tag.toLowerCase().includes(category.toLowerCase()))
      ) {
        return true;
      }

      switch (category.toLowerCase()) {
        case "breakfast":
          return mealTypes.some((type) =>
            type.toLowerCase().includes("breakfast")
          );
        case "lunch":
          return mealTypes.some((type) => type.toLowerCase().includes("lunch"));
        case "dinner":
          return mealTypes.some((type) =>
            type.toLowerCase().includes("dinner")
          );
        case "snacks":
          return (
            mealTypes.some((type) => type.toLowerCase().includes("snack")) ||
            tags.some((tag) => tag.toLowerCase().includes("snack"))
          );
        case "dessert":
          return (
            mealTypes.some((type) => type.toLowerCase().includes("dessert")) ||
            tags.some((tag) => tag.toLowerCase().includes("dessert")) ||
            tags.some((tag) => tag.toLowerCase().includes("sweet"))
          );
        case "beverages":
          return (
            mealTypes.some((type) => type.toLowerCase().includes("beverage")) ||
            tags.some((tag) => tag.toLowerCase().includes("drink")) ||
            tags.some((tag) => tag.toLowerCase().includes("beverage"))
          );
        case "vegetarian":
          return (
            tags.some((tag) => tag.toLowerCase().includes("vegetarian")) ||
            tags.some((tag) => tag.toLowerCase().includes("veg"))
          );
        case "spicy":
          return (
            tags.some((tag) => tag.toLowerCase().includes("spicy")) ||
            tags.some((tag) => tag.toLowerCase().includes("hot"))
          );
        case "traditional":
          return (
            tags.some((tag) => tag.toLowerCase().includes("traditional")) ||
            tags.some((tag) => tag.toLowerCase().includes("authentic")) ||
            tags.some((tag) => tag.toLowerCase().includes("nepali"))
          );
        default:
          return false;
      }
    });
  };

  const filteredByCategory = filterProductsByCategory(
    products,
    selectedCategory
  );

  const filteredProducts = filteredByCategory.filter(
    (product) =>
      (product.name || product.title || "")
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      (product.description || product.instructions?.[0] || "")
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      (product.mealType || product.tags || []).some((type) =>
        type.toLowerCase().includes(searchQuery.toLowerCase())
      ) ||
      (product.ingredients || []).some((ingredient) =>
        ingredient.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-24 flex justify-center items-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Our Menu</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover authentic Nepali cuisine with fresh ingredients and
            traditional recipes
          </p>

          {(searchQuery || selectedCategory !== "All") && (
            <div className="mt-4 flex items-center justify-center gap-2 text-orange-600">
              <Search size={20} />
              <span className="text-lg">
                {filteredProducts.length} result
                {filteredProducts.length !== 1 ? "s" : ""}
                {searchQuery && ` for "${searchQuery}"`}
                {selectedCategory !== "All" && ` in ${selectedCategory}`}
              </span>
            </div>
          )}
        </div>

        <Categories
          onCategorySelect={handleCategorySelect}
          selectedCategory={selectedCategory}
        />

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center mt-8">
            {filteredProducts.map((product) => (
              <Card key={product.id} data={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Search size={64} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              No dishes found
            </h3>
            <p className="text-gray-500">
              {searchQuery
                ? `No results found for "${searchQuery}" in ${selectedCategory} category.`
                : `No dishes available in ${selectedCategory} category.`}
              <br />
              Try selecting a different category or adjusting your search.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MenuPage;
