import React, { createContext, useState } from "react";

// Create a context
export const LayoutContext = createContext<any>(null);

export const LayoutProvider = ({ children }: any) => {
  const [sidebarOpen, setSideBarOpen] = useState(false);
  const [sidebarUnfoldable, setSidebarUnfoldable] = useState(false);

  const toggleSidebar = () => {
    setSideBarOpen((prev) => !prev);
  };

  const toggleSidebarUnfoldable = () => {
    setSidebarUnfoldable((prev) => !prev);
  };

  return (
    <LayoutContext.Provider
      value={{
        sidebarOpen,
        sidebarUnfoldable,
        toggleSidebar,
        toggleSidebarUnfoldable,
      }}
    >
      {children}
    </LayoutContext.Provider>
  );
};
