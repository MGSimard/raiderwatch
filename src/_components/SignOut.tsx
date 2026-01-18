import { authClient } from "@/_auth/auth-client";

export function SignOut() {
  const handleSignOut = async () => {
    try {
      const test = await authClient.signOut();
      console.log(test);
      console.log("Signed Out");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <button type="button" onClick={handleSignOut}>
      Sign Out
    </button>
  );
}
