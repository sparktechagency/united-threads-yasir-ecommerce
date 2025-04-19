"use client";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
} from "@/components/ui/alert-dialog";
import { Controller, useForm } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { PhoneInput } from "@/components/PhoneInput/PhoneInput";
import { Button } from "../ui/button";
import { LucideDownload } from "lucide-react";
import { useState } from "react";

export default function DownloadCatalogModal({ open, setOpen }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data) => {
    console.log(data);

    try {
      setIsLoading(true); // Start loading

      // Optional: check if the file actually exists before triggering download
      const response = await fetch("/documents/TheUnitedThreadsCatalog.pdf");

      if (!response.ok) {
        throw new Error("Failed to fetch the PDF.");
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = "TheUnitedThreadsCatalog.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url); // Clean up
    } catch (error) {
      console.error("Download failed:", error);
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen} className="relative">
      <AlertDialogContent className="pb-2 lg:max-w-xl">
        <AlertDialogHeader>
          <h3 className="text-2xl font-bold">Download Catalog</h3>
          <p className="text-gray-500">
            Please fill in the form to continue to download our catalog.
          </p>

          <AlertDialogDescription className="sr-only">
            Download catalog of The United Threads
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="mt-2">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* name */}
            <div className="grid w-full items-center gap-1">
              <Label
                htmlFor="name"
                className="mb-1 block font-semibold text-primary-black"
              >
                Full Name
              </Label>

              <Input
                type="text"
                id="name"
                placeholder="Enter your name"
                {...register("name", { required: true })}
                className="rounded-xl border border-primary-black/50 bg-transparent text-primary-black outline-none focus:outline-none"
              />
              {errors.name && (
                <p className="mt-1 text-danger">Name is required</p>
              )}
            </div>

            {/* email */}
            <div className="grid w-full items-center gap-1">
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
                  pattern: {
                    value: /^[^@]+@[^@]+\.[^@]+$/,
                    message: "Invalid email address",
                  },
                })}
                className="rounded-xl border border-primary-black/50 bg-transparent text-primary-black outline-none"
              />
              {errors.email && (
                <p className="mt-1 text-danger">Email is required</p>
              )}
            </div>

            {/* Contact */}
            <div className="grid w-full items-center gap-1">
              <Label
                htmlFor="contact"
                className="mb-1 block font-semibold text-primary-black"
              >
                Contact (Optional)
              </Label>
              <Controller
                name="contact"
                rules={{
                  required: {
                    value: false,
                  },
                }}
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

              {errors.contact && (
                <p className="mt-1 text-danger">Contact is required</p>
              )}
            </div>

            <Button
              className="primary-button !mt-8 w-full rounded-xl"
              size="lg"
              type="submit"
              disabled={isLoading}
            >
              <LucideDownload size={20} className="mr-1" />
              Download
            </Button>
          </form>
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel
            htmlType="button"
            className="absolute right-0 top-0 rounded-full border-none shadow-none"
            onClick={() => setOpen(false)}
          >
            X
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
