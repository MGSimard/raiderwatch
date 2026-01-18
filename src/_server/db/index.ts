import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { relations } from "./schema";

// TODO: T3env
const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle({ client: sql, relations});
