import { useLocation } from "@tanstack/react-router";
import { XLogoIcon } from "@phosphor-icons/react";
import { SidebarTrigger } from "@/_components/admin/ui/sidebar";
import { Separator } from "@/_components/admin/ui/separator";
import { Button } from "@/_components/ui/button";


export function Header() {
  const location = useLocation();
  const pageName = location.pathname.split("/").pop();

  return (
    <header className="shrink-0 flex items-center gap-2 px-4 lg:px-6 h-(--header-height) border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="data-[orientation=vertical]:h-4 data-[orientation=vertical]:self-auto mr-1" />
        <h1 className="text-base font-medium capitalize">{pageName}</h1>
        <div className="ml-auto flex items-center gap-2">
          <Button
            variant="ghost"
            nativeButton={false}
            render={<a href="https://x.com/mgsimard" rel="noopener noreferrer" target="_blank" />}
            size="icon">
            <XLogoIcon className="size-4" />
          </Button>
        </div>
    </header>
  );
}
