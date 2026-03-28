import { leaderboardOptions } from "@/features/leaderboard/api/leaderboard-options";
import LeaderboardHeader from "@/features/leaderboard/components/leaderboard-header";
import LeaderboardModals from "@/features/leaderboard/components/leaderboard-modals";
import LeaderboardSwitchButtons from "@/features/leaderboard/components/leaderboard-switch-buttons";
import LeaderboardTable from "@/features/leaderboard/components/leaderboard-table/leaderboard-table";
import LeaderboardTablePagination from "@/features/leaderboard/components/leaderboard-table/leaderboard-table-pagination";
import SearchBar from "@/features/leaderboard/components/search-bar";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/(app)/leaderboard")({
  head: () => ({ meta: [{ title: "Leaderboard — avpnMap" }] }),
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
  loaderDeps: ({ search }) => ({
    page: search.page,
    queryOpt: search.queryOpt,
  }),
  loader: (ctx) => {
    const { context, deps } = ctx;
    context.queryClient.ensureQueryData(
      leaderboardOptions(deps.page, deps.queryOpt),
    );
  },
});

function RouteComponent() {
  const queryClient = useQueryClient();
  const { page, queryOpt } = Route.useSearch();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const {
    data: response,
    isError,
    isLoading,
    isFetching,
  } = useQuery(leaderboardOptions(page, queryOpt));

  async function handleTimerComplete() {
    setIsRefreshing(true);
    queryClient
      .invalidateQueries({ queryKey: ["leaderboard"], refetchType: "all" })
      .then(() => {
        setIsRefreshing(false);
      });
  }

  return (
    <>
      <div className="grow bg-gray-50 px-4 py-8 dark:bg-zinc-950">
        <div className="mx-auto max-w-5xl space-y-6">
          <LeaderboardHeader
            onTimerComplete={handleTimerComplete}
            nextRefresh={response?.meta.nextRefresh}
            isFetching={isRefreshing || isLoading}
          />
          <SearchBar />
          <LeaderboardSwitchButtons queryOpt={queryOpt} />
          <LeaderboardTable
            items={response?.data || []}
            queryOpt={queryOpt}
            isLoading={isLoading || isRefreshing}
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
      <LeaderboardModals />
    </>
  );
}
