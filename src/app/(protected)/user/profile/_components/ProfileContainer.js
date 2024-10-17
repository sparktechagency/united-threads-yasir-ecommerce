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
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
} from "@/redux/api/userApi";
import { transformNameInitials } from "@/utils/transformNameInitials";
import { useState } from "react";
import { Camera } from "lucide-react";
import { X } from "lucide-react";
import { Loader } from "lucide-react";
import { ErrorModal, SuccessModal } from "@/utils/customModal";

export default function ProfileContainer() {
  const [profilePicInput, setProfilePicInput] = useState(null);
  const [profilePicUrl, setProfilePicUrl] = useState(null);
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();

  const { data: userRes } = useGetProfileQuery();
  const user = userRes?.data || {};

  // Change Profile Picture
  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setProfilePicInput(file);
      setProfilePicUrl(URL.createObjectURL(file));
    }
  };

  const handleChangeProfilePic = async (e) => {
    e.preventDefault();

    if (!profilePicInput) {
      ErrorModal("Profile picture not found!");
      return;
    }

    const formData = new FormData();

    formData.append("profilePicture", profilePicInput);

    try {
      const res = await updateProfile(formData).unwrap();
      if (res?.success) {
        SuccessModal("Profile picture updated successfully");

        setProfilePicUrl(null);
        setProfilePicInput(null);
        document.getElementById("profilePicInput").value = null;
      }
    } catch (error) {
      ErrorModal(error?.data?.message);
    }
  };

  return (
    <div className="lg:mx-auto lg:w-[60%]">
      {/* Profile Image */}
      <div className="flex-center-between">
        <div className="flex-center-start gap-x-3">
          <div className="group relative mx-auto block w-max">
            <div>
              {profilePicUrl ? (
                <div>
                  <Avatar className="border-primary-orange h-[90px] w-[90px] border">
                    <AvatarImage src={profilePicUrl} />
                  </Avatar>

                  {/* Update image button */}
                  <button
                    className="mx-auto mt-2 block w-full rounded bg-primary-black text-sm text-primary-white hover:bg-black"
                    onClick={handleChangeProfilePic}
                    disabled={isUpdating}
                  >
                    {isUpdating ? (
                      <Loader size={16} className="mx-auto animate-pulse" />
                    ) : (
                      "Save"
                    )}
                  </button>
                </div>
              ) : user?.profilePicture ? (
                <Avatar className="h-[90px] w-[90px] border border-primary-black">
                  <AvatarImage src={user?.profilePicture} />
                </Avatar>
              ) : (
                <div className="text-foundation-orange-normal flex h-[90px] w-[90px] items-center justify-center rounded-full bg-gray-800 text-2xl font-bold uppercase">
                  <p>
                    {transformNameInitials("", user?.firstName, user?.lastName)}
                  </p>
                </div>
              )}
            </div>

            <div>
              <input
                id="profilePicInput"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />

              {!profilePicInput && (
                <button
                  className="hover:text-foundation-orange-normal invisible absolute bottom-0 right-0 rounded-full border border-primary-black bg-white p-2 text-black opacity-0 transition-all duration-300 ease-in-out group-hover:visible group-hover:opacity-100"
                  onClick={() =>
                    document.getElementById("profilePicInput").click()
                  }
                  title="Change profile picture"
                >
                  <Camera size={16} />
                </button>
              )}

              {/* show remove button if image url is present */}
              {profilePicInput && (
                <button
                  className="absolute right-0 top-0 rounded-full bg-black p-[2px] text-danger"
                  onClick={() => {
                    document.getElementById("profilePicInput").value = null;
                    setProfilePicInput(null);
                    setProfilePicUrl(null);
                  }}
                >
                  <X size={16} />
                </button>
              )}
            </div>
          </div>

          <h4 className="text-2xl font-semibold">
            {user?.firstName} {user?.lastName}
          </h4>
        </div>

        <Button variant="destructive" className="rounded-full">
          <Trash2 size={16} className="mr-2" /> Delete Account
        </Button>
      </div>

      <div className="my-10 flex flex-col items-center gap-x-10 space-y-12">
        <div className="w-full">
          <h3 className="mb-6 text-2xl font-bold">Personal Information</h3>

          <PersonalInfoForm user={user} />
        </div>

        <div className="w-full">
          <h3 className="mb-6 text-2xl font-bold">Change Password</h3>

          <ChangePassForm />
        </div>
      </div>
    </div>
  );
}
