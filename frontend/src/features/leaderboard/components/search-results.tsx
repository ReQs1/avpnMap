import { AlertCircle } from "lucide-react";
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
}: {
  queryResponse: SearchResponse | undefined;
  queryOpt: QueryOpt;
  isError: boolean;
}) {
  if (isError) {
    return (
      <div className="flex w-full items-center justify-center gap-2 border-t border-t-gray-200 py-6">
        <AlertCircle size={16} className="text-red-400" />
        <p className="text-sm text-red-500">
          Search failed. Please try again.
        </p>
      </div>
    );
  }

  if (!queryResponse) return null;

  return (
    <div className="w-full space-y-2 border-t border-t-gray-200 pt-3">
      <div className="flex items-center justify-between">
        <p className="text-xs text-gray-500">
          {queryResponse.totalCount}{" "}
          {queryResponse.totalCount == 1 ? "result" : "results"} found
        </p>
        {queryResponse.totalCount > queryResponse.data.length && (
          <p className="text-xs text-gray-400">Showing first 10</p>
        )}
      </div>

      <div>
        {queryResponse.data.length > 0 ? (
          <div className="space-y-2">
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
          <p className="text-center text-sm text-gray-500">
            No {queryOpt} found
          </p>
        )}
      </div>
    </div>
  );
}
