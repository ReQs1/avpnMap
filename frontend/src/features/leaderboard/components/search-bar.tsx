import { cn } from "@/shared/utils/utils";
import { useQuery } from "@tanstack/react-query";
import type { LucideIcon } from "lucide-react";
import { AlertCircle, Loader2, SearchIcon, Store, Users } from "lucide-react";
import { useState } from "react";
import { searchOptions } from "../api/search-options";
import type { SearchPizzeria, SearchUser } from "../types/search.types";
import PizzeriaSearchCard from "./pizzeria-search-card";
import UserSearchCard from "./user-search-card";

export type QueryOpt = "users" | "pizzerias";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [queryOpt, setQueryOpt] = useState<QueryOpt>("users");

  const {
    data: queryResponse,
    isFetching,
    isError,
  } = useQuery(searchOptions(queryOpt, query));

  const onQueryOptChange = (queryOpt: QueryOpt) => {
    setQuery("");
    setQueryOpt(queryOpt);
  };

  return (
    <div className="flex flex-col gap-3 rounded-lg border border-gray-200 bg-white p-4 shadow sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
      {/* search input */}
      <div className="relative grow">
        <label
          htmlFor="query"
          className="absolute top-1/2 left-2 -translate-y-1/2 cursor-text text-gray-300"
        >
          <SearchIcon size={18} aria-hidden="true" />
          <span className="sr-only">Search</span>
        </label>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              setQuery("");
            }
          }}
          type="text"
          id="query"
          placeholder={`Search ${queryOpt} by name...`}
          className="w-full rounded-md border border-gray-200 py-3 pr-8 pl-10 text-sm"
        />
        {isFetching && (
          <Loader2
            size={16}
            className="absolute top-1/2 right-2.5 -translate-y-1/2 animate-spin text-gray-400"
          />
        )}
      </div>

      {/* Query Switch (between pizzerias and users) */}
      <div className="flex w-fit gap-2 rounded-md bg-gray-100 p-1">
        <TabButton
          icon={Users}
          label="Users"
          isActive={queryOpt === "users"}
          onClick={() => onQueryOptChange("users")}
        />
        <TabButton
          icon={Store}
          label="Pizzerias"
          isActive={queryOpt === "pizzerias"}
          onClick={() => onQueryOptChange("pizzerias")}
        />
      </div>

      {/* error state */}
      {isError && (
        <div className="flex w-full items-center justify-center gap-2 border-t border-t-gray-200 py-6">
          <AlertCircle size={16} className="text-red-400" />
          <p className="text-sm text-red-500">
            Search failed. Please try again.
          </p>
        </div>
      )}

      {/* fetched data */}
      {queryResponse && (
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
      )}
    </div>
  );
}

function TabButton({
  icon: Icon,
  label,
  isActive,
  onClick,
}: {
  icon: LucideIcon;
  label: string;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-2 rounded-md border px-4 py-2 text-sm font-medium transition",
        isActive
          ? "border-gray-300 bg-white text-gray-900 shadow-sm"
          : "border-transparent bg-transparent text-gray-500 hover:text-gray-700 focus-visible:text-gray-700",
      )}
    >
      <Icon size={16} aria-hidden="true" />
      {label}
    </button>
  );
}
