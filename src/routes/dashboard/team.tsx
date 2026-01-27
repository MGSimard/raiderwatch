import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/team")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div className="flex flex-1 flex-col gap-4 p-4 md:gap-6 md:p-6">Hello "/dashboard/team"!</div>;
}
