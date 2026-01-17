import { PlaceholderIcon } from "@phosphor-icons/react";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/_components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/_components/ui/dropdown-menu";

export function NavInternal({
  items,
}: {
  items: Array<{
    name: string;
    url: string;
  }>;
}) {
  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Internal</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton render={<a href={item.url} />}>
              <PlaceholderIcon className="size-4" />
              <span>{item.name}</span>
            </SidebarMenuButton>
            <DropdownMenu>
              <DropdownMenuTrigger
                render={<SidebarMenuAction showOnHover className="data-[state=open]:bg-accent rounded-sm" />}>
                <PlaceholderIcon className="size-4" />
                <span className="sr-only">More</span>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-24 rounded-lg" align="end">
                <DropdownMenuItem>
                  <PlaceholderIcon className="size-4" />
                  <span>Open</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <PlaceholderIcon className="size-4" />
                  <span>Share</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem variant="destructive">
                  <PlaceholderIcon className="size-4" />
                  <span>Delete</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
