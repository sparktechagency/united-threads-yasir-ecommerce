"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { EyeIcon } from "lucide-react";
import { MessageSquareText } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import ShadePendingModal from "./ShadePendingModal";

const TABLE_HEADERS = [
  "Order ID",
  "Product",
  "Category",
  "Quantity",
  "Order Created",
  "Action",
];

const DATA = [
  {
    orderId: "12ab34cd",
    product: "Rosemary",
    category: "T-Shirt",
    quantity: 25,
    date: "31 Aug 2024",
  },
  {
    orderId: "56ef78gh",
    product: "Lavender",
    category: "Hoodie",
    quantity: 10,
    date: "01 Sep 2024",
  },
  {
    orderId: "90ij12kl",
    product: "Chamomile",
    category: "T-Shirt",
    quantity: 30,
    date: "28 Aug 2024",
  },
  {
    orderId: "34mn56op",
    product: "Peppermint",
    category: "Sweatshirt",
    quantity: 15,
    date: "29 Aug 2024",
  },
  {
    orderId: "78qr90st",
    product: "Basil",
    category: "Cap",
    quantity: 20,
    date: "02 Sep 2024",
  },
  {
    orderId: "12uv34wx",
    product: "Thyme",
    category: "T-Shirt",
    quantity: 35,
    date: "03 Sep 2024",
  },
  {
    orderId: "56yz78ab",
    product: "Sage",
    category: "Jacket",
    quantity: 5,
    date: "30 Aug 2024",
  },
];

export default function ShadePendingTable() {
  const [showOrderModal, setShowOrderModal] = useState(false);

  return (
    <Table>
      <TableHeader>
        <TableRow className="bg-lightGray">
          {TABLE_HEADERS.map((header) => (
            <TableHead
              key={header}
              className="text-lg font-semibold text-primary-black"
              style={{ padding: "14px" }}
            >
              {header}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {DATA.map((order) => (
          <TableRow
            key={order?.orderId}
            className="border-b border-primary-black/15"
          >
            <TableCell className="py-5 font-medium">
              #{order?.orderId}
            </TableCell>
            <TableCell className="py-5 font-medium">{order?.product}</TableCell>
            <TableCell className="py-5 font-medium">
              {order?.category}
            </TableCell>
            <TableCell className="py-5 font-medium">
              {order?.quantity}
            </TableCell>
            <TableCell className="py-5 font-medium">{order?.date}</TableCell>
            <TableCell className="py-5 font-medium">
              <div className="flex-center-start gap-x-4">
                <div>
                  <button onClick={() => setShowOrderModal(!showOrderModal)}>
                    <EyeIcon size={20} color="#292929" />
                  </button>

                  {/* Order Modal */}
                  <ShadePendingModal
                    orderId={order.orderId}
                    open={showOrderModal}
                    setOpen={setShowOrderModal}
                  />
                </div>
                <button className="relative">
                  <Badge className="flex-center absolute -right-3 -top-2 h-4 w-[1px] rounded-full bg-danger py-0 text-[10px]">
                    5
                  </Badge>
                  <MessageSquareText size={20} color="#292929" />
                </button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
