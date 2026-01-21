import * as React from "react";
import type { Table } from "@tanstack/react-table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/_components/admin/ui/pagination";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
  itemLabel?: string;
}

const buildPaginationRange = (
  currentPage: number,
  totalPages: number,
  siblingCount = 1
): Array<number | "ellipsis"> => {
  if (totalPages <= 1) {
    return totalPages === 1 ? [1] : [];
  }

  const totalNumbers = siblingCount * 2 + 5;
  if (totalPages <= totalNumbers) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
  const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);
  const showLeftEllipsis = leftSiblingIndex > 2;
  const showRightEllipsis = rightSiblingIndex < totalPages - 1;

  if (!showLeftEllipsis && showRightEllipsis) {
    const leftItemCount = 3 + 2 * siblingCount;
    return [...Array.from({ length: leftItemCount }, (_, index) => index + 1), "ellipsis", totalPages];
  }

  if (showLeftEllipsis && !showRightEllipsis) {
    const rightItemCount = 3 + 2 * siblingCount;
    const start = totalPages - rightItemCount + 1;
    return [1, "ellipsis", ...Array.from({ length: rightItemCount }, (_, index) => start + index)];
  }

  if (showLeftEllipsis && showRightEllipsis) {
    return [
      1,
      "ellipsis",
      ...Array.from({ length: rightSiblingIndex - leftSiblingIndex + 1 }, (_, index) => leftSiblingIndex + index),
      "ellipsis",
      totalPages,
    ];
  }

  return [];
};

export function DataTablePagination<TData>({ table, itemLabel = "rows" }: DataTablePaginationProps<TData>) {
  const totalRows = table.getFilteredRowModel().rows.length;
  const { pageIndex, pageSize } = table.getState().pagination;
  const pageCount = table.getPageCount();
  const currentPage = pageCount === 0 ? 0 : pageIndex + 1;
  const start = totalRows === 0 ? 0 : pageIndex * pageSize + 1;
  const end = totalRows === 0 ? 0 : Math.min(totalRows, (pageIndex + 1) * pageSize);

  const paginationItems = React.useMemo(() => buildPaginationRange(currentPage, pageCount), [currentPage, pageCount]);

  const canPreviousPage = table.getCanPreviousPage();
  const canNextPage = table.getCanNextPage();

  return (
    <div className="flex items-center gap-3 py-4">
      <div className="text-muted-foreground flex-1 text-sm">
        Showing {start}–{end} of {totalRows} {itemLabel}.
      </div>
      <Pagination className="mx-0 w-auto justify-end">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious onClick={() => table.previousPage()} disabled={!canPreviousPage} />
          </PaginationItem>
          {paginationItems.map((item, index) => {
            if (item === "ellipsis") {
              return (
                <PaginationItem key={`ellipsis-${index}`}>
                  <PaginationEllipsis />
                </PaginationItem>
              );
            }

            return (
              <PaginationItem key={item}>
                <PaginationLink isActive={item === currentPage} onClick={() => table.setPageIndex(item - 1)}>
                  {item}
                </PaginationLink>
              </PaginationItem>
            );
          })}
          <PaginationItem>
            <PaginationNext onClick={() => table.nextPage()} disabled={!canNextPage} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
