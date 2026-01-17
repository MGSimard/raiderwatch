import { Link } from "@tanstack/react-router";
import { GaugeIcon, WarningIcon } from "@phosphor-icons/react";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/_components/ui/sidebar";

export function NavMain() {
  const navItems = [
    {
      title: "Overview",
      url: "/dashboard",
      icon: GaugeIcon,
    },
    {
      title: "Reports",
      url: "/dashboard/reports",
      icon: WarningIcon,
    },
  ];

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Core</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton tooltip={item.title} render={<Link to={item.url} />}>
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
