import { Link } from "@tanstack/react-router";
import { Button } from "@/_components/ui/button";

export function NotFound() {
  return (
    <main className="relative grow grid place-items-center text-center min-h-dvh">
      <div>
        <h1 className="text-2xl font-bold">404 - Not Found</h1>
        <p className="text-sm text-muted-foreground">The page you are looking for does not exist.</p>
        <Button
          variant="outline"
          className="mx-auto mt-4"
          nativeButton={false}
          render={<Link to="/">RETURN HOME</Link>}></Button>
      </div>
    </main>
  );
}
