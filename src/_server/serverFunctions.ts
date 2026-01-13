import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { db } from "./db";

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
