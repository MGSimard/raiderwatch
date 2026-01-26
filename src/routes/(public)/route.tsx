import { createFileRoute, Outlet } from "@tanstack/react-router";
import { ThemeToggle } from "@/_components/ThemeToggle";

export const Route = createFileRoute("/(public)")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <Outlet />
      <ThemeToggle className="fixed right-4 bottom-4 z-10" />
    </>
  );
}
