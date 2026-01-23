import { CaretDownIcon } from "@phosphor-icons/react";
import { Button } from "@/_components/admin/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/_components/admin/ui/dropdown-menu";
import { REPORT_STATUS_ENUMS } from "@/_lib/enums";
import { cn } from "@/_lib/utils";

type ReportStatus = (typeof REPORT_STATUS_ENUMS)[number];

export interface StatusFilterDropdownProps {
  value: Array<ReportStatus>;
  onValueChange: (value: Array<ReportStatus>) => void;
}

export const statusLabelMap: Record<ReportStatus, string> = {
  pending: "Pending Review",
  under_review: "Under Review",
  approved: "Approved",
  rejected: "Denied",
};

export const statusDotClassMap: Record<ReportStatus, string> = {
  pending: "bg-muted-foreground",
  under_review: "bg-yellow-500",
  approved: "bg-green-500",
  rejected: "bg-red-500",
};

export function StatusFilterDropdown({ value, onValueChange }: StatusFilterDropdownProps) {
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
            <span className="flex items-center">
              {REPORT_STATUS_ENUMS.map((status, index) => {
                const isSelected = value.includes(status);
                return (
                  <span
                    key={status}
                    className={cn(
                      "size-2 rounded-full border",
                      index > 0 && "-ml-1",
                      isSelected
                        ? ["border-background", statusDotClassMap[status]]
                        : "border-muted bg-background"
                    )}
                    aria-hidden
                  />
                );
              })}
            </span>
            <span>Status</span>
            <span className="text-muted-foreground">
              {selectedCount}/{totalStatuses}
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
              <span className={cn("size-2 rounded-full", statusDotClassMap[status])} aria-hidden />
              {statusLabelMap[status]}
            </DropdownMenuCheckboxItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
