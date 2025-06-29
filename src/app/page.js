import Hero from "@/components/homeSections/Hero/Hero";
import Image from "next/image";
import bgFlowers from "/public/images/home/bg-flowers.png";
// import Categories from "@/components/homeSections/Categories/Categories";
import Features from "@/components/homeSections/Features/Features";
import Testimonials from "@/components/homeSections/Testimonials/Testimonials";
//import Products from "@/components/homeSections/Products/Products";

export const metadata = {
  title: "Home | United Threads",
  description:
    "The official home page of The UnitedThreads - Wear The Change. ❝Design Your Own Apparel, Unleash Your Creativity❞. We pride ourselves in providing a curated collection of custom apparel designed to inspire and empower",
};

export default function Home() {
  return (
    <div className="relative z-10 space-y-32 overflow-hidden px-5 md:px-10 lg:mx-auto lg:w-[90%] lg:space-y-40 lg:px-0 2xl:w-3/4">
      <Hero />
      {/* <Categories /> */}
      {/*<Products />*/}
      <Features />
      <Testimonials />
      {/* --------- Background Flowers ------------- */}
      <div>
        <Image
          src={bgFlowers}
          alt="background flower image"
          className="absolute -right-10 top-[300px] -z-10"
        />
      </div>
      {/* ------------------------------------------ */}
    </div>
  );
}
