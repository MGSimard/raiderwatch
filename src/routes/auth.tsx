import { createFileRoute, redirect } from "@tanstack/react-router";
import { SignInForm } from "@/_components/SignInForm";
import { getCurrentUser } from "@/_server/serverFunctions";

export const Route = createFileRoute("/auth")({
  component: RouteComponent,
  beforeLoad: async () => {
    const user = await getCurrentUser();
    if (user) {
      throw redirect({ to: "/dashboard", replace: true });
    }
  },
});

function RouteComponent() {
  return (
    <main className="relative p-8 grow grid place-items-center text-center min-h-dvh">
      <SignInForm />
    </main>
  );
}
