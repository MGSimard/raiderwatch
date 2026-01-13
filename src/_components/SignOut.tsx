import { authClient } from "@/_auth/auth-client";

export function SignOut() {
  const handleSignOut = async () => {
    await authClient.signOut();
  };

  return (
    <button type="button" onClick={handleSignOut}>
      Sign Out
    </button>
  );
}
