import Image from "next/image";
import productImage from "/public/images/products/blank-product-image.png";
import { Button } from "@/components/ui/button";
import AnimatedArrow from "@/components/AnimatedArrow/AnimatedArrow";
import Link from "next/link";

const product = {
  _id: 1,
  img: productImage,
  name: "Unisex Short Sleeve Tee",
};

export default function QuoteProductCard() {
  return (
    <div className="rounded-3xl border border-primary-black/50 p-5 shadow transition-all duration-300 ease-in-out hover:shadow-lg">
      <Image
        src={product?.img}
        alt="product image"
        height={200}
        width={200}
        className="mx-auto block"
      />

      <div className="flex-center-between mb-5 mt-5 text-xl font-bold">
        <h4>{product?.name}</h4>
      </div>

      <Link href={`/products/${product._id}`}>
        <Button className="primary-button group rounded-full">
          Request Quote
          <AnimatedArrow arrowSize={16} />
        </Button>
      </Link>
    </div>
  );
}
