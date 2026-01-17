import { BellIcon, UsersIcon } from "@phosphor-icons/react";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/_components/ui/sidebar";


export function NavInternal() {
 const navItems = [ 
  {
    title: "Team",
    url: "#",
    icon: UsersIcon,
  },
  {
    title: "Audit Logs",
    url: "#",
    icon: BellIcon,
  },
 ];

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Internal</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton tooltip={item.title} render={<a href={item.url} />}>
                <item.icon className="size-4" />
                <span>{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
