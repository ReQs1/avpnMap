import errorImage from "@/assets/profile-error.webp";
import ProfileCard from "@/components/profile/profile-card";
import ProfileCardSkeleton from "@/components/profile/profile-card-skeleton";
import { authQueryOptions } from "@/lib/api/query-options/auth-query-options";
import { profileQueryOptions } from "@/lib/api/query-options/profile-query-options";
import type { UserProfile } from "@/lib/types/user.types";
import { useQuery } from "@tanstack/react-query";
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

      return { user };
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
  loader: async (ctx) => {
    const { context } = ctx;
    try {
      const userId = context.user.id;
      await context.queryClient.ensureQueryData(profileQueryOptions(userId));
    } catch (error: unknown) {
      console.error("Failed to load profile data:", error);
      // If profile fetch fails, redirect to login as fallback
      throw redirect({
        to: "/login",
      });
    }
  },
});

function RouteComponent() {
  const { user } = Route.useRouteContext();
  const {
    data: profile,
    isLoading,
    error,
  } = useQuery(profileQueryOptions(user.id));

  if (error) {
    return (
      <main className="grow bg-gray-50 px-4 py-8">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col items-center rounded-2xl bg-white px-6 py-12 shadow-sm">
            <img
              src={errorImage}
              alt="Error loading profile"
              className="mb-6 h-48 w-48 object-contain"
            />
            <h2 className="mb-2 text-xl font-bold text-gray-900">
              Failed to load profile
            </h2>
            <p className="text-gray-500">
              {error.message || "Something went wrong. Please try again later."}
            </p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="grow bg-gray-50 px-4 py-8">
      <div className="mx-auto max-w-6xl">
        {isLoading ? (
          <ProfileCardSkeleton />
        ) : (
          <ProfileCard profile={profile as UserProfile} />
        )}
      </div>
    </main>
  );
}
