import { drizzle } from "drizzle-orm/neon-http";
import { relations } from "./schema";

// TODO: T3env
export const db = drizzle(process.env.DATABASE_URL!, { relations });
