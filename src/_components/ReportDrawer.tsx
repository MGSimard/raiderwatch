import { Button } from "@/_components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/_components/ui/drawer";
import { REPORT_REASON_LABELS } from "@/_lib/constants";
import { formatUtcDate } from "@/_lib/utils";
import { ScrollArea } from "@base-ui/react/scroll-area";
import { CaretDoubleRightIcon } from "@phosphor-icons/react";
import type { ApprovedReport } from "@/_lib/types";

export function ReportDrawer({ embarkId, report }: { embarkId: string; report: ApprovedReport }) {
  return (
    <Drawer direction="right">
      <DrawerTrigger asChild>
        <button
          type="button"
          aria-label="View Report"
          className="group flex w-full items-center justify-between gap-4 bg-card/30 bg-size-[cover,100%_1rem] bg-position-[center,center_bottom] [background-repeat:no-repeat,no-repeat] p-4 text-xs/relaxed text-card-foreground ring-1 ring-foreground/10 hover:ring-primary focus-visible:ring-primary dark:bg-[radial-gradient(at_center_-5rem,oklch(from_var(--foreground)_l_c_h/0.15)_20%,transparent_80%),radial-gradient(at_center_bottom,oklch(from_var(--primary)l_c_h/0.1),transparent_80%)]">
          <div className="text-start">
            <h2 className="text-base text-primary uppercase">{REPORT_REASON_LABELS[report.reason]}</h2>
            <p className="text-xs/relaxed text-muted-foreground">{formatUtcDate(report.createdAt)}</p>
          </div>
          <CaretDoubleRightIcon
            weight="thin"
            className="size-8 shrink-0 text-primary/20 transition-all duration-50 ease-out group-hover:translate-x-1 group-hover:text-primary group-focus-visible:translate-x-1 group-focus-visible:text-primary"
          />
        </button>
      </DrawerTrigger>
      <DrawerContent className="bg-card">
        <DrawerHeader>
          <DrawerTitle>{embarkId}</DrawerTitle>
          <DrawerDescription>{REPORT_REASON_LABELS[report.reason]}</DrawerDescription>
        </DrawerHeader>
        <div className="flex min-h-0 flex-1">
          <ScrollArea.Root className="min-h-0 min-w-0 flex-1 px-4">
            <ScrollArea.Viewport className="h-full overscroll-contain outline-none before:pointer-events-none before:absolute before:top-0 before:left-0 before:block before:h-[min(40px,var(--scroll-area-overflow-y-start))] before:w-full before:bg-[linear-gradient(to_bottom,var(--card),transparent)] before:transition-[height] before:duration-100 before:ease-out before:content-[''] before:[--scroll-area-overflow-y-start:inherit] after:pointer-events-none after:absolute after:bottom-0 after:left-0 after:block after:h-[min(40px,var(--scroll-area-overflow-y-end,40px))] after:w-full after:bg-[linear-gradient(to_top,var(--card),transparent)] after:transition-[height] after:duration-100 after:ease-out after:content-[''] after:[--scroll-area-overflow-y-end:inherit]">
              <div className="flex flex-col">
                <div>Embark ID</div>
                <div>Reason</div>
                {/* TODO POTENTIALLY CONSIDER EXPOSING DESCRIPTION */}
                <div>Date</div>
                <div>Video (If no local copy for video tag, use youtube embed)</div>
              </div>
            </ScrollArea.Viewport>
            <ScrollArea.Scrollbar className="m-1 flex w-1 justify-center transition-opacity data-hovering:delay-0 data-scrolling:duration-0">
              <ScrollArea.Thumb className="w-full rounded-full bg-border" />
            </ScrollArea.Scrollbar>
          </ScrollArea.Root>
        </div>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
