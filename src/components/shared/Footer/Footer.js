import Image from "next/image";
import footerBg from "/public/images/footer/flowers.png";
import logo from "/public/images/footer/logo-black.png";
import sparkTechLogo from "/public/images/footer/sparktech.png";
import { Button } from "@/components/ui/button";
import { Facebook } from "lucide-react";
import Link from "next/link";
import { Instagram } from "lucide-react";
import { Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-footerBg relative z-10 mt-20 overflow-hidden py-20 text-primary-black">
      {/* Footer background flowers */}
      <Image
        src={footerBg}
        alt="footer background effect"
        className="absolute inset-0 -z-10"
      />

      {/* Footer container */}
      <div className="flex-center-between mx-auto lg:w-3/4 lg:gap-x-12">
        {/* Left */}
        <div className="space-y-8 pr-12 lg:w-1/2">
          <Image src={logo} alt="Logo" />

          <p className="text-foundation-primary-white-darker text-base font-medium">
            At UnitedThreads, we are dedicated to producing high-quality apparel
            sustainably and ethically. Our mission is to empower small and
            medium businesses by providing them with direct access to top-tier
            products from manufacturers.
          </p>
        </div>

        {/* Center */}
        <div className="space-y-6 lg:w-[30%]">
          <h5 className="text-lg font-semibold">
            Subscribe to stay tuned for latest updates. Let&apos;s do it!
          </h5>

          <div className="flex-center-start gap-x-2">
            <p className="flex rounded-lg bg-primary-black p-3 text-center text-sm text-primary-white">
              hello@theunitedthreads.com
            </p>

            <Button className="rounded-lg border bg-primary-white px-5 py-[21px] text-primary-black">
              Email Us
            </Button>
          </div>
        </div>

        {/* Right */}
        <div className="flex flex-col items-end gap-y-6 text-end lg:w-[20%]">
          <div>
            <h4 className="text-lg font-bold">Follow Us</h4>

            <div className="flex-center-start mt-2 gap-x-3">
              <Link
                href="#"
                className="rounded-full bg-primary-black p-[6px] text-primary-white"
              >
                <Facebook size={18} />
              </Link>

              <Link
                href="#"
                className="rounded-full bg-primary-black p-[6px] text-primary-white"
              >
                <Instagram size={18} />
              </Link>

              <Link
                href="#"
                className="rounded-full bg-primary-black p-[6px] text-primary-white"
              >
                <Twitter size={18} />
              </Link>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold">Call Us</h4>
            <p className="mt-2 font-medium">+1 470 286 4400</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
