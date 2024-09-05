"use client";

import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { Loader } from "lucide-react";
import { useState } from "react";

export default function VerifyOtpForm() {
  const [value, setValue] = useState("");
  const [showRequired, setShowRequired] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleVerifyOtp = () => {
    console.log(value);
  };

  return (
    <div>
      <div className="mx-auto w-max">
        <InputOTP
          maxLength={6}
          pattern={REGEXP_ONLY_DIGITS}
          onChange={(value) => setValue(value)}
        >
          <InputOTPGroup className="flex items-center gap-x-5">
            <InputOTPSlot
              index={0}
              className="h-[63px] w-[50px] border border-primary-black/50 text-3xl font-extrabold"
            />
            <InputOTPSlot
              index={1}
              className="h-[63px] w-[50px] border border-primary-black/50 text-3xl font-extrabold"
            />
            <InputOTPSlot
              index={2}
              className="h-[63px] w-[50px] border border-primary-black/50 text-3xl font-extrabold"
            />
            <InputOTPSlot
              index={3}
              className="h-[63px] w-[50px] border border-primary-black/50 text-3xl font-extrabold"
            />
            <InputOTPSlot
              index={4}
              className="h-[63px] w-[50px] border border-primary-black/50 text-3xl font-extrabold"
            />
            <InputOTPSlot
              index={5}
              className="h-[63px] w-[50px] border border-primary-black/50 text-3xl font-extrabold"
            />
          </InputOTPGroup>
        </InputOTP>

        {showRequired && (
          <p className="mt-3 text-center text-danger">
            Please enter your one-time password correctly
          </p>
        )}
      </div>

      <Button
        disabled={isLoading}
        type="submit"
        className="bg-primary-orange mt-8 h-[2.7rem] w-full bg-primary-black font-medium capitalize text-primary-white"
        onClick={handleVerifyOtp}
      >
        Submit {isLoading && <Loader className="ml-2 animate-spin" />}
      </Button>
    </div>
  );
}
