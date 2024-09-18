import CommonPageHeader from "@/components/CommonPageHeader/CommonPageHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ShadeApprovedTable from "./_components/ShadeApprovedTable";
import { Watch } from "lucide-react";
import { CheckCheck } from "lucide-react";
import ShadePendingTable from "./_components/ShadePendingTable";

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

      <div className="my-10 lg:mx-auto lg:w-3/4">
        <Tabs defaultValue="shadeApprovalPending" className="w-full">
          <TabsList className="py-5 shadow">
            <TabsTrigger value="shadeApprovalPending" className="text-base">
              <Watch size={18} className="mr-2" /> Design Approval Pending...
            </TabsTrigger>
            <TabsTrigger value="shadeApproved" className="text-base">
              <CheckCheck size={18} className="mr-2" /> Approved
            </TabsTrigger>
          </TabsList>

          <TabsContent value="shadeApprovalPending">
            <div
              className="my-8 rounded-xl p-6"
              style={{ boxShadow: "0px 0px 5px lightGray" }}
            >
              <ShadePendingTable />
            </div>
          </TabsContent>
          <TabsContent value="shadeApproved">
            <div
              className="my-8 rounded-xl p-6"
              style={{ boxShadow: "0px 0px 5px lightGray" }}
            >
              <ShadeApprovedTable />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
