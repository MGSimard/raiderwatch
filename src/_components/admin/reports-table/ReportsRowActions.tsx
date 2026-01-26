// ACTIONS:
// - Review Report
// - Isolate Raider (Set search query to embarkId)
// - Copy Report
// - Copy Embark ID
import { Button } from "@/_components/admin/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/_components/admin/ui/dropdown-menu";
import { CopySimpleIcon, DotsThreeVerticalIcon, GavelIcon, UserFocusIcon } from "@phosphor-icons/react";

export function ReportsRowActions() {
  // TODO: Long hover tooltip on trigger maybe?

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button variant="ghost" size="icon-sm">
            <DotsThreeVerticalIcon aria-hidden />
          </Button>
        }
      />
      <DropdownMenuContent>
        <DropdownMenuItem>
          <GavelIcon aria-hidden />
          Review Report
        </DropdownMenuItem>
        <DropdownMenuItem>
          <UserFocusIcon aria-hidden />
          Isolate Raider
        </DropdownMenuItem>
        <DropdownMenuItem>
          <CopySimpleIcon aria-hidden />
          Copy Report
        </DropdownMenuItem>
        <DropdownMenuItem>
          <CopySimpleIcon aria-hidden />
          Copy Embark ID
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
