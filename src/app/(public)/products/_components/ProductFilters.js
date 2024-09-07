"use client";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { fadeUpVariants } from "@/utils/motion-variants";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { DollarSign } from "lucide-react";
import { Check } from "lucide-react";
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

const CATEGORIES = [
  {
    _id: 1,
    name: "T-Shirt",
    stock: 10,
  },
  {
    _id: 2,
    name: "Sweatshirt",
    stock: 12,
  },
  {
    _id: 3,
    name: "Jersey",
    stock: 8,
  },
  {
    _id: 4,
    name: "Shirt",
    stock: 15,
  },
  {
    _id: 5,
    name: "Pant",
    stock: 13,
  },
  {
    _id: 6,
    name: "Hoodie",
    stock: 12,
  },
  {
    _id: 7,
    name: "Full Sleeve",
    stock: 10,
  },
];

const SIZES = [
  { _id: 1, name: "XS", stock: 24 },
  { _id: 2, name: "S", stock: 10 },
  { _id: 3, name: "M", stock: 17 },
  { _id: 4, name: "L", stock: 22 },
  { _id: 5, name: "XL", stock: 34 },
  { _id: 6, name: "XXL", stock: 31 },
  { _id: 7, name: "XXXL", stock: 26 },
];

export default function ProductFilters() {
  const [categoryExpanded, setCategoryExpanded] = useState(true);
  const [sizeExpanded, setSizeExpanded] = useState(true);

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

      {/* Category */}
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
          <motion.div
            className="my-5 flex flex-col items-start gap-y-3 overflow-hidden px-4"
            variants={fadeVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            {CATEGORIES?.map((category) => (
              <motion.button
                key={category._id}
                className="flex-center-between w-full gap-x-2 hover:text-primary-black/75"
              >
                <p>{category.name}</p>
                <p>{category.stock}</p>
              </motion.button>
            ))}
          </motion.div>
        )}
      </div>

      {/* Price Filter */}
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

        {sizeExpanded && (
          <motion.div
            className="my-5 flex flex-col items-start gap-y-3 overflow-hidden px-4"
            variants={fadeVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            layout="position"
          >
            {SIZES.map((size) => (
              <motion.button
                key={size._id}
                className="flex-center-between w-full gap-x-2 hover:text-primary-black/75"
              >
                <p>{size.name}</p>
                <p>{size.stock}</p>
              </motion.button>
            ))}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
