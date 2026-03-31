import { authQueryOptions } from "@/features/auth/api/auth-query-options";
import { useAuth } from "@/features/auth/hooks/useAuth";
import GlobalPending from "@/features/layout/components/global-pending";
import GlobalNotFound from "@/features/not-found/components/global-not-found";
import type { QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
  createRootRouteWithContext,
  HeadContent,
  Outlet,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { useEffect, useRef } from "react";
import toast, { Toaster } from "react-hot-toast";
import { CookieBanner } from "@/features/layout/components/cookie-banner";
import BmcButton from "@/features/layout/components/bmc-button";

const RootLayout = () => {
  const { error } = useAuth();
  const hasShownToast = useRef(false);

  useEffect(() => {
    if (error && !hasShownToast.current) {
      hasShownToast.current = true;
      toast.error(
        "Unable to connect to server. Some features may be unavailable.",
        {
          id: "api-down",
          duration: 5000,
          position: "bottom-center",
        },
      );
    }
  }, [error]);

  return (
    <>
      <HeadContent />
      <Outlet />
      <Toaster />
      <TanStackRouterDevtools />
      <ReactQueryDevtools initialIsOpen={false} />
      <CookieBanner />
      <BmcButton />
    </>
  );
};

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()(
  {
    component: RootLayout,
    beforeLoad: async (ctx) => {
      await ctx.context.queryClient.ensureQueryData(authQueryOptions);
    },
    pendingComponent: GlobalPending,
    notFoundComponent: GlobalNotFound,
  },
);
