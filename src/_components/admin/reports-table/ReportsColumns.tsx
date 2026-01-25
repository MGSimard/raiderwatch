import { createColumnHelper } from "@tanstack/react-table";
import { getReportsTableData } from "@/_server/serverFunctions";

// HEADERS: STATUS, ID, EMBARK ID, REASON, FILED AT (UTC), UPDATED AT (UTC), ROW ACTIONS

const columnHelper = createColumnHelper<Awaited<ReturnType<typeof getReportsTableData>>>();

const columns = [
  columnHelper.accessor("status", {
    header: "Status",
    cell: (info) => info.getValue(),
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
    cell: (info) => info.getValue(), // TODO: Normalize report reason using our existing enum mapping
  }),
  columnHelper.accessor("createdAt", {
    header: "Filed At (UTC)",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("updatedAt", {
    header: "Updated At (UTC)",
    cell: (info) => info.getValue(),
  }),
  columnHelper.display({
    id: "actions",
    header: "Actions",
    cell: () => "...",
  }),
];
