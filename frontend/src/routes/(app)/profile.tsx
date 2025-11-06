import { authQueryOptions } from "@/lib/api/query-options/auth-query-options";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/profile")({
  component: RouteComponent,
  beforeLoad: async (ctx) => {
    const { context } = ctx;
    try {
      const user = await context.queryClient.fetchQuery(authQueryOptions);
      if (!user) {
        throw redirect({
          to: "/login",
        });
      }
    } catch (error: unknown) {
      // Rethrow redirects
      if (
        error &&
        typeof error === "object" &&
        "status" in error &&
        error.status === 307
      ) {
        throw error;
      }
      console.error("Auth check failed:", error);
      throw redirect({
        to: "/login",
      });
    }
  },
});

function RouteComponent() {
  return <main className="grow">test</main>;
}
