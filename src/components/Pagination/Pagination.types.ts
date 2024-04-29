export type RowsPerPageOptionsType = 5 | 10 | 15 | 25 | 50;
export type PaginationProps = {
  totalCount: number;
  rowsPerPage: number;
  setRowsPerPage: (newRowsPerPage: RowsPerPageOptionsType) => void;
  currentPage: number;
  setCurrentPage: (newCurrentPage: number) => void;
};