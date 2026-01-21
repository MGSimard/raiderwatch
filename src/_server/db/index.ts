import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";
import { relations } from "./relations";

// TODO: T3env
export const client = postgres(process.env.DATABASE_URL!, { prepare: false });
export const db = drizzle({ client, schema, relations });
