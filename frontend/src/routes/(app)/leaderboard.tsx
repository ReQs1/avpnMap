import LeaderboardHeader from "@/features/leaderboard/components/leaderboard-header";
import LeaderboardSwitchButtons from "@/features/leaderboard/components/leaderboard-switch-buttons";
import { LeaderboardTable } from "@/features/leaderboard/components/leaderboard-table/leaderboard-table";
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

    const rawPage = Number(search.page);
    const page = !isNaN(rawPage) && rawPage >= 1 ? Math.floor(rawPage) : 1;

    return { ...search, queryOpt, page };
  },
});

function RouteComponent() {
  const searchParams = Route.useSearch();

  return (
    <div className="grow bg-gray-50 px-4 py-8">
      <div className="mx-auto max-w-5xl space-y-6">
        <LeaderboardHeader />
        <SearchBar />
        <LeaderboardSwitchButtons queryOpt={searchParams.queryOpt} />
        <LeaderboardTable
          items={[]}
          queryOpt={searchParams.queryOpt}
          isLoading={false}
          isError={false}
        />
      </div>
    </div>
  );
}
