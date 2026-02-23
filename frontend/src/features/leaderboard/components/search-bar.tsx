import { cn } from "@/shared/utils/utils";
import { useQuery } from "@tanstack/react-query";
import type { LucideIcon } from "lucide-react";
import { Store, Users } from "lucide-react";
import { useState } from "react";
import { searchOptions } from "../api/search-options";
import SearchInput from "./search-input";
import SearchResults from "./search-results";

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
      <SearchInput
        query={query}
        setQuery={setQuery}
        queryOpt={queryOpt}
        isFetching={isFetching}
      />

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

      <SearchResults
        queryResponse={queryResponse}
        queryOpt={queryOpt}
        isError={isError}
      />
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
