import { Button } from "@/_components/admin/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/_components/admin/ui/dropdown-menu";
import { AssessmentDialog } from "@/_components/admin/AssessmentDialog";
import { Dialog, DialogTrigger } from "@/_components/admin/ui/dialog";
import { copyToClipboard } from "@/_lib/utils";
import type { ReportRow, SearchFilters } from "@/_lib/types";
import { CopySimpleIcon, DotsThreeVerticalIcon, GavelIcon, UserFocusIcon } from "@phosphor-icons/react";

interface ReportsRowActionsProps {
  reportData: ReportRow;
  setFilters?: React.Dispatch<React.SetStateAction<SearchFilters>>;
}

export function ReportsRowActions({ reportData, setFilters }: ReportsRowActionsProps) {
  // TODO: Long hover tooltip on trigger maybe?

  const handleIsolateRaider = () => {
    if (!setFilters) return;
    setFilters((prev) => ({
      ...prev,
      searchQuery: reportData.embarkId,
      page: 1,
    }));
  };

  return (
    <Dialog>
      <AssessmentDialog report={reportData} />
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button variant="ghost" size="icon-sm">
              <DotsThreeVerticalIcon aria-hidden />
            </Button>
          }
        />
        <DropdownMenuContent>
          <DialogTrigger
            nativeButton={false}
            render={
              <DropdownMenuItem>
                <GavelIcon aria-hidden />
                Review Report
              </DropdownMenuItem>
            }
          />
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
    </Dialog>
  );
}
