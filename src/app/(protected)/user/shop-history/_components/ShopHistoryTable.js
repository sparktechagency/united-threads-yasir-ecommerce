"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Check } from "lucide-react";
import { ChevronsUpDown } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import AnimatedArrow from "@/components/AnimatedArrow/AnimatedArrow";
import { useGetOrdersQuery } from "@/redux/api/orderApi";
import { format } from "date-fns";
import CustomPagination from "@/components/CustomPagination/CustomPagination";
import { Tag } from "antd";
import { getTableTagColor } from "@/utils/getTableTagColor";
import { formatCurrency } from "@/utils/formatCurrency";
import TableLoaderWithEmpty from "@/components/TableLoaderWithEmpty/TableLoaderWithEmpty";
import { useCreatePaymentMutation } from "@/redux/api/paymentApi";
import { errorToast, successToast } from "@/utils/customToast";

const TABLE_HEADERS = [
  "Order ID",
  "Product",
  "Category",
  "Order Created",
  "Total Amount",
  "Status",
  "Payment",
  "Action",
];

const ORDER_STATUS = ["All", "Pending", "Shipped", "Delivered"];

export default function ShopHistoryTable() {
  const [payingOrderId, setPayingOrderId] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("All");
  const query = {};

  if (selectedStatus !== "All") {
    query["status"] = selectedStatus?.toUpperCase();
  }

  // =============== Pagination ================
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  query["page"] = currentPage;
  query["limit"] = pageSize;

  // ================ Get shop order details ================
  const { data: ordersRes, isLoading } = useGetOrdersQuery(query);
  const orders = ordersRes?.data || [];
  const meta = ordersRes?.meta || {};

  // ============== Payment api handler =================
  const [createPaymentLink, { isLoading: isCreatingPayment }] =
    useCreatePaymentMutation();

  // Handle payment
  const handlePaymentForQuote = async (orderId) => {
    setPayingOrderId(orderId);

    try {
      const createPaymentRes = await createPaymentLink(orderId).unwrap();

      successToast("Proceed to payment....");
      window.location.href = createPaymentRes?.data?.paymentLink;
    } catch (error) {
      errorToast(error?.data?.message || error?.error || error?.message);
    } finally {
      setPayingOrderId(null);
    }
  };

  return (
    <div
      className="my-8 rounded-xl p-6"
      style={{ boxShadow: "0px 0px 5px lightGray" }}
    >
      <Table>
        <TableHeader>
          <TableRow className="bg-lightGray hover:bg-lightGray">
            {TABLE_HEADERS.map((header) => (
              <TableHead
                key={header}
                className="whitespace-nowrap text-lg font-semibold text-primary-black"
                style={{ paddingBlock: "14px" }}
              >
                {header !== "Status" && header}

                {header === "Status" && (
                  <DropdownMenu>
                    <DropdownMenuTrigger className="flex-center-start gap-x-3">
                      Status <ChevronsUpDown size={16} />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      {ORDER_STATUS.map((status) => (
                        <DropdownMenuItem
                          key={status}
                          onClick={() => setSelectedStatus(status)}
                        >
                          {selectedStatus === status && (
                            <Check className="mr-1" size={16} />
                          )}

                          <button
                            className={selectedStatus !== status && "ml-4"}
                          >
                            {status}
                          </button>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody style={{ padding: "14px" }}>
          {/* ======== Show loading or empty if no pending quotes ======== */}
          <TableLoaderWithEmpty isLoading={isLoading} data={orders} />

          {orders?.length > 0 &&
            orders?.map((order) => (
              <TableRow
                key={order?._id}
                className="border-b border-primary-black/15"
              >
                <TableCell className="py-5 font-medium">
                  #{order?._id}
                </TableCell>
                <TableCell className="y-5 font-medium">
                  {order?.quote?.name || order?.product?.name}
                </TableCell>
                <TableCell className="w-max whitespace-nowrap py-5 font-medium">
                  {order?.quote?.category?.name ||
                    order?.product?.category?.name}
                </TableCell>

                <TableCell className="w-max whitespace-nowrap py-5 font-medium">
                  {order?.createdAt &&
                    format(order?.createdAt, "dd MMM yyyy, hh:mm a")}
                </TableCell>
                <TableCell className="w-max whitespace-nowrap py-5 font-medium">
                  $
                  {formatCurrency(
                    order?.orderType === "SHOP"
                      ? Number(order?.amount * order?.quantity)
                      : order?.amount,
                  )}
                </TableCell>

                <TableCell
                  className={cn("w-max whitespace-nowrap py-5 font-medium")}
                >
                  <Tag
                    color={getTableTagColor(order?.status)}
                    style={{ fontWeight: "bold" }}
                  >
                    {order?.status}
                  </Tag>
                </TableCell>

                <TableCell
                  className={cn("w-max whitespace-nowrap py-5 font-medium")}
                >
                  <Tag
                    color={getTableTagColor(order?.paymentStatus)}
                    style={{ fontWeight: "bold" }}
                  >
                    {order?.paymentStatus}
                  </Tag>
                </TableCell>

                <TableCell>
                  {order?.status === "DELIVERED" &&
                  order?.orderType === "SHOP" ? (
                    <Button
                      variant="outline"
                      asChild
                      className="group w-full gap-x-2"
                    >
                      <Link
                        href={`/shop/product/${order?.product?._id}?review=true`}
                      >
                        Share Review <AnimatedArrow />
                      </Link>
                    </Button>
                  ) : (
                    <div className="flex flex-col gap-2">
                      <Button
                        asChild
                        variant="outline"
                        className="group gap-x-2"
                      >
                        <Link href={`/user/shop-history/${order?._id}`}>
                          View Details <AnimatedArrow arrowSize={16} />
                        </Link>
                      </Button>

                      {order?.paymentStatus === "UNPAID" && (
                        <Button
                          className="group gap-x-2"
                          onClick={() => handlePaymentForQuote(order?._id)}
                        >
                          {isCreatingPayment && payingOrderId === order?._id ? (
                            "loading..."
                          ) : (
                            <>
                              Pay <AnimatedArrow arrowSize={16} />
                            </>
                          )}
                        </Button>
                      )}
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>

      {orders?.length > 9 && (
        <div className="ml-auto mt-10 max-w-max whitespace-nowrap">
          <CustomPagination
            currentPage={currentPage}
            pageSize={pageSize}
            total={meta?.total}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      )}
    </div>
  );
}
