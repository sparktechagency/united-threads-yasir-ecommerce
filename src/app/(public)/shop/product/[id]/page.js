import ProductDetailsContainer from "./_components/ProductDetailsContainer";

export const metadata = {
  title: "Product",
  description: "Single product page",
};

export default function DynamicProductPage() {
  return (
    <div className="lg:mx-auto lg:w-3/4">
      <ProductDetailsContainer />
    </div>
  );
}
