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
      <div className="relative z-10 mx-auto max-w-max">
        <h2 className="px-10 py-1 text-7xl font-extrabold">Wear The Change</h2>
        <Image
          src={titleBg}
          className="absolute -bottom-2 -z-10 h-full w-full opacity-75"
        />
      </div>

      <div className="flex-center-between my-20 max-h-[500px] lg:gap-x-10">
        {/* Category filter */}
        <div className="relative lg:w-[20%]">
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
            <CarouselContent className="h-[400px]">
              {/* !Slice category to 11 items for fixed height of category-scrollbar */}
              {CATEGORIES.slice(0, 11).map((category) => (
                <CarouselItem key={category} className="md:basis-1/6">
                  <Link
                    href={`/categories?c=${category}`}
                    className="font-medium transition-all duration-200 ease-in-out hover:text-primary-black/80"
                  >
                    {category}
                  </Link>
                </CarouselItem>
              ))}
            </CarouselContent>

            <div className="absolute bottom-10 right-0">
              <CarouselPrevious className="h-8 w-8" />
              <CarouselNext className="-top-2 h-8 w-8" />
            </div>

            {/* <div className="absolute -left-0 top-32 rotate-90"> */}
            <CarouselDots
              btnClass="w-[30px] h-[2px]"
              activeClass="bg-gray-500"
              className="absolute -right-[133px] top-32 rotate-90 bg-gray-300"
            />
            {/* </div> */}
          </Carousel>

          <Button
            variant="lg"
            className="primary-button mt-5"
            style={{
              borderRadius: "50px",
            }}
            asChild
          >
            <Link href="/categories">
              All Categories <ArrowRight size={20} strokeWidth={1.5} />
            </Link>
          </Button>
        </div>

        {/* Category images */}
        <div className="border-red flex-center-between flex h-[500px] gap-x-5 lg:flex-grow">
          {/* Row 1 */}
          <div className="flex h-full flex-col gap-y-5 lg:w-1/3">
            <div className="border-red h-[75%] w-full">asdfasdf</div>
            <div className="border-red h-[25%] w-full">asdfasdf</div>
          </div>
          <div className="flex h-full flex-col gap-y-5 lg:w-1/3">
            <div className="border-red h-[25%] w-full">wertrt</div>
            <div className="border-red h-[50%] w-full">wertewrte</div>
            <div className="border-red h-[25%] w-full">wertrt</div>
          </div>
          <div className="flex h-full flex-col gap-y-5 lg:w-1/3">
            <div className="border-red h-[75%] w-full">cxvzxcz</div>
            <div className="border-red h-[25%] w-full">zxcvzxcv</div>
          </div>
        </div>
      </div>
    </section>
  );
}
