import { Link, createFileRoute } from "@tanstack/react-router";
import { Button } from "@/_components/ui/button";

export const Route = createFileRoute("/unauthorized")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <main className="relative grow grid place-items-center text-center min-h-dvh">
      <div className="grid gap-4">
        <h1 className="text-2xl font-bold">401 - UNAUTHORIZED</h1>
        <p className="text-sm text-muted-foreground">You are not authorized to access this page.</p>
        <Button
          variant="outline"
          className="mx-auto"
          nativeButton={false}
          render={<Link to="/">RETURN HOME</Link>}></Button>
      </div>
    </main>
  );
}
