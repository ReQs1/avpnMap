import MinimalHeader from "@/components/common/minimal-header";
import JoinCommunity from "@/components/login/join-community";
import LoginCard from "@/components/login/login-card";
import LoginFeatures from "@/components/login/login-features";
import LoginTitle from "@/components/login/login-title";
import { authQueryOptions } from "@/lib/api/query-options/auth-query-options";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/login")({
  component: RouteComponent,
  beforeLoad: async (ctx) => {
    const { context } = ctx;
    const user = await context.queryClient.ensureQueryData(authQueryOptions);
    if (user) {
      throw redirect({
        to: "/map",
      });
    }
  },
});

function RouteComponent() {
  return (
    <>
      <MinimalHeader />

      <main className="to-avpn-green/20 h-full grow bg-linear-to-br from-red-300/10 via-orange-50 px-6 py-10 md:px-8">
        <div className="mx-auto flex max-w-[1100px] flex-col-reverse gap-10 md:flex-row">
          {/* title div */}
          <div className="flex-1 space-y-6">
            <LoginTitle />
            <LoginFeatures />
            <JoinCommunity />
          </div>

          {/* login card */}
          <LoginCard />
        </div>
      </main>
    </>
  );
}
