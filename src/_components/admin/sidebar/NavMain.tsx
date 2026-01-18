import { Link } from "@tanstack/react-router";
import { GaugeIcon, MagnifyingGlassIcon, WarningIcon } from "@phosphor-icons/react";
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
      icon: GaugeIcon,
      activeExact: true,
    },
    {
      title: "Reports",
      url: "/dashboard/reports",
      icon: WarningIcon,
    },
    {
      title: "Lookup",
      url: "/dashboard/lookup",
      icon: MagnifyingGlassIcon,
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
                    activeProps={{ className: "bg-linear-to-r from-primary to-transparent" }}
                    activeOptions={{ exact: item.activeExact, includeSearch: false }}
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
