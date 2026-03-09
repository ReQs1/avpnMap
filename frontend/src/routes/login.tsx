import MinimalHeader from "@/features/layout/components/minimal-header";
import JoinCommunity from "@/features/login/components/join-community";
import LoginCard from "@/features/login/components/login-card";
import LoginFeatures from "@/features/login/components/login-features";
import LoginTitle from "@/features/login/components/login-title";
import { authQueryOptions } from "@/features/auth/api/auth-query-options";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/login")({
  component: RouteComponent,
  head: () => ({
    meta: [
      { title: "Sign In — avpnMap" },
      {
        name: "description",
        content:
          "Sign in to avpnMap to track your visits to AVPN certified pizzerias and climb the leaderboard.",
      },
      { property: "og:title", content: "Sign In — avpnMap" },
      {
        property: "og:description",
        content:
          "Sign in to avpnMap to track your visits to AVPN certified pizzerias and climb the leaderboard.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: "Sign In — avpnMap" },
      {
        name: "twitter:description",
        content:
          "Sign in to avpnMap to track your visits to AVPN certified pizzerias and climb the leaderboard.",
      },
    ],
  }),
  beforeLoad: (ctx) => {
    const data = ctx.context.queryClient.getQueryData(
      authQueryOptions.queryKey,
    );
    if (data?.user) {
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
