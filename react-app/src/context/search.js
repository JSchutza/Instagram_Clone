import React from "react";

let query;

export const SearchContext = React.createContext(query);

export const SearchProvider = ({ children }) => {
  return (
    <SearchContext.Provider value={query}>{children}</SearchContext.Provider>
  );
};
