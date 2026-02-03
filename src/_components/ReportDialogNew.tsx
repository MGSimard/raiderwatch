import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import { Button } from "@/_components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
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
import { REPORT_REASON_LABELS } from "@/_lib/constants";
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
      <DialogContent className="rounded-[8px] bg-arc-dark/83 ring-0 sm:max-w-[425px]" showCloseButton={false}>
        <DialogHeader className="shrink-0">
          <DialogTitle className="font-prompt text-lg font-bold tracking-wide text-arc-light uppercase">
            FILE REPORT
          </DialogTitle>
          <DialogDescription className="font-body font-medium text-arc-muted uppercase">{embarkId}</DialogDescription>
        </DialogHeader>
        <DialogBody className="text-arc-light">
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
                    <FieldLabel htmlFor={field.name} className="font-medium">
                      EMBARK ID
                    </FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className="cursor-not-allowed rounded-[4px] text-muted-foreground"
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
                    <FieldLabel htmlFor={field.name} className="font-medium">
                      REASON
                    </FieldLabel>
                    <Select
                      name={field.name}
                      value={field.state.value}
                      required
                      onValueChange={(value) => field.handleChange(value ?? "")}>
                      <SelectTrigger id={field.name} aria-invalid={isInvalid} className="rounded-[4px]">
                        <SelectValue placeholder="...">
                          {(value: string) =>
                            value ? REPORT_REASON_LABELS[value as keyof typeof REPORT_REASON_LABELS] : "..."
                          }
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent alignItemWithTrigger={false}>
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
                    <FieldLabel htmlFor={field.name} className="font-medium">
                      YOUTUBE URL
                    </FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      required
                      className="rounded-[4px]"
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
                    <FieldLabel htmlFor={field.name} className="font-medium">
                      DESCRIPTION
                    </FieldLabel>
                    <InputGroup className="rounded-[4px]">
                      <InputGroupTextarea
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="Briefly describe the situation..."
                        required
                        rows={6}
                        className="min-h-24 resize-none wrap-break-word"
                        aria-invalid={isInvalid}
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
          </form>
        </DialogBody>
        <DialogFooter className="shrink-0 justify-start!">
          <DialogClose
            render={
              <button
                type="button"
                className="btn-ring flex h-full items-center justify-center gap-3 rounded-full px-3.5 py-1 text-base font-bold text-arc-light uppercase opacity-50 [--pass-radius:9999px]">
                <span className="rounded-[6px] bg-arc-light px-2 py-1 text-arc-dark">ESC</span> CLOSE
              </button>
            }
          />
          <button
            type="button"
            form="raider-report-form"
            className="btn-ring flex h-full items-center justify-center gap-3 rounded-full bg-arc-light px-3.5 py-1 text-base font-bold text-arc-dark uppercase [--pass-radius:9999px]">
            <span className="rounded-[6px] bg-arc-dark px-2 py-1 text-arc-light">ENTER</span> SUBMIT
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
