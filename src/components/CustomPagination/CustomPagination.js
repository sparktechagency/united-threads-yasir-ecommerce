"use client";

import { Pagination } from "react-pagination-bar";
import "./CustomPagination.css";

export default function CustomPagination({
  total,
  pageSize,
  currentPage,
  setCurrentPage,
}) {
  console.log(total, pageSize);
  return (
    <Pagination
      totalItems={total}
      itemsPerPage={pageSize}
      currentPage={currentPage}
      onPageChange={(pageNumber) => setCurrentPage(pageNumber)}
    />
  );
}
