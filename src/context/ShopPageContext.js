"use client";

import { redirect } from "next/navigation";
import { createContext, useEffect, useState } from "react";

export const ShopPageContext = createContext(null);

export default function ShopPageProvider({ children }) {
  // Filters
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [searchText, setSearchText] = useState("");

  {
    /**
    Note: Client don't need shop page at the moment, so redirect user to /not-found page when they try to access this page    
  */
  }
  // useEffect(() => {
  //   redirect("/not-found");
  // }, []);

  return (
    <ShopPageContext.Provider
      value={{
        selectedCategory,
        setSelectedCategory,
        selectedSize,
        setSelectedSize,
        searchText,
        setSearchText,
      }}
    >
      {children}
    </ShopPageContext.Provider>
  );
}
