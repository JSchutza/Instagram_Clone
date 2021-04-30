import React, { createContext, useContext, useState, useEffect } from "react";

export const updoot = createContext();

export function UpdootProvider({ children }) {
  const [upstate, setUpstate] = useState();
  return (
    <updoot.Provider value={{ upstate, setUpstate }}>
      {children}
    </updoot.Provider>
  );
}
