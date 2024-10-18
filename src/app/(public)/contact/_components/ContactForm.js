"use client";

import AnimatedArrow from "@/components/AnimatedArrow/AnimatedArrow";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";

export default function ContactForm() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-8">
        <div className="grid grid-cols-1 gap-x-4 lg:grid-cols-2">
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

        {/* Description */}
        <div className="grid w-full items-center gap-2">
          <Label
            htmlFor="description"
            className="mb-1 block font-semibold text-primary-black"
          >
            Description
          </Label>
          <Textarea
            id="description"
            placeholder="Tell us about your queries"
            {...register("description", {
              required: true,
            })}
            className="min-h-20 rounded-xl border border-primary-black/50 bg-transparent text-primary-black outline-none"
          />
          {errors.description && (
            <p className="mt-1 text-danger">Please tell us about your query</p>
          )}
        </div>
      </div>

      <Button className="primary-button group my-10 h-[2.7rem] w-full rounded-xl">
        Submit
        <AnimatedArrow />
      </Button>
    </form>
  );
}
