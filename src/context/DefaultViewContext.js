import React, { createContext, useContext, useState } from "react";

const DefaultViewContext = createContext();

export function DefaultViewProvider({ children }) {
  const [defaultView, setDefaultView] = useState("Monthly");

  return (
    <DefaultViewContext.Provider value={{ defaultView, setDefaultView }}>
      {children}
    </DefaultViewContext.Provider>
  );
}

export function useDefaultView() {
  return useContext(DefaultViewContext);
}
