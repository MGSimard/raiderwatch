export const REPORT_STATUS_ENUMS = ["pending", "under_review", "approved", "rejected"] as const;
export const REPORT_STATUS_LABELS: Record<(typeof REPORT_STATUS_ENUMS)[number], string> = {
  pending: "Pending Review",
  under_review: "Under Review",
  approved: "Approved",
  rejected: "Rejected",
};

export const REPORT_REASON_ENUMS = ["cheating", "exploiting", "griefing", "other"] as const;
export const REPORT_REASON_LABELS: Record<(typeof REPORT_REASON_ENUMS)[number], string> = {
  cheating: "Cheating / Hacking",
  exploiting: "Exploiting Bugs",
  griefing: "Griefing / Team Killing",
  other: "Other",
};
