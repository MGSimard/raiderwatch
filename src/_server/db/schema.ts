import { defineRelations, sql } from "drizzle-orm";
import { boolean, index, pgEnum, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { REPORT_REASON_ENUMS, REPORT_STATUS_ENUMS } from "@/_lib/enums";

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").default(false).notNull(),
  image: text("image"),
  role: text("role"),
  banned: boolean("banned").default(false),
  banReason: text("ban_reason"),
  banExpires: timestamp("ban_expires"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const session = pgTable(
  "session",
  {
    id: text("id").primaryKey(),
    expiresAt: timestamp("expires_at").notNull(),
    token: text("token").notNull().unique(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    ipAddress: text("ip_address"),
    userAgent: text("user_agent"),
    impersonatedBy: text("impersonated_by"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [index("session_userId_idx").on(table.userId)]
);

export const account = pgTable(
  "account",
  {
    id: text("id").primaryKey(),
    accountId: text("account_id").notNull(),
    providerId: text("provider_id").notNull(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    accessToken: text("access_token"),
    refreshToken: text("refresh_token"),
    idToken: text("id_token"),
    accessTokenExpiresAt: timestamp("access_token_expires_at"),
    refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
    scope: text("scope"),
    password: text("password"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [index("account_userId_idx").on(table.userId)]
);

export const verification = pgTable(
  "verification",
  {
    id: text("id").primaryKey(),
    identifier: text("identifier").notNull(),
    value: text("value").notNull(),
    expiresAt: timestamp("expires_at").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [index("verification_identifier_idx").on(table.identifier)]
);

export const raiders = pgTable(
  "raiders",
  {
    id: text("id").primaryKey(),
    embarkId: text("embark_id").notNull().unique(),
    // SteamID is static unlike Embark ID which can be changed. This means we need to allow the same Steam ID to be used by multiple Embark IDs.
    steamId: text("steam_id"), // Optional
    // Later on if Steam ID is on multiple profiles we'll add a little (!) or triangle icon that shows the links
    // Won't bother including other platform identifiers since they aren't unique or static
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [
    // Embark ID index is implicit since it's unique
    index("raiders_steam_id_idx")
      .on(table.steamId)
      .where(sql`${table.steamId} IS NOT NULL`),
  ]
);

export const reportReasonEnum = pgEnum("report_reason", REPORT_REASON_ENUMS);
export const reportStatusEnum = pgEnum("report_status", REPORT_STATUS_ENUMS);

export const reports = pgTable(
  "reports",
  {
    id: text("id").primaryKey(),
    raiderId: text("raider_id")
      .notNull()
      .references(() => raiders.id, { onDelete: "cascade" }),
    steamId: text("steam_id"), // Snapshot of steamId at report time (no FK since raiders.steamId isn't unique)
    reason: reportReasonEnum("reason").notNull(),
    description: text("description").notNull(),
    videoUrl: text("video_url").notNull(),
    videoStoragePath: text("video_storage_path"),
    status: reportStatusEnum("status").notNull().default("pending"),
    reviewedAt: timestamp("reviewed_at"),
    reviewedBy: text("reviewed_by").references(() => user.id, { onDelete: "set null" }),
    reviewerComment: text("reviewer_comment").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [index("reports_raider_id_idx").on(table.raiderId), index("reports_status_idx").on(table.status)]
);

export const relations = defineRelations({ user, session, account, verification, raiders, reports }, (r) => ({
  user: {
    sessions: r.many.session({
      from: r.user.id,
      to: r.session.userId,
    }),
    accounts: r.many.account({
      from: r.user.id,
      to: r.account.userId,
    }),
    reviewedReports: r.many.reports({
      from: r.user.id,
      to: r.reports.reviewedBy,
    }),
  },
  session: {
    user: r.one.user({
      from: r.session.userId,
      to: r.user.id,
    }),
  },
  account: {
    user: r.one.user({
      from: r.account.userId,
      to: r.user.id,
    }),
  },
  raiders: {
    reports: r.many.reports({
      from: r.raiders.id,
      to: r.reports.raiderId,
    }),
  },
  reports: {
    raider: r.one.raiders({
      from: r.reports.raiderId,
      to: r.raiders.id,
    }),
    reviewer: r.one.user({
      from: r.reports.reviewedBy,
      to: r.user.id,
    }),
  },
}));
