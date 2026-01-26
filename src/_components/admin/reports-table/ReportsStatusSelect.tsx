import { CaretDownIcon } from "@phosphor-icons/react";
import { Button } from "@/_components/admin/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/_components/admin/ui/dropdown-menu";
import { REPORT_STATUS_ENUMS } from "@/_lib/enums";
import { REPORT_STATUS_META } from "@/_lib/constants";
import type { ReportStatus } from "@/_lib/enums";
import { cn } from "@/_lib/utils";

export interface ReportsStatusSelectProps {
  value: Array<ReportStatus>;
  onValueChange: (value: Array<ReportStatus>) => void;
}

export function ReportsStatusSelect({ value, onValueChange }: ReportsStatusSelectProps) {
  const totalStatuses = REPORT_STATUS_ENUMS.length;
  const selectedCount = value.length;

  const handleToggle = (status: ReportStatus, checked: boolean) => {
    if (checked) {
      onValueChange([...value, status]);
    } else {
      onValueChange(value.filter((s) => s !== status));
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button variant="outline" className="gap-2">
            <span className="flex items-center" aria-hidden>
              {REPORT_STATUS_ENUMS.map((status, index) => {
                const isSelected = value.includes(status);
                return (
                  <span
                    key={status}
                    className={cn(
                      "size-2 rounded-full border",
                      index > 0 && "-ml-1",
                      isSelected
                        ? ["border-background", REPORT_STATUS_META[status].dotClass]
                        : "border-muted bg-background"
                    )}
                  />
                );
              })}
            </span>
            <span>Status</span>
            <span className="text-muted-foreground">
              {selectedCount === 0 ? "All" : `${selectedCount}/${totalStatuses}`}
            </span>
            <CaretDownIcon aria-hidden />
          </Button>
        }
      />
      <DropdownMenuContent align="start">
        {REPORT_STATUS_ENUMS.map((status) => {
          const isChecked = value.includes(status);
          return (
            <DropdownMenuCheckboxItem
              key={status}
              checked={isChecked}
              onCheckedChange={(checked) => handleToggle(status, checked)}>
              <span className={cn("size-2 rounded-full", REPORT_STATUS_META[status].dotClass)} aria-hidden />
              {REPORT_STATUS_META[status].label}
            </DropdownMenuCheckboxItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
