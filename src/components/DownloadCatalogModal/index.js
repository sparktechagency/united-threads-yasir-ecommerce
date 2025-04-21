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
import { useCreateUserBeforeDownloadCatalogMutation } from "@/redux/api/catalogApi";
import axios from "axios";
import { getBackendBaseUrl } from "@/config/envConfig";
import { Loader } from "lucide-react";
import { toast } from "sonner";

export default function DownloadCatalogModal({ open, setOpen }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [createUserBeforeDownloadCatalog] =
    useCreateUserBeforeDownloadCatalogMutation();

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);

      // ======================= Get latest catalog from db =======================
      const res = await axios.get(getBackendBaseUrl() + "/catalogue");
      const catalog = res?.data?.data;

      if (!catalog || !catalog.pdf) {
        return toast.error("Catalog download failed! Please try again later.");
      }

      // ======================= Create the user =======================
      const resCreateUser = await createUserBeforeDownloadCatalog({
        ...data,
        catalogue: catalog?._id,
      }).unwrap();

      if (!resCreateUser?.success) {
        return toast.error(resCreateUser?.message);
      }

      // ======================= Download the PDF =======================
      const link = document.createElement("a");
      link.href = catalog?.pdf;
      link.download = "TheUnitedThreadsCatalog.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast.success("Catalog downloaded successfully!");
      reset();

      // Close the modal
      setOpen(false);
    } catch (error) {
      console.error("Download failed:", error);
      toast.error("Catalog download failed! Please try again later.");
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
                htmlFor="phoneNumber"
                className="mb-1 block font-semibold text-primary-black"
              >
                Contact (Optional)
              </Label>
              <Controller
                name="phoneNumber"
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

              {errors.phoneNumber && (
                <p className="mt-1 text-danger">Phone Number is required</p>
              )}
            </div>

            <Button
              className="primary-button !mt-8 w-full rounded-xl"
              size="lg"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader className="animate-spin" />
              ) : (
                <>
                  <LucideDownload size={20} className="mr-1" />
                  Download
                </>
              )}
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
