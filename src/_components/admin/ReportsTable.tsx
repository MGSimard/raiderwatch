import * as React from "react";
import { DotsThreeOutlineVerticalIcon } from "@phosphor-icons/react";
import { useQuery } from "@tanstack/react-query";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import type { ColumnDef, ColumnFiltersState, SortingState } from "@tanstack/react-table";
import { cn } from "@/_lib/utils";
import { Button } from "@/_components/admin/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/_components/admin/ui/dropdown-menu";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/_components/admin/ui/pagination";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/_components/admin/ui/table";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/_components/ui/tooltip";
import { Field, FieldLabel } from "@/_components/admin/ui/field";
import { ReportSearchInput } from "@/_components/admin/ReportSearchInput";
import { detectSearchType, filterByEmbarkId, filterByReportId } from "@/_lib/search";
import type { SearchType } from "@/_lib/search";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/_components/admin/ui/select";
import { StatusFilterDropdown, statusLabelMap, statusDotClassMap } from "@/_components/admin/StatusFilterDropdown";
import { getReportsTableData } from "@/_server/serverFunctions";
import { REPORT_REASON_LABELS, REPORT_STATUS_ENUMS } from "@/_lib/enums";
import { formatUtcDateTime } from "@/_lib/utils";
import { toast } from "sonner";

type ReportStatus = (typeof REPORT_STATUS_ENUMS)[number];
type ReportReason = keyof typeof REPORT_REASON_LABELS;

export interface ReportRow {
  id: number;
  embarkId: string;
  reason: ReportReason;
  status: ReportStatus;
  createdAt: string;
}

const defaultStatusFilters: Array<ReportStatus> = ["pending", "under_review"];

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

const handleCopyReportData = async (report: ReportRow) => {
  try {
    await navigator.clipboard.writeText(JSON.stringify(report, null, 2));
    toast.success("Report data copied to clipboard.");
  } catch (err: unknown) {
    console.error("Failed to copy report data: ", err instanceof Error ? err : "Unknown error");
    toast.error("Failed to copy report data, view console for more details.");
  }
};

const handleCopyEmbarkId = async (embarkId: string) => {
  try {
    await navigator.clipboard.writeText(embarkId);
    toast.success("Embark ID copied to clipboard.");
  } catch (err: unknown) {
    console.error("Failed to copy Embark ID: ", err instanceof Error ? err : "Unknown error");
    toast.error("Failed to copy Embark ID, view console for more details.");
  }
};

const createColumns = (handleIsolateRaider: (embarkId: string) => void): Array<ColumnDef<ReportRow>> => [
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      const label = statusLabelMap[status];

      return (
        <div className="flex justify-center">
          <Tooltip>
            <TooltipTrigger
              render={
                <button
                  type="button"
                  aria-label={label}
                  className={cn("inline-flex size-2.5 rounded-full", statusDotClassMap[status])}
                />
              }
            />
            <TooltipContent>{label}</TooltipContent>
          </Tooltip>
        </div>
      );
    },
    filterFn: (row, columnId, value) => {
      const selected = Array.isArray(value) ? (value as Array<ReportStatus>) : [];
      if (selected.length === 0) return false;
      return selected.includes(row.getValue(columnId));
    },
  },
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => <div className="tabular-nums">{row.getValue("id")}</div>,
  },
  {
    accessorKey: "embarkId",
    header: "Embark ID",
    cell: ({ row }) => <div className="font-medium">{row.getValue("embarkId")}</div>,
  },
  {
    accessorKey: "reason",
    header: "Reason",
    cell: ({ row }) => <div>{REPORT_REASON_LABELS[row.original.reason]}</div>,
  },
  {
    accessorKey: "createdAt",
    header: "Filed At (UTC)",
    cell: ({ row }) => <div className="tabular-nums">{formatUtcDateTime(row.getValue("createdAt"))}</div>,
    sortingFn: (rowA, rowB, columnId) => {
      const a = new Date(rowA.getValue(columnId)).getTime();
      const b = new Date(rowB.getValue(columnId)).getTime();
      if (Number.isNaN(a) || Number.isNaN(b)) return 0;
      return a === b ? 0 : a > b ? 1 : -1;
    },
  },
  {
    id: "actions",
    enableSorting: false,
    cell: ({ row }) => {
      return (
        <div className="flex justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <DotsThreeOutlineVerticalIcon aria-hidden />
                </Button>
              }
            />

            <DropdownMenuContent align="end">
              <DropdownMenuGroup>
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem>Review Report</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleIsolateRaider(row.original.embarkId)}>
                  Isolate Raider
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleCopyReportData(row.original)}>Copy Report</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleCopyEmbarkId(row.original.embarkId)}>
                  Copy Embark ID
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
export function ReportsTable() {
  const { data, isLoading, isError } = useQuery<Array<ReportRow>>({
    queryKey: ["reportsTable"],
    queryFn: getReportsTableData,
  });

  const [sorting, setSorting] = React.useState<SortingState>([{ id: "createdAt", desc: true }]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([
    { id: "status", value: defaultStatusFilters },
  ]);
  const [statusFilters, setStatusFilters] = React.useState<Array<ReportStatus>>(defaultStatusFilters);
  const [searchQuery, setSearchQuery] = React.useState<string>("");
  const searchType: SearchType = detectSearchType(searchQuery);

  const handleIsolateRaider = (embarkId: string) => {
    setSearchQuery(embarkId);
    const allStatuses: Array<ReportStatus> = [...REPORT_STATUS_ENUMS];
    setStatusFilters(allStatuses);
    table.getColumn("status")?.setFilterValue(allStatuses);
  };

  const columns = createColumns(handleIsolateRaider);

  const globalFilterFn = (row: { original: ReportRow }): boolean => {
    const trimmedQuery = searchQuery.trim();
    if (trimmedQuery === "") {
      return true;
    }

    if (searchType === "reportId") {
      return filterByReportId(row.original.id, trimmedQuery);
    }

    return filterByEmbarkId(row.original.embarkId, trimmedQuery);
  };

  const table = useReactTable({
    data: data ?? [],
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    globalFilterFn: globalFilterFn,
    state: {
      sorting,
      columnFilters,
      globalFilter: searchQuery,
    },
    initialState: {
      pagination: {
        pageSize: 20,
      },
    },
  });

  // Reset pagination to page 1 when search changes (Requirements: 5.5)
  // Todo bruh
  React.useEffect(() => {
    table.setPageIndex(0);
  }, [searchQuery, table]);

  const totalRows = table.getFilteredRowModel().rows.length;
  const { pageIndex, pageSize } = table.getState().pagination;
  const pageCount = table.getPageCount();
  const currentPage = pageCount === 0 ? 0 : pageIndex + 1;
  const start = totalRows === 0 ? 0 : pageIndex * pageSize + 1;
  const end = totalRows === 0 ? 0 : Math.min(totalRows, (pageIndex + 1) * pageSize);

  const paginationItems = buildPaginationRange(currentPage, pageCount);

  const handlePreviousClick = () => {
    if (table.getCanPreviousPage()) {
      table.previousPage();
    }
  };

  const handleNextClick = () => {
    if (table.getCanNextPage()) {
      table.nextPage();
    }
  };

  const createPageClickHandler = (page: number) => () => {
    if (page !== currentPage) {
      table.setPageIndex(page - 1);
    }
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
  };

  const handleSearchClear = () => {
    setSearchQuery("");
  };

  return (
    <div className="w-full">
      <div className="flex flex-col gap-3 pb-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          <ReportSearchInput value={searchQuery} onChange={handleSearchChange} onClear={handleSearchClear} />
          <StatusFilterDropdown
            value={statusFilters}
            onValueChange={(value) => {
              setStatusFilters(value);
              table.getColumn("status")?.setFilterValue(value);
            }}
          />
        </div>
      </div>
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const isStatus = header.id === "status";
                  const isActions = header.id === "actions";
                  return (
                    <TableHead
                      key={header.id}
                      className={isStatus ? "text-center" : undefined}
                      style={isStatus || isActions ? { width: "1%" } : undefined}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  Loading...
                </TableCell>
              </TableRow>
            ) : isError ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  Failed to load reports.
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => {
                    const isStatus = cell.column.id === "status";
                    const isActions = cell.column.id === "actions";
                    return (
                      <TableCell key={cell.id} style={isStatus || isActions ? { width: "1%" } : undefined}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  {data && data.length > 0 ? "No matching reports" : "No reports"}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center gap-3 py-4 sticky bottom-0 bg-background">
        <div className="text-muted-foreground flex-1 text-sm">
          Showing {start}-{end} of {totalRows} reports.
        </div>
        <div className="flex items-center gap-4">
          <Field orientation="horizontal" className="w-fit">
            <FieldLabel htmlFor="select-rows-per-page">Rows per page</FieldLabel>
            <Select
              value={pageSize.toString()}
              onValueChange={(value) => {
                table.setPageSize(Number(value));
              }}>
              <SelectTrigger className="w-20" id="select-rows-per-page">
                <SelectValue />
              </SelectTrigger>
              <SelectContent align="start">
                <SelectGroup>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                  <SelectItem value="25">25</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                  <SelectItem value="100">100</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </Field>
          <Pagination className="mx-0 w-auto">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious onClick={handlePreviousClick} disabled={!table.getCanPreviousPage()} />
              </PaginationItem>
              {(() => {
                let ellipsisCount = 0;
                return paginationItems.map((item) => {
                  if (item === "ellipsis") {
                    ellipsisCount += 1;
                    const ellipsisKey = ellipsisCount === 1 ? "ellipsis-left" : "ellipsis-right";
                    return (
                      <PaginationItem key={ellipsisKey}>
                        <PaginationEllipsis />
                      </PaginationItem>
                    );
                  }

                  return (
                    <PaginationItem key={item}>
                      <PaginationLink isActive={item === currentPage} onClick={createPageClickHandler(item)}>
                        {item}
                      </PaginationLink>
                    </PaginationItem>
                  );
                });
              })()}
              <PaginationItem>
                <PaginationNext onClick={handleNextClick} disabled={!table.getCanNextPage()} />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  );
}
