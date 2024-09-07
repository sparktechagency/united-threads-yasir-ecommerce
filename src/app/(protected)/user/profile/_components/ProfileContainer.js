"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import userImg from "/public/images/user/Tom-Cruise-2013.webp";
import { Edit2 } from "lucide-react";
import { Edit } from "lucide-react";
import PersonalInfoForm from "./PersonalInfoForm";
import ChangePassForm from "./ChangePassForm";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { Trash2 } from "lucide-react";

export default function ProfileContainer() {
  return (
    <div className="lg:mx-auto lg:w-[60%]">
      {/* Profile Image */}
      <div className="flex-center-between">
        <div className="flex-center-start gap-x-3">
          <div className="group relative">
            <Avatar className="h-16 w-16">
              <AvatarImage src={userImg.src} />
              <AvatarFallback>TC</AvatarFallback>
            </Avatar>

            <button className="flex-center absolute inset-0 bg-white/75 py-1 opacity-0 transition-all duration-300 group-hover:opacity-100">
              <Edit size={20} />
            </button>
          </div>

          <h4 className="text-2xl font-semibold">Tom Cruise</h4>
        </div>

        <Button variant="destructive" className="rounded-full">
          <Trash2 size={16} className="mr-2" /> Delete Account
        </Button>
      </div>

      <div className="my-10 flex flex-col items-center gap-x-10 space-y-12">
        <div className="w-full">
          <h3 className="mb-6 text-2xl font-bold">Personal Information</h3>

          <PersonalInfoForm />
        </div>

        <div className="w-full">
          <h3 className="mb-6 text-2xl font-bold">Change Password</h3>

          <ChangePassForm />
        </div>
      </div>
    </div>
  );
}
