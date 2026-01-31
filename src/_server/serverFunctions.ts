import { createServerFn } from "@tanstack/react-start";
import { db } from "./db";
import { reports, users } from "./db/schema";
import { and, desc, eq, gte, inArray, sql } from "drizzle-orm";
import { auth } from "@/_auth";
import { authMiddleware } from "@/_auth/authMiddleware";
import { fileReportSchema, searchFilterSchema, updateReportSchema } from "@/_lib/schemas";
import { z } from "zod";
// import { notFound } from "@tanstack/react-router"; // Available for 404 handling

// https://tanstack.com/start/latest/docs/framework/react/guide/server-functions
// https://www.better-auth.com/docs/plugins/admin#access-control-usage

export const getRaiderApprovedReports = createServerFn({ method: "GET" })
  .inputValidator(z.object({ embarkId: z.string() }))
  .handler(async ({ data }) => {
    const { embarkId } = data;
    const normalizedEmbarkId = embarkId.toLowerCase();

    try {
      return await db
        .select({
          id: reports.id,
          reason: reports.reason,
          canonicalVideoUrl: reports.canonicalVideoUrl,
          createdAt: reports.createdAt,
        })
        .from(reports)
        .where(and(eq(reports.embarkId, normalizedEmbarkId), eq(reports.status, "approved")))
        .orderBy(desc(reports.createdAt));
    } catch (err: unknown) {
      console.error("Error fetching raider reports:", err instanceof Error ? err : "Unknown error");
      throw new Error(`Failed to fetch reports for Embark ID: ${embarkId}`);
    }
  });

// TODO: In-depth validation rules + error messages

export const fileReport = createServerFn({ method: "POST" })
  .inputValidator(fileReportSchema)
  .handler(async ({ data }) => {
    const { embarkId, reason, description, videoUrl } = data;
    const normalizedEmbarkId = embarkId.toLowerCase();

    try {
      await db.insert(reports).values({ embarkId: normalizedEmbarkId, reason, description, videoUrl });
    } catch (err: unknown) {
      console.error("Error filing report:", err instanceof Error ? err : "Unknown error");
      throw new Error(`Failed to file report for Embark ID: ${embarkId}`);
    }
  });

export const getCurrentUser = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const user = context.session?.user;
    if (!user) return null;

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      image: user.image,
      role: user.role,
    };
  });

export const isAssessor = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const user = context.session?.user;
    if (!user) return false;
    const { success: hasPermission } = await auth.api.userHasPermission({
      body: { userId: user.id, permissions: { report: ["assess"] } },
    });

    return hasPermission;
  });

export const getUserWithPermissions = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const user = context.session?.user;
    if (!user) return null;

    const { success: hasPermission } = await auth.api.userHasPermission({
      body: { userId: user.id, permissions: { report: ["assess"] } },
    });

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        image: user.image,
        role: user.role,
      },
      hasAssessorPermission: hasPermission,
    };
  });

export const getDashboardOverview = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const user = context.session?.user;
    if (!user) throw new Error("Unauthenticated");

    const { success: hasPermission } = await auth.api.userHasPermission({
      body: { userId: user.id, permissions: { report: ["assess"] } },
    });
    if (!hasPermission) throw new Error("Unauthorized");

    try {
      const weekStartUtc = sql.raw("date_trunc('week', now() at time zone 'utc')");
      const weekEndUtc = sql.raw("(date_trunc('week', now() at time zone 'utc') + interval '7 days')");

      const [result] = await db
        .select({
          totalRaiders: sql<number>`(select cast(count(distinct ${reports.embarkId}) as int) from ${reports})`,
          approved: sql<number>`cast(count(case when ${reports.status} = 'approved' then 1 end) as int)`,
          rejected: sql<number>`cast(count(case when ${reports.status} = 'rejected' then 1 end) as int)`,
          pending: sql<number>`cast(count(case when ${reports.status} = 'pending' then 1 end) as int)`,
          weeklyRaiders: sql<number>`(select cast(count(*) as int) from (select ${reports.embarkId} from ${reports} group by ${reports.embarkId} having min(${reports.createdAt}) >= ${weekStartUtc} and min(${reports.createdAt}) < ${weekEndUtc}) as weekly_raiders)`,
          weeklyApproved: sql<number>`cast(count(case when ${reports.status} = 'approved' and ${reports.reviewedAt} >= ${weekStartUtc} and ${reports.reviewedAt} < ${weekEndUtc} then 1 end) as int)`,
          weeklyRejected: sql<number>`cast(count(case when ${reports.status} = 'rejected' and ${reports.reviewedAt} >= ${weekStartUtc} and ${reports.reviewedAt} < ${weekEndUtc} then 1 end) as int)`,
          weeklyPending: sql<number>`cast(count(case when ${reports.status} = 'pending' and ${reports.createdAt} >= ${weekStartUtc} and ${reports.createdAt} < ${weekEndUtc} then 1 end) as int)`,
        })
        .from(reports);

      return result;
    } catch (err: unknown) {
      console.error("Error fetching admin stats:", err instanceof Error ? err : "Unknown error");
      throw new Error("Failed to fetch admin statistics.");
    }
  });

export const getReportsChartData = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const user = context.session?.user;
    if (!user) throw new Error("Unauthenticated");

    const { success: hasPermission } = await auth.api.userHasPermission({
      body: { userId: user.id, permissions: { report: ["assess"] } },
    });
    if (!hasPermission) throw new Error("Unauthorized");

    try {
      const asOfUtc = new Date();
      asOfUtc.setUTCHours(0, 0, 0, 0);

      const ninetyDaysAgo = new Date(asOfUtc);
      ninetyDaysAgo.setUTCDate(ninetyDaysAgo.getUTCDate() - 90);

      const [[totals], daily] = await Promise.all([
        db.select({ totalReports: sql<number>`cast(count(*) as int)` }).from(reports),

        db
          .select({
            date: sql<string>`to_char(${reports.createdAt} AT TIME ZONE 'UTC', 'YYYY-MM-DD')`,
            reports: sql<number>`cast(count(*) as int)`,
          })
          .from(reports)
          .where(gte(reports.createdAt, ninetyDaysAgo))
          .groupBy(sql`to_char(${reports.createdAt} AT TIME ZONE 'UTC', 'YYYY-MM-DD')`)
          .orderBy(sql`to_char(${reports.createdAt} AT TIME ZONE 'UTC', 'YYYY-MM-DD')`),
      ]);

      return {
        totalReports: totals?.totalReports ?? 0,
        daily,
        asOfUtc: asOfUtc.toISOString(),
      };
    } catch (err: unknown) {
      console.error("Error fetching reports chart data:", err instanceof Error ? err : "Unknown error");
      throw new Error("Failed to fetch reports chart data.");
    }
  });

export const getReportsTableData = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .inputValidator(searchFilterSchema)
  .handler(async ({ context, data }) => {
    const user = context.session?.user;
    if (!user) throw new Error("Unauthenticated");

    const { success: hasPermission } = await auth.api.userHasPermission({
      body: { userId: user.id, permissions: { report: ["assess"] } },
    });
    if (!hasPermission) throw new Error("Unauthorized");

    const { searchQuery, statuses, page, pageSize } = data;
    const trimmed = searchQuery.trim();

    const whereClause = !trimmed
      ? undefined
      : trimmed.includes("#")
        ? eq(reports.embarkId, trimmed)
        : /^\d+$/.test(trimmed)
          ? eq(reports.id, Number(trimmed))
          : eq(reports.embarkId, trimmed);

    const statusClause = statuses.length > 0 ? inArray(reports.status, statuses) : undefined;

    try {
      const [reportResults, [countResult]] = await Promise.all([
        db
          .select({
            id: reports.id,
            embarkId: reports.embarkId,
            reason: reports.reason,
            description: reports.description,
            videoUrl: reports.videoUrl,
            canonicalVideoUrl: reports.canonicalVideoUrl,
            status: reports.status,
            reviewedAt: reports.reviewedAt,
            reviewedBy: reports.reviewedBy,
            reviewerComment: reports.reviewerComment,
            createdAt: reports.createdAt,
            updatedAt: reports.updatedAt,
            reviewer: {
              id: users.id,
              name: users.name,
            },
          })
          .from(reports)
          .leftJoin(users, eq(reports.reviewedBy, users.id))
          .where(and(whereClause, statusClause))
          .orderBy(desc(reports.createdAt))
          .limit(pageSize)
          .offset((page - 1) * pageSize),

        db
          .select({ count: sql<number>`cast(count(*) as int)` })
          .from(reports)
          .where(and(whereClause, statusClause)),
      ]);

      return {
        reports: reportResults,
        totalCount: countResult?.count ?? 0,
      };
    } catch (err: unknown) {
      console.error("Error fetching reports table data:", err instanceof Error ? err : "Unknown error");
      throw new Error("Failed to fetch reports.");
    }
  });

// TODO: Consider just removing try/catches and letting original errors bubble up to useQuery

// UPDATE REPORT (Assessment)
export const updateReport = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .inputValidator(updateReportSchema)
  .handler(async ({ context, data }) => {
    const user = context.session?.user;
    if (!user) throw new Error("Unauthenticated");
    const { success: hasPermission } = await auth.api.userHasPermission({
      body: { userId: user.id, permissions: { report: ["assess"] } },
    });
    if (!hasPermission) throw new Error("Unauthorized");

    const { reportId, status, reason, canonicalVideoUrl, reviewerComment } = data;

    try {
      const updated = await db
        .update(reports)
        .set({
          status,
          reason,
          canonicalVideoUrl: canonicalVideoUrl || null, // Catch empty strings with || and submit as null
          reviewerComment: reviewerComment || null, // Catch empty strings with || and submit as null
          reviewedBy: user.id,
          reviewedAt: new Date(),
        })
        .where(eq(reports.id, reportId))
        .returning({ id: reports.id });

      if (updated.length === 0) throw new Error(`Report with ID ${reportId} not found.`);
    } catch (err: unknown) {
      console.error("Error updating report:", err instanceof Error ? err : "Unknown error");
      throw new Error("Failed to update report.");
    }
  });
