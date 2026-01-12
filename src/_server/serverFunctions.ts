import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { db } from "./db";
import { usersTable } from "./db/schema";

// https://tanstack.com/start/latest/docs/framework/react/guide/server-functions

export const getUsers = createServerFn().handler(async () => {
  return await db.select().from(usersTable);
});

const UserSchema = z.object({
  name: z.string().min(1),
  age: z.number().min(0),
  email: z.email(),
});

export const createUser = createServerFn({ method: "POST" })
  .inputValidator(UserSchema)
  .handler(async ({ data }) => {
    return await db.insert(usersTable).values({
      name: data.name,
      age: data.age,
      email: data.email,
    });
  });

// Example of form submission
export const submitUserForm = createServerFn({ method: "POST" })
  .inputValidator((data) => {
    if (!(data instanceof FormData)) {
      throw new Error("Expected FormData");
    }
    return z
      .object({
        name: z.string().min(1),
        email: z.email(),
        age: z.number().min(0),
      })
      .parse(Object.fromEntries(data.entries()));
  })
  .handler(async ({ data }) => {
    await db.insert(usersTable).values({
      name: data.name,
      email: data.email,
      age: data.age,
    });

    return { success: true };
  });

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
