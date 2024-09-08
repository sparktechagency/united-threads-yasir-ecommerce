import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Truck } from "lucide-react";
import Image from "next/image";
import productImg from "/public/images/order-details/71DjprnHx4L._AC_SX522_-removebg-preview.png";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function OrderContainer() {
  return (
    <div className="flex min-h-[75vh] items-center lg:w-full lg:gap-x-10">
      {/* Left */}
      <div className="lg:w-[60%]">
        <Link
          href="/user/shop-history"
          className="flex-center mb-10 h-8 w-8 rounded-full border border-primary-black transition-all duration-300 ease-in-out hover:bg-primary-black hover:text-white"
        >
          <ArrowLeft size={18} />
        </Link>

        <div>
          <div className="flex-center-between">
            <h3 className="text-2xl font-bold">
              Order ID: <span className="text-orange-400">#12ab34cd</span>
            </h3>

            {/* Order Status Button */}
            <Button className="flex-center gap-x-2 bg-orange-500">
              Shipped
              <Truck size={16} />
            </Button>
          </div>

          <div className="text-muted-foreground mt-5 space-y-1 font-medium">
            <p className="flex items-center justify-between">
              <span className="font-semibold">Date:</span>
              20 Aug 2024, 10:30 PM
            </p>
            <p className="flex items-center justify-between">
              <span className="font-semibold">Contact No:</span>
              +9900000000
            </p>

            <p className="flex items-center justify-between">
              <span className="font-semibold">Shipping Address:</span>
              13th Street. 47 W 13th St,New York, NY 10011
            </p>
          </div>
        </div>

        {/* <Separator className="my-5 bg-primary-black" /> */}

        {/* size & color */}
        <div className="flex-center-start mt-20 gap-x-16">
          <div className="flex-center-start gap-x-5 text-xl font-semibold">
            <h4>Size: </h4>
            <p className="rounded-full border border-primary-black px-3 py-[1px] text-lg">
              L
            </p>
          </div>

          <div className="flex-center-start gap-x-5 text-xl font-semibold">
            <h4>Color Palette: </h4>
            <div className="h-6 w-6 rounded-full border bg-black"></div>
            <div className="h-6 w-6 rounded-full border bg-black/75"></div>
            <div className="h-6 w-6 rounded-full border bg-black/50"></div>
            <div className="h-6 w-6 rounded-full border bg-black/25"></div>
          </div>
        </div>

        <Separator className="my-5 bg-primary-black" />

        {/* Subtotal */}
        <div className="flex-center-between text-2xl font-bold text-primary-black">
          <h4>Subtotal: </h4>
          <h4>$777</h4>
        </div>
      </div>

      {/* Right */}
      <div className="lg:flex-grow">
        <div className="mx-auto max-w-max rounded-xl bg-gray-300 px-20 pt-5">
          <Image
            src={productImg}
            alt="product image"
            className="mx-auto max-w-max"
          />
        </div>
      </div>
    </div>
  );
}
