import { createServerFn } from "@tanstack/react-start";
import { db } from "./db";
import { reports } from "./db/schema";
import { and, desc, eq, gte, sql } from "drizzle-orm";
import { auth } from "@/_auth";
import { authMiddleware } from "@/_auth/authMiddleware";
import { REPORT_REASON_ENUMS } from "@/_lib/enums";
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
      const results = await db
        .select({
          id: reports.id,
          reason: reports.reason,
          videoUrl: reports.videoUrl,
          videoStoragePath: reports.videoStoragePath,
          createdAt: reports.createdAt,
        })
        .from(reports)
        .where(and(eq(reports.embarkId, normalizedEmbarkId), eq(reports.status, "approved")))
        .orderBy(desc(reports.createdAt));

      return results.map((report) => ({
        ...report,
        createdAt: report.createdAt.toISOString(),
      }));
    } catch (err: unknown) {
      const error = err instanceof Error ? err : new Error("Unknown error");
      console.error("Error fetching raider reports:", error);
      throw new Error(`Failed to fetch reports for Embark ID: ${embarkId}`);
    }
  });

// TODO: In-depth validation rules + error messages
const reportSchema = z.object({
  embarkId: z.string(),
  reason: z.enum(REPORT_REASON_ENUMS),
  description: z.string(),
  videoUrl: z.url(),
});
export const fileReport = createServerFn({ method: "POST" })
  .inputValidator(reportSchema)
  .handler(async ({ data }) => {
    const { embarkId, reason, description, videoUrl } = data;
    const normalizedEmbarkId = embarkId.toLowerCase();

    try {
      await db.insert(reports).values({ embarkId: normalizedEmbarkId, reason, description, videoUrl });
    } catch (err: unknown) {
      const error = err instanceof Error ? err : new Error("Unknown error");
      console.error("Error filing report:", error);
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
      body: {
        userId: user.id,
        permissions: {
          report: ["assess"],
        },
      },
    });
    return hasPermission;
  });

export const getUserWithPermissions = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const user = context.session?.user;
    if (!user) return null;

    const { success: hasPermission } = await auth.api.userHasPermission({
      body: {
        userId: user.id,
        permissions: {
          report: ["assess"],
        },
      },
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
      body: {
        userId: user.id,
        permissions: {
          report: ["assess"],
        },
      },
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
      const error = err instanceof Error ? err : new Error("Unknown error");
      console.error("Error fetching admin stats:", error);
      throw new Error("Failed to fetch admin statistics.");
    }
  });

export const getReportsChartData = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const user = context.session?.user;
    if (!user) throw new Error("Unauthenticated");

    const { success: hasPermission } = await auth.api.userHasPermission({
      body: {
        userId: user.id,
        permissions: {
          report: ["assess"],
        },
      },
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
      const error = err instanceof Error ? err : new Error("Unknown error");
      console.error("Error fetching reports chart data:", error);
      throw new Error("Failed to fetch reports chart data.");
    }
  });

export const getReportsTableData = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const user = context.session?.user;
    if (!user) throw new Error("Unauthenticated");

    const { success: hasPermission } = await auth.api.userHasPermission({
      body: {
        userId: user.id,
        permissions: {
          report: ["assess"],
        },
      },
    });
    if (!hasPermission) throw new Error("Unauthorized");

    try {
      return await db.select().from(reports).orderBy(desc(reports.createdAt));
    } catch (err: unknown) {
      const error = err instanceof Error ? err : new Error("Unknown error");
      console.error("Error fetching reports table data:", error);
      throw new Error("Failed to fetch reports.");
    }
  });
