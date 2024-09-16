import Image from "next/image";
import uploadedFrontDesign from "/public/images/quote-history/front.png";
import uploadedBackDesign from "/public/images/quote-history/back.png";
import ModalWrapper from "@/components/shared/ModalWrapper/ModalWrapper";

export default function ShadePendingModal({ open, setOpen, orderId }) {
  return (
    <ModalWrapper open={open} setOpen={setOpen}>
      <div className="mb-10">
        <div className="flex-center gap-x-5">
          <div>
            <Image
              src={uploadedFrontDesign}
              alt="user uploaded front design"
              className="mx-auto block rounded-lg border border-primary-black/50 p-2"
            />
            <h3 className="text-center font-medium text-green-500/75">
              Front Design
            </h3>
          </div>
          <div>
            <Image
              src={uploadedBackDesign}
              alt="user uploaded back design"
              className="mx-auto block rounded-lg border border-primary-black/50 p-2"
            />
            <h3 className="text-center font-medium text-green-500/75">
              Back Design
            </h3>
          </div>
        </div>
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
