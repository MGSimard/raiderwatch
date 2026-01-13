import { createFileRoute } from "@tanstack/react-router";
import { SignIn } from "@/_components/SignIn";
import { SignUp } from "@/_components/SignUp";
import { SignOut } from "@/_components/SignOut";

export const Route = createFileRoute("/")({
  component: PageHome,
});

function PageHome() {
  return (
    <div>
      <h1>Hello World</h1>
      <SignIn />
      <SignUp />
      <SignOut />
    </div>
  );
}
