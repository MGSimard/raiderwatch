import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/r/$embarkId")({
  component: PageRaider,
});

function PageRaider() {
  return <div>Hello "/r/$embarkId"!</div>;
}
