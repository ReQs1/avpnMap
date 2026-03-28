import { AlertCircle, Zap } from "lucide-react";
import type { QueryOpt } from "./search-bar";
import type { SearchPizzeria, SearchUser } from "../types/search.types";
import PizzeriaSearchCard from "./pizzeria-search-card";
import UserSearchCard from "./user-search-card";

type SearchResponse = {
  totalCount: number;
  data: (SearchPizzeria | SearchUser)[];
};

export default function SearchResults({
  queryResponse,
  queryOpt,
  isError,
  onLiveBadgeClick,
}: {
  queryResponse: SearchResponse | undefined;
  queryOpt: QueryOpt;
  isError: boolean;
  onLiveBadgeClick: () => void;
}) {
  if (isError) {
    return (
      <div className="flex items-center justify-center gap-2 py-6">
        <AlertCircle size={16} className="text-red-400" />
        <p className="text-sm text-red-500">Search failed. Please try again.</p>
      </div>
    );
  }

  if (!queryResponse) return null;

  return (
    <div>
      <div className="flex items-center justify-between border-b border-b-gray-200 px-3 py-2 dark:border-b-zinc-700">
        <p className="text-xs text-gray-500 dark:text-zinc-400">
          {queryResponse.totalCount}{" "}
          {queryResponse.totalCount == 1 ? "result" : "results"} found
        </p>
        <div className="flex items-center gap-2">
          {queryResponse.totalCount > queryResponse.data.length && (
            <p className="text-xs text-gray-400 dark:text-zinc-500">
              Showing first 10
            </p>
          )}
          <button
            onClick={onLiveBadgeClick}
            className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2 py-0.5 text-[10px] font-semibold text-green-700 transition-colors hover:bg-green-200 dark:bg-green-500/10 dark:text-green-500 dark:hover:bg-green-500/20"
          >
            <Zap size={10} className="fill-green-600 text-green-600" />
            Live
          </button>
        </div>
      </div>

      <div>
        {queryResponse.data.length > 0 ? (
          <div className="max-h-[400px] overflow-y-auto">
            {queryResponse.data.map((entry) => {
              return queryOpt === "pizzerias" ? (
                <PizzeriaSearchCard
                  key={entry.id}
                  pizzeria={entry as SearchPizzeria}
                />
              ) : (
                <UserSearchCard key={entry.id} user={entry as SearchUser} />
              );
            })}
          </div>
        ) : (
          <p className="p-3 text-center text-sm text-gray-500 dark:text-zinc-400">
            No {queryOpt} found
          </p>
        )}
      </div>
    </div>
  );
}
