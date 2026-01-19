import { createFileRoute, redirect } from "@tanstack/react-router";
import { SignInForm } from "@/_components/SignInForm";
import { getCurrentUser } from "@/_server/serverFunctions";


export const Route = createFileRoute("/authorization")({
  component: RouteComponent,
  beforeLoad: async () => {
    const user = await getCurrentUser();
    if (user) {
      // eslint-disable-next-line @typescript-eslint/only-throw-error
      throw redirect({ to: "/dashboard", replace: true });
    }
  },
});

function RouteComponent() {
  return (
    <main className="relative grow grid place-items-center text-center min-h-dvh">
      <SignInForm />
    </main>
  );
}
