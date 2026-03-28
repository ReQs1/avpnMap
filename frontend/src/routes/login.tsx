import MinimalHeader from "@/features/layout/components/minimal-header";
import JoinCommunity from "@/features/login/components/join-community";
import LoginCard from "@/features/login/components/login-card";
import LoginFeatures from "@/features/login/components/login-features";
import LoginTitle from "@/features/login/components/login-title";
import { authQueryOptions } from "@/features/auth/api/auth-query-options";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/login")({
  component: RouteComponent,
  head: () => ({ meta: [{ title: "Sign In — avpnMap" }] }),
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

      <main className="to-avpn-green/20 relative h-full grow overflow-hidden bg-gray-50 bg-linear-to-br from-red-300/10 via-orange-50 px-6 py-10 md:px-8 dark:bg-zinc-950 dark:bg-none">
        <div
          className="pointer-events-none absolute -top-48 -left-48 hidden h-[600px] w-[600px] rounded-full dark:block dark:bg-[radial-gradient(circle,rgb(239_68_68/0.12)_0%,transparent_70%)]"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -right-24 -bottom-48 hidden h-[600px] w-[600px] rounded-full dark:block dark:bg-[radial-gradient(circle,rgb(167_139_250/0.07)_0%,transparent_70%)]"
          aria-hidden="true"
        />
        <div className="relative z-10 mx-auto flex max-w-[1300px] flex-col-reverse gap-10 md:flex-row md:justify-between">
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
