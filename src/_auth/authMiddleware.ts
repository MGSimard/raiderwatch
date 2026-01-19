import { createMiddleware } from "@tanstack/react-start";
import { auth } from "@/_auth";

export const authMiddleware = createMiddleware().server(async ({ next, request }) => {
  const session = await auth.api.getSession({ headers: request.headers });
  return await next({ context: { session } });
});
