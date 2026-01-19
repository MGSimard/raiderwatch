import { Link } from "@tanstack/react-router";
import { Button } from "@/_components/ui/button";

export function GlobalError({ error }: { error: Error }) {
  console.error(error);

  return (
    <main className="relative grow grid place-items-center text-center min-h-dvh">
      <div>
        <h1 className="text-2xl font-bold">500 - Internal Server Error</h1>
        <p className="text-sm text-muted-foreground">An error occurred while processing your request.</p>
        <Button
          variant="outline"
          className="mx-auto mt-4"
          nativeButton={false}
          render={<Link to="/">RETURN HOME</Link>}></Button>
      </div>
    </main>
  );
}