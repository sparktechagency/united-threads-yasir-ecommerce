import CustomStarRating from "@/components/CustomStarRating/CustomStarRating";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React, { useState } from "react";
import UpdateReviewModal from "./UpdateReviewModal";
import userImg from "/public/images/review-card/gettyimages-971463110.jpg";

const review = {
  user: {
    name: "Cristiano Ronaldo",
    image: userImg,
  },
  rating: 5,
  comment: "This product is really good!",
};

export default function ReviewCard() {
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const userId = null;

  return (
    <>
      <div>
        <div className="flex items-start gap-x-3">
          <Avatar className="h-[50px] w-[50px]">
            <AvatarImage
              src={review?.user?.image?.src}
              className="rounded-full"
            />
            <AvatarFallback className="font-medium uppercase">
              {review?.user?.name[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <div>
            <div className="flex items-center gap-x-3">
              <p className="text-xl font-medium text-primary-black">
                {review?.user?.name}
              </p>
              <div className="bg-foundation-orange-normal h-1 w-1 rounded-full"></div>
              <p>1 week ago</p>
            </div>
            <CustomStarRating rating={review?.rating} />
          </div>
        </div>
        <p className="mt-5 text-lg text-primary-black">{review?.comment}</p>
      </div>

      {/* Update review modal */}
      <UpdateReviewModal
        review={review}
        userId={userId}
        open={showUpdateModal}
        setOpen={setShowUpdateModal}
      />
    </>
  );
}
