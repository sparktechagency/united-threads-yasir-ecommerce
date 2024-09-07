import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { EyeIcon } from "lucide-react";

const TABLE_HEADERS = [
  "Order ID",
  "Product",
  "Category",
  "Quantity",
  "Date",
  "Total Amount",
  "Status",
  "Action",
];

const DATA = [
  {
    orderId: "12ab34cd",
    product: "Rosemary",
    category: "T-Shirt",
    quantity: 25,
    date: "31 Aug 2024",
    totalAmount: 420,
    status: "Pending",
  },
  {
    orderId: "56ef78gh",
    product: "Lavender",
    category: "Hoodie",
    quantity: 10,
    date: "01 Sep 2024",
    totalAmount: 650,
    status: "Shipped",
  },
  {
    orderId: "90ij12kl",
    product: "Chamomile",
    category: "T-Shirt",
    quantity: 30,
    date: "28 Aug 2024",
    totalAmount: 500,
    status: "Delivered",
  },
  {
    orderId: "34mn56op",
    product: "Peppermint",
    category: "Sweatshirt",
    quantity: 15,
    date: "29 Aug 2024",
    totalAmount: 375,
    status: "Cancelled",
  },
  {
    orderId: "78qr90st",
    product: "Basil",
    category: "Cap",
    quantity: 20,
    date: "02 Sep 2024",
    totalAmount: 200,
    status: "Pending",
  },
  {
    orderId: "12uv34wx",
    product: "Thyme",
    category: "T-Shirt",
    quantity: 35,
    date: "03 Sep 2024",
    totalAmount: 750,
    status: "Shipped",
  },
  {
    orderId: "56yz78ab",
    product: "Sage",
    category: "Jacket",
    quantity: 5,
    date: "30 Aug 2024",
    totalAmount: 1250,
    status: "Delivered",
  },
];

export default function OrderHistoryTable() {
  return (
    <div>
      <Table className="border">
        <TableCaption>A list of your orders.</TableCaption>
        <TableHeader>
          <TableRow>
            {TABLE_HEADERS.map((header) => (
              <TableHead
                key={header}
                className="text-lg font-semibold text-primary-black"
              >
                {header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {/* {data?.data?.map((data, idx) => (
            <TableRow key={idx}>
              <TableCell className="font-kumbh-sans text-primary-black">
                {data?.restaurant?.name}
              </TableCell>
              <TableCell className="font-kumbh-sans text-primary-black">
                {data?.id}
              </TableCell>
              <TableCell className="font-kumbh-sans text-primary-black">
                {data?.table?.seats} Person
              </TableCell>
              <TableCell className="font-kumbh-sans text-primary-black">
                {data?.table?.tableNo}
              </TableCell>

              <TableCell className="font-kumbh-sans text-primary-black">
                {new Date(data?.date).toDateString()}, ({data?.time})
              </TableCell>
              <TableCell className="font-kumbh-sans text-primary-black">
                <AlertDialog>
                  <AlertDialogTrigger>
                    <EyeIcon
                      role="button"
                      onClick={() => setReservationId(data?._id)}
                    />
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle className="font-kumbh-sans text-2xl">
                        Order History
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        <div className="mt-4 max-h-[50vh] space-y-4 overflow-auto">
                          {isLoading ? (
                            <OrderSkeleton />
                          ) : Cdata?.data?.items?.length > 0 ? (
                            Cdata.data.items.map((data, index) => (
                              <OrderCard key={index} data={data} />
                            ))
                          ) : (
                            <EmptyData />
                          )}
                        </div>
                        <div className="font-kumbh-sans text-primary-secondary-3 mb-2 mt-10 flex items-center justify-between text-xl font-medium">
                          <h4>Total Cost</h4>
                          <h4>${Cdata?.data?.totalAmount}</h4>
                        </div>
                        <div className="font-kumbh-sans text-primary-secondary-3 mb-2 mt-4 flex items-center justify-between text-xl font-medium">
                          <h4>Status</h4>
                          <h4>{Cdata?.data?.status}</h4>
                        </div>
                      </AlertDialogDescription>
                    </AlertDialogHeader>

                    <AlertDialogFooter className="flex">
                      {Cdata?.data?.status !== "paid" ? (
                        <Button
                          className="bg-primary-secondary-3"
                          onClick={handlePayment}
                        >
                          Pay
                        </Button>
                      ) : null}
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </TableCell>
              {!data?.isReviewed && status === "completed" && (
                <TableCell className="font-kumbh-sans text-primary-black">
                  <Button variant="outline" asChild>
                    <Link
                      href={`/dashboard/user/review?booking=${data?._id}&restaurant=${data?.restaurant?._id}`}
                    >
                      <MessageSquareText className="mr-2 h-4 w-4" /> Share
                      Review
                    </Link>
                  </Button>
                </TableCell>
              )}
            </TableRow>
          ))} */}
        </TableBody>
      </Table>
    </div>
  );
}
