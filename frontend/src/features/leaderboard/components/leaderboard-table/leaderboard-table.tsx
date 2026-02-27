import type {
  LeaderboardPizzeria,
  LeaderboardUser,
} from "../../types/leaderboard.types";
import type { QueryOpt } from "../search-bar";
import LeaderboardTableError from "./leaderboard-table-error";
import LeaderboardTablePizzeriaCard from "./leaderboard-table-pizzeria-card";
import LeaderboardTablePizzeriasHeader from "./leaderboard-table-pizzerias-header";
import LeaderboardTableSkeleton from "./leaderboard-table-skeleton";
import LeaderboardTableUserCard from "./leaderboard-table-user-card";
import LeaderboardTableUsersHeader from "./leaderboard-table-users-header";

type BaseProps = {
  isLoading?: boolean;
  isError?: boolean;
};

type LeaderboardProps = BaseProps & {
  queryOpt: QueryOpt;
  items: LeaderboardPizzeria[] | LeaderboardUser[];
};

export default function LeaderboardTable(props: LeaderboardProps) {
  const { queryOpt, items, isLoading, isError } = props;

  if (isError) {
    return <LeaderboardTableError />;
  }

  if (isLoading) {
    return <LeaderboardTableSkeleton rows={10} key={queryOpt} />;
  }

  if (items.length === 0) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white p-8 text-center text-gray-500 shadow-sm">
        No leaderboard data available.
      </div>
    );
  }

  return (
    <div className="mx-auto overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      {queryOpt === "users" ? (
        <LeaderboardTableUsersHeader />
      ) : (
        <LeaderboardTablePizzeriasHeader />
      )}

      <div className="flex flex-col">
        {queryOpt === "users"
          ? (items as LeaderboardUser[]).map((user) => (
              <LeaderboardTableUserCard key={user.userId} user={user} />
            ))
          : (items as LeaderboardPizzeria[]).map((pizzeria) => (
              <LeaderboardTablePizzeriaCard
                key={pizzeria.pizzeriaId}
                pizzeria={pizzeria}
              />
            ))}
      </div>
    </div>
  );
}
