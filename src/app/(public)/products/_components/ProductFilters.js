"use client";

import CustomSkeleton from "@/components/CustomSkeleton/CustomSkeleton";
import { Input } from "@/components/ui/input";
import {
  useGetQuoteCategoriesQuery,
  useGetQuoteSizesQuery,
} from "@/redux/api/Products Page Api/quoteProductsApi";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { ChevronDown } from "lucide-react";
import { ChevronUp } from "lucide-react";
import { useState } from "react";

// motion variants
const fadeVariants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: "easeInOut",
      staggerChildren: 0.1,
      when: "beforeChildren",
    },
  },
  exit: {
    opacity: 0,
  },
};

const SIZES = ["XS", "S", "M", "L", "XL", "XXL", "XXXL"];

export default function ProductFilters() {
  const [categoryExpanded, setCategoryExpanded] = useState(true);
  const [sizeExpanded, setSizeExpanded] = useState(true);

  // Products filter api handlers
  const { data: categoriesRes, isLoading: isCategoriesLoading } =
    useGetQuoteCategoriesQuery();
  const categories = categoriesRes?.data || [];

  const { data: sizeRes, isLoading: isSizeLoading } = useGetQuoteSizesQuery();
  const sizes = sizeRes?.data || {};

  console.log(sizes["L"]);

  return (
    <div className="pb-10">
      {/* Product search bar */}
      <div className="relative mb-8">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2"
          size={20}
        />
        <Input
          className="w-full rounded-3xl border border-primary-black/75 px-10 py-5 text-lg shadow-sm"
          placeholder="Search products..."
        />
      </div>

      {/* Category Filter */}
      <div className="mt-4">
        <motion.div
          className="flex items-center justify-between"
          role="button"
          onClick={() => setCategoryExpanded(!categoryExpanded)}
        >
          <h3 className="mt-2 text-lg font-semibold">Category</h3>
          {categoryExpanded ? (
            <ChevronUp size={20} color="#000000" />
          ) : (
            <ChevronDown size={20} color="#000000" />
          )}
        </motion.div>

        {categoryExpanded && (
          <>
            {isCategoriesLoading ? (
              <CustomSkeleton
                className={"mt-5 space-y-3"}
                skeletonClass="w-full h-4 rounded-lg"
                length={8}
              />
            ) : (
              <motion.div
                className="my-5 flex w-full flex-col items-start gap-y-3 overflow-hidden px-2"
                variants={fadeVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                {categories?.map((category) => (
                  <motion.button
                    key={category._id}
                    className="flex-center-between w-full gap-x-2 transition-all duration-300 ease-in-out hover:scale-[0.99] hover:text-primary-black/70"
                  >
                    <p>{category.name}</p>
                    <p>{category.productCount}</p>
                  </motion.button>
                ))}
              </motion.div>
            )}
          </>
        )}
      </div>

      {/* Size Filter */}
      <motion.div className="mt-8" layout>
        <motion.div
          className="flex items-center justify-between"
          role="button"
          onClick={() => setSizeExpanded(!sizeExpanded)}
          layout="position"
        >
          <h3 className="mt-2 text-lg font-semibold">Size</h3>
          {sizeExpanded ? (
            <ChevronUp size={20} color="#000000" />
          ) : (
            <ChevronDown size={20} color="#000000" />
          )}
        </motion.div>

        {isSizeLoading ? (
          <CustomSkeleton
            className={"mt-5 space-y-3"}
            skeletonClass="w-full h-4 rounded-lg"
            length={8}
          />
        ) : (
          <>
            {sizeExpanded && (
              <motion.div
                className="my-5 flex flex-col items-start gap-y-3 overflow-hidden px-2"
                variants={fadeVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                layout="position"
              >
                {SIZES?.map((size) => (
                  <motion.button
                    key={size}
                    className="flex-center-between w-full gap-x-2 transition-all duration-300 ease-in-out hover:scale-[0.99] hover:text-primary-black/70"
                  >
                    <p>{size}</p>
                    <p>{sizes[size]?.productCount || 0}</p>
                  </motion.button>
                ))}
              </motion.div>
            )}
          </>
        )}
      </motion.div>
    </div>
  );
}
