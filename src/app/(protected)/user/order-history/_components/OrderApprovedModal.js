import Image from "next/image";
import uploadedDesign from "/public/images/order-history/Group 47486.png";
import { Button } from "@/components/ui/button";
import ModalWrapper from "@/components/shared/ModalWrapper/ModalWrapper";
import AnimatedArrow from "@/components/AnimatedArrow/AnimatedArrow";
import Link from "next/link";

export default function OrderModal({ open, setOpen, orderId }) {
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
      <div className="mb-5 grid grid-cols-2 gap-6 gap-x-16">
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
          Combinations of materials are looking for 10% cotton , 90% polyester
        </h5>
      </div>

      <div className="flex-center-between mt-10 rounded-full border border-primary-black p-2">
        <h4 className="text-lg font-semibold">Estimated Total Amount</h4>
        <h5 className="text-lg font-extrabold text-black">$707</h5>

        <Link href="/checkout">
          <Button className="primary-button group rounded-full">
            Payment <AnimatedArrow />
          </Button>
        </Link>
      </div>
    </ModalWrapper>
  );
}
