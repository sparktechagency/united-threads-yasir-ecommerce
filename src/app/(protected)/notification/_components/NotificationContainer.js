"use client";

import CustomPagination from "@/components/CustomPagination/CustomPagination";
import EmptyContainer from "@/components/EmptyContainer/EmptyContainer";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useSocket } from "@/context/SocketContextApi";
import { cn } from "@/lib/utils";
import {
  useGetNotificationsQuery,
  useMarkReadMutation,
} from "@/redux/api/notificationApi";
import { selectUser } from "@/redux/features/authSlice";
import { errorToast, successToast } from "@/utils/customToast";
import { formatDistanceToNow } from "date-fns";
import { Loader } from "lucide-react";
import { CheckCheck } from "lucide-react";
import { BellDot } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CircleAlert } from "lucide-react";

export default function NotificationContainer() {
  const query = {};
  const [currentPage, setCurrentPage] = useState(1);
  const { socket } = useSocket();
  const userId = useSelector(selectUser)?._id;

  // ============ Get notifications api handler =============
  const {
    data: notificationsRes,
    isLoading: isNotificationsLoading,
    refetch,
  } = useGetNotificationsQuery(query);
  const notifications = notificationsRes?.data || [];
  const meta = notificationsRes?.meta || {};

  // ========== Mark notification as read ===================
  const [markRead, { isLoading: isMarkReadLoading }] = useMarkReadMutation();
  const handleMarkAsRead = async () => {
    try {
      await markRead().unwrap();
      successToast("All notifications read");
    } catch (error) {
      errorToast(error?.data?.message || error?.error);
    }
  };

  // Listen to new notification
  useEffect(() => {
    if (socket && userId) {
      socket.on(`notification::${userId}`, (res) => {
        refetch(); // refetch notification from api
      });
    }

    return () => {
      if (socket && userId) {
        socket.off(`notification::${userId}`);
      }
    };
  }, [socket, userId]);

  if (isNotificationsLoading) {
    return (
      <div className="space-y-5">
        {Array.from({ length: 5 }).map((_, idx) => (
          <div
            key={idx}
            className="h-20 w-full animate-pulse bg-lightGray/10"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex-center-between">
        <h3 className="text-3xl font-semibold">Notifications</h3>

        {notifications?.length > 0 && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Button
                  variant="success"
                  className="rounded-full"
                  onClick={handleMarkAsRead}
                >
                  {isMarkReadLoading ? (
                    <Loader size={18} className="animate-spin" />
                  ) : (
                    <>
                      Mark as read <CheckCheck size={18} className="ml-2" />
                    </>
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="flex items-center gap-x-2 text-base font-semibold">
                  {" "}
                  <CircleAlert size={18} /> Read notifications will disappear!
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>

      {notifications?.length > 0 ? (
        <div>
          {notifications?.map((notification, idx) => (
            <>
              <div
                key={notification?._id}
                className={cn(
                  "my-2 flex items-center gap-x-5 px-4 py-4",
                  !notification?.seen && "bg-lightGray/5",
                )}
              >
                <BellDot size={24} className="block" />

                <div>
                  <div className="flex items-center gap-x-4">
                    {/* title and date */}
                    <h5 className="mb-1 text-xl font-medium">
                      {notification.title}
                    </h5>

                    <div className="h-1 w-1 rounded-full bg-primary-black" />

                    <p className="text-primary-black/80">
                      {formatDistanceToNow(new Date(notification.createdAt), {
                        addSuffix: true,
                      })}
                    </p>
                  </div>

                  {/* message */}
                  <p className="mt-1 text-primary-black/75">
                    {notification.message}
                  </p>
                </div>
              </div>

              {idx !== notifications.length - 1 && (
                <Separator className="bg-primary-black/40" />
              )}
            </>
          ))}

          <div className="ml-auto mt-10 max-w-max">
            <CustomPagination
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              total={meta?.total}
            />
          </div>
        </div>
      ) : (
        <div>
          <EmptyContainer />
        </div>
      )}
    </div>
  );
}
