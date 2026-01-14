import { queryOptions } from "@tanstack/react-query";
import { getRaiderApprovedReports } from "@/_server/serverFunctions";

export const approvedReportsQuery = (normalizedEmbarkId: string) => {
  return queryOptions({
    queryKey: ["approvedReports", normalizedEmbarkId],
    queryFn: () => getRaiderApprovedReports({ data: { embarkId: normalizedEmbarkId } }),
  });
};
