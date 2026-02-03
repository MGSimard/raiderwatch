import { createAuthClient } from "better-auth/react";
import { adminClient } from "better-auth/client/plugins";
import { ac, admin, moderator, user } from "./permission";
import { VITE_SITE_URL } from "@/_lib/consts";

export const authClient = createAuthClient({
  /** The base URL of the server (optional if you're using the same domain) */
  // TODO: T3env
  baseURL: VITE_SITE_URL,
  plugins: [
    // https://www.better-auth.com/docs/plugins/admin
    adminClient({
      ac,
      roles: {
        admin,
        moderator,
        user,
      },
    }),
  ],
});
