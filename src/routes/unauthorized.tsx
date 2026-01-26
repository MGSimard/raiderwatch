import { Link, createFileRoute } from "@tanstack/react-router";
import { Button } from "@/_components/ui/button";

export const Route = createFileRoute("/unauthorized")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <main className="relative grid min-h-dvh grow place-items-center p-8 text-center">
      <div>
        <h1 className="text-2xl font-bold">401 - UNAUTHORIZED</h1>
        <p className="text-muted-foreground text-sm">You are not authorized to access this page.</p>
        <Button
          variant="outline"
          className="mx-auto mt-4"
          nativeButton={false}
          render={<Link to="/">RETURN HOME</Link>}></Button>
      </div>
    </main>
  );
}
