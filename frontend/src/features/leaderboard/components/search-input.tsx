import { Loader2, SearchIcon } from "lucide-react";
import type { QueryOpt } from "./search-bar";

interface SearchInputProps {
  query: string;
  setQuery: (query: string) => void;
  queryOpt: QueryOpt;
  isFetching: boolean;
}

export default function SearchInput({
  query,
  setQuery,
  queryOpt,
  isFetching,
}: SearchInputProps) {
  return (
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
  );
}
