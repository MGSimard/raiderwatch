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
import { toast } from "sonner";
import { CopySimpleIcon, DotsThreeVerticalIcon, GavelIcon, UserFocusIcon } from "@phosphor-icons/react";
import type { ReportRow } from "@/_lib/types";

export function ReportsRowActions({ reportData }: { reportData: ReportRow }) {
  // TODO: Long hover tooltip on trigger maybe?

  const handleIsolateRaider = () => {};

  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(`${label} copied to clipboard.`);
    } catch (err: unknown) {
      toast.error(`Failed to copy ${label}, view console for more details.`);
      console.error(`Error copying ${label}:`, err instanceof Error ? err : "Unknown error.");
    }
  };

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
        <DropdownMenuItem onClick={handleIsolateRaider}>
          <UserFocusIcon aria-hidden />
          Isolate Raider
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => copyToClipboard(JSON.stringify(reportData, null, 2), "Report")}>
          <CopySimpleIcon aria-hidden />
          Copy Report
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => copyToClipboard(reportData.embarkId, "Embark ID")}>
          <CopySimpleIcon aria-hidden />
          Copy Embark ID
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
