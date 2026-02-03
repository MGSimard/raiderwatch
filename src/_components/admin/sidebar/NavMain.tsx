import { Link } from "@tanstack/react-router";
import { Gauge, TriangleAlert } from "lucide-react";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/_components/admin/ui/sidebar";

export function NavMain() {
  const { setOpenMobile } = useSidebar();

  const navItems = [
    {
      title: "Overview",
      url: "/dashboard",
      icon: Gauge,
      activeExact: true,
    },
    {
      title: "Reports",
      url: "/dashboard/reports",
      icon: TriangleAlert,
    },
  ];

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Core</SidebarGroupLabel>
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
                    activeOptions={{ exact: item.activeExact, includeSearch: false }}
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
