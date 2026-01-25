import { createColumnHelper } from "@tanstack/react-table";
import { getReportsTableData } from "@/_server/serverFunctions";
import { REPORT_STATUS_META, REPORT_REASON_LABELS } from "@/_lib/enums";
import { cn, formatUtcDateTime } from "@/_lib/utils";

// HEADERS: STATUS, ID, EMBARK ID, REASON, FILED AT (UTC), UPDATED AT (UTC), ROW ACTIONS

type ReportRow = Awaited<ReturnType<typeof getReportsTableData>>[number];

const columnHelper = createColumnHelper<ReportRow>();

export const columns = [
  columnHelper.accessor("status", {
    header: "Status",
    cell: (info) => {
      const status = info.getValue();
      const { label, dotClass } = REPORT_STATUS_META[status];
      return (
        <div className="flex justify-center">
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
    header: "Actions",
    cell: () => "...",
  }),
];
