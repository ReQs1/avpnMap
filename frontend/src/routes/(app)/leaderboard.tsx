import LeaderboardHeader from "@/features/leaderboard/components/leaderboard-header";
import LeaderboardSwitchButtons from "@/features/leaderboard/components/leaderboard-switch-buttons";
import SearchBar from "@/features/leaderboard/components/search-bar";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/leaderboard")({
  component: RouteComponent,
  validateSearch: (search: Record<string, unknown>) => {
    const validOptions = ["users", "pizzerias"] as const;
    const queryOpt =
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      search.queryOpt && validOptions.includes(search.queryOpt as any)
        ? (search.queryOpt as "users" | "pizzerias")
        : "users";

    return { ...search, queryOpt };
  },
});

function RouteComponent() {
  return (
    <div className="grow bg-gray-50 px-4 py-8">
      <div className="mx-auto max-w-5xl space-y-6">
        <LeaderboardHeader />
        <SearchBar />
        <LeaderboardSwitchButtons />
      </div>
    </div>
  );
}
