import { createFileRoute } from "@tanstack/react-router";
export const Route = createFileRoute("/")({ component: PageHome });

function PageHome() {
  return (
    <div>
      <h1>Hello World</h1>
    </div>
  );
}
