/* eslint-disable react/no-unescaped-entities */
import ContentWrapper from "@/components/ContentWrapper/ContentWrapper";
import { Separator } from "@/components/ui/separator";
import React from "react";

export default function ProductDescription({ description }) {
  return (
    <div>
      <h4 className="max-w-max rounded bg-primary-black px-5 py-2 text-2xl font-medium text-white">
        Description
      </h4>
      <Separator className="mb-10 mt-2 bg-primary-black" />

      {/* <ContentWrapper key="productDescription" content={description} /> */}

      {/* dummy data */}
      <div class="mx-auto rounded-lg bg-white p-6">
        <h1 class="mb-2 text-3xl font-bold text-gray-800">
          Classic Cotton T-Shirt
        </h1>

        <p class="mb-4 text-xl font-semibold text-green-600">$100.00</p>

        <p class="mb-6 text-gray-600">
          A versatile classic cotton t-shirt, designed for everyday wear. Made
          with 100% premium cotton, this t-shirt offers comfort and durability.
        </p>

        <div class="mb-6">
          <h2 class="mb-2 text-lg font-semibold text-gray-800">Key Features</h2>
          <ul class="list-inside list-disc text-gray-600">
            <li>100% soft, breathable cotton</li>
            <li>Classic crewneck design</li>
            <li>Relaxed fit for everyday comfort</li>
            <li>Available in a range of colors</li>
          </ul>
        </div>

        <div class="mb-6">
          <h2 class="mb-2 text-lg font-semibold text-gray-800">Materials</h2>
          <ul class="list-inside list-disc text-gray-600">
            <li>100% Cotton</li>
            <li>Eco-friendly dyes</li>
          </ul>
        </div>

        <div class="mb-6">
          <h2 class="mb-2 text-lg font-semibold text-gray-800">
            Care Instructions
          </h2>
          <ul class="list-inside list-disc text-gray-600">
            <li>Machine wash cold with like colors</li>
            <li>Tumble dry low</li>
            <li>Do not bleach</li>
            <li>Iron on low heat if necessary</li>
          </ul>
        </div>

        <div class="mb-6">
          <h2 class="mb-2 text-lg font-semibold text-gray-800">Size Guide</h2>
          <p class="text-gray-600">
            Our t-shirts come in a relaxed fit. Please refer to the size guide
            below for accurate measurements.
          </p>
          <ul class="mt-4 list-none">
            <li class="flex justify-between">
              <span class="font-semibold">Small:</span>
              <span>Chest 34-36", Waist 28-30"</span>
            </li>
            <li class="flex justify-between">
              <span class="font-semibold">Medium:</span>
              <span>Chest 38-40", Waist 32-34"</span>
            </li>
            <li class="flex justify-between">
              <span class="font-semibold">Large:</span>
              <span>Chest 42-44", Waist 36-38"</span>
            </li>
            <li class="flex justify-between">
              <span class="font-semibold">X-Large:</span>
              <span>Chest 46-48", Waist 40-42"</span>
            </li>
          </ul>
        </div>

        <div class="mb-6">
          <h2 class="mb-2 text-lg font-semibold text-gray-800">
            Shipping & Returns
          </h2>
          <p class="text-gray-600">
            Free standard shipping on orders over $50. Easy returns within 30
            days.
          </p>
        </div>
      </div>
    </div>
  );
}
