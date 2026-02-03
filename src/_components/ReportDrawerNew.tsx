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
import { REPORT_REASON_LABELS } from "@/_lib/consts";
import { formatUtcDate, formatUtcDateTime, getYouTubeEmbedUrl, copyToClipboard } from "@/_lib/utils";
import { ScrollArea } from "@base-ui/react/scroll-area";
import { CalendarDays, ChevronRight, Copy } from "lucide-react";
import type { ApprovedReport } from "@/_lib/types";
import { InputGroupInput, InputGroupAddon, InputGroupButton, InputGroup } from "@/_components/ui/input-group";

export function ReportDrawerNew({ embarkId, report }: { embarkId: string; report: ApprovedReport }) {
  const { id, canonicalVideoUrl, reason, createdAt } = report;

  return (
    <Drawer direction="right">
      <DrawerTrigger asChild>
        <button
          type="button"
          aria-label="View Report"
          className="group btn-ring flex w-full items-center justify-between gap-4 rounded-[0.25rem] border border-arc-border bg-arc-item p-4 [--pass-radius:2px]">
          <div className="text-start">
            <h3 className="prompt text-arc-light">{REPORT_REASON_LABELS[reason]}</h3>
            <p className="flex items-center gap-1 text-xs/relaxed font-medium text-arc-muted">
              <CalendarDays className="shrink-0" />
              <span>{formatUtcDate(createdAt)}</span>
            </p>
          </div>
          <ChevronRight className="size-8 shrink-0 text-arc-muted transition-all duration-50 ease-out group-hover:translate-x-1 group-hover:text-arc-light group-focus-visible:translate-x-1 group-focus-visible:text-arc-light" />
        </button>
      </DrawerTrigger>
      <DrawerContent className="rounded-[1rem] border-transparent bg-arc-dark/83">
        <DrawerHeader>
          <DrawerDescription className="font font-body text-arc-muted uppercase">Report #{id}</DrawerDescription>
          <DrawerTitle className="prompt text-lg text-arc-light">{embarkId}</DrawerTitle>
          <DrawerDescription className="font-body font-bold text-arc-muted uppercase">
            REASON: {REPORT_REASON_LABELS[reason]}
          </DrawerDescription>
        </DrawerHeader>
        <div className="flex min-h-0 flex-1">
          <ScrollArea.Root className="min-h-0 min-w-0 flex-1 px-2">
            <ScrollArea.Viewport className="h-full overscroll-contain p-2 outline-none before:pointer-events-none before:absolute before:top-0 before:left-0 before:block before:h-[min(40px,var(--scroll-area-overflow-y-start))] before:w-full before:bg-[linear-gradient(to_bottom,var(--arc-dark),transparent)] before:transition-[height] before:duration-100 before:ease-out before:content-[''] before:[--scroll-area-overflow-y-start:inherit] after:pointer-events-none after:absolute after:bottom-0 after:left-0 after:block after:h-[min(40px,var(--scroll-area-overflow-y-end,40px))] after:w-full after:bg-[linear-gradient(to_top,var(--arc-dark),transparent)] after:transition-[height] after:duration-100 after:ease-out after:content-[''] after:[--scroll-area-overflow-y-end:inherit]">
              <div className="flex flex-col gap-4">
                {canonicalVideoUrl && (
                  <div>
                    <iframe
                      src={getYouTubeEmbedUrl(canonicalVideoUrl)}
                      title="YouTube video"
                      className="aspect-video w-full rounded-t-[4px] border border-b-0 border-arc-border"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                    <InputGroup className="rounded-b-[4px] border border-arc-border">
                      <InputGroupInput
                        placeholder={canonicalVideoUrl}
                        value={canonicalVideoUrl}
                        readOnly
                        className="text-arc-muted placeholder:text-arc-muted"
                      />
                      <InputGroupAddon align="inline-end">
                        <InputGroupButton
                          aria-label="Copy Video URL"
                          title="Copy Video URL"
                          size="icon-xs"
                          className="btn-ring rounded-full [--pass-radius:9999rem]"
                          onClick={() => copyToClipboard(canonicalVideoUrl, "Video URL")}>
                          <Copy />
                        </InputGroupButton>
                      </InputGroupAddon>
                    </InputGroup>
                  </div>
                )}
                <div className="h-px w-full bg-arc-muted2" />
                <button
                  type="button"
                  aria-label="Copy Report Metadata"
                  title="Copy Report Metadata"
                  className="group btn-ring rounded-[0.25rem] border border-arc-border bg-arc-dark/83 p-2 text-start text-arc-muted [--pass-radius:2px]"
                  onClick={() => copyToClipboard(JSON.stringify(report, null, 2), "Report Metadata")}>
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="prompt group-hover:text-arc-light group-focus-visible:text-arc-light">
                      REPORT METADATA
                    </h3>
                    <Copy className="-mt-1 size-4 shrink-0 text-arc-muted group-hover:text-arc-light group-focus-visible:text-arc-light" />
                  </div>
                  <ul>
                    <li>Report ID: #{id}</li>
                    <li>Embark ID: {embarkId}</li>
                    <li>Reason: {REPORT_REASON_LABELS[reason]}</li>
                    <li>Video URL: {canonicalVideoUrl}</li>
                    <li>Filed: {formatUtcDateTime(createdAt)}</li>
                  </ul>
                </button>
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
              <span className="rounded-[0.375rem] bg-arc-light px-2 py-1 text-arc-dark">ESC</span> CLOSE
            </button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
