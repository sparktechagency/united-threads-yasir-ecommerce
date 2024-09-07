import React from "react";
import droplet from "/public/images/home/features/doplet.png";
import customProductIcon from "/public/images/home/features/custom products.png";
import shippingIcon from "/public/images/home/features/secure shipping.png";
import customDesignIcon from "/public/images/home/features/custom design.png";
import Image from "next/image";

export default function Features() {
  return (
    <section className="text-center lg:mx-auto lg:w-3/4">
      <div className="flex-center gap-x-2">
        <Image src={droplet} alt="droplet" height={20} width={20} />
        <p className="text-2xl font-medium text-secondary-1">
          All the features you need
        </p>
      </div>

      <h1 className="mb-16 mt-4 text-7xl font-extrabold text-primary-black">
        Fast and Quality Service
      </h1>

      <div className="flex-center-between">
        <div className="flex flex-col items-center gap-y-3">
          <Image src={customProductIcon} alt="custom product icon" />
          <p className="text-xl font-medium text-secondary-1">Custom Product</p>
        </div>

        <div className="flex flex-col items-center gap-y-3">
          <Image src={shippingIcon} alt="secure shipping icon" />
          <p className="text-xl font-medium text-secondary-1">
            Safe & Secure Shipping
          </p>
        </div>

        <div className="flex flex-col items-center gap-y-3">
          <Image src={customDesignIcon} alt="custom design icon" />
          <p className="text-xl font-medium text-secondary-1">Custom Design</p>
        </div>
      </div>
    </section>
  );
}
