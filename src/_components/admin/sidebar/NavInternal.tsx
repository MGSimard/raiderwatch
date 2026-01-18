import { Link } from "@tanstack/react-router";
import { BellIcon, UsersIcon } from "@phosphor-icons/react";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/_components/admin/ui/sidebar";

export function NavInternal() {
  const { setOpenMobile } = useSidebar();

  const navItems = [
    {
      title: "Team",
      url: "/dashboard/team",
      icon: UsersIcon,
    },
    {
      title: "Audit Logs",
      url: "/dashboard/audit-logs",
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
              <SidebarMenuButton
                tooltip={item.title}
                render={
                  <Link
                    to={item.url}
                    onClick={() => setOpenMobile(false)}
                    activeProps={{ className: "border-l border-primary" }}
                  />
                }>
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
