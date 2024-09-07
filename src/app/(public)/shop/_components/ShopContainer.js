import React from "react";
import ShopProductsCard from "./ShopProductsCard";

export default function ShopContainer() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 md:gap-7 lg:grid-cols-3">
      {Array.from({ length: 9 }).map((_, idx) => (
        <ShopProductsCard key={idx} />
      ))}
    </div>
  );
}
