import { Outlet, createFileRoute } from "@tanstack/react-router";
import { authMiddleware } from "@/_auth/authMiddleware";

export const Route = createFileRoute("/dashboard")({
  component: LayoutDashboard,
  server: {
    middleware: [authMiddleware],
  },
});

function LayoutDashboard() {
  return (
    <div>
      <p>Dashboard Layout</p>
      <Outlet />
    </div>
  );
}
