import { Outlet, createFileRoute } from "@tanstack/react-router";
// import { authMiddleware } from "@/_auth/authMiddleware";
import { SidebarProvider } from "@/_components/ui/sidebar";
import { AdminSidebar } from "@/_components/AdminDashboard/AdminSidebar";
import { AdminHeader } from "@/_components/AdminDashboard/AdminSidebar/AdminHeader";
import { SectionCards } from "@/_components/AdminDashboard/SectionCards";
import { ChartAreaInteractive } from "@/_components/AdminDashboard/ChartAreaInteractive";

export const Route = createFileRoute("/dashboard")({
  component: LayoutDashboard,
  // TODO: Re-enable once I have the login form done
  // server: {
  //   middleware: [authMiddleware],
  // },
});

function LayoutDashboard() {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 56)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }>
      <AdminSidebar />
      <main className="bg-background relative flex w-full flex-1 flex-col md:peer-data-[variant=inset]:m-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow-sm md:peer-data-[variant=inset]:peer-data-[state=collapsed]:ml-2">
        <AdminHeader />
        <div className="flex flex-1 flex-col gap-2 @container/main p-4">
            <div className="flex flex-col gap-4">
              <SectionCards />
                <ChartAreaInteractive />
          </div>
        </div>
      </main>
    </SidebarProvider>
  );
}
