"use client";

import EyeIconInverse from "@/components/EyeIconInverse/EyeIconInverse";
import { PhoneInput } from "@/components/PhoneInput/PhoneInput";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";

export default function SignUpForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    control,
  } = useForm();

  const [isLoading, setIsLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  const onSignUpSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSignUpSubmit)} className="">
      <div className="space-y-8">
        {/* first name */}
        <div className="grid w-full items-center gap-2">
          <Label
            htmlFor="fname"
            className="mb-1 block font-semibold text-primary-black"
          >
            First Name
          </Label>
          <Input
            type="text"
            id="fname"
            placeholder="Enter your first name"
            {...register("fname", { required: true })}
            className="rounded-xl border border-primary-black/50 bg-transparent text-primary-black outline-none focus:outline-none"
          />
          {errors.fname && (
            <p className="mt-1 text-danger">First Name is required</p>
          )}
        </div>

        {/* last name */}
        <div className="grid w-full items-center gap-2">
          <Label
            htmlFor="lname"
            className="mb-1 block font-semibold text-primary-black"
          >
            Last Name
          </Label>
          <Input
            type="text"
            id="lname"
            placeholder="Enter your last name"
            {...register("lname", { required: true })}
            className="rounded-xl border border-primary-black/50 bg-transparent text-primary-black outline-none"
          />
          {errors.lname && (
            <p className="mt-1 text-danger">Last Name is required</p>
          )}
        </div>

        {/* phone number */}
        <div className="grid w-full items-center gap-2">
          <Label
            htmlFor="phoneNumber"
            className="mb-1 block font-semibold text-primary-black"
          >
            Phone Number
          </Label>
          <Controller
            name="phoneNumber"
            rules={{ required: "Phone number is required" }}
            control={control}
            render={({ field }) => (
              <PhoneInput
                value={field.value}
                onChange={field.onChange}
                international
                defaultCountry="US"
              />
            )}
          />

          {errors.phoneNumber && (
            <p className="mt-1 text-danger">Phone Number is required</p>
          )}
        </div>

        {/* email */}
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
            placeholder="Enter your email"
            {...register("email", {
              required: true,
            })}
            className="rounded-xl border border-primary-black/50 bg-transparent text-primary-black outline-none"
          />
          {errors.email && (
            <p className="mt-1 text-danger">Email is required</p>
          )}
        </div>

        {/* new password */}
        <div className="mt-6 grid w-full items-center gap-2">
          <Label
            htmlFor="newPassword"
            className="font-semibold text-primary-black"
          >
            Password
          </Label>

          <div className="relative">
            <Input
              type={showPass ? "text" : "password"}
              id="password"
              placeholder="Password"
              {...register("password", {
                required: "Password is required",
                pattern: {
                  value:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                  message:
                    "Password must have at least one uppercase, one lowercase letter, one number, one special character and 8 characters long",
                },
              })}
              className="rounded-xl border border-primary-black/50 bg-transparent text-primary-black outline-none"
            />

            <EyeIconInverse
              showPassword={showPass}
              setShowPassword={setShowPass}
            />
          </div>

          {errors.password && (
            <p className="mt-1 text-danger">{errors.password.message}</p>
          )}
        </div>

        {/* confirm password */}
        <div className="mt-6 grid w-full items-center gap-2">
          <Label
            htmlFor="confirmPassword"
            className="font-semibold text-primary-black"
          >
            Confirm Password
          </Label>

          <div className="relative">
            <Input
              type={showConfirmPass ? "text" : "password"}
              id="confirmPassword"
              placeholder="Confirm your password"
              {...register("confirmPassword", {
                required: "Confirm password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters long",
                },
                validate: (value) =>
                  value === watch("password") || "Passwords do not match",
              })}
              className="rounded-xl border-primary-black/50 bg-transparent text-primary-black outline-none"
            />
            <EyeIconInverse
              showPassword={showConfirmPass}
              setShowPassword={setShowConfirmPass}
            />
          </div>

          {errors.confirmPassword && (
            <p className="mt-1 text-danger">{errors.confirmPassword.message}</p>
          )}
        </div>
      </div>

      <Button
        loading={isLoading}
        disabled={isLoading}
        type="submit"
        className="mt-10 h-[2.8rem] w-full rounded-xl bg-primary-black font-semibold"
      >
        Create Account
        {isLoading && <Loader className="ml-3 animate-spin" size={20} />}
      </Button>

      <div className="mt-5 flex items-center justify-center gap-2">
        <p>Already have an account?</p>
        <Link href="/login" className="hover-underline font-medium">
          Sign In
        </Link>
      </div>
    </form>
  );
}
