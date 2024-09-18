import Image from "next/image";
import titleBg from "/public/images/home/categories/Wear the change.png";
import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimatedArrow from "@/components/AnimatedArrow/AnimatedArrow";

// Static category images
import tshirt from "/public/images/home/categories/tshirt.png";
import hoodie from "/public/images/home/categories/hoodie.png";
import hoodie2 from "/public/images/home/categories/hoodie-2.png";
import sweatshirt from "/public/images/home/categories/sweatshirt2.png";
import pant from "/public/images/home/categories/pants.jpg";
import fullSleeve from "/public/images/home/categories/long-sleeve.png";
import trousers from "/public/images/home/categories/Trouser-Leg-Logo.jpg";
import AnimatedCategoryLink from "./_components/AnimatedCategoryLink";

const CATEGORIES = [
  "T-Shirt",
  "Sweatshirt",
  "Jersey",
  "Shirt",
  "Pant",
  "Hoodie",
  "Full Sleeve",
  "No Sleeve",
  "Trousers",
  "Trainers",
  "Gym Attire",
];

export default function Categories() {
  return (
    <section className="text-primary-black">
      <h2 className="px-10 py-1 text-center text-7xl font-extrabold">
        Wear The Change
      </h2>

      <div className="flex-center-between my-20 max-h-[600px] lg:gap-x-16">
        {/* Category filter */}
        <div className="relative lg:w-[23%]">
          <div className="relative mb-8">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2"
              size={20}
            />
            <Input
              className="w-full rounded-3xl border border-primary-black/75 px-10 py-5 text-lg shadow-sm"
              placeholder="Search categories..."
            />
          </div>

          <Carousel
            orientation="vertical"
            opts={{
              align: "start",
            }}
            className="relative"
          >
            <CarouselContent className="h-[500px]">
              {/* !Slice category to 11 items for fixed height of category-scrollbar */}
              {CATEGORIES.slice(0, 11).map((category) => (
                <CarouselItem key={category} className="md:basis-1/6">
                  {/* <AnimatedCategoryLink route={category}>
                    {category}
                  </AnimatedCategoryLink> */}
                  <Link
                    href={`/products?c=${category}`}
                    className="font-medium transition-all duration-200 ease-in-out hover:text-primary-black/80"
                  >
                    {category}
                  </Link>
                </CarouselItem>
              ))}
            </CarouselContent>

            <div className="absolute bottom-16 right-2">
              <CarouselPrevious className="h-8 w-8" />
              <CarouselNext className="-top-2 h-8 w-8" />
            </div>
          </Carousel>

          <Button
            variant="lg"
            className="primary-button group mt-5"
            style={{
              borderRadius: "50px",
            }}
            asChild
          >
            <Link href="/categories">
              All Categories
              <AnimatedArrow />
            </Link>
          </Button>
        </div>

        {/* Category images */}
        <div className="flex-center-between flex h-[600px] gap-x-5 lg:flex-grow">
          {/* Column 1 */}
          <div className="flex h-full flex-col gap-y-3 lg:w-1/3">
            {/* Tshirt */}
            <div
              className="group relative h-[60%] w-full overflow-hidden rounded-xl transition-all duration-500 ease-in-out hover:scale-105"
              style={{
                background: `url('${tshirt.src}')`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "100% 100%",
              }}
            >
              <div className="flex-center invisible absolute inset-0 h-0 w-full rounded-xl bg-gradient-to-b from-black/75 to-black/50 opacity-0 transition-all duration-500 ease-in-out group-hover:visible group-hover:h-full group-hover:opacity-100">
                <Link
                  href="/products?c=tshirt"
                  className="text-5xl font-bold text-white hover:text-primary-white/75"
                >
                  T-Shirt
                </Link>
              </div>
            </div>

            <div
              className="group relative h-[40%] w-full overflow-hidden rounded-xl transition-all duration-500 ease-in-out hover:scale-105"
              style={{
                backgroundImage: `url('${fullSleeve.src}')`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "100% 100%",
              }}
            >
              <div className="flex-center invisible absolute inset-0 h-0 w-full rounded-xl bg-gradient-to-b from-black/75 to-black/50 opacity-0 transition-all duration-500 ease-in-out group-hover:visible group-hover:h-full group-hover:opacity-100">
                <Link
                  href="/products?c=fullSleeve"
                  className="text-5xl font-bold text-white hover:text-primary-white/75"
                >
                  Full Sleeve
                </Link>
              </div>
            </div>
          </div>

          {/* Column 2 */}
          <div className="flex h-full flex-col gap-y-3 lg:w-1/3">
            {/* Sweatshirt */}
            <div
              className="group relative h-[25%] w-full overflow-hidden rounded-xl transition-all duration-500 ease-in-out hover:scale-105"
              style={{
                backgroundImage: `url('${sweatshirt.src}')`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "100% 100%",
              }}
            >
              <div className="flex-center invisible absolute inset-0 h-0 w-full rounded-xl bg-gradient-to-b from-black/75 to-black/50 opacity-0 transition-all duration-500 ease-in-out group-hover:visible group-hover:h-full group-hover:opacity-100">
                <Link
                  href="/products?c=sweatshirt"
                  className="text-5xl font-bold text-white hover:text-primary-white/75"
                >
                  Sweatshirt
                </Link>
              </div>
            </div>

            {/* Hoodie 1 */}
            <div
              className="group relative h-[50%] w-full overflow-hidden rounded-xl transition-all duration-500 ease-in-out hover:scale-105"
              style={{
                backgroundImage: `url('${hoodie.src}')`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "100% 100%",
              }}
            >
              <div className="flex-center invisible absolute inset-0 h-0 w-full rounded-xl bg-gradient-to-b from-black/75 to-black/50 opacity-0 transition-all duration-500 ease-in-out group-hover:visible group-hover:h-full group-hover:opacity-100">
                <Link
                  href="/products?c=hoodie"
                  className="text-5xl font-bold text-white hover:text-primary-white/75"
                >
                  Hoodie
                </Link>
              </div>
            </div>

            {/* Pant */}
            <div
              className="group relative h-[25%] w-full overflow-hidden rounded-xl transition-all duration-500 ease-in-out hover:scale-105"
              style={{
                backgroundImage: `url('${pant.src}')`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "100% 100%",
              }}
            >
              <div className="flex-center invisible absolute inset-0 h-0 w-full rounded-xl bg-gradient-to-b from-black/75 to-black/50 opacity-0 transition-all duration-500 ease-in-out group-hover:visible group-hover:h-full group-hover:opacity-100">
                <Link
                  href="/products?c=pant"
                  className="text-5xl font-bold text-white hover:text-primary-white/75"
                >
                  Pant
                </Link>
              </div>
            </div>
          </div>

          {/* Column 3 */}
          <div className="flex h-full flex-col gap-y-3 lg:w-1/3">
            {/* Hoodie */}
            <div
              className="group relative h-[60%] w-full overflow-hidden rounded-xl transition-all duration-500 ease-in-out hover:scale-105"
              style={{
                backgroundImage: `url('${hoodie2.src}')`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "100% 100%",
              }}
            >
              <div className="flex-center invisible absolute inset-0 h-0 w-full rounded-xl bg-gradient-to-b from-black/75 to-black/50 opacity-0 transition-all duration-500 ease-in-out group-hover:visible group-hover:h-full group-hover:opacity-100">
                <Link
                  href="/products?c=hoodie"
                  className="text-5xl font-bold text-white hover:text-primary-white/75"
                >
                  Hoodie
                </Link>
              </div>
            </div>

            {/* Trousers */}
            <div
              className="group relative h-[40%] w-full overflow-hidden rounded-xl transition-all duration-500 ease-in-out hover:scale-105"
              style={{
                backgroundImage: `url('${trousers.src}')`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "100% 100%",
              }}
            >
              <div className="flex-center invisible absolute inset-0 h-0 w-full rounded-xl bg-gradient-to-b from-black/75 to-black/50 opacity-0 transition-all duration-500 ease-in-out group-hover:visible group-hover:h-full group-hover:opacity-100">
                <Link
                  href="/products?c=trousers"
                  className="text-5xl font-bold text-white hover:text-primary-white/75"
                >
                  Trousers
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
