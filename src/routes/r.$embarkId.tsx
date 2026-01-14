import { createFileRoute, useLoaderData } from "@tanstack/react-router";
import { getRaiderApprovedReports } from "@/_server/serverFunctions";
import { normalizeEmbarkId } from "@/_lib/utils";

export const Route = createFileRoute("/r/$embarkId")({
  component: PageRaiderProfile,
  loader: async ({ params: { embarkId } }) => {
    const normalizedEmbarkId = normalizeEmbarkId(embarkId);
    console.log("normalizedEmbarkId", normalizedEmbarkId);
    const reports = await getRaiderApprovedReports({ data: { embarkId: normalizedEmbarkId } });
    return { reports };
  },
});

// Display Raider Profile Page
// Only matches if there are current approved reports for the matching Embark ID.
// (No API, so we can't create regular profiles)

// If has approved reports, show profile page
// If not, show "Embark#ID has no active reports"

// TODO Potentially analyze username layout to tell users how to search from URL (- instead of #)

function PageRaiderProfile() {
  const { reports } = useLoaderData({ from: "/r/$embarkId" });
  const { embarkId } = Route.useParams();

  return (
    <div>
      <h1>Raider Profile: {embarkId}</h1>
      <p>Reports: {reports.length}</p>
    </div>
  );
}
