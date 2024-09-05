import { ArrowRight } from "lucide-react";
import heroImage from "/public/images/hero/Group 47487.png";
import Image from "next/image";
import Link from "next/link";
import "./Hero.css";

export default function Hero() {
  return (
    <div className="flex-center-between">
      {/* Left */}
      <div className="text-primary-black lg:w-1/2">
        <h1 className="font-extrabold lg:text-7xl lg:leading-[1.2]">
          Design Your Own Apparel
        </h1>

        <h3 className="mb-6 mt-5 text-4xl font-medium">
          Unleash Your Creativity
        </h3>
        <p className="text-lg font-medium text-secondary-1 lg:w-3/4">
          We pride ourselves in providing a curated collection of custom apparel
          designed to inspire and empower
        </p>

        <Link href="/products">
          <button
            className="flex-center-between hover-bubble mt-10 rounded-full border border-primary-black bg-transparent px-4 py-2 text-lg text-primary-black lg:w-[42%]"
            id="request-quote-btn"
          >
            Request to quote
            <div className="rounded-full border border-primary-black p-[6px]">
              <ArrowRight size={20} className="-rotate-45" />
            </div>
          </button>
        </Link>
      </div>

      {/* Right */}
      <div className="lg:w-1/2">
        <Image
          src={heroImage}
          alt="Hero section banner image"
          className="lg:mx-auto lg:w-[90%]"
        />
      </div>
    </div>
  );
}
