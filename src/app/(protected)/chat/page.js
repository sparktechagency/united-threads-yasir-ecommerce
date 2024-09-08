import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Paperclip } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import userImg from "/public/images/chat/20.jpg";
// import activeEllipse from "/public/user-dashboard/chat/active.png";
// import blockIcon from "/public/user-dashboard/chat/block.png";
import user2Img from "/public/images/chat/20.jpg";
import ReceiverMsgCard from "./_components/ReceiverMsgCard";
import OwnerMsgCard from "./_components/OwnerMsgCard";
import UserCard from "./_components/UserCard";
import { CircleOff } from "lucide-react";

export default function Chat() {
  return (
    <div className="lg:mx-auto lg:w-3/4">
      <div className="relative z-10 flex flex-col rounded-xl rounded-t-xl border-t-8 border-t-primary-black bg-primary-white px-10 py-8 lg:flex-row">
        {/* left */}
        <div className="border-opacity-[40%] pr-2 lg:w-[30%] lg:border-r-2 lg:border-gray-300">
          <div className="border-b-primary-blborder-t-primary-black flex items-end gap-x-5 border-b border-opacity-[40%] py-4 text-primary-black">
            <h4 className="text-2xl font-bold">Messages</h4>
            <p className="font-kumbh-sans text-primary-blborder-t-primary-black pb-1 font-semibold">
              12
            </p>
          </div>

          <div className="mx-auto mb-10 mt-4 w-[95%]">
            <Input
              placeholder="Search messages"
              className="w-full rounded-xl border border-primary-black/50 bg-transparent px-2 py-6 text-primary-black"
              type="text"
            />

            {/* users list - TODO: Use dynamic data */}
            <div className="scroll-hide mt-8 max-h-[100vh] space-y-8 overflow-auto">
              {Array.from({ length: 8 }).map((_, idx) => (
                <UserCard
                  key={idx}
                  user={{
                    img: userImg,
                    name: "Elmer Laverty",
                    latestMsg: "omg, this is amazing 🔥",
                  }}
                  active={idx === 1 ? true : false}
                />
              ))}
            </div>
          </div>
        </div>

        {/* right */}
        <div className="flex flex-col justify-between lg:flex-grow lg:px-8">
          <div className="border-b-primary-blborder-t-primary-black flex items-center justify-between border-b border-opacity-[40%] pb-1">
            <div className="flex items-center gap-x-5">
              <div className="w-[22%]">
                <Image
                  src={userImg}
                  alt="user image"
                  className="aspect-square w-full rounded-full"
                />
              </div>

              <div className="lg:flex-grow">
                <h3 className="text-xl font-semibold text-primary-black">
                  Elmer Laverty
                </h3>

                <div className="mt-1 flex items-center gap-x-2">
                  {/* Active/Online Indicator */}
                  <div className="h-2 w-2 rounded-full bg-green-500" />
                  <p className="text-primary-bl border-t-primary-black">
                    Online
                  </p>
                </div>
              </div>
            </div>

            <button className="flex items-center gap-x-2">
              <CircleOff size={20} color="#d55758" />
              <p className="text-xl text-primary-black">Block</p>
            </button>
          </div>

          <div className="max-h-full space-y-8 overflow-hidden pt-8">
            <div className="flex items-start gap-x-4">
              <Image
                src={userImg}
                alt="user's image"
                className="h-[50px] w-[50px] rounded-full"
              />
              <div className="max-w-[50%] space-y-3 overflow-hidden">
                <ReceiverMsgCard message={"omg, this is amazing"} />
                <ReceiverMsgCard message={"Lorem ipsum dolor sit amet"} />
                <ReceiverMsgCard
                  message={
                    "omg, thi perspiciatis consectetur mollitia laboriosam itaque enim officia aut nemo quibusdam?"
                  }
                />
              </div>
            </div>

            <div className="flex flex-row-reverse items-start gap-x-4">
              <Image
                src={user2Img}
                alt="user's image"
                className="h-[50px] w-[50px] rounded-full"
              />
              <div className="flex max-w-[50%] flex-col items-end space-y-3">
                <OwnerMsgCard message={"How are you?"} />
                <OwnerMsgCard
                  message={
                    "Lorem ipsum dolor sit... I'll be there in 2 mins ⏰ "
                  }
                />
              </div>
            </div>

            <div className="flex items-start gap-x-4">
              <Image
                src={userImg}
                alt="user's image"
                className="h-[50px] w-[50px] rounded-full"
              />
              <div className="max-w-[50%] space-y-3">
                <ReceiverMsgCard message={"omg, this is amazing"} />
                <ReceiverMsgCard message={"Lorem ipsum dolor sit amet"} />
                <ReceiverMsgCard
                  message={
                    "omg, thi perspiciatis consectetur mollitia laboriosam itaque enim officia aut nemo quibusdam?"
                  }
                />
              </div>
            </div>

            <div className="flex flex-row-reverse items-start gap-x-4">
              <Image
                src={user2Img}
                alt="user's image"
                className="h-[50px] w-[50px] rounded-full"
              />
              <div className="flex max-w-[50%] flex-col items-end space-y-3">
                <OwnerMsgCard message={"How are you?"} />
                <OwnerMsgCard
                  message={
                    "Lorem ipsum dolor sit... I'll be there in 2 mins ⏰ "
                  }
                />
              </div>
            </div>

            <div className="flex items-start gap-x-4">
              <Image
                src={userImg}
                alt="user's image"
                className="h-[50px] w-[50px] rounded-full"
              />
              <div className="max-w-[50%] space-y-3">
                <ReceiverMsgCard message={"Lorem ipsum dolor sit amet"} />
                <ReceiverMsgCard message={"omg, this is amazing"} />
              </div>
            </div>
          </div>

          <div className="mt-10 flex w-full items-center gap-x-6">
            <Paperclip role="button" />
            <div className="flex w-full items-stretch gap-x-4">
              <Input
                placeholder="Type a message"
                type="text"
                className="w-full border-2 border-primary-black/50 bg-transparent px-4 py-6"
              />
              <Button
                variant="outline"
                className="border-2 border-primary-black/50 bg-transparent py-6"
              >
                <Send />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
