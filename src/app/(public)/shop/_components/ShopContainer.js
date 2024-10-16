"use client";

import { useContext, useState } from "react";
import ShopProductsCard from "./ShopProductsCard";
import { ShopPageContext } from "@/context/ShopPageContext";
import { useGetShopProductsQuery } from "@/redux/api/Shop Page Api/shopApi";
import ProductCardSkeleton from "@/components/ProductCardSkeleton/ProductCardSkeleton";
import EmptyContainer from "@/components/EmptyContainer/EmptyContainer";
import { motion } from "framer-motion";
import { Pagination } from "react-pagination-bar";
import CustomPagination from "@/components/CustomPagination/CustomPagination";

// Motion Variants
const fadeUpVariants = {
  initial: {
    y: 10,
    opacity: 0,
  },

  animate: {
    y: 0,
    opacity: 1,
    transition: {
      stiffness: 190,
      damping: 35,
      mass: 0.3,
      staggerChildren: 0.09,
      when: "beforeChildren",
    },
  },
};

export default function ShopContainer() {
  const { selectedCategory, selectedSize, searchText } =
    useContext(ShopPageContext);

  // ============ Query ===============
  const query = {};
  query["category"] = selectedCategory;
  query["size"] = selectedSize;
  query["searchTerm"] = searchText;

  // ================= Pagination ===============
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 12;
  query["page"] = currentPage;
  query["limit"] = pageSize;

  // =========== Shop product api handler ============
  const { data: productsRes, isLoading } = useGetShopProductsQuery(query);
  const products = productsRes?.data || [];
  const meta = productsRes?.meta || {};

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
  if (!products?.length) {
    return <EmptyContainer className="flex-center h-[65vh]" />;
  }

  return (
    <>
      <motion.div
        variants={fadeUpVariants}
        initial="initial"
        animate="animate"
        className="grid grid-cols-1 md:grid-cols-2 md:gap-7 lg:grid-cols-3"
      >
        {products?.map((product) => (
          <motion.div variants={fadeUpVariants} key={product?._id}>
            <ShopProductsCard product={product} />
          </motion.div>
        ))}
      </motion.div>

      <div className="ml-auto mt-20 w-max">
        <CustomPagination
          total={meta?.total}
          pageSize={pageSize}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </>
  );
}
