import { createServerFn } from "@tanstack/react-start";
// import { notFound } from "@tanstack/react-router"; // Available for 404 handling
import { and, eq } from "drizzle-orm";
import { z } from "zod";
import { db } from "./db";
import { raiders, reports } from "./db/schema";

// https://tanstack.com/start/latest/docs/framework/react/guide/server-functions

// https://www.better-auth.com/docs/plugins/admin#access-control-usage

// Example of requiring authentication
// export const requireAuth = createServerFn().handler(async () => {
//   const user = await getCurrentUser()
//   if (!user) {
//     throw redirect({ to: '/login' })
//   }
//   return user
// })

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
        .innerJoin(raiders, eq(reports.raiderId, raiders.id))
        .where(and(eq(raiders.embarkId, embarkId), eq(reports.status, "approved")));

      return results;
    } catch (err: unknown) {
      const error = err instanceof Error ? err : new Error("Unknown error");
      console.error("Error fetching raider reports:", error);
      throw new Error(`Failed to fetch reports for Embark ID: ${embarkId}`);
    }
  });
