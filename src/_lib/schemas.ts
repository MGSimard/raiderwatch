import { z } from "zod";
import { REPORT_STATUS_ENUMS } from "@/_lib/enums";

export const searchFilterSchema = z.object({
  searchQuery: z.string(),
  status: z.array(z.enum(REPORT_STATUS_ENUMS)),
  page: z.number(),
  pageSize: z.number(),
});
