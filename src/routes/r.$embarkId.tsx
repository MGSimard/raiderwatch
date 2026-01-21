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
    const embarkId = params.embarkId.replace("~", "#");
    void context.queryClient.ensureQueryData(approvedReportsQuery(embarkId));
    return { embarkId };
  },
});

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

  return <HasReports embarkId={embarkId} approvedReports={approvedReports} />;
}
