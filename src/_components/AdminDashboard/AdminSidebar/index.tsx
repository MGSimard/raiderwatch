import { PlaceholderIcon } from "@phosphor-icons/react";
import { NavMain } from "./NavMain";
import { NavInternal } from "./NavInternal";
import { NavUser } from "./NavUser";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/_components/ui/sidebar";

export function AdminSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {


  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton render={<a href="#" />} className="data-[slot=sidebar-menu-button]:p-1.5!">
              <PlaceholderIcon className="size-5!" />
              <span className="text-base font-semibold">RAIDER.WATCH</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain />
        <NavInternal />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
