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

import { useQuery } from "@tanstack/react-query";
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

export function ReportsTable() {
  const { data, isPending, isError } = useQuery({
    queryKey: ["reportsTable"],
    queryFn: getReportsTableData,
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
    <Table>
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <TableHead key={header.id}>
                {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
              </TableHead>
            ))}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {isPending ? (
          <TableRow>
            {/* TODO: Add loading skeleton */}
            <TableCell colSpan={columns.length}>Loading...</TableCell>
          </TableRow>
        ) : isError ? (
          <TableRow>
            <TableCell colSpan={columns.length}>Failed to load reports.</TableCell>
          </TableRow>
        ) : table.getRowModel().rows.length > 0 ? (
          table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
              ))}
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={columns.length}>No reports found.</TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
