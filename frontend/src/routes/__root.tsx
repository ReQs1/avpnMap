import GlobalNotFound from "@/features/not-found/components/global-not-found";
import { authQueryOptions } from "@/features/auth/api/auth-query-options";
import { useAuth } from "@/features/auth/hooks/useAuth";
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
    </>
  );
};

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()(
  {
    component: RootLayout,
    head: () => ({
      meta: [
        { title: "avpnMap" },
        {
          name: "description",
          content:
            "avpnMap — discover and track Associazione Verace Pizza Napoletana certified pizzerias around the world.",
        },
        { property: "og:site_name", content: "avpnMap" },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary" },
      ],
    }),
    beforeLoad: async (ctx) => {
      await ctx.context.queryClient.ensureQueryData(authQueryOptions);
    },
    notFoundComponent: GlobalNotFound,
  },
);
