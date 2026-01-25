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
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/_components/admin/ui/table";
import { columns } from "./ReportsColumns";
import type { ReportStatus } from "@/_lib/enums";
import { cn } from "@/_lib/utils";

const DEFAULT_SEARCH_QUERY = "";
const DEFAULT_STATUS: Array<ReportStatus> = ["pending", "under_review"];
const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 20;
const AUTO_WIDTH_COLUMNS = new Set(["status", "actions"]);

export function ReportsTable() {
  // TODO: Can ensureQueryData for empty filter at route preload
  // TODO: Debounce

  // SERVER-SIDE FILTERING - Modifies the query key which fires new fetches unless cached
  const [filters, setFilters] = useState({
    searchQuery: DEFAULT_SEARCH_QUERY,
    status: DEFAULT_STATUS,
    page: DEFAULT_PAGE,
    pageSize: DEFAULT_PAGE_SIZE,
  });

  const { data, isPending, isError, isPlaceholderData } = useQuery({
    queryKey: ["reportsTable", { ...filters }],
    queryFn: getReportsTableData, // TODO: Feed filters to queryFn, then edit queryFn to accept filters
    placeholderData: keepPreviousData,
  });

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    // getFilteredRowModel: getFilteredRowModel(), todo
    // getSortedRowModel: getSortedRowModel(), todo
    // getPaginationRowModel: getPaginationRowModel(), todo
  });

  return (
    <div className="overflow-hidden rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                const autoWidth = AUTO_WIDTH_COLUMNS.has(header.id);
                return (
                  <TableHead key={header.id} className={cn(autoWidth && "text-center")}>
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
          ) : data.length > 0 ? (
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
