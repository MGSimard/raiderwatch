import { Button } from "@/_components/ui/button";
import {
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/_components/ui/drawer";
import { ScrollArea } from "@base-ui/react/scroll-area";
import type { ReportRow } from "@/_lib/types";
import { REPORT_REASON_LABELS, REPORT_STATUS_META } from "@/_lib/constants";
import { cn, formatUtcDateTime } from "@/_lib/utils";
import { Field, FieldLabel } from "@/_components/admin/ui/field";
import { Textarea } from "@/_components/admin/ui/textarea";
import { Badge } from "@/_components/admin/ui/badge";
import { InputGroup, InputGroupInput, InputGroupAddon, InputGroupButton } from "@/_components/admin/ui/input-group";
import { AspectRatio } from "@/_components/admin/ui/aspect-ratio";
import { CopySimpleIcon } from "@phosphor-icons/react";
import { toast } from "sonner";
import { Separator } from "@/_components/admin/ui/separator";

export function AssessmentDrawer({ report }: { report: ReportRow }) {
  // description: string;
  // videoUrl: string;
  // videoStoragePath: string | null;
  // status: "pending" | "under_review" | "approved" | "rejected";
  // reviewedAt: Date | null;
  // reviewedBy: string | null;
  // reviewerComment: string | null;
  // createdAt: Date;
  // updatedAt: Date;

  // TODO: Move to utils (we already have one in another place too)
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
    <DrawerContent className="bg-card">
      <DrawerHeader className="flex flex-row justify-between gap-2">
        <div>
          <DrawerTitle className="mb-1.5">REPORT ASSESSMENT</DrawerTitle>
          {/* Report status as a badge on the right? */}
          <DrawerDescription>Report ID: {report.id}</DrawerDescription>
        </div>
        <Badge variant="outline" className="shrink-0">
          <div
            data-icon="inline-start"
            className={cn("h-2 w-2 rounded-full", REPORT_STATUS_META[report.status].dotClass)}
          />
          {REPORT_STATUS_META[report.status].label}
        </Badge>
      </DrawerHeader>
      <div className="flex min-h-0 flex-1">
        <ScrollArea.Root className="min-h-0 min-w-0 flex-1 px-4">
          <ScrollArea.Viewport className="h-full overscroll-contain outline-none before:pointer-events-none before:absolute before:top-0 before:left-0 before:block before:h-[min(40px,var(--scroll-area-overflow-y-start))] before:w-full before:bg-[linear-gradient(to_bottom,var(--card),transparent)] before:transition-[height] before:duration-100 before:ease-out before:content-[''] before:[--scroll-area-overflow-y-start:inherit] after:pointer-events-none after:absolute after:bottom-0 after:left-0 after:block after:h-[min(40px,var(--scroll-area-overflow-y-end,40px))] after:w-full after:bg-[linear-gradient(to_top,var(--card),transparent)] after:transition-[height] after:duration-100 after:ease-out after:content-[''] after:[--scroll-area-overflow-y-end:inherit]">
            <div className="flex flex-col gap-2">
              <div className="flex gap-2 border bg-card px-2 py-1.5">
                <div>
                  <h3>Report Metadata (#{report.id})</h3>
                  <ul className="text-muted-foreground">
                    <li>Embark ID: {report.embarkId}</li>
                    <li>Reason: {REPORT_REASON_LABELS[report.reason]}</li>
                    <li>Filed: {formatUtcDateTime(report.createdAt)}</li>
                    <li>Last Update: {formatUtcDateTime(report.updatedAt)}</li>
                    <li>-</li>
                    <li>Status: {REPORT_STATUS_META[report.status].label}</li>
                    <li>Reviewed At: {report.reviewedAt ? formatUtcDateTime(report.reviewedAt) : "N/A"}</li>
                    <li>Reviewed By: {report.reviewedBy ?? "N/A"}</li>
                    <li>Reviewer Comment: {report.reviewerComment ?? "N/A"}</li>
                  </ul>
                </div>
                <Button
                  size="icon-sm"
                  variant="ghost"
                  className="ml-auto shrink-0"
                  aria-label="Copy Report"
                  onClick={() => copyToClipboard(JSON.stringify(report, null, 2), "Report")}>
                  <CopySimpleIcon aria-hidden />
                </Button>
              </div>
              <div>
                {/* TODO: URL Parsing to morph into embed url */}
                <AspectRatio ratio={16 / 9}>
                  <iframe
                    className="h-full w-full"
                    src="https://www.youtube.com/embed/If_RqCOtWZ8?si=qfQrkiggPyhgC0Bl"
                    title="YouTube video player"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerpolicy="strict-origin-when-cross-origin"
                    allowfullscreen></iframe>
                </AspectRatio>
                <InputGroup>
                  <InputGroupInput placeholder={report.videoUrl} readOnly />
                  <InputGroupAddon align="inline-end">
                    <InputGroupButton aria-label="Copy" title="Copy" size="icon-xs">
                      <CopySimpleIcon aria-hidden />
                    </InputGroupButton>
                  </InputGroupAddon>
                </InputGroup>
              </div>
              <Field data-disabled>
                <FieldLabel htmlFor="textarea-disabled">Description</FieldLabel>
                <Textarea
                  id="textarea-disabled"
                  placeholder="Type your message here."
                  disabled
                  value={report.description}
                  readOnly
                />
              </Field>
              <Separator />
              {/* TODO */}
              <ul>
                <li>
                  - Ability to add or modify stored video URL which replaces the youtube video embed in the public
                  report drawer
                </li>
                <li>- Add or modify reviewer comment (default value is reviewer comment if exists, otherwise empty)</li>
                <li>- Ability to modify the report reason if initial is incorrect</li>

                <li>- Ability to change the report status</li>
                <li>- Report assesment guidelines reminder</li>
                <li>
                  - Checkbox of confirmation (tie assessment guidelines to this? Similar to a user agreement checkbox)
                </li>
                <li>- Save button (come up with a good text)</li>
              </ul>
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
  );
}
