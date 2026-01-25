import { createFileRoute } from "@tanstack/react-router";
import { ReportsTable } from "@/_components/admin/reports-table/ReportsTable";

export const Route = createFileRoute("/dashboard/reports-rewrite")({
  component: RouteComponent,
});

function RouteComponent() {
  return <ReportsTable />;
}
