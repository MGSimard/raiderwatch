import { createMiddleware } from "@tanstack/react-start";
import { ratelimit } from "@/_server/redis";

export const ratelimitMiddleware = createMiddleware().server(async ({ next, request }) => {
  // Netlify provides x-nf-client-connection-ip as the most reliable IP
  const nfClientIP = request.headers.get("x-nf-client-connection-ip");
  const forwardedFor = request.headers.get("x-forwarded-for");

  const identifier = nfClientIP?.trim() || forwardedFor?.split(",")[0]?.trim() || "unknown";

  const { success, remaining, reset } = await ratelimit.limit(identifier);

  if (!success) {
    const waitSeconds = Math.ceil((reset - Date.now()) / 1000);
    throw new Error(`Rate limit exceeded. Try again in ${waitSeconds}s`);
  }

  return next({
    context: {
      ratelimit: { remaining, reset },
    },
  });
});
