import { cn } from "@/shared/utils/utils";
import type { LucideIcon } from "lucide-react";
import { SearchIcon, Store, Users } from "lucide-react";
import { useState } from "react";

type QueryOpt = "users" | "pizzerias";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [queryOpt, setQueryOpt] = useState<QueryOpt>("users");

  return (
    <div className="flex flex-col gap-2 rounded-lg border border-gray-200 bg-white p-4 shadow sm:flex-row sm:items-center sm:gap-4">
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
          className="w-full rounded-md border border-gray-200 py-3 pr-2 pl-10 text-sm"
        />
      </div>

      <div className="flex w-fit gap-2 rounded-md bg-gray-100 p-1">
        <TabButton
          icon={Users}
          label="Users"
          isActive={queryOpt === "users"}
          onClick={() => setQueryOpt("users")}
        />
        <TabButton
          icon={Store}
          label="Pizzerias"
          isActive={queryOpt === "pizzerias"}
          onClick={() => setQueryOpt("pizzerias")}
        />
      </div>

      {/* TODO: add list of users/pizzerias with pagination */}
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
