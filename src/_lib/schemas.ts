import { z } from "zod";
import { REPORT_REASON_ENUMS, REPORT_STATUS_ENUMS } from "@/_lib/enums";
import { extractYouTubeVideoId } from "@/_lib/utils";

export const searchFilterSchema = z.object({
  searchQuery: z.string(),
  statuses: z.array(z.enum(REPORT_STATUS_ENUMS)),
  page: z.number(),
  pageSize: z.number(),
});

export const fileReportSchema = z.object({
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
  videoUrl: z.url("Must be a valid URL").refine(extractYouTubeVideoId, {
    message: "Must be a valid YouTube URL",
  }),
});

export const updateReportSchema = z.object({
  reportId: z.number(),
  status: z.enum(REPORT_STATUS_ENUMS, "Select a valid report status from the dropdown menu"),
  reason: z.enum(REPORT_REASON_ENUMS, "Select a valid reason from the dropdown menu"),
  canonicalVideoUrl: z.url("Must be a valid URL").refine(extractYouTubeVideoId, {
    message: "Must be a valid YouTube URL",
  }),
  reviewerComment: z
    .string()
    .trim()
    .min(20, "Description must be at least 20 characters in length")
    .max(300, "Description must be at most 300 characters in length"),
});
