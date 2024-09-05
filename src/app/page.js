import Hero from "@/components/homeSections/Hero/Hero";
import Image from "next/image";
import bgFlowers from "/public/images/home/bg-flowers.png";
import Categories from "@/components/homeSections/Categories/Categories";

export const metadata = {
  title: "Home",
  description: "Home page of United Threads - Wear The Change",
};

export default function Home() {
  return (
    <div className="relative z-10 space-y-32">
      <Hero />
      <Categories />

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
