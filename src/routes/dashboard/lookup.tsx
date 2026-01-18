import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/lookup")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/dashboard/lookup"!</div>;
}
