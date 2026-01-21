import { createServerFn } from "@tanstack/react-start";
// import { notFound } from "@tanstack/react-router"; // Available for 404 handling
import { and, eq, gte, sql } from "drizzle-orm";
import { z } from "zod";
import { db } from "./db";
import { raiders, reports } from "./db/schema";
import { REPORT_REASON_ENUMS } from "@/_lib/enums";
import { authMiddleware } from "@/_auth/authMiddleware";
import { auth } from "@/_auth";

// https://tanstack.com/start/latest/docs/framework/react/guide/server-functions
// https://www.better-auth.com/docs/plugins/admin#access-control-usage

export const getRaiderApprovedReports = createServerFn()
  .inputValidator(z.object({ embarkId: z.string() }))
  .handler(async ({ data }) => {
    const { embarkId } = data;

    try {
      const results = await db
        .select({
          id: reports.id,
          reason: reports.reason,
          videoUrl: reports.videoUrl,
          videoStoragePath: reports.videoStoragePath,
          reviewedAt: reports.reviewedAt,
        })
        .from(reports)
        .innerJoin(raiders, eq(reports.embarkId, raiders.embarkId))
        .where(and(eq(raiders.embarkId, embarkId), eq(reports.status, "approved")));

      return results;
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
export const fileReport = createServerFn()
  .inputValidator(reportSchema)
  .handler(async ({ data }) => {
    const { embarkId, reason, description, videoUrl } = data;

    try {
      await db.transaction(async (tx) => {
        // If raider doesn't exist, create it
        await tx.insert(raiders).values({ embarkId }).onConflictDoNothing();
        // Add report
        await tx.insert(reports).values({ embarkId, reason, description, videoUrl });
      });
    } catch (err: unknown) {
      const error = err instanceof Error ? err : new Error("Unknown error");
      console.error("Error filing report:", error);
      throw new Error(`Failed to file report for Embark ID: ${embarkId}`);
    }
  });

export const getCurrentUser = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  // eslint-disable-next-line @typescript-eslint/require-await
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
      const [result] = await db
        .select({
          totalRaiders: sql<number>`(select cast(count(*) as int) from ${raiders})`,
          approved: sql<number>`cast(count(case when ${reports.status} = 'approved' then 1 end) as int)`,
          rejected: sql<number>`cast(count(case when ${reports.status} = 'rejected' then 1 end) as int)`,
          pending: sql<number>`cast(count(case when ${reports.status} = 'pending' then 1 end) as int)`,
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
      const ninetyDaysAgo = new Date();
      ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);

      const [[totals], daily] = await Promise.all([
        // Total reports count (all-time)
        db
          .select({
            totalReports: sql<number>`cast(count(*) as int)`,
          })
          .from(reports),

        // Daily reports for last 90 days
        db
          .select({
            date: sql<string>`to_char(${reports.createdAt}, 'YYYY-MM-DD')`,
            reports: sql<number>`cast(count(*) as int)`,
          })
          .from(reports)
          .where(gte(reports.createdAt, ninetyDaysAgo))
          .groupBy(sql`to_char(${reports.createdAt}, 'YYYY-MM-DD')`)
          .orderBy(sql`to_char(${reports.createdAt}, 'YYYY-MM-DD')`),
      ]);

      return {
        totalReports: totals?.totalReports ?? 0,
        daily,
      };
    } catch (err: unknown) {
      const error = err instanceof Error ? err : new Error("Unknown error");
      console.error("Error fetching reports chart data:", error);
      throw new Error("Failed to fetch reports chart data.");
    }
  });
