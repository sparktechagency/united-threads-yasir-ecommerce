import CommonPageHeader from "@/components/CommonPageHeader/CommonPageHeader";

export const metadata = {
  title: "Order History",
  description: "Order history page",
};

export default function OrderHistoryPage() {
  return (
    <div>
      <CommonPageHeader
        pageTitle="Order History"
        previousPage={{
          pageTitle: "Home",
        }}
      />
    </div>
  );
}
