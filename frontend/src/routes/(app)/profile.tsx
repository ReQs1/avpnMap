import { authQueryOptions } from "@/lib/api/query-options/auth-query-options";
import { profileQueryOptions } from "@/lib/api/query-options/profile-query-options";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import ProfileCard from "@/components/profile/profile-card";

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
  const { data: profile } = useQuery(profileQueryOptions(user.id));

  if (!profile) return null;

  return (
    <main className="grow bg-gray-50 px-4 py-8">
      <div className="mx-auto max-w-6xl">
        <ProfileCard profile={profile} />
      </div>
    </main>
  );
}
