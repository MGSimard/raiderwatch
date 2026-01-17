import { z } from "zod";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { cn } from "@/_lib/utils";
import { Button } from "@/_components/ui/button";
import {
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/_components/ui/dialog";
import { Input } from "@/_components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/_components/ui/select";
import { REPORT_REASON_ENUMS, REPORT_REASON_LABELS } from "@/_lib/enums";
import { Field, FieldError, FieldLabel } from "@/_components/ui/field";
import { InputGroup, InputGroupAddon, InputGroupText, InputGroupTextarea } from "@/_components/ui/input-group";

export function ReportDialog({ embarkId }: { embarkId: string }) {
  const form = useForm({
    defaultValues: {
      embarkId: embarkId,
      reason: "",
      description: "",
      videoUrl: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log("Submitted values:", value);
      toast.success("Report submitted successfully");
    },
  });

  return (
    <Dialog>
      <DialogTrigger render={<Button type="button">FILE REPORT</Button>} />
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="shrink-0">
          <DialogTitle>FILE REPORT</DialogTitle>
          <DialogDescription>
            Filing a report for <span className="italic">&quot;{embarkId}&quot;</span>
          </DialogDescription>
        </DialogHeader>
        <DialogBody>
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
                    <FieldLabel htmlFor={field.name}>Embark ID</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className="text-muted-foreground cursor-not-allowed"
                      aria-invalid={isInvalid}
                      autoComplete="off"
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
                    <FieldLabel htmlFor={field.name}>Reason</FieldLabel>
                    <Select
                      name={field.name}
                      value={field.state.value}
                      onValueChange={(value) => field.handleChange(value ?? "")}>
                      <SelectTrigger id={field.name} aria-invalid={isInvalid}>
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
                    <FieldLabel htmlFor={field.name}>Video URL</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
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
                    <FieldLabel htmlFor={field.name}>Description</FieldLabel>
                    <InputGroup>
                      <InputGroupTextarea
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="Briefly describe the situation..."
                        rows={6}
                        className="min-h-24 resize-none wrap-break-word"
                        aria-invalid={isInvalid}
                      />
                      <InputGroupAddon align="block-end">
                        <InputGroupText className={cn(field.state.value.length > 300 && "text-destructive")}>{field.state.value.length}/300 characters</InputGroupText>
                      </InputGroupAddon>
                    </InputGroup>
                    {isInvalid && <FieldError errors={field.state.meta.errors} />}
                  </Field>
                );
              }}
            />
          </form>
        </DialogBody>
        <DialogFooter className="shrink-0">
          <DialogClose
            render={
              <Button type="button" variant="outline">
                Cancel
              </Button>
            }
          />
          <Button type="submit" form="raider-report-form">
            SUBMIT REPORT
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// mother of god
const formSchema = z.object({
  embarkId: z
    .string()
    .trim()
    .regex(
      /^[a-zA-Z0-9\-_.]+#\d{4}$/,
      "Invalid Embark ID format. Username must only contain letters, numbers, and symbols (- _ .), and 4-digit discriminator. (e.g. username#1234)"
    ),
  reason: z.enum(REPORT_REASON_ENUMS, "Select a valid reason from the dropdown menu"),
  description: z
    .string()
    .trim()
    .min(20, "Description must be at least 20 characters in length")
    .max(300, "Description must be at most 300 characters in length"),
  videoUrl: z
    .url()
    .trim()
    .refine(
      (url) => {
        try {
          const urlObj = new URL(url);
          const hostname = urlObj.hostname.toLowerCase();

          if (hostname === "youtu.be") {
            // Short link format: youtu.be/VIDEO_ID
            return urlObj.pathname.length > 1;
          }

          if (hostname === "youtube.com" || hostname === "www.youtube.com" || hostname === "m.youtube.com") {
            // Standard format: youtube.com/watch?v=VIDEO_ID
            return urlObj.searchParams.has("v");
          }

          return false;
        } catch {
          return false;
        }
      },
      { message: "Must be a valid YouTube video URL (youtube.com/watch?v=xxx or youtu.be/xxx)" }
    ),
});
