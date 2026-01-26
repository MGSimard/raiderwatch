// REWRITING DATA TABLE FROM SCRATCH - SHADCN & CLAUDE CAN'T BE TRUSTED
// FEATURES:
// - LIST ALL REPORTS IN DATABASE
// - INCLUDE COLUMNS: STATUS, ID, EMBARK ID, REASON, FILED AT (UTC), UPDATED AT (UTC), ROW ACTIONS
// - FOR COLUMNS INFER TYPES FROM DATA RETURN THEN OMIT UNNECESSARY OBJECT KEYS (NOT FROM DATA, FROM TYPES)
// - ROW ACTIONS: REVIEW REPORT, ISOLATE RAIDER, COPY REPORT, COPY EMBARK ID
// - STILL PASS COMPLETE REPORT DATA TO DUMP IT INTO COPY REPORT & ASSESSMENT DRAWER/DIALOG LATER (TABLE IS ABRIDGED)
// - SEARCH BY REPORT ID OR EMBARK ID (DETECT PATTERN, CONSIDER FUZZY DURING EMBARK ID PATTERN)
// - STATUS CHECKBOX FILTER (PENDING, UNDER REVIEW, APPROVED, REJECTED) DEFAULT PENDING & UNDER REVIEW
// - PAGINATION (SHOWING N-N of N REPORTS), ROWS PER PAGE SELECT, ARROWS, NO PAGE NUMBERS OR ELLIPSIS IT SERVES NO PURPOSE
// - OTHER THAN TRYING TO HIT SPECIFIC DATE RANGES, WHICH WOULD BE BETTER DONE WITH A DATE PICKER (SINGLE OR RANGED)

import { useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getReportsTableData } from "@/_server/serverFunctions";
import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { ReportsSearch } from "@/_components/admin/reports-table/ReportsSearch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/_components/admin/ui/table";
import { columns } from "@/_components/admin/reports-table/ReportsColumns";
import { cn } from "@/_lib/utils";
import { ReportsStatusSelect } from "./ReportsStatusSelect";
import { Button } from "@/_components/admin/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/_components/admin/ui/select";
import { Field, FieldLabel } from "@/_components/admin/ui/field";
import { CaretDoubleLeftIcon, CaretDoubleRightIcon, CaretLeftIcon, CaretRightIcon } from "@phosphor-icons/react";
import { DEFAULT_REPORTS_FILTERS } from "@/_lib/constants";
import type { SearchFilters } from "@/_lib/types";

const AUTO_WIDTH_COLUMNS = new Set(["status", "actions"]);

export function ReportsTable() {
  // TODO: Can ensureQueryData for empty filter at route preload
  // TODO: Debounce

  // SERVER-SIDE FILTERING - Modifies the query key which fires new fetches unless cached
  const [filters, setFilters] = useState<SearchFilters>({ ...DEFAULT_REPORTS_FILTERS });

  const { data, isPending, isError, isPlaceholderData } = useQuery({
    queryKey: ["reportsTable", { ...filters }],
    queryFn: () => getReportsTableData({ data: filters }),
    placeholderData: keepPreviousData,
  });

  const { reports = [], totalCount = 0 } = data ?? {};
  const { page, pageSize } = filters;
  const totalPages = Math.ceil(totalCount / pageSize);
  const start = totalCount === 0 ? 0 : (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, totalCount);

  const table = useReactTable({
    data: reports,
    columns,
    getCoreRowModel: getCoreRowModel(),
    // getFilteredRowModel: getFilteredRowModel(), // Handled by useQuery + server function, can use later if need filtering Fns
    // getSortedRowModel: getSortedRowModel(), todo
    // getPaginationRowModel: getPaginationRowModel(), todo
    manualFiltering: true, // Handled by useQuery + server function
    manualSorting: true, // Handled by useQuery + server function
    manualPagination: true, // Handled by useQuery + server function
    rowCount: totalCount, // Not needed but good for future context if needed
    pageCount: totalPages, // Not needed but good for future context if needed
  });

  return (
    <>
      <div className="flex flex-col gap-3 pb-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          <ReportsSearch
            value={filters.searchQuery}
            onChange={(value) =>
              setFilters((prev) => ({
                ...prev,
                searchQuery: value,
                page: 1,
              }))
            }
          />
          <ReportsStatusSelect
            value={filters.statuses}
            onValueChange={(value) => setFilters((prev) => ({ ...prev, statuses: value, page: 1 }))}
          />
        </div>
      </div>
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className={cn(AUTO_WIDTH_COLUMNS.has(header.id) && "w-0 text-center")}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isError ? (
              <ErrorResult />
            ) : isPending ? (
              <PendingResults />
            ) : reports.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} className={cn(isPlaceholderData && "opacity-50")}>
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <TableCell key={cell.id} className={cn(AUTO_WIDTH_COLUMNS.has(cell.column.id) && "w-0")}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))
            ) : (
              <NoResults />
            )}
          </TableBody>
        </Table>
      </div>
      <div className="bg-background sticky bottom-0 flex items-center gap-3 py-4">
        <div className="text-muted-foreground flex-1 text-sm">
          Showing {start}-{end} of {totalCount} reports
        </div>
        <div className="flex items-center gap-4">
          <Field orientation="horizontal" className="w-fit">
            <FieldLabel htmlFor="select-rows-per-page">Rows per page</FieldLabel>
            <Select
              value={pageSize.toString()}
              onValueChange={(value) => {
                setFilters((prev) => ({ ...prev, pageSize: Number(value), page: 1 }));
              }}>
              <SelectTrigger className="w-20" id="select-rows-per-page">
                <SelectValue />
              </SelectTrigger>
              <SelectContent align="start">
                <SelectGroup>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                  <SelectItem value="100">100</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </Field>
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="icon-sm"
              onClick={() => setFilters((prev) => ({ ...prev, page: 1 }))}
              disabled={page === 1}
              aria-label="First page">
              <CaretDoubleLeftIcon />
            </Button>
            <Button
              variant="outline"
              size="icon-sm"
              onClick={() => setFilters((prev) => ({ ...prev, page: prev.page - 1 }))}
              disabled={page === 1}
              aria-label="Previous page">
              <CaretLeftIcon />
            </Button>
            <Button
              variant="outline"
              size="icon-sm"
              onClick={() => setFilters((prev) => ({ ...prev, page: prev.page + 1 }))}
              disabled={page >= totalPages}
              aria-label="Next page">
              <CaretRightIcon />
            </Button>
            <Button
              variant="outline"
              size="icon-sm"
              onClick={() => setFilters((prev) => ({ ...prev, page: totalPages }))}
              disabled={page >= totalPages}
              aria-label="Last page">
              <CaretDoubleRightIcon />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

function PendingResults() {
  // TODO: Skeleton instead of loading text
  return (
    <TableRow>
      <TableCell colSpan={columns.length}>Loading...</TableCell>
    </TableRow>
  );
}

function ErrorResult() {
  return (
    <TableRow>
      <TableCell colSpan={columns.length}>Failed to load reports.</TableCell>
    </TableRow>
  );
}

function NoResults() {
  return (
    <TableRow>
      <TableCell colSpan={columns.length}>No reports found.</TableCell>
    </TableRow>
  );
}
