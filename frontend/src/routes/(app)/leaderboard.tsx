import { leaderboardOptions } from "@/features/leaderboard/api/leaderboard-options";
import LeaderboardHeader from "@/features/leaderboard/components/leaderboard-header";
import LeaderboardSwitchButtons from "@/features/leaderboard/components/leaderboard-switch-buttons";
import LeaderboardTable from "@/features/leaderboard/components/leaderboard-table/leaderboard-table";
import LeaderboardTablePagination from "@/features/leaderboard/components/leaderboard-table/leaderboard-table-pagination";
import SearchBar from "@/features/leaderboard/components/search-bar";
import { useQuery } from "@tanstack/react-query";
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
  const { page, queryOpt } = Route.useSearch();
  const {
    data: response,
    isError,
    isLoading,
    isFetching,
  } = useQuery(leaderboardOptions(page, queryOpt));

  return (
    <div className="grow bg-gray-50 px-4 py-8">
      <div className="mx-auto max-w-5xl space-y-6">
        <LeaderboardHeader
          onTimerComplete={() => console.log("meow")}
          nextRefresh={response?.meta.nextRefresh}
        />
        <SearchBar />
        <LeaderboardSwitchButtons queryOpt={queryOpt} />
        <LeaderboardTable
          items={response?.data || []}
          queryOpt={queryOpt}
          isLoading={isLoading}
          isError={isError}
        />
        {response?.meta && (
          <LeaderboardTablePagination
            meta={response?.meta}
            isDisabled={isFetching}
          />
        )}
      </div>
    </div>
  );
}
