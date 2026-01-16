import { Suspense } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { approvedReportsQuery } from "@/_lib/queries";
import { NoReports } from "@/_components/NoReports";
import { LoaderBlocks } from "@/_components/LoaderBlocks";

export const Route = createFileRoute("/r/$embarkId")({
  component: PageRaiderProfile,
  loader: ({ context, params }) => {
    // Convert tilde back to hashtag for database lookup
    const embarkId = params.embarkId.replace("~", "#");
    void context.queryClient.ensureQueryData(approvedReportsQuery(embarkId));
    return { embarkId };
  },
});

// TODO:
// Loading Component
// Use shadcn sonner/toast
// Error stuff
// 404 stuff
// Search component / index search page

function PageRaiderProfile() {
  const { embarkId } = Route.useLoaderData();

  return (
    <main className="flex flex-col max-w-3xl w-full mx-auto min-h-dvh px-8 raider-page">
      <Suspense
        fallback={
          <div className="grow grid place-items-center">
            <LoaderBlocks />
          </div>
        }>
        <ReportData embarkId={embarkId} />
      </Suspense>
    </main>
  );
}

function ReportData({ embarkId }: { embarkId: string }) {
  const { data: approvedReports } = useSuspenseQuery(approvedReportsQuery(embarkId));

  if (approvedReports.length === 0) {
    return <NoReports embarkId={embarkId} />;
  }

  return (
    <>
      <h2>Reports: {approvedReports.length}</h2>
      {approvedReports.length > 0 && (
        <ul>
          {approvedReports.map((report) => (
            <li key={report.id}>
              <h3>{report.reason}</h3>
              <p>{report.videoUrl}</p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
