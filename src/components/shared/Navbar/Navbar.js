import Image from "next/image";
import React from "react";
import logo from "/public/logos/logo-normal.svg";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Bell } from "lucide-react";
import { MessageSquareDot } from "lucide-react";
import userImg from "/public/images/navbar/user.png";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "lucide-react";
import { Shirt } from "lucide-react";
import { History } from "lucide-react";
import { LogOut } from "lucide-react";

// Links
const LINKS = [
  {
    key: "home",
    label: "Home",
    route: "/",
  },

  {
    key: "products",
    label: "Products",
    route: "/products",
  },
  {
    key: "shopNow",
    label: "Shop Now",
    route: "/shop",
  },
  {
    key: "about",
    label: "About",
    route: "/about",
  },
  {
    key: "contact",
    label: "Contact",
    route: "/contact",
  },
];

export default function Navbar() {
  const userId = null;

  return (
    <header className="mb-12 mt-8">
      {/* -------------- Desktop Version ------------- */}
      <div className="bg-lightGray mx-auto flex w-3/4 items-center justify-between rounded-2xl px-4 py-5">
        {/* Left ----- Logo */}
        <Link href="/" className="w-1/4">
          <Image src={logo} alt="Logo" className="mx-auto w-[70%]" />
        </Link>

        {/* Center ------ Links */}
        <div className="flex flex-grow items-center justify-center gap-x-10">
          {LINKS.map((link) => (
            <Link
              key={link.key}
              href={link.route}
              className="font-medium text-primary-black"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right -------- User sign up */}
        <div className="flex w-[20%] items-center justify-center">
          {userId ? (
            <div className="flex-center gap-x-6">
              <div className="relative" title="notifications">
                <Bell size={24} />
                <Badge className="flex-center absolute -right-2 -top-2 h-5 w-2 rounded-full bg-red-500 text-xs">
                  4
                </Badge>
              </div>

              <div className="chat">
                <MessageSquareDot size={24} />
              </div>

              {/* ---------- User profile --------------- */}
              <div>
                <DropdownMenu>
                  <DropdownMenuTrigger className="border-none outline-none ring-0">
                    <Avatar className="">
                      <AvatarImage src={userImg?.src} />
                      <AvatarFallback>AK</AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="space-y-1 rounded-xl p-2">
                    <DropdownMenuItem>
                      <User size={20} strokeWidth={1.5} className="mr-2" />
                      Personal Details
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Shirt size={20} strokeWidth={1.5} className="mr-2" />
                      Shop History
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <History size={20} strokeWidth={1.5} className="mr-2" />
                      Quote History
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <LogOut size={20} strokeWidth={1.5} className="mr-2" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ) : (
            <Button
              size="lg"
              className="flex items-center justify-center gap-x-2 rounded-xl px-8 py-[23px] text-base"
              asChild
            >
              <Link href="/login">
                Sign Up <ArrowRight size={18} strokeWidth={1.5} />
              </Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
