import { authClient } from "@/_auth/auth-client";

export function SignUp() {
  const handleSignUp = async () => {
    await authClient.signUp.email({
      name: "Jeff", // required
      email: "mgsimard.dev@gmail.com", // required
      password: "password1234", // required
    });
  };

  return (
    <button type="button" onClick={handleSignUp}>
      Sign Up
    </button>
  );
}
