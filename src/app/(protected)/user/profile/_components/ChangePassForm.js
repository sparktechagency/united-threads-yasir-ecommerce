"use client";

import EyeIconInverse from "@/components/EyeIconInverse/EyeIconInverse";
import { PhoneInput } from "@/components/PhoneInput/PhoneInput";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Edit } from "lucide-react";
import { Loader } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";

export default function ChangePassForm() {
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

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="">
      <div className="space-y-8">
        {/* Current password */}
        <div className="mt-6 grid w-full items-center gap-2">
          <Label
            htmlFor="currentPassword"
            className="font-semibold text-primary-black"
          >
            New Password
          </Label>

          <div className="relative">
            <Input
              type={showPass ? "text" : "password"}
              id="currentPassword"
              placeholder="New Password"
              {...register("currentPassword", {
                required: "Current Password is required",
                pattern: {
                  value:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                  message:
                    "New Password must have at least one uppercase, one lowercase letter, one number, one special character and 8 characters long",
                },
              })}
              className="rounded-xl border border-primary-black/50 bg-transparent text-primary-black outline-none"
            />

            <EyeIconInverse
              showPassword={showPass}
              setShowPassword={setShowPass}
            />
          </div>

          {errors.currentPassword && (
            <p className="mt-1 text-danger">{errors.currentPassword.message}</p>
          )}
        </div>

        {/* new password */}
        <div className="mt-6 grid w-full items-center gap-2">
          <Label
            htmlFor="newPassword"
            className="font-semibold text-primary-black"
          >
            New Password
          </Label>

          <div className="relative">
            <Input
              type={showPass ? "text" : "password"}
              id="newPassword"
              placeholder="New Password"
              {...register("newPassword", {
                required: "NewPassword is required",
                pattern: {
                  value:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                  message:
                    "New Password must have at least one uppercase, one lowercase letter, one number, one special character and 8 characters long",
                },
              })}
              className="rounded-xl border border-primary-black/50 bg-transparent text-primary-black outline-none"
            />

            <EyeIconInverse
              showPassword={showPass}
              setShowPassword={setShowPass}
            />
          </div>

          {errors.newPassword && (
            <p className="mt-1 text-danger">{errors.newPassword.message}</p>
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
        <Edit size={20} className="mr-2" /> Save Changes
        {isLoading && <Loader className="ml-3 animate-spin" size={20} />}
      </Button>
    </form>
  );
}
