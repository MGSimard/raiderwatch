import { z } from "zod";
import { REPORT_REASON_ENUMS, REPORT_STATUS_ENUMS } from "@/_lib/enums";
import { extractYouTubeVideoId } from "@/_lib/utils";

export const searchFilterSchema = z.object({
  searchQuery: z.string(),
  statuses: z.array(z.enum(REPORT_STATUS_ENUMS)),
  page: z.number(),
  pageSize: z.number(),
});

// TODO: Normalize if I use periods or not, also schemas as in client and server, so use a neutral language instead of UI-based (Like dropdown, etc)
export const fileReportSchema = z.object({
  embarkId: z
    .string()
    .trim()
    .regex(
      /^[a-zA-Z0-9\-_.]+#\d{4}$/,
      "Invalid Embark ID format. Username must only contain letters, numbers, and symbols (- _ .), and 4-digit discriminator. (e.g. username#1234)."
    ),
  reason: z.enum(REPORT_REASON_ENUMS, "Invalid report reason."),
  description: z
    .string()
    .trim()
    .min(20, "Description must be at least 20 characters in length.")
    .max(300, "Description must be at most 300 characters in length."),
  videoUrl: z.url("Must be a valid YouTube URL.").refine(extractYouTubeVideoId, {
    message: "Must be a valid YouTube URL.",
  }),
});

// UPDATE REPORT (ASSESSMENT)
const optionalString = <T extends z.ZodTypeAny>(schema: T) => z.union([z.literal(""), schema]);
const baseFields = z.object({
  reportId: z.number(),
  reason: z.enum(REPORT_REASON_ENUMS, "Select a valid reason from the dropdown menu"),
});
const canonicalVideoUrl = z.url("Must be a valid URL").refine(extractYouTubeVideoId, {
  message: "Must be a valid YouTube URL",
});
const reviewerComment = z.string().trim().max(300, "Review comment must be at most 300 characters in length");
export const updateReportSchema = z.discriminatedUnion("status", [
  z.object({
    ...baseFields.shape,
    status: z.literal("pending"),
    canonicalVideoUrl: optionalString(canonicalVideoUrl),
    reviewerComment,
  }),
  z.object({
    ...baseFields.shape,
    status: z.literal("under_review"),
    canonicalVideoUrl: optionalString(canonicalVideoUrl),
    reviewerComment,
  }),
  z.object({
    ...baseFields.shape,
    status: z.literal("approved"),
    canonicalVideoUrl,
    reviewerComment: reviewerComment.min(20, "Reviewer comment must be at least 20 characters"),
  }),
  z.object({
    ...baseFields.shape,
    status: z.literal("rejected"),
    canonicalVideoUrl: optionalString(canonicalVideoUrl),
    reviewerComment: reviewerComment.min(20, "Reviewer comment must be at least 20 characters"),
  }),
]);
export type UpdateReportInput = z.infer<typeof updateReportSchema>;
