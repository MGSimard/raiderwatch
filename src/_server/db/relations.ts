import { defineRelations } from "drizzle-orm";
import * as schema from "./schema";

export const relations = defineRelations(schema, (r) => ({
  users: {
    sessions: r.many.sessions({
      from: r.users.id,
      to: r.sessions.userId,
    }),
    accounts: r.many.accounts({
      from: r.users.id,
      to: r.accounts.userId,
    }),
    reviewedReports: r.many.reports({
      from: r.users.id,
      to: r.reports.reviewedBy,
    }),
  },
  sessions: {
    user: r.one.users({
      from: r.sessions.userId,
      to: r.users.id,
    }),
  },
  account: {
    user: r.one.users({
      from: r.accounts.userId,
      to: r.users.id,
    }),
  },
  raiders: {
    reports: r.many.reports({
      from: r.raiders.embarkId,
      to: r.reports.embarkId,
    }),
  },
  reports: {
    raider: r.one.raiders({
      from: r.reports.embarkId,
      to: r.raiders.embarkId,
    }),
    reviewer: r.one.users({
      from: r.reports.reviewedBy,
      to: r.users.id,
    }),
  },
}));
