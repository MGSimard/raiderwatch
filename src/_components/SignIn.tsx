import { authClient } from "@/_auth/auth-client";

export function SignIn() {
  const handleSignIn = async () => {
    try {
      const test = await authClient.signIn.email({
        email: "mgsimard.dev@gmail.com", // required
        password: "password1234", // required
      });
      console.log(test);
      console.log("Signed In");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <button type="button" onClick={handleSignIn}>
      Sign In
    </button>
  );
}
