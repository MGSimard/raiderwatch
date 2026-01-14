import { createFileRoute, useLoaderData } from "@tanstack/react-router";
import { getRaiderApprovedReports } from "@/_server/serverFunctions";

export const Route = createFileRoute("/r/$embarkId")({
  component: PageRaiderProfile,
  loader: async ({ params }) => {
    const reports = await getRaiderApprovedReports({ data: { embarkId: params.embarkId } });
    return { reports };
  },
});

// Display Raider Profile Page
// Only matches if there are current approved reports for the matching Embark ID.
// (No API, so we can't create regular profiles)

// If has approved reports, show profile page
// If not, show "Embark#ID has no active reports"

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
