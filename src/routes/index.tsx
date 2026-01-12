import { createFileRoute, useLoaderData } from "@tanstack/react-router";
import { getUsers } from "@/_server/serverFunctions";

export const Route = createFileRoute("/")({
  component: PageHome,
  loader: async () => {
    return await getUsers();
  },
});

function PageHome() {
  const users = useLoaderData({ from: "/" });

  return (
    <div>
      <h1>Hello World</h1>
      <pre>{JSON.stringify(users, null, 2)}</pre>
    </div>
  );
}
