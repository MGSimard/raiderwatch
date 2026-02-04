import { createMiddleware } from "@tanstack/react-start";
import { auth } from "@/_auth";

/**
 * Middleware that authenticates the user and checks for "assess" permission on reports.
 * Combines authentication and authorization in a single middleware.
 *
 * @throws Error with "Unauthenticated" if no user session exists
 * @throws Error with "Unauthorized" if user lacks assess permission
 */
export const assessMiddleware = createMiddleware().server(async ({ next, request }) => {
  const session = await auth.api.getSession({ headers: request.headers });
  const user = session?.user;

  if (!user) throw new Error("Unauthenticated");

  const { success: hasPermission } = await auth.api.userHasPermission({
    body: { userId: user.id, permissions: { report: ["assess"] } },
  });

  if (!hasPermission) throw new Error("Unauthorized");

  return next({ context: { session } });
});
