import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import { Button } from "@/_components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogBody,
  DialogClose,
  DialogFooter,
} from "@/_components/ui/dialog";
import { Field, FieldError, FieldLabel } from "@/_components/ui/field";
import { Input } from "@/_components/ui/input";
import { InputGroup, InputGroupAddon, InputGroupText, InputGroupTextarea } from "@/_components/ui/input-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/_components/ui/select";
import { toast } from "sonner";
import { REPORT_REASON_ENUMS } from "@/_lib/enums";
import { REPORT_REASON_LABELS } from "@/_lib/consts";
import { fileReport } from "@/_server/serverFunctions";
import { fileReportSchema } from "@/_lib/schemas";
import { cn } from "@/_lib/utils";

export function ReportDialogNew({ embarkId, children }: { embarkId: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const form = useForm({
    defaultValues: {
      embarkId: embarkId,
      reason: "",
      description: "",
      videoUrl: "",
    },
    validators: {
      onSubmit: fileReportSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        const validated = fileReportSchema.parse(value); // Needed since we use "" default for reason
        await fileReport({ data: validated });
        toast.success("Report submitted successfully. A curator will review it shortly.");
        form.reset();
        setOpen(false);
      } catch (err) {
        console.error("Error submitting report:", err);
        toast.error("Failed to submit report, view console for more details.");
      }
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={children as React.ReactElement} />
      <DialogContent
        className="block overflow-hidden rounded-[8px] bg-transparent p-0 text-arc-dark ring-0 sm:max-w-[425px]"
        showCloseButton={false}>
        <DialogBody className="bg-arc-light py-4 pt-3 text-arc-dark">
          <DialogTitle className="prompt text-lg">FILE REPORT</DialogTitle>
          <form
            id="raider-report-form"
            className="grid gap-4"
            onSubmit={(e) => {
              e.preventDefault();
              void form.handleSubmit();
            }}>
            <form.Field
              name="embarkId"
              children={(field) => {
                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name} className="prompt gap-1 select-auto">
                      EMBARK ID
                      <span className="text-destructive select-none" aria-hidden>
                        *
                      </span>
                    </FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className="cursor-not-allowed rounded-[4px] bg-[oklch(from_var(--arc-light)_calc(l-0.1)_c_h)]! font-bold text-[oklch(from_var(--arc-light)_calc(l-0.3)_c_h)] ring-1 ring-[oklch(from_var(--arc-light)_calc(l-0.3)_c_h)]"
                      aria-invalid={isInvalid}
                      autoComplete="off"
                      required
                      readOnly
                    />
                    {isInvalid && <FieldError errors={field.state.meta.errors} />}
                  </Field>
                );
              }}
            />
            <form.Field
              name="reason"
              children={(field) => {
                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name} className="prompt gap-1 select-auto">
                      REASON
                      <span className="text-destructive select-none" aria-hidden>
                        *
                      </span>
                    </FieldLabel>
                    <Select
                      name={field.name}
                      value={field.state.value}
                      required
                      onValueChange={(value) => field.handleChange(value ?? "")}>
                      <SelectTrigger
                        id={field.name}
                        aria-invalid={isInvalid}
                        className="rounded-[4px] bg-[oklch(from_var(--arc-light)_calc(l-0.1)_c_h)]! ring-1 ring-[oklch(from_var(--arc-light)_calc(l-0.3)_c_h)]">
                        <SelectValue placeholder="...">
                          {(value: string) =>
                            value ? REPORT_REASON_LABELS[value as keyof typeof REPORT_REASON_LABELS] : "..."
                          }
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent
                        alignItemWithTrigger={false}
                        className="rounded-[4px] bg-[oklch(from_var(--arc-light)_calc(l-0.1)_c_h)]! text-arc-dark ring-1 ring-[oklch(from_var(--arc-light)_calc(l-0.3)_c_h)]">
                        {REPORT_REASON_ENUMS.map((reason) => (
                          <SelectItem key={reason} value={reason} className="cursor-pointer">
                            {REPORT_REASON_LABELS[reason]}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {isInvalid && <FieldError errors={field.state.meta.errors} />}
                  </Field>
                );
              }}
            />
            <form.Field
              name="videoUrl"
              children={(field) => {
                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name} className="prompt gap-1 select-auto">
                      YOUTUBE URL
                      <span className="text-destructive select-none" aria-hidden>
                        *
                      </span>
                    </FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      required
                      className="rounded-[4px] bg-[oklch(from_var(--arc-light)_calc(l-0.1)_c_h)]! ring-1 ring-[oklch(from_var(--arc-light)_calc(l-0.3)_c_h)] placeholder:text-[oklch(from_var(--arc-light)_calc(l-0.3)_c_h)]"
                      placeholder="(e.g. https://youtube.com/watch?v=xxx)..."
                    />
                    {isInvalid && <FieldError errors={field.state.meta.errors} />}
                  </Field>
                );
              }}
            />
            <form.Field
              name="description"
              children={(field) => {
                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name} className="prompt gap-1 select-auto">
                      DESCRIPTION
                      <span className="text-destructive select-none" aria-hidden>
                        *
                      </span>
                    </FieldLabel>
                    <InputGroup className="mb-0.5 rounded-[4px] bg-[oklch(from_var(--arc-light)_calc(l-0.1)_c_h)]! ring-1 ring-[oklch(from_var(--arc-light)_calc(l-0.3)_c_h)]">
                      <InputGroupTextarea
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="Briefly describe the situation..."
                        required
                        rows={6}
                        className="min-h-24 resize-none wrap-break-word placeholder:text-[oklch(from_var(--arc-light)_calc(l-0.3)_c_h)]"
                        aria-invalid={isInvalid}
                      />
                      <InputGroupAddon align="block-end">
                        <InputGroupText
                          className={cn(
                            "font-bold text-[oklch(from_var(--arc-light)_calc(l-0.3)_c_h)]",
                            field.state.meta.isTouched &&
                              field.state.meta.isDirty &&
                              (field.state.value.length > 300 || field.state.value.length < 20) &&
                              "text-destructive"
                          )}>
                          {field.state.value.length}/300 characters
                        </InputGroupText>
                      </InputGroupAddon>
                    </InputGroup>
                    {isInvalid && <FieldError errors={field.state.meta.errors} />}
                  </Field>
                );
              }}
            />
          </form>
        </DialogBody>
        <DialogFooter className="grid shrink-0 gap-4 bg-arc-dark px-4 py-6 jeff:grid-cols-2">
          <DialogClose
            render={
              <button
                type="button"
                className="btn-ring flex h-full items-center justify-center gap-3 rounded-full bg-arc-radial px-3.5 py-1 text-base font-bold tracking-wide text-arc-light uppercase [--pass-radius:9999px]">
                CANCEL
              </button>
            }
          />
          <button
            type="button"
            form="raider-report-form"
            disabled={!form.state.canSubmit}
            aria-busy={form.state.isSubmitting}
            className={cn(
              "btn-ring flex h-full items-center justify-center gap-3 rounded-full bg-arc-primary px-3.5 py-2 text-base font-bold tracking-wide text-arc-dark uppercase [--pass-radius:9999px]",
              !form.state.canSubmit && "opacity-50"
            )}>
            SUBMIT
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
