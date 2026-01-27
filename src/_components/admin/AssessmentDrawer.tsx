import { Button } from "@/_components/ui/button";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
  DialogFooter,
  DialogBody,
} from "@/_components/admin/ui/dialog";
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
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectLabel,
} from "@/_components/admin/ui/select";

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
    <DialogContent className="w-full max-w-2xl" showCloseButton={false}>
      <DialogHeader className="flex shrink-0 flex-row justify-between gap-2">
        <div>
          <DialogTitle className="mb-1.5">REPORT ASSESSMENT</DialogTitle>
          {/* Report status as a badge on the right? */}
          <DialogDescription>Report ID: {report.id}</DialogDescription>
        </div>
        <Badge variant="outline" className="shrink-0">
          <div
            data-icon="inline-start"
            className={cn("h-2 w-2 rounded-full", REPORT_STATUS_META[report.status].dotClass)}
          />
          {REPORT_STATUS_META[report.status].label}
        </Badge>
      </DialogHeader>
      <DialogBody>
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
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen></iframe>
          </AspectRatio>
          <InputGroup>
            <InputGroupInput placeholder={report.videoUrl} readOnly />
            <InputGroupAddon align="inline-end">
              <InputGroupButton
                aria-label="Copy"
                title="Copy"
                size="icon-xs"
                onClick={() => copyToClipboard(report.videoUrl, "Video URL")}>
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
            - Ability to add or modify stored video URL which replaces the youtube video embed in the public report
            drawer
          </li>
          <li>- Add or modify reviewer comment (default value is reviewer comment if exists, otherwise empty)</li>
          <li>- Ability to modify the report reason if initial is incorrect</li>

          <li>- Ability to change the report status</li>
          <li>- Report assesment guidelines reminder</li>
          <li>- Checkbox of confirmation (tie assessment guidelines to this? Similar to a user agreement checkbox)</li>
          <li>- Save button (come up with a good text)</li>
        </ul>
        <ul>
          <li>
            - Ability to add or modify stored video URL which replaces the youtube video embed in the public report
            drawer
          </li>
          <li>- Add or modify reviewer comment (default value is reviewer comment if exists, otherwise empty)</li>
          <li>- Ability to modify the report reason if initial is incorrect</li>

          <li>- Ability to change the report status</li>
          <li>- Report assesment guidelines reminder</li>
          <li>- Checkbox of confirmation (tie assessment guidelines to this? Similar to a user agreement checkbox)</li>
          <li>- Save button (come up with a good text)</li>
        </ul>
        <ul>
          <li>
            - Ability to add or modify stored video URL which replaces the youtube video embed in the public report
            drawer
          </li>
          <li>- Add or modify reviewer comment (default value is reviewer comment if exists, otherwise empty)</li>
          <li>- Ability to modify the report reason if initial is incorrect</li>

          <li>- Ability to change the report status</li>
          <li>- Report assesment guidelines reminder</li>
          <li>- Checkbox of confirmation (tie assessment guidelines to this? Similar to a user agreement checkbox)</li>
          <li>- Save button (come up with a good text)</li>
        </ul>
        <Select>
          <SelectTrigger className="w-full max-w-48">
            <SelectValue placeholder="Select a fruit" />
          </SelectTrigger>
          <SelectContent alignItemWithTrigger={false}>
            <SelectGroup>
              <SelectLabel>Fruits</SelectLabel>
              <SelectItem value="apple">Apple</SelectItem>
              <SelectItem value="banana">Banana</SelectItem>
              <SelectItem value="blueberry">Blueberry</SelectItem>
              <SelectItem value="grapes">Grapes</SelectItem>
              <SelectItem value="pineapple">Pineapple</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </DialogBody>
      <DialogFooter>
        <DialogClose render={<Button variant="outline">Close</Button>} />
      </DialogFooter>
    </DialogContent>
  );
}
