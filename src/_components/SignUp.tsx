import { authClient } from "@/_auth/auth-client";

export function SignUp() {
  const handleSignUp = async () => {
    try {
      const test = await authClient.signUp.email({
        name: "Jeff", // required
        email: "mgsimard.dev@gmail.com", // required
        password: "password1234", // required
      });
      console.log(test);
      console.log("Signed Up");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <button type="button" onClick={handleSignUp}>
      Sign Up
    </button>
  );
}
