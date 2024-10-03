import { toast } from "sonner";

export const successToast = (message, toastId) => {
  return toast.success(message, {
    id: toastId,
  });
};

export const errorToast = (message, toastId) => {
  return toast.error(message, {
    id: toastId,
  });
};

export const warnToast = (message, toastId) => {
  return toast.warning(message, {
    id: toastId,
  });
};
