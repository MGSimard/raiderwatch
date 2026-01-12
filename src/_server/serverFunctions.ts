import { createServerFn } from "@tanstack/react-start";

import { db } from "./db";
import { usersTable } from "./db/schema";

export const getUsers = createServerFn().handler(async () => {
  return await db.select().from(usersTable);
});
