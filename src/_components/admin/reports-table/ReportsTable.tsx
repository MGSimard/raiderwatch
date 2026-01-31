import { useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useDebouncedValue } from "@tanstack/react-pacer";
import { getReportsTableData } from "@/_server/serverFunctions";
import { flexRender, getCoreRowModel, RowData, useReactTable } from "@tanstack/react-table";
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

// Extending table types to include our filter setter
declare module "@tanstack/react-table" {
  interface TableMeta<TData extends RowData> {
    setFilters: React.Dispatch<React.SetStateAction<SearchFilters>>;
  }
}

export function ReportsTable() {
  // SERVER-SIDE FILTERING - Modifies the query key which fires new fetches unless cached
  const [filters, setFilters] = useState<SearchFilters>({ ...DEFAULT_REPORTS_FILTERS });
  const [debouncedSearchQuery] = useDebouncedValue(filters.searchQuery, { wait: 500 });

  const { data, isPending, isError, isPlaceholderData } = useQuery({
    queryKey: ["reportsTable", { ...filters, searchQuery: debouncedSearchQuery }],
    queryFn: () => getReportsTableData({ data: { ...filters, searchQuery: debouncedSearchQuery } }),
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
    manualFiltering: true, // Handled by useQuery + server function
    manualSorting: true, // Handled by useQuery + server function
    manualPagination: true, // Handled by useQuery + server function
    rowCount: totalCount, // Not needed but good for future context if needed
    pageCount: totalPages, // Not needed but good for future context if needed
    meta: {
      setFilters,
    },
  });

  return (
    <div className="flex h-full min-h-0 grow flex-col">
      <div className="flex shrink-0 flex-wrap items-center gap-2 p-2">
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
      <div className="flex min-h-0 grow border">
        <Table>
          <TableHeader className="sticky top-0 bg-background">
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
          <TableBody className="border-b">
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
      <div className="flex shrink-0 items-center gap-3 bg-background px-4 py-2">
        <div className="flex-1 text-sm text-muted-foreground">
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
    </div>
  );
}

function PendingResults() {
  // TODO: Consider skeleton shimmer
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
