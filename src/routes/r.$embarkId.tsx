import { Suspense } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { normalizeEmbarkId } from "@/_lib/utils";
import { approvedReportsQuery } from "@/_lib/queries";

export const Route = createFileRoute("/r/$embarkId")({
  component: PageRaiderProfile,
  loader: ({ context, params }) => {
    const normalizedEmbarkId = normalizeEmbarkId(params.embarkId);
    void context.queryClient.ensureQueryData(approvedReportsQuery(normalizedEmbarkId));
    return { normalizedEmbarkId };
  },
});

// TODO:
// Loading Component
// Use shadcn sonner/toast
// Error stuff
// 404 stuff
// Search component / index search page

function PageRaiderProfile() {
  const { normalizedEmbarkId } = Route.useLoaderData();

  return (
    <div>
      <h1>Raider Profile: {normalizedEmbarkId}</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <ReportData normalizedEmbarkId={normalizedEmbarkId} />
      </Suspense>
    </div>
  );
}

function ReportData({ normalizedEmbarkId }: { normalizedEmbarkId: string }) {
  const { data: approvedReports } = useSuspenseQuery(approvedReportsQuery(normalizedEmbarkId));

  return (
    <>
      <h2>Reports: {approvedReports.length}</h2>
      {approvedReports.length > 0 && (
        <ul>
          {approvedReports.map((report) => (
            <li key={report.id}>
              <h3>{report.reason}</h3>
              <p>{report.description}</p>
              <p>{report.videoUrl}</p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
