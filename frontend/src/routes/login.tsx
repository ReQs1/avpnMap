import MinimalHeader from "@/features/layout/components/minimal-header";
import JoinCommunity from "@/features/login/components/join-community";
import LoginCard from "@/features/login/components/login-card";
import LoginFeatures from "@/features/login/components/login-features";
import LoginTitle from "@/features/login/components/login-title";
import { authQueryOptions } from "@/features/auth/api/auth-query-options";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/login")({
  component: RouteComponent,
  beforeLoad: async (ctx) => {
    const { context } = ctx;
    try {
      const user = await context.queryClient.ensureQueryData(authQueryOptions);
      if (user) {
        throw redirect({
          to: "/map",
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
    }
  },
});

function RouteComponent() {
  return (
    <>
      <MinimalHeader />

      <main className="to-avpn-green/20 h-full grow bg-linear-to-br from-red-300/10 via-orange-50 px-6 py-10 md:px-8">
        <div className="mx-auto flex max-w-[1300px] flex-col-reverse gap-10 md:flex-row md:justify-between">
          <div className="max-w-[650px] flex-1 space-y-6">
            <LoginTitle />
            <LoginFeatures />
            <JoinCommunity />
          </div>

          <LoginCard />
        </div>
      </main>
    </>
  );
}
