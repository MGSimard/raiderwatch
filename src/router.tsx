import { createRouter } from "@tanstack/react-router";
import { setupRouterSsrQueryIntegration } from "@tanstack/react-router-ssr-query";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { routeTree } from "./routeTree.gen";
import { GlobalError } from "@/_components/GlobalError";
import { NotFound } from "@/_components/NotFound";

export const getRouter = () => {
  const queryClient = new QueryClient();

  const router = createRouter({
    routeTree,
    context: { queryClient },
    defaultPreload: "intent",
    defaultPreloadStaleTime: 30_000, // 30 seconds
    defaultViewTransition: true,
    scrollRestoration: true,
    defaultErrorComponent: (props) => <GlobalError error={props.error} />,
    defaultNotFoundComponent: () => <NotFound />,
    Wrap: ({ children }: { children: React.ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    ),
  });

  setupRouterSsrQueryIntegration({ router, queryClient });

  return router;
};
