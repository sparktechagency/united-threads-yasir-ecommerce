import Image from "next/image";
import { Button } from "@/components/ui/button";
import AnimatedArrow from "@/components/AnimatedArrow/AnimatedArrow";
import Link from "next/link";

export default function QuoteProductCard({ product }) {
  return (
    <div className="rounded-3xl border border-primary-black/50 p-5 shadow transition-all duration-300 ease-in-out hover:shadow-lg">
      {/* TODO: Add image slider on hover */}
      <div className="flex-center h-[250px]">
        <Image
          src={product?.frontSide}
          alt="product image"
          height={500}
          width={500}
          className="mx-auto block h-full w-auto rounded"
        />
      </div>

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
