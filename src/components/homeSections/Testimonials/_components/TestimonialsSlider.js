"use client";
import Image from "next/image";
import userImg from "/public/images/home/testimonials/user.png";
import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
} from "@/components/ui/carousel";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import CustomStarRating from "@/components/CustomStarRating/CustomStarRating";
import Autoplay from "embla-carousel-autoplay";

const data = {
  key: 1,
  user: userImg,
  name: "Christina L.",
  occupation: "Manager",
  rating: 4.5,
  review:
    "Great quality products - Flags, programs for exceptional capacities, birthday, and occasion welcome are largely still mainstream on paper.",
};

export default function TestimonialsSlider() {
  return (
    <div>
      <Carousel
        plugins={[
          Autoplay({
            delay: 4000,
          }),
        ]}
        opts={{
          align: "start",
          duration: 55,
        }}
      >
        <CarouselContent className="-ml-8 py-10">
          {Array.from({ length: 6 }).map((_, idx) => (
            <CarouselItem
              key={idx}
              className="basis-1/2 pl-8 md:basis-1/2 lg:basis-1/3"
            >
              <div className="space-y-6 rounded-xl border border-gray-200 p-6 py-8 shadow-md">
                <div className="flex-center-start gap-x-8">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={data.user.src} />
                    <AvatarFallback>UZ</AvatarFallback>
                  </Avatar>

                  <div className="space-y-1">
                    <div className="flex-center gap-x-3">
                      <h5 className="text-lg font-semibold">{data.name}</h5>
                      <p className="font-thin text-secondary-2">
                        {data.occupation}
                      </p>
                    </div>
                    <CustomStarRating rating={data.rating} />
                  </div>
                </div>

                <p>{data.review}</p>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselDots
          className="mt-1"
          btnClass="h-2 w-2"
          activeClass="bg-black"
          nonActiveClass="bg-transparent border border-primary-black rounded-full"
        />
      </Carousel>
    </div>
  );
}
