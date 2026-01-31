import { createFileRoute } from "@tanstack/react-router";
import { StatCards } from "@/_components/admin/StatCards";
import { ChartTotalReports } from "@/_components/admin/ChartTotalReports";
import { ChartTotalRaiders } from "@/_components/admin/ChartTotalRaiders";

export const Route = createFileRoute("/dashboard/")({
  component: PageDashboard,
});

function PageDashboard() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 md:gap-6 md:p-6">
      <StatCards />
      <ChartTotalReports />
      <ChartTotalRaiders />
    </div>
  );
}
