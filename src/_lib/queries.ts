import { queryOptions } from "@tanstack/react-query";
import { getCurrentUser, getRaiderApprovedReports } from "@/_server/serverFunctions";

export const currentUserQuery = () => {
  return queryOptions({
    queryKey: ["currentUser"],
    queryFn: () => getCurrentUser(),
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes (matches cookie cache)
    gcTime: 10 * 60 * 1000, // Keep in cache for 10 minutes when inactive
  });
};

export const approvedReportsQuery = (embarkId: string) => {
  return queryOptions({
    queryKey: ["approvedReports", embarkId],
    queryFn: () => getRaiderApprovedReports({ data: { embarkId } }),
  });
};
