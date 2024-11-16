import Image from "next/image";
import LoginForm from "./_components/LoginForm";
import loginGraphic from "/public/images/login/Edit photo-rafiki 1.png";
import logo from "/public/images/login/logo.png";
import { CustomImageWithBlur } from "@/components/CustomImageWithBlur/CustomImageWithBlur";

export const metadata = {
  title: "Login",
  description: "Login page",
};

export default function page() {
  return (
    <div className="flex-center flex-col rounded-xl border border-gray-200 p-5 shadow-[0px_0px_2px_lightGray] md:p-16 md:py-8 lg:flex-row">
      {/* Left */}
      <div className="md:w-3/4 2xl:w-1/2">
        <CustomImageWithBlur
          src={loginGraphic}
          alt="Login Graphic"
          height={1200}
          width={1200}
          className="h-auto w-auto"
        />
      </div>

      {/* Right */}
      <div className="lg:flex-grow">
        <div className="max-w-1/2">
          <Image
            src={logo}
            alt="logo"
            height={2400}
            width={2400}
            className="mx-auto h-auto w-[55%]"
          />
        </div>

        <h5 className="my-6 text-center text-2xl font-semibold">
          Great to have you back!
        </h5>

        <LoginForm />
      </div>
    </div>
  );
}
