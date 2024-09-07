"use client";

import React, { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Controller, useForm } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
import CountryStateCitySelector from "@/components/CountryStateCitySelector/CountryStateCitySelector";

export default function BillingForm({ goToNextStep }) {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    goToNextStep();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="">
      <div className="space-y-8">
        {/* name */}
        <div className="grid w-full items-center gap-1.5">
          <Label
            htmlFor="name"
            className="mb-1 block font-semibold text-primary-black"
          >
            Full Name<span className="text-foundation-orange-normal/80">*</span>
          </Label>
          <Input
            type="text"
            id="name"
            {...register("name", { required: true })}
            className="border-none bg-[#F5F5F5] text-primary-black outline-none focus:outline-none"
          />
          {errors.name && <p className="mt-1 text-danger">Name is required</p>}
        </div>

        {/* Location */}
        <div className="grid w-full items-center gap-1.5">
          <Label
            htmlFor="email"
            className="mb-1 block font-semibold text-primary-black"
          >
            Email Address
            <span className="text-foundation-orange-normal/80">*</span>
          </Label>
          <Input
            type="email"
            id="email"
            className="border-none bg-[#F5F5F5] outline-none"
            disabled={true}
            defaultValue="user-email@gmail.com"
          />
        </div>

        <div className="grid w-full items-center gap-1.5">
          <Label
            htmlFor="phoneNumber"
            className="mb-1 block font-semibold text-primary-black"
          >
            Phone Number
            <span className="text-foundation-orange-normal/80">*</span>
          </Label>
          <Input
            type="tel"
            id="phoneNumber"
            {...register("phoneNumber", { required: true })}
            className="border-none bg-[#F5F5F5] text-primary-black outline-none"
            placeholder="Enter phone number (with country code)"
          />
          {errors.phoneNumber && (
            <p className="mt-1 text-danger">Phone Number is required</p>
          )}
        </div>

        {/* address */}
        <div className="relative col-span-2 grid w-full items-center gap-1.5">
          <Label
            htmlFor="address"
            className="mb-1 block font-semibold text-primary-black"
          >
            Address :
          </Label>

          <CountryStateCitySelector
            control={control}
            register={register}
            setValue={setValue}
          />
        </div>

        <div className="">
          <Controller
            name="saveInfo"
            control={control}
            render={({ field }) => (
              <label className="font-medium text-black">
                <Checkbox
                  id="saveInfo"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  className={`mr-2`}
                />
                Save my information for faster check-out next time
              </label>
            )}
          />
        </div>
      </div>

      <Button
        htmlType="submit"
        className="primary-button mt-10 block h-[2.7rem] w-full font-medium"
      >
        Save & Proceed to Payment
      </Button>
    </form>
  );
}
