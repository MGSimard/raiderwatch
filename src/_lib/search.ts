/**
 * Search utility functions for the admin reports table.
 * Provides query type detection and filtering logic for Embark ID and Report ID searches.
 */

export type SearchType = "embarkId" | "reportId";

export interface SearchState {
  query: string;
  type: SearchType;
}

export function detectSearchType(query: string): SearchType {
  const trimmed = query.trim();

  if (trimmed === "") {
    return "embarkId";
  }

  if (trimmed.includes("#")) {
    return "embarkId";
  }

  if (/^\d+$/.test(trimmed)) {
    return "reportId";
  }

  return "embarkId";
}

export function filterByEmbarkId(embarkId: string, query: string): boolean {
  const trimmedQuery = query.trim();

  if (trimmedQuery === "") {
    return true;
  }

  return embarkId.toLowerCase().includes(trimmedQuery.toLowerCase());
}

export function filterByReportId(reportId: number, query: string): boolean {
  const trimmedQuery = query.trim();

  if (trimmedQuery === "") {
    return true;
  }

  return reportId.toString().startsWith(trimmedQuery);
}
