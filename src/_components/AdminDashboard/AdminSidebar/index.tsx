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
  const navMain = [
    {
      title: "Overview",
      url: "#",
    },
    {
      title: "Reports",
      url: "#",
    },
  ];

  const navInternal = [
    {
      name: "Team",
      url: "#",
    },
    {
      name: "Audit Logs",
      url: "#",
    },
  ];

  const user = {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton render={<a href="#" />} className="data-[slot=sidebar-menu-button]:p-1.5!">
              <PlaceholderIcon className="size-5!" />
              <span className="text-base font-semibold">Acme Inc.</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMain} />
        <NavInternal items={navInternal} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}
