import { useMemo } from "react";
import { Button } from "../Button";
import clsx from "clsx";
import { rowsPerPageOptions } from "./constants";
import { PaginationProps, RowsPerPageOptionsType } from "./Pagination.types";

export function Pagination({
  totalCount,
  currentPage,
  setCurrentPage,
  rowsPerPage,
  setRowsPerPage,
}: PaginationProps) {
  const totalPages = Math.ceil(totalCount / rowsPerPage);
  const pagesArray: string[] = useMemo(() => {
    const pagesArrayCurr: string[] = [];
    Array.from({ length: totalPages }, (_, index) => index + 1).forEach(
      (item) => {
        if (
          [1, totalPages].includes(item) ||
          Math.abs(currentPage - item) < 2
        ) {
          pagesArrayCurr.push(`${item}`);
        } else {
          if (
            (item < currentPage && pagesArrayCurr[1] !== "") ||
            (item > currentPage &&
              pagesArrayCurr[pagesArrayCurr.length - 1] !== "")
          ) {
            pagesArrayCurr.push("");
          }
        }
      }
    );
    return pagesArrayCurr;
  }, [currentPage, totalPages]);

  const handlePageBtnClick = (page: number) => {
    if (page !== currentPage) {
      setCurrentPage(page);
    }
  };
  const handleChangeRowsPerPage = (rows: RowsPerPageOptionsType) => {
    if (rows !== rowsPerPage) {
      if (rows > rowsPerPage && currentPage !== 1) {
        setCurrentPage(1);
      }
      setRowsPerPage(rows);
    }
  };

  return (
    <div className="flex justify-between px-6 mt-4">
      <div
        className={clsx("flex items-end", {
          ["opacity-40"]: totalCount <= rowsPerPage,
        })}
      >
        {pagesArray.length ? (
          pagesArray.map((item, index) =>
            item ? (
              <Button
                className={clsx("px-[12px] py-[4px] mx-1", {
                  ["bg-blue-600 hover:bg-blue-400 text-white hover:text-black"]:
                    currentPage === +item,
                })}
                key={item}
                onClick={() => {
                  handlePageBtnClick(+item);
                }}
              >
                {item}
              </Button>
            ) : (
              <span
                key={pagesArray.length - 2 > index ? "left" : "right"}
                className="mx-1"
              >
                ...
              </span>
            )
          )
        ) : (
          <Button
            onClick={() => {}}
            isDisabled
            className="px-[12px] py-[4px] mx-1 cursor-default bg-blue-600 text-white hover:bg-blue-600 hover:text-black"
          >
            1
          </Button>
        )}
      </div>
      <div className="flex items-center">
        <span>rows</span>
        <select
          className=" border border-solid border-gray-400 rounded-lg h-full ml-2"
          value={rowsPerPage}
          onChange={(e) => {
            handleChangeRowsPerPage(+e.target.value as RowsPerPageOptionsType);
          }}
        >
          {rowsPerPageOptions.map((item) => (
            <option key={`rows-per-page-option-${item}`} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
