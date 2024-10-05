"use client";
import { useGetQuoteProductsQuery } from "@/redux/api/Products Page Api/quoteProductsApi";
import QuoteProductCard from "./QuoteProductCard";
import ProductCardSkeleton from "@/components/ProductCardSkeleton/ProductCardSkeleton";
import EmptyContainer from "@/components/EmptyContainer/EmptyContainer";

export default function ProductsContainer() {
  const { data: quoteProductsRes, isLoading } = useGetQuoteProductsQuery();
  const quoteProducts = quoteProductsRes?.data || [];
  console.log(quoteProductsRes);

  // Show skeleton for product loading
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-7 lg:grid-cols-3">
        {Array.from({ length: 9 }).map((_, idx) => (
          <ProductCardSkeleton key={idx} />
        ))}
      </div>
    );
  }

  // Show empty if no product found
  if (!quoteProducts?.length) {
    return <EmptyContainer className="flex-center h-[65vh]" />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 md:gap-7 lg:grid-cols-3">
      {quoteProducts?.map((product) => (
        <>
          <QuoteProductCard key={product?._id} product={product} />
        </>
      ))}
    </div>
  );
}
