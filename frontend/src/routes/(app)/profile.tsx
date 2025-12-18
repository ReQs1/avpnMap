import NoVisitsMessage from "@/features/profile/components/history/no-visits-message";
import PizzaJourney from "@/features/profile/components/history/pizza-journey";
import PizzaJourneySkeleton from "@/features/profile/components/history/pizza-journey-skeleton";
import ProfileCard from "@/features/profile/components/profile-card/profile-card";
import ProfileCardSkeleton from "@/features/profile/components/profile-card/profile-card-skeleton";
import ProfileError from "@/features/profile/components/profile-error";
import { authQueryOptions } from "@/features/auth/api/auth-query-options";
import { profileQueryOptions } from "@/features/profile/api/profile-query-options";
import type { UserProfile } from "@/features/auth/types/user.types";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute, redirect } from "@tanstack/react-router";
import AchievementsSkeleton from "@/features/profile/components/achievements/achievements-skeleton";
import Achievements from "@/features/profile/components/achievements/achievements";

export const Route = createFileRoute("/(app)/profile")({
  component: RouteComponent,
  errorComponent: ProfileError,
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
    context.queryClient.ensureQueryData(profileQueryOptions(user.id));
  },
});

function RouteComponent() {
  const { user } = Route.useRouteContext();

  const { data: profile, isLoading } = useQuery(profileQueryOptions(user.id));

  return (
    <main className="grow bg-gray-50 px-4 py-8">
      <div className="mx-auto max-w-6xl">
        {/* top card with user's nickname and avatar */}
        {isLoading ? (
          <ProfileCardSkeleton />
        ) : (
          <ProfileCard profile={profile as UserProfile} />
        )}
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-[2fr_1fr]">
          {/* visits history */}
          {isLoading ? (
            <PizzaJourneySkeleton />
          ) : profile!.visits.length > 0 ? (
            <PizzaJourney visits={profile!.visits} />
          ) : (
            <NoVisitsMessage />
          )}

          {/* achievements */}
          {isLoading ? (
            <AchievementsSkeleton />
          ) : (
            <Achievements achievements={profile!.achievements} />
          )}
        </div>
      </div>
    </main>
  );
}
