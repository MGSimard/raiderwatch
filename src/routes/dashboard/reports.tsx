import { createFileRoute } from "@tanstack/react-router";
import { ReportsTable } from "@/_components/admin/reports-table/ReportsTable";
import { getReportsTableData } from "@/_server/serverFunctions";
import { DEFAULT_REPORTS_FILTERS } from "@/_lib/constants";

export const Route = createFileRoute("/dashboard/reports")({
  component: RouteComponent,
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData({
      queryKey: ["reportsTable", { ...DEFAULT_REPORTS_FILTERS }],
      queryFn: () => getReportsTableData({ data: DEFAULT_REPORTS_FILTERS }),
    });
  },
});

function RouteComponent() {
  return <ReportsTable />;
}
