import "dotenv/config";
import { defineConfig } from "drizzle-kit";

// TODO: T3ENV

export default defineConfig({
  out: "./drizzle",
  schema: "./src/_server/db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
