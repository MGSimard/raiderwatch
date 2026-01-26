import { useLocation } from "@tanstack/react-router";
import { UtcClock } from "./UtcClock";
import { SidebarTrigger } from "@/_components/admin/ui/sidebar";
import { Separator } from "@/_components/admin/ui/separator";
import { ThemeToggle } from "../ThemeToggle";

export function Header() {
  const location = useLocation();
  const pageName = location.pathname.split("/").pop();

  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b px-4 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height) lg:px-6">
      <SidebarTrigger className="-ml-1" />
      <Separator
        orientation="vertical"
        className="mr-1 data-[orientation=vertical]:h-4 data-[orientation=vertical]:self-auto"
      />
      <h1 className="text-base font-medium capitalize">{pageName}</h1>
      <div className="ml-auto flex items-center gap-2">
        <UtcClock />
        <ThemeToggle />
      </div>
    </header>
  );
}
