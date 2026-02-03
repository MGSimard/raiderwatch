import { Link } from "@tanstack/react-router";
import { Bell, UsersRound } from "lucide-react";
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
      icon: UsersRound,
    },
    {
      title: "Audit Logs",
      url: "/dashboard/audit-logs",
      icon: Bell,
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
                    className="group-data-[state=expanded]:border-l-2"
                    activeProps={{ className: "border-primary group-data-[state=collapsed]:bg-primary" }}
                  />
                }>
                <item.icon className="size-4" aria-hidden />
                <span>{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
