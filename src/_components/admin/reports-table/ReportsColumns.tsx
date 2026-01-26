import { createColumnHelper } from "@tanstack/react-table";
import { ReportsRowActions } from "@/_components/admin/reports-table/ReportsRowActions";
import { REPORT_STATUS_META, REPORT_REASON_LABELS } from "@/_lib/constants";
import { cn, formatUtcDateTime } from "@/_lib/utils";
import type { ReportRow } from "@/_lib/types";

const columnHelper = createColumnHelper<ReportRow>();

export const columns = [
  columnHelper.accessor("status", {
    header: "Status",
    cell: (info) => {
      const status = info.getValue();
      const { label, dotClass } = REPORT_STATUS_META[status];
      return (
        <div className="grid place-items-center">
          <div aria-label={label} className={cn("size-2.5 rounded-full", dotClass)} />
        </div>
      );
    },
  }),
  columnHelper.accessor("id", {
    header: "ID",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("embarkId", {
    header: "Embark ID",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("reason", {
    header: "Reason",
    cell: (info) => REPORT_REASON_LABELS[info.getValue()],
  }),
  columnHelper.accessor("createdAt", {
    header: "Filed At (UTC)",
    cell: (info) => formatUtcDateTime(info.getValue()),
  }),
  columnHelper.accessor("updatedAt", {
    header: "Updated At (UTC)",
    cell: (info) => formatUtcDateTime(info.getValue()),
  }),
  columnHelper.display({
    id: "actions",
    cell: ({ row }) => (
      <div className="grid place-items-center">
        <ReportsRowActions reportData={row.original} />
      </div>
    ),
  }),
];
