import { createServerFn } from "@tanstack/react-start";
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

// Example Not Found
// export const getPost = createServerFn()
//   .inputValidator((data: { id: string }) => data)
//   .handler(async ({ data }) => {
//     const post = await db.findPost(data.id)
//     if (!post) {
//       throw notFound()
//     }
//     return post
//   })

export const getRaiderApprovedReports = createServerFn()
  .inputValidator(z.object({ embarkId: z.string() }))
  .handler(async ({ data }) => {
    const { embarkId } = data;

    return await db
      .select({
        reason: reports.reason,
        description: reports.description,
        videoUrl: reports.videoUrl,
        videoStoragePath: reports.videoStoragePath,
        reviewedAt: reports.reviewedAt,
      })
      .from(reports)
      .innerJoin(raiders, eq(reports.raiderId, raiders.id))
      .where(and(eq(raiders.embarkId, embarkId), eq(reports.status, "approved")));
  });
