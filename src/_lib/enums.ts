// REPORT STATUSES
export const REPORT_STATUS_ENUMS = ["pending", "under_review", "approved", "rejected"] as const;
export type ReportStatus = (typeof REPORT_STATUS_ENUMS)[number];
export const REPORT_STATUS_LABELS: Record<ReportStatus, string> = {
  pending: "Pending Review",
  under_review: "Under Review",
  approved: "Approved",
  rejected: "Rejected",
};

// REPORT REASONS
export const REPORT_REASON_ENUMS = ["cheating", "exploiting", "griefing", "other"] as const;
export type ReportReason = (typeof REPORT_REASON_ENUMS)[number];
export const REPORT_REASON_LABELS: Record<ReportReason, string> = {
  cheating: "Cheating / Hacking",
  exploiting: "Exploiting Bugs",
  griefing: "Griefing / Team Killing",
  other: "Other",
};
