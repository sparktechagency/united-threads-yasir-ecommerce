import verifyGraphic from "/public/images/verify otp/13246824_5191077 2.png";
import VerifyOtpForm from "./_components/VerifyOtpForm";
import { CustomImageWithBlur } from "@/components/CustomImageWithBlur/CustomImageWithBlur";

export const metadata = {
  title: "Verify Otp",
  description: "Verify OTP page",
};

export default function VerifyOtpPage() {
  return (
    <div className="flex-center gap-x-10 rounded-xl border border-gray-200 p-10 shadow-[0px_0px_2px_lightGray]">
      <div className="lg:w-1/2">
        <CustomImageWithBlur
          src={verifyGraphic}
          alt="Verify Otp Graphic"
          className="mx-auto block lg:w-[90%]"
        />
      </div>

      <div className="w-full lg:w-1/2">
        <h2 className="mb-3 text-4xl font-semibold">Verify OTP</h2>
        <p className="font-kumbh-sans mb-10 text-primary-black">
          We&apos;ll send a verification code to your email. Check your inbox
          and enter the code here:
        </p>

        <VerifyOtpForm />
      </div>
    </div>
  );
}
