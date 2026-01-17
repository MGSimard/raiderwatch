import { createServerFn } from "@tanstack/react-start";
// import { notFound } from "@tanstack/react-router"; // Available for 404 handling
import { and, eq } from "drizzle-orm";
import { z } from "zod";
import { db } from "./db";
import { raiders, reports } from "./db/schema";
import { REPORT_REASON_ENUMS } from "@/_lib/enums";

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
        // Check if raider already exists
        const [existingRaider] = await tx
          .select({ id: raiders.id })
          .from(raiders)
          .where(eq(raiders.embarkId, embarkId));

        // If raider doesn't exist create it
        // If created by someone else during this, skip conflict and add report (.onConflictDoNothing())
        if (!existingRaider) await tx.insert(raiders).values({ embarkId }).onConflictDoNothing();

        // Create report tied to matching raider
        await tx.insert(reports).values({ embarkId, reason, description, videoUrl });

      });
    } catch (err: unknown) {
      const error = err instanceof Error ? err : new Error("Unknown error");
      console.error("Error filing report:", error);
      throw new Error(`Failed to file report for Embark ID: ${embarkId}`);
    }
  });
