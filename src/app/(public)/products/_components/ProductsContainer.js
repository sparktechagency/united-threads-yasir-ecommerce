import React from "react";
import QuoteProductCard from "./QuoteProductCard";

export default function ProductsContainer() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 md:gap-7 lg:grid-cols-3">
      {Array.from({ length: 9 }).map((_, idx) => (
        <QuoteProductCard key={idx} />
      ))}
    </div>
  );
}
