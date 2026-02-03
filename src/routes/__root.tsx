import { HeadContent, Scripts, createRootRouteWithContext } from "@tanstack/react-router";
import { TanStackDevtools } from "@tanstack/react-devtools";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { ReactQueryDevtoolsPanel } from "@tanstack/react-query-devtools";
// import { FormDevtoolsPanel } from "@tanstack/react-form-devtools";
import { PacerDevtoolsPanel } from "@tanstack/react-pacer-devtools";
import { ThemeProvider } from "@/_components/ThemeProvider";
import { Toaster } from "@/_components/ui/sonner";
import { TooltipProvider } from "@/_components/ui/tooltip";
import type { QueryClient } from "@tanstack/react-query";
import { configLinks, configMeta, favIcons, fontPreloads, misc, openGraph, styles, twitter } from "@/_lib/head";

interface MyRouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  head: () => ({
    meta: [...configMeta, ...openGraph, ...twitter, ...misc],
    links: [...configLinks, ...favIcons, ...fontPreloads, ...styles],
  }),
  shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        <ThemeProvider>
          <TooltipProvider>
            <div id="root">{children}</div>
            <Toaster />
          </TooltipProvider>
        </ThemeProvider>
        <TanStackDevtools
          config={{
            position: "bottom-right",
          }}
          plugins={[
            {
              name: "TanStack Router",
              render: <TanStackRouterDevtoolsPanel />,
            },
            {
              name: "TanStack Query",
              render: <ReactQueryDevtoolsPanel />,
            },
            {
              name: "TanStack Pacer",
              render: <PacerDevtoolsPanel />,
            },
            // Not using FormDevtoolsPanel because it invokes
            // some random ass solidjs garbage that crashes the app
            // despite being a React package
          ]}
        />
        <Scripts />
      </body>
    </html>
  );
}
