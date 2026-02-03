import { betterAuth } from "better-auth";
import { drizzleAdapter } from "@better-auth/drizzle-adapter";
import { db } from "@/_server/db";
import { redis } from "@/_server/redis";
import { tanstackStartCookies } from "better-auth/tanstack-start";
import { admin as adminPlugin } from "better-auth/plugins";
import { ac, admin, moderator, user } from "./permission";
import * as schema from "@/_server/db/schema";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema,
    transaction: true,
    usePlural: true,
  }),
  secondaryStorage: {
    get: async (key) => {
      return await redis.get(key);
    },
    set: async (key, value, ttl) => {
      if (ttl) await redis.set(key, value, { ex: ttl });
      else await redis.set(key, value);
    },
    delete: async (key) => {
      await redis.del(key);
    },
  },
  rateLimit: {
    enabled: true,
    window: 120, // Default
    max: 5, // Default
    storage: "secondary-storage", // Upstash Redis
    modelName: "better-auth-rate-limit", // Default
  },
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
