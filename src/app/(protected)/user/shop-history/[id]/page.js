import OrderContainer from "./_components/OrderContainer";

export const metadata = {
  title: "Order Details",
  description: "Order details page",
};

export default function DynamicOrderPage() {
  return (
    <div className="lg:mx-auto lg:w-3/4">
      <OrderContainer />
    </div>
  );
}
