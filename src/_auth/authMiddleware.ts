import { redirect } from "@tanstack/react-router";
import { createMiddleware } from "@tanstack/react-start";
import { getRequestHeaders } from "@tanstack/react-start/server";
import { auth } from "@/_auth";

export const authMiddleware = createMiddleware().server(async ({ next }) => {
  const headers = getRequestHeaders() as Headers;
  const session = await auth.api.getSession({ headers });

  if (!session) {
    // eslint-disable-next-line @typescript-eslint/only-throw-error
    throw redirect({ to: "/" });
  }

  return await next();
});
