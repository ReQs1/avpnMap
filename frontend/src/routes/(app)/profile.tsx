import ProfileCard from "@/components/profile/profile-card/profile-card";
import ProfileCardSkeleton from "@/components/profile/profile-card/profile-card-skeleton";
import ProfileError from "@/components/profile/profile-error";
import { authQueryOptions } from "@/lib/api/query-options/auth-query-options";
import { profileQueryOptions } from "@/lib/api/query-options/profile-query-options";
import type { UserProfile } from "@/lib/types/user.types";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute, redirect } from "@tanstack/react-router";

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
      </div>
    </main>
  );
}
