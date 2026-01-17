import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/audit-logs")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/dashboard/audit-logs"!</div>;
}
