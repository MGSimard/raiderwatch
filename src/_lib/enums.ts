// Pure enums - just the const arrays and derived types
export const REPORT_STATUS_ENUMS = ["pending", "under_review", "approved", "rejected"] as const;
export type ReportStatus = (typeof REPORT_STATUS_ENUMS)[number];

export const REPORT_REASON_ENUMS = ["cheating", "exploiting", "griefing", "other"] as const;
export type ReportReason = (typeof REPORT_REASON_ENUMS)[number];
