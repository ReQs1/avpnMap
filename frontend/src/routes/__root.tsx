import GlobalNotFound from "@/features/not-found/components/global-not-found";
import { authQueryOptions } from "@/features/auth/api/auth-query-options";
import type { QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { Toaster } from "react-hot-toast";

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
    beforeLoad: async (ctx) => {
      try {
        await ctx.context.queryClient.ensureQueryData(authQueryOptions);
      } catch (error) {}
    },
    notFoundComponent: GlobalNotFound,
  },
);
