import type { QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { Toaster } from "react-hot-toast";
import { authQueryOptions } from "@/hooks/useAuth";

const RootLayout = () => (
  <>
    <Outlet />
    <Toaster />
    <TanStackRouterDevtools />
    <ReactQueryDevtools initialIsOpen={false} />
  </>
);

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()(
  {
    component: RootLayout,
    loader: (ctx) => {
      ctx.context.queryClient.ensureQueryData(authQueryOptions);
    },
  },
);
