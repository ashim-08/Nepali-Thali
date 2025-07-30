import React, { createContext, useContext, useState } from "react";

const SearchContext = createContext(undefined);

export const SearchProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const clearSearch = () => setSearchQuery("");

  return (
    <SearchContext.Provider
      value={{ searchQuery, setSearchQuery, clearSearch }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
};
