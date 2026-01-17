import { HeadContent, Scripts, createRootRouteWithContext } from "@tanstack/react-router";
// import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
// import { TanStackDevtools } from "@tanstack/react-devtools";
// import { ReactQueryDevtoolsPanel } from "@tanstack/react-query-devtools";
// import { FormDevtoolsPanel } from "@tanstack/react-form-devtools";
import appCss from "../_styles/app.css?url";
import fontsCss from "../_styles/fonts.css?url";
import type { QueryClient } from "@tanstack/react-query";
import { ThemeProvider } from "@/_components/ThemeProvider";
import { ThemeToggle } from "@/_components/ThemeToggle";
import { Toaster } from "@/_components/ui/sonner";

interface MyRouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "TanStack Start Starter",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      {
        rel: "stylesheet",
        href: fontsCss,
      },
    ],
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
          <div id="root">
            <ThemeToggle />
            {children}
          </div>
          <Toaster className="z-9999" />
        </ThemeProvider>
        {/* <TanStackDevtools
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
            // Not using FormDevtoolsPanel because it invokes
            // some random ass solidjs garbage that crashes the app
            // despite being a React package
          ]}
        /> */}
        <Scripts />
      </body>
    </html>
  );
}
