import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
} from "@/components/ui/alert-dialog";
import Image from "next/image";
import uploadedDesign from "/public/images/order-history/Group 47486.png";
import { X } from "lucide-react";
import ModalWrapper from "@/components/shared/ModalWrapper/ModalWrapper";

export default function ShadePendingModal({ open, setOpen, orderId }) {
  return (
    <ModalWrapper open={open} setOpen={setOpen}>
      <div className="mb-10">
        <Image
          src={uploadedDesign}
          alt="user uploaded design"
          className="mx-auto block rounded-lg border border-primary-black/50 p-2"
        />
        <h3 className="text-center font-medium text-green-500/75">
          Uploaded Design
        </h3>
      </div>
      <div className="mb-8 grid grid-cols-2 gap-6 gap-x-16">
        <div>
          <h4 className="text-lg font-medium">Category</h4>
          <h5 className="text-lg font-extrabold text-black">Hoodie</h5>
        </div>

        <div>
          <h4 className="text-lg font-medium">Size</h4>
          <h5 className="text-lg font-extrabold text-black">L</h5>
        </div>

        <div>
          <h4 className="text-lg font-medium">Color</h4>
          <h5 className="text-lg font-extrabold text-black">#ffffff</h5>
        </div>

        <div>
          <h4 className="text-lg font-medium">Quantity</h4>
          <h5 className="text-lg font-extrabold text-black">15pcs</h5>
        </div>
      </div>
      <div>
        <h4 className="text-lg font-medium">Materials Preference</h4>
        <h5 className="text-lg font-extrabold text-black">
          Combinations of materials are looking for 10% cotton, 90% polyester
        </h5>
      </div>
    </ModalWrapper>
  );
}
