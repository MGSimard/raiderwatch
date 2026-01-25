// REPORT STATUSES
export const REPORT_STATUS_ENUMS = ["pending", "under_review", "approved", "rejected"] as const;
export type ReportStatus = (typeof REPORT_STATUS_ENUMS)[number];
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

// REPORT REASONS
export const REPORT_REASON_ENUMS = ["cheating", "exploiting", "griefing", "other"] as const;
export type ReportReason = (typeof REPORT_REASON_ENUMS)[number];
export const REPORT_REASON_LABELS: Record<ReportReason, string> = {
  cheating: "Cheating / Hacking",
  exploiting: "Exploiting Bugs",
  griefing: "Griefing / Team Killing",
  other: "Other",
};
