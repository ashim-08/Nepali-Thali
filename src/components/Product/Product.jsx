import React, { useEffect, useState } from "react";
import Card from "./Card";
import productDataApi from "../../data/productData";

const Product = ({
  searchQuery = "",
  selectedCategory = "All",
  onProductsLoad,
}) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    productDataApi((fetchedData) => {
      setProducts(fetchedData);
      setLoading(false);
      onProductsLoad && onProductsLoad(fetchedData);
    });
  }, [onProductsLoad]);

  const filterProductsByCategory = (products, category) => {
    if (category === "All") return products;

    return products.filter((product) => {
      // Check meal types
      const mealTypes = product.mealType || [];
      if (
        mealTypes.some((type) =>
          type.toLowerCase().includes(category.toLowerCase())
        )
      ) {
        return true;
      }

      // Check tags
      const tags = product.tags || [];
      if (
        tags.some((tag) => tag.toLowerCase().includes(category.toLowerCase()))
      ) {
        return true;
      }

      // Special category filtering logic
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
      (product.name || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (product.description || "")
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      (product.ingredients || []).some((ingredient) =>
        ingredient.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  if (loading) {
    return (
      <div className="px-5 py-3">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Our Menu</h2>
          <span className="text-gray-600">Loading...</span>
        </div>
        <div className="pt-24 flex flex-col items-center justify-center space-y-6 text-gray-700">
          <div className="animate-spin rounded-full h-20 w-20 border-b-2 border-orange-500"></div>
          <p className="text-lg">Loading delicious dishes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="px-5 py-3">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          {selectedCategory === "All" ? "Our Menu" : selectedCategory}
        </h2>
        <span className="text-gray-600">{filteredProducts.length} items</span>
      </div>

      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
          {filteredProducts.map((product) => (
            <Card key={product.id} data={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">
            No dishes found
          </h3>
          <p className="text-gray-500">
            {searchQuery
              ? `No results found for "${searchQuery}" in ${selectedCategory}`
              : `No dishes available in ${selectedCategory} category`}
          </p>
        </div>
      )}
    </div>
  );
};

export default Product;
