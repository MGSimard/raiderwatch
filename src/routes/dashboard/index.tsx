import { createFileRoute } from "@tanstack/react-router";
import { StatCards } from "@/_components/admin/StatCards";
import { ChartTotalReports } from "@/_components/admin/ChartTotalReports";

export const Route = createFileRoute("/dashboard/")({
  component: PageDashboard,
});

function PageDashboard() {
  const { user } = Route.useRouteContext();
  return (
    <>
      <h1>Hello {user.name}</h1>
      <StatCards />
      <ChartTotalReports />
    </>
  );
}
