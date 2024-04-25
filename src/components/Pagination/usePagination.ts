import { useState } from "react";
import { rowsPerPageOptions } from "./constants";

export function usePagination() {
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[1]);
  const [currentPage, setCurrentPage] = useState(1);
  
  return { rowsPerPage, setRowsPerPage, currentPage, setCurrentPage };
}