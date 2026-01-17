import { createFileRoute } from "@tanstack/react-router";
import { SectionCards } from "@/_components/AdminDashboard/SectionCards";
import { ChartAreaInteractive } from "@/_components/AdminDashboard/ChartAreaInteractive";

export const Route = createFileRoute("/dashboard/")({
  component: PageDashboard,
});

function PageDashboard() {
  return (
    <>
      <div className="flex flex-col gap-4">
        <SectionCards />
        <ChartAreaInteractive />
      </div>
    </>
  );
}
