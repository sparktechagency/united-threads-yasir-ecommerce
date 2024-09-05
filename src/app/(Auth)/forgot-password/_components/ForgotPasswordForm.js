"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function ForgotPasswordForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [isLoading, setIsLoading] = useState(false);

  const onForgotPassSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onForgotPassSubmit)}>
      <div className="grid w-full items-center gap-2">
        <Label
          htmlFor="email"
          className="mb-1 block font-semibold text-primary-black"
        >
          Email
        </Label>
        <Input
          type="email"
          id="email"
          placeholder="Email"
          {...register("email", {
            required: true,
          })}
          className="rounded-xl border border-primary-black/50 bg-transparent text-primary-black outline-none"
        />
        {errors.email && <p className="text-danger">Email is required</p>}
      </div>

      <Button
        disabled={isLoading}
        className="mt-6 h-[2.6rem] w-full rounded-xl bg-primary-black py-1 text-center text-primary-white"
      >
        Submit {isLoading && <Loader className="ml-2 animate-spin" size={20} />}
      </Button>
    </form>
  );
}
