"use client";

import EyeIconInverse from "@/components/EyeIconInverse/EyeIconInverse";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Loader } from "lucide-react";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function LoginForm() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    watch,
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onLoginSubmit = (data) => {
    const toastId = toast.loading("Logging in...");

    localStorage.setItem("yasir-auth", JSON.stringify({ userId: true }));

    setTimeout(() => {
      toast.success("Login successful", {
        id: toastId,
      });
      router.push("/");
    }, 3000);
  };

  return (
    <form
      onSubmit={handleSubmit(onLoginSubmit)}
      className="text-primary-black lg:mx-auto lg:w-[75%]"
    >
      <div className="grid w-full items-center gap-2">
        <Label htmlFor="name" className="font-semibold">
          Email
        </Label>
        <Input
          type="email"
          id="email"
          placeholder="Email"
          className="rounded-xl border-primary-black/50 bg-transparent px-4 py-5"
          {...register("email", {
            required: "Email is required",
            validate: (value) => {
              const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
              if (!emailRegex.test(value)) {
                return "Must be a valid email";
              }
              return true;
            },
          })}
        />
        {errors.email && (
          <span className="shake-hr text-danger">{errors.email.message}</span>
        )}
      </div>

      <div className="mt-8 grid w-full items-center gap-1.5">
        <div className="flex items-center justify-between">
          <Label htmlFor="password" className="font-semibold">
            Password
          </Label>
          <Link
            href="/forgot-password"
            className="text-sm font-medium text-primary-black hover:text-primary-black/75"
          >
            Forgot Password?
          </Link>
        </div>

        <div className="relative">
          <Input
            type={showPassword ? "text" : "password"}
            id="password"
            placeholder="Password"
            className="rounded-xl border-primary-black/50 bg-transparent px-4 py-5"
            {...register("password", { required: true })}
          />
          <EyeIconInverse
            showPassword={showPassword}
            setShowPassword={setShowPassword}
          />
        </div>

        {errors.password && (
          <span className={"shake-hr text-danger"}>Password is required</span>
        )}
      </div>

      <Button
        loading={isLoading}
        disabled={isLoading}
        type="submit"
        className={cn(
          "mt-10 h-[2.8rem] w-full rounded-xl border bg-primary-black font-medium capitalize",
          isLoading && "cursor-not-allowed",
        )}
      >
        SIGN IN{" "}
        {isLoading && <Loader className="ml-3 animate-spin" size={20} />}
      </Button>

      <div className="mt-3 flex items-center justify-center gap-2">
        <p>Don&apos;t have an account?</p>

        <div className="hover-underline">
          <Link href="/sign-up" className="font-medium">
            Register
          </Link>
        </div>
      </div>
    </form>
  );
}
