import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import NavBar from "./components/NavBar/NavBar"; // Assuming this path is correct
import Footer from "./components/Footer/Footer"; // Assuming this path is correct
import HeroSection from "./components/HeroSection/HeroSection"; // Assuming this path is correct
import Categories from "./components/Categories/Categories"; // Assuming this path is correct
import Product from "./components/Product/Product"; // Assuming this path is correct
import CartPage from "./pages/CartPage"; // Assuming this path is correct
import MenuPage from "./pages/MenuPage"; // Assuming this path is correct
import AboutPage from "./pages/AboutPage"; // Assuming this path is correct
import ContactPage from "./pages/ContactPage"; // Assuming this path is correct
import { CartProvider } from "./context/CartContext"; // Assuming this path is correct
import { scrollToTopInstant } from "./utils/scrollToTop"; // Assuming this path is correct
import { SearchProvider } from "./context/SearchContext"; // Assuming this path is correct
import MainAuth from "./components/Authentication/MainAuth"; // Path to your MainAuth component
import Settings from "./components/Authentication/Setting"; // Path to your Settings component
import NotFound from "./pages/NotFound";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    scrollToTopInstant();
  }, [pathname]);

  return null;
};

const AppContent = () => {
  const location = useLocation();
  const isAuthRoute = location.pathname === "/auth";

  // These states are only used by HeroSection, Categories, Product and are passed down
  // They are not directly related to the NavBar's search/category, which now uses SearchContext
  const [searchQuery, setSearchQuery] = useState(""); // This state might become redundant if Product fully uses SearchContext
  const [selectedCategory, setSelectedCategory] = useState("All"); // This state might become redundant if Categories/Product fully use contexts
  const [products, setProducts] = useState([]); // This is for product data, good to keep

  useEffect(() => {
    const handleRightClick = (e) => e.preventDefault();
    document.addEventListener("contextmenu", handleRightClick);
    return () => {
      document.removeEventListener("contextmenu", handleRightClick);
    };
  }, []);

  // These handlers might become redundant if search/category filtering is done via context in NavBar/Categories/Product
  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setSearchQuery("");
  };

  return (
    <>
      {/* NavBar is conditionally rendered based on whether it's the auth route */}
      {!isAuthRoute && <NavBar onSearch={handleSearch} />}
      <main
        className={`bg-gray-50 min-h-screen ${!isAuthRoute ? "mt-20" : ""}`}
      >
        {" "}
        {/* Adjust mt-20 conditionally */}
        <Routes>
          <Route
            path="/"
            element={
              <>
                <HeroSection />
                <Categories
                  onCategorySelect={handleCategorySelect}
                  selectedCategory={selectedCategory}
                />
                <Product
                  searchQuery={searchQuery} // Consider using SearchContext here
                  selectedCategory={selectedCategory} // Consider using a CategoryContext here
                  onProductsLoad={setProducts}
                />
              </>
            }
          />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          {/* MainAuth handles rendering Login/Signup based on URL query params */}
          <Route path="/auth" element={<MainAuth />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {!isAuthRoute && <Footer />}
    </>
  );
};

function App() {
  return (
    <CartProvider>
      <SearchProvider>
        <Router>
          <ScrollToTop />
          <AppContent />
        </Router>
      </SearchProvider>
    </CartProvider>
  );
}

export default App;
