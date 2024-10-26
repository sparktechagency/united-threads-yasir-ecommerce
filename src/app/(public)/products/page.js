import CommonPageHeader from "@/components/CommonPageHeader/CommonPageHeader";
import React from "react";
import ProductFilters from "./_components/ProductFilters";
import ProductsContainer from "./_components/ProductsContainer";
import QuoteProductsPageProvider from "@/context/QuoteProductsPageContext";

export const metadata = {
  title: "Custom Apparels",
  description: "Custom apparels page",
};

export default function ProductsPage() {
  return (
    <QuoteProductsPageProvider>
      <div>
        <CommonPageHeader
          pageTitle="Custom Apparels"
          previousPage={{
            pageTitle: "Home",
            pageRoute: "/",
          }}
        />

        <section className="flex-start-between my-16 lg:mx-auto lg:w-3/4 lg:gap-x-16">
          {/* Left -------> Filters */}
          <div className="lg:w-[22%]">
            <ProductFilters />
          </div>

          <div className="lg:flex-grow">
            <ProductsContainer />
          </div>
        </section>
      </div>
    </QuoteProductsPageProvider>
  );
}
