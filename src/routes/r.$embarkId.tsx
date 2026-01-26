import { Suspense } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { approvedReportsQuery } from "@/_lib/queries";
import { LoaderBlocks } from "@/_components/LoaderBlocks";
import { NoReports } from "@/_components/NoReports";
import { HasReports } from "@/_components/HasReports";

export const Route = createFileRoute("/r/$embarkId")({
  component: PageRaiderProfile,
  loader: ({ context, params }) => {
    const embarkId = params.embarkId.replace("~", "#").toLowerCase();
    void context.queryClient.ensureQueryData(approvedReportsQuery(embarkId));
    return { embarkId };
  },
});

function PageRaiderProfile() {
  const { embarkId } = Route.useLoaderData();

  return (
    <main className="raider-page mx-auto flex min-h-dvh w-full max-w-3xl flex-col p-8">
      <Suspense
        fallback={
          <div className="grid grow place-items-center">
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

  return <HasReports embarkId={embarkId} approvedReports={approvedReports} />;
}
