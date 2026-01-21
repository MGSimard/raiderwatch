import { createFileRoute } from "@tanstack/react-router";
import { ReportsTable } from "@/_components/admin/ReportsTable";

export const Route = createFileRoute("/dashboard/reports")({
  component: RouteComponent,
});

function RouteComponent() {
  return <ReportsTable />;
}
