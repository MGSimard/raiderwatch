import type { z } from "zod";
import type { searchFilterSchema } from "@/_lib/schemas";
import type { getRaiderApprovedReports, getReportsTableData } from "@/_server/serverFunctions";

export type SearchFilters = z.infer<typeof searchFilterSchema>;

export type ReportRow = Awaited<ReturnType<typeof getReportsTableData>>["reports"][number];

export type ApprovedReport = Awaited<ReturnType<typeof getRaiderApprovedReports>>[number];
