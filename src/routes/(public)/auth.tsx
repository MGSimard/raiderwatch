import { createFileRoute, redirect } from "@tanstack/react-router";
import { SignInForm } from "@/_components/SignInForm";
import { getCurrentUser } from "@/_server/server-functions";

export const Route = createFileRoute("/(public)/auth")({
  component: RouteComponent,
  beforeLoad: async () => {
    const user = await getCurrentUser();
    if (user) {
      throw redirect({ to: "/dashboard", replace: true });
    }
  },
  headers: () => ({
    // Auth page should not be cached (user-specific redirects)
    "Cache-Control": "private, no-cache, no-store, must-revalidate",
  }),
});

function RouteComponent() {
  return (
    <main className="relative grid min-h-dvh grow place-items-center p-8 text-center">
      <SignInForm />
    </main>
  );
}
