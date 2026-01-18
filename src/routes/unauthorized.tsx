import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/unauthorized")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/unauthorized"! TODO: 401 etc etc</div>;
}
