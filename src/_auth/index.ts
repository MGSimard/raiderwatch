import { betterAuth } from "better-auth";
import { drizzleAdapter } from "@better-auth/drizzle-adapter";
import { tanstackStartCookies } from "better-auth/tanstack-start";
import { admin as adminPlugin } from "better-auth/plugins";
import { ac, admin, moderator, user } from "./permission";
import { db } from "@/_server/db";
import * as schema from "@/_server/db/schema";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema,
    transaction: true,
    usePlural: true,
  }),
  emailAndPassword: {
    enabled: true,
    disableSignUp: true,
  },
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60, // 5 minutes
    },
  },
  plugins: [
    tanstackStartCookies(),
    // https://www.better-auth.com/docs/plugins/admin
    adminPlugin({
      ac,
      roles: {
        admin,
        moderator,
        user,
      },
    }),
  ],
});
