import { authClient } from "@/_auth/auth-client";

export function SignIn() {
  const handleSignIn = async () => {
    await authClient.signIn.email({
      email: "mgsimard.dev@gmail.com", // required
      password: "password1234", // required
      rememberMe: true,
      callbackURL: "http://localhost:3000/dashboard",
    });
  };

  return (
    <button type="button" onClick={handleSignIn}>
      Sign In
    </button>
  );
}
