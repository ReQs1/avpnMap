import { authQueryOptions } from "@/features/auth/api/auth-query-options";
import { profileQueryOptions } from "@/features/profile/api/profile-query-options";
import Achievements from "@/features/profile/components/achievements/achievements";
import NoVisitsMessage from "@/features/profile/components/history/no-visits-message";
import PizzaJourney from "@/features/profile/components/history/pizza-journey";
import ProfileCard from "@/features/profile/components/profile-card/profile-card";
import ProfileError from "@/features/profile/components/profile-error";
import PendingComponent from "@/features/profile/components/profile-pending";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/profile")({
  component: RouteComponent,
  errorComponent: ProfileError,
  pendingComponent: PendingComponent,
  beforeLoad: async (ctx) => {
    const { context } = ctx;
    const user = await context.queryClient.fetchQuery(authQueryOptions);
    if (!user) {
      throw redirect({
        to: "/login",
      });
    }

    return { user };
  },
  loader: async (ctx) => {
    const { context } = ctx;
    const { user } = context;
    await context.queryClient.ensureQueryData(profileQueryOptions(user.id));
  },
});

function RouteComponent() {
  const { user } = Route.useRouteContext();
  const { data: profile } = useSuspenseQuery(profileQueryOptions(user.id));

  return (
    <main className="grow bg-gray-50 px-4 py-8">
      <div className="mx-auto max-w-6xl">
        <ProfileCard profile={profile!} />
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-[2fr_1fr]">
          {profile!.visits.length > 0 ? (
            <PizzaJourney visits={profile!.visits} />
          ) : (
            <NoVisitsMessage />
          )}
          <Achievements achievements={profile!.achievements} />
        </div>
      </div>
    </main>
  );
}
