import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard")({
  component: PageDashboard,
});

function PageDashboard() {
  return <div>Hello "/dashboard"!</div>;
}
