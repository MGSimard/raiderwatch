import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
  DialogFooter,
  DialogBody,
} from "@/_components/admin/ui/dialog";
import { Badge } from "@/_components/admin/ui/badge";
import { Button } from "@/_components/ui/button";
import { Field, FieldLabel, FieldError } from "@/_components/admin/ui/field";
import { Input } from "@/_components/admin/ui/input";
import {
  InputGroup,
  InputGroupInput,
  InputGroupAddon,
  InputGroupButton,
  InputGroupTextarea,
  InputGroupText,
} from "@/_components/admin/ui/input-group";
import { Textarea } from "@/_components/admin/ui/textarea";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/_components/admin/ui/select";
import { Separator } from "@/_components/admin/ui/separator";
import { toast } from "sonner";
import { cn, copyToClipboard, formatUtcDateTime } from "@/_lib/utils";
import { REPORT_REASON_ENUMS, REPORT_STATUS_ENUMS, ReportReason, ReportStatus } from "@/_lib/enums";
import { REPORT_REASON_LABELS, REPORT_STATUS_META } from "@/_lib/constants";
import type { ReportRow } from "@/_lib/types";
import { CopySimpleIcon } from "@phosphor-icons/react";

const formSchema = z.object({
  reportId: z.number(),
  status: z.enum(REPORT_STATUS_ENUMS, "Select a valid report status from the dropdown menu"),
  reason: z.enum(REPORT_REASON_ENUMS, "Select a valid reason from the dropdown menu"),
  videoStoragePath: z.url().trim(),
  reviewerComment: z
    .string()
    .trim()
    .min(20, "Description must be at least 20 characters in length")
    .max(300, "Description must be at most 300 characters in length"),
});

export function AssessmentDrawer({ report }: { report: ReportRow }) {
  const form = useForm({
    defaultValues: {
      reportId: report.id,
      status: report.status,
      reason: report.reason,
      videoStoragePath: report.videoStoragePath ?? "",
      reviewerComment: report.reviewerComment ?? "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        const validated = formSchema.parse(value);
        console.log(validated);
        // await updateReport({ data: validated }); TODO
        toast.success("Report updated successfully.");
        form.reset();
      } catch (err) {
        console.error("Error updating report:", err);
        toast.error("Failed to update report, view console for more details.");
      }
    },
  });

  return (
    <DialogContent className="w-full max-w-lg" showCloseButton={false}>
      <DialogHeader className="flex shrink-0 flex-row justify-between gap-2">
        <div>
          <DialogTitle className="mb-1.5">REPORT ASSESSMENT</DialogTitle>
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
              <li>Reviewed At: {report.reviewedAt ? formatUtcDateTime(report.reviewedAt) : "N/A"}</li>
              <li>Reviewed By: {report.reviewedBy ?? "N/A"}</li>
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
          <div className="grid grid-cols-2 gap-2">
            <iframe
              className="h-full w-full bg-black"
              src="https://www.youtube.com/embed/If_RqCOtWZ8?si=qfQrkiggPyhgC0Bl"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen></iframe>
            <div className="flex flex-col justify-between gap-2">
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
          </div>
          {/* TODO: URL Parsing to morph into embed url */}
        </div>
        <Separator />
        <form
          id="report-assessment-form"
          className="grid gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            void form.handleSubmit();
          }}>
          <form.Field
            name="reason"
            children={(field) => {
              const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Reason</FieldLabel>
                  <Select
                    name={field.name}
                    value={field.state.value}
                    onValueChange={(value) => value && field.handleChange(value)}>
                    <SelectTrigger id={field.name} aria-invalid={isInvalid} className="min-w-[120px]">
                      <SelectValue>{(value: ReportReason) => REPORT_REASON_LABELS[value as ReportReason]}</SelectValue>
                    </SelectTrigger>
                    <SelectContent alignItemWithTrigger={false}>
                      {REPORT_REASON_ENUMS.map((reason) => (
                        <SelectItem key={reason} value={reason} className="cursor-pointer">
                          {REPORT_REASON_LABELS[reason]}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
              );
            }}
          />
          <form.Field
            name="videoStoragePath"
            children={(field) => {
              const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Video Storage Path</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    placeholder="https://example.com/video.mp4"
                    required
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          />
          <form.Field
            name="reviewerComment"
            children={(field) => {
              const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Reviewer Comment</FieldLabel>
                  <InputGroup>
                    <InputGroupTextarea
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      rows={6}
                      className="min-h-24 resize-none wrap-break-word"
                      placeholder="Enter your comment here..."
                      required
                    />
                    <InputGroupAddon align="block-end">
                      <InputGroupText className={cn(field.state.value.length > 300 && "text-destructive")}>
                        {field.state.value.length}/300 characters
                      </InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          />
          <form.Field
            name="status"
            children={(field) => {
              const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Status</FieldLabel>
                  <Select
                    name={field.name}
                    value={field.state.value}
                    onValueChange={(value) => value && field.handleChange(value)}>
                    <SelectTrigger id={field.name} aria-invalid={isInvalid} className="min-w-[120px]">
                      <SelectValue>{(value: ReportStatus) => REPORT_STATUS_META[value].label}</SelectValue>
                    </SelectTrigger>
                    <SelectContent alignItemWithTrigger={false}>
                      {REPORT_STATUS_ENUMS.map((status) => (
                        <SelectItem key={status} value={status} className="cursor-pointer">
                          {REPORT_STATUS_META[status].label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
              );
            }}
          />
        </form>
      </DialogBody>
      <DialogFooter>
        <DialogClose render={<Button variant="outline">Close</Button>} />
        <Button type="submit" form="report-assessment-form">
          Save
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}
