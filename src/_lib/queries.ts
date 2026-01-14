import { queryOptions } from "@tanstack/react-query";
import { getRaiderApprovedReports } from "@/_server/serverFunctions";

export const approvedReportsQuery = (embarkId: string) => {
  return queryOptions({
    queryKey: ["approvedReports", embarkId],
    queryFn: () => getRaiderApprovedReports({ data: { embarkId } }),
  });
};
