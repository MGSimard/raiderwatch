import { createMiddleware } from "@tanstack/react-start";
import { auth } from "@/_auth";

export const authMiddleware = createMiddleware().server(async ({ next, request }) => {
  const session = await auth.api.getSession({ headers: request.headers });
  return await next({ context: { session } });
});

// OLD STUFF
// if (!session) {
//   // eslint-disable-next-line @typescript-eslint/only-throw-error
//   throw redirect({ to: "/authorization" });
// }

// // Check if user has permission to assess reports (moderators and admins)
// const { success: hasPermission, error } = await auth.api.userHasPermission({
//   body: {
//     userId: session.user.id,
//     permissions: {
//       report: ["assess"],
//     },
//   },
// });

// // TODO: Do something with error?
// if (!hasPermission) {
//   // eslint-disable-next-line @typescript-eslint/only-throw-error
//   throw redirect({ to: "/unauthorized" });
// }