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

export default function PersonalInfoForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    control,
  } = useForm();

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="">
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
            defaultValue={"userEmail@gmail.com"}
            disabled={true}
            className="rounded-xl border border-primary-black/50 bg-transparent text-primary-black outline-none"
          />
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
      </div>
    </form>
  );
}
