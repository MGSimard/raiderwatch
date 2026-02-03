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
import { formatUtcDate, formatUtcDateTime, getYouTubeEmbedUrl } from "@/_lib/utils";
import { ScrollArea } from "@base-ui/react/scroll-area";
import { CalendarDotsIcon, CaretRightIcon } from "@phosphor-icons/react";
import type { ApprovedReport } from "@/_lib/types";

export function ReportDrawerNew({ embarkId, report }: { embarkId: string; report: ApprovedReport }) {
  return (
    <Drawer direction="right">
      <DrawerTrigger asChild>
        <button
          type="button"
          aria-label="View Report"
          className="group btn-ring flex w-full items-center justify-between gap-4 rounded-[4px] border border-arc-border bg-arc-item p-4 [--pass-radius:2px]">
          <div className="text-start">
            <h3 className="prompt text-arc-light">{REPORT_REASON_LABELS[report.reason]}</h3>
            <p className="flex items-center gap-1 text-xs/relaxed font-medium text-arc-muted">
              <CalendarDotsIcon weight="bold" className="shrink-0" aria-hidden />
              <span>{formatUtcDate(report.createdAt)}</span>
            </p>
          </div>
          <CaretRightIcon
            aria-hidden
            className="size-8 shrink-0 text-arc-muted transition-all duration-50 ease-out group-hover:translate-x-1 group-hover:text-arc-light group-focus-visible:translate-x-1 group-focus-visible:text-arc-light"
          />
        </button>
      </DrawerTrigger>
      <DrawerContent className="rounded-[1rem] border-transparent bg-arc-dark/83">
        <DrawerHeader>
          <DrawerTitle className="prompt text-lg text-arc-light">{embarkId}</DrawerTitle>
          <DrawerDescription className="font-body font-medium text-arc-muted uppercase">
            {REPORT_REASON_LABELS[report.reason]}
          </DrawerDescription>
        </DrawerHeader>
        <div className="flex min-h-0 flex-1">
          <ScrollArea.Root className="min-h-0 min-w-0 flex-1 px-4">
            <ScrollArea.Viewport className="h-full overscroll-contain outline-none before:pointer-events-none before:absolute before:top-0 before:left-0 before:block before:h-[min(40px,var(--scroll-area-overflow-y-start))] before:w-full before:bg-[linear-gradient(to_bottom,var(--card),transparent)] before:transition-[height] before:duration-100 before:ease-out before:content-[''] before:[--scroll-area-overflow-y-start:inherit] after:pointer-events-none after:absolute after:bottom-0 after:left-0 after:block after:h-[min(40px,var(--scroll-area-overflow-y-end,40px))] after:w-full after:bg-[linear-gradient(to_top,var(--card),transparent)] after:transition-[height] after:duration-100 after:ease-out after:content-[''] after:[--scroll-area-overflow-y-end:inherit]">
              <div className="flex flex-col gap-4">
                <div>
                  <h3 className="text-arc-muted uppercase">REPORT DATA (#{report.id})</h3>
                  <ul className="text-arc-muted">
                    <li>Embark ID: {embarkId}</li>
                    <li>Reason: {REPORT_REASON_LABELS[report.reason]}</li>
                    <li>Filed: {formatUtcDateTime(report.createdAt)}</li>
                  </ul>
                </div>
                {report.canonicalVideoUrl && (
                  <div>
                    <h3 className="mb-2 font-body font-medium text-arc-muted uppercase">EVIDENCE</h3>
                    <iframe
                      src={getYouTubeEmbedUrl(report.canonicalVideoUrl)}
                      title="YouTube video"
                      className="aspect-video w-full rounded-[4px]"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                )}
              </div>
            </ScrollArea.Viewport>
            <ScrollArea.Scrollbar className="m-1 flex w-1 justify-center transition-opacity data-hovering:delay-0 data-scrolling:duration-0">
              <ScrollArea.Thumb className="w-full rounded-full bg-border" />
            </ScrollArea.Scrollbar>
          </ScrollArea.Root>
        </div>
        <DrawerFooter>
          <DrawerClose asChild>
            <button
              type="button"
              className="ml-auto flex w-fit items-center gap-3 rounded-full px-3.5 py-1 text-base font-bold text-arc-light uppercase opacity-50 hover:opacity-100 focus-visible:opacity-100">
              <span className="rounded-[6px] bg-arc-light px-2 py-1 text-arc-dark">ESC</span> CLOSE
            </button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
