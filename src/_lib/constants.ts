// Metadata, labels, and configuration
import type { ReportStatus, ReportReason } from "@/_lib/enums";
import type { SearchFilters } from "@/_lib/types";

export const REPORT_STATUS_META = {
  pending: {
    label: "Pending Review",
    dotClass: "bg-muted-foreground",
  },
  under_review: {
    label: "Under Review",
    dotClass: "bg-yellow-500",
  },
  approved: {
    label: "Approved",
    dotClass: "bg-green-500",
  },
  rejected: {
    label: "Rejected",
    dotClass: "bg-red-500",
  },
} satisfies Record<ReportStatus, { label: string; dotClass: string }>;

export const REPORT_REASON_LABELS: Record<ReportReason, string> = {
  cheating: "Cheating / Hacking",
  exploiting: "Exploiting Bugs",
  griefing: "Griefing / Team Killing",
  other: "Other",
};

export const DEFAULT_REPORTS_FILTERS = {
  searchQuery: "",
  statuses: ["pending", "under_review"],
  page: 1,
  pageSize: 10,
} as const satisfies SearchFilters;
