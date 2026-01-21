import { createFileRoute } from "@tanstack/react-router";
import { StatCards } from "@/_components/admin/StatCards";
import { ChartTotalReports } from "@/_components/admin/ChartTotalReports";

export const Route = createFileRoute("/dashboard/")({
  component: PageDashboard,
});

function PageDashboard() {
  return (
    <>
      <StatCards />
      <ChartTotalReports />
    </>
  );
}
