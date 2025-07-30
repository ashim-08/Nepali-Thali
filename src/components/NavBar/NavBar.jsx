import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, Menu, X, ShoppingCart, User, ChevronDown } from "lucide-react";
import { useCart } from "./../../context/CartContext"; // Adjust path as needed
import { useSearch } from "./../../context/SearchContext"; // Adjust path as needed

const NavBar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [authDropdownOpen, setAuthDropdownOpen] = useState(false);
  const [mobileAuthDropdownOpen, setMobileAuthDropdownOpen] = useState(false);

  const { totalItems } = useCart();
  const { searchQuery, setSearchQuery } = useSearch();
  const navigate = useNavigate();

  const dropdownRef = useRef();
  const mobileDropdownRef = useRef();

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const toggleAuthDropdown = () => setAuthDropdownOpen(!authDropdownOpen);
  const toggleMobileAuthDropdown = () =>
    setMobileAuthDropdownOpen(!mobileAuthDropdownOpen);

  const performSearch = () => {
    if (window.location.pathname !== "/menu") {
      navigate("/menu");
    }
  };

  const handleSearchChange = (e) => setSearchQuery(e.target.value);
  const handleKeyDown = (e) => e.key === "Enter" && performSearch();
  const clearSearch = () => setSearchQuery("");

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setAuthDropdownOpen(false);
      }
      if (
        mobileDropdownRef.current &&
        !mobileDropdownRef.current.contains(event.target)
      ) {
        setMobileAuthDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isLoggedIn = Boolean(localStorage.getItem("authToken"));
  const userNameFromStorage = localStorage.getItem("userName");
  const userInitial = userNameFromStorage
    ? userNameFromStorage.charAt(0).toUpperCase()
    : "U";

  return (
    <nav className="fixed top-2 left-2 right-2 lg:left-4 lg:right-4 bg-white/95 backdrop-blur-lg rounded-2xl border border-orange-100 shadow-xl z-50">
      <div className="flex items-center justify-between h-16 px-3 lg:px-8">
        <Link to="/" className="flex items-center min-w-max">
          <img
            src="logo.png"
            alt="NepaliThali"
            className="h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 object-contain"
          />
        </Link>

        <div className="hidden lg:flex items-center flex-grow justify-evenly">
          <ul className="flex space-x-8 whitespace-nowrap">
            <li>
              <Link
                to="/"
                className="text-gray-700 hover:text-orange-600 font-medium relative group py-2"
              >
                Home
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-500 to-red-500 rounded-full transition-all duration-300 group-hover:w-full" />
              </Link>
            </li>
            <li>
              <Link
                to="/menu"
                className="text-gray-700 hover:text-orange-600 font-medium relative group py-2"
              >
                Menu
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-500 to-red-500 rounded-full transition-all duration-300 group-hover:w-full" />
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="text-gray-700 hover:text-orange-600 font-medium relative group py-2"
              >
                About
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-500 to-red-500 rounded-full transition-all duration-300 group-hover:w-full" />
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="text-gray-700 hover:text-orange-600 font-medium relative group py-2"
              >
                Contact
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-500 to-red-500 rounded-full transition-all duration-300 group-hover:w-full" />
              </Link>
            </li>
          </ul>

          <div className="relative w-96 flex-shrink-0 rounded-full border-2 border-orange-500 bg-white flex overflow-hidden ml-8 shadow-md">
            {searchFocused && (
              <div className="flex items-center px-4 text-orange-500 pointer-events-none">
                <Search size={20} />
              </div>
            )}

            <input
              type="search"
              placeholder="Search dishes..."
              value={searchQuery}
              onChange={handleSearchChange}
              onKeyDown={handleKeyDown}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              className={`flex-grow py-2 text-black placeholder-black focus:outline-none text-base ${
                searchFocused ? "pl-2" : "pl-6"
              }`}
            />

            <div className="w-px h-8 my-auto bg-orange-400"></div>

            {searchQuery && (
              <button
                onClick={clearSearch}
                className="flex items-center justify-center text-red-500 hover:text-red-700 transition-colors focus:outline-none"
                aria-label="Clear search"
                type="button"
              >
                &times;
              </button>
            )}

            <button
              onClick={performSearch}
              className="px-5 flex items-center justify-center text-black hover:bg-orange-100 rounded-r-full transition-colors"
              aria-label="Search"
            >
              <Search size={20} />
            </button>
          </div>
        </div>

        <div className="hidden lg:flex items-center ml-6 space-x-4">
          <button
            onClick={() => navigate("/cart")}
            className="relative text-orange-500 hover:text-orange-600 p-2.5 rounded-xl hover:bg-orange-50"
            title="Cart"
          >
            <ShoppingCart size={24} />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold shadow-lg">
                {totalItems}
              </span>
            )}
          </button>

          <div className="relative" ref={dropdownRef}>
            {isLoggedIn ? (
              <>
                <button
                  onClick={toggleAuthDropdown}
                  className="flex items-center space-x-2 text-orange-600 hover:text-orange-700 focus:outline-none"
                  title="User Profile"
                >
                  <div className="bg-orange-500 text-white font-bold rounded-full h-8 w-8 flex items-center justify-center uppercase">
                    {userInitial}
                  </div>
                  <span className="hidden md:inline font-semibold">
                    Profile
                  </span>
                </button>

                {authDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white border border-orange-200 rounded-lg shadow-lg py-2 z-50">
                    <Link
                      to="/settings"
                      onClick={() => setAuthDropdownOpen(false)}
                      className="block px-4 py-2 hover:bg-orange-100 text-orange-600 font-medium rounded"
                    >
                      Settings
                    </Link>
                    <button
                      onClick={() => {
                        localStorage.removeItem("authToken");
                        localStorage.removeItem("userName"); // Clear username on logout
                        setAuthDropdownOpen(false);
                        navigate("/");
                        window.location.reload();
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-red-100 text-red-500 font-medium rounded"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </>
            ) : (
              <>
                <button
                  onClick={toggleAuthDropdown}
                  className="flex items-center space-x-2 text-orange-600 hover:text-orange-700 focus:outline-none"
                  aria-haspopup="true"
                  aria-expanded={authDropdownOpen}
                  title="User Account"
                >
                  <User size={24} />
                  <span className="hidden md:inline font-semibold">
                    Account
                  </span>
                </button>

                {authDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white border border-orange-200 rounded-lg shadow-lg py-2 z-50">
                    <Link
                      to="/auth?screen=login"
                      onClick={() => setAuthDropdownOpen(false)}
                      className="block px-4 py-2 hover:bg-orange-100 text-orange-600 font-medium rounded"
                    >
                      Login
                    </Link>
                    <Link
                      to="/auth?screen=signup"
                      onClick={() => setAuthDropdownOpen(false)}
                      className="block px-4 py-2 hover:bg-orange-100 text-orange-600 font-medium rounded"
                    >
                      Sign Up
                    </Link>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        <button
          onClick={toggleMobileMenu}
          className="lg:hidden flex items-center justify-center w-10 h-10 rounded-xl text-orange-600 hover:bg-orange-100 transition-colors"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden bg-white/95 backdrop-blur-lg border-t border-orange-100 shadow-lg rounded-b-2xl">
          <div className="flex flex-col px-4 py-4 space-y-4">
            <div className="relative w-full rounded-full border-2 border-orange-500 bg-white flex overflow-hidden">
              <input
                type="search"
                placeholder="Search dishes..."
                value={searchQuery}
                onChange={handleSearchChange}
                onKeyDown={handleKeyDown}
                className="flex-grow px-6 py-2 text-black placeholder-black rounded-l-full focus:outline-none focus:ring-0 text-base"
              />
              <div className="w-px bg-orange-500"></div>
              <button
                onClick={performSearch}
                className="px-5 flex items-center justify-center text-black hover:bg-orange-100 rounded-r-full transition-colors"
                aria-label="Search"
              >
                <Search size={20} />
              </button>
            </div>

            <ul className="flex flex-col space-y-2">
              {isLoggedIn && (
                <li className="relative" ref={mobileDropdownRef}>
                  <button
                    onClick={toggleMobileAuthDropdown}
                    className="flex items-center justify-between w-full text-gray-700 hover:text-orange-600 px-3 py-2.5 rounded-xl font-medium hover:bg-orange-50"
                  >
                    <div className="flex items-center space-x-2">
                      <div className="bg-orange-500 text-white font-bold rounded-full h-8 w-8 flex items-center justify-center uppercase">
                        {userInitial}
                      </div>
                      <span>Profile</span>
                    </div>
                    <ChevronDown
                      size={20}
                      className={`${
                        mobileAuthDropdownOpen ? "rotate-180" : ""
                      } transition-transform duration-200`}
                    />
                  </button>
                  {mobileAuthDropdownOpen && (
                    <div className="mt-2 bg-white border border-orange-200 rounded-lg shadow-md py-1 ml-4">
                      <Link
                        to="/settings"
                        onClick={() => {
                          setMobileAuthDropdownOpen(false);
                          setMobileMenuOpen(false);
                        }}
                        className="block px-4 py-2 hover:bg-orange-100 text-orange-600 font-medium rounded"
                      >
                        Settings
                      </Link>
                      <button
                        onClick={() => {
                          localStorage.removeItem("authToken");
                          localStorage.removeItem("userName"); // Clear username on logout
                          setMobileAuthDropdownOpen(false);
                          setMobileMenuOpen(false);
                          navigate("/");
                          window.location.reload();
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-red-100 text-red-500 font-medium rounded"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </li>
              )}
              {!isLoggedIn && (
                <>
                  <li>
                    <Link
                      to="/auth?screen=login"
                      className="block text-gray-700 hover:text-orange-600 px-3 py-2.5 rounded-xl font-medium hover:bg-orange-50"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/auth?screen=signup"
                      className="block text-gray-700 hover:text-orange-600 px-3 py-2.5 rounded-xl font-medium hover:bg-orange-50"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Sign Up
                    </Link>
                  </li>
                </>
              )}
              <li>
                <Link
                  to="/"
                  className="block text-gray-700 hover:text-orange-600 px-3 py-2.5 rounded-xl font-medium hover:bg-orange-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/menu"
                  className="block text-gray-700 hover:text-orange-600 px-3 py-2.5 rounded-xl font-medium hover:bg-orange-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Menu
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="block text-gray-700 hover:text-orange-600 px-3 py-2.5 rounded-xl font-medium hover:bg-orange-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="block text-gray-700 hover:text-orange-600 px-3 py-2.5 rounded-xl font-medium hover:bg-orange-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Contact
                </Link>
              </li>
            </ul>

            <button
              onClick={() => {
                navigate("/cart");
                setMobileMenuOpen(false);
              }}
              className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-orange-100 text-orange-600 rounded-xl font-medium hover:bg-orange-200 transition-colors"
            >
              <ShoppingCart size={20} />
              Cart ({totalItems})
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
