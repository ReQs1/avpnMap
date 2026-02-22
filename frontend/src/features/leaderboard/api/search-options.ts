import { queryOptions } from "@tanstack/react-query";
import type { QueryOpt } from "../components/search-bar";
import type { SearchPizzeria, SearchUser } from "../types/search.types";

type SearchResponse<T> = {
  data: T[];
  totalCount: number;
};

const ENDPOINTS: Record<QueryOpt, string> = {
  users: "/api/user/search",
  pizzerias: "/api/pizzerias/search",
};

export const searchOptions = (queryOpt: QueryOpt, query: string) => {
  return queryOptions({
    queryKey: ["search", queryOpt, query],
    enabled: query.trim().length > 1,
    staleTime: 60 * 2 * 1000,
    placeholderData: (
      previousData: SearchResponse<SearchUser | SearchPizzeria> | undefined,
      previousQuery,
    ) => {
      if (previousQuery?.queryKey[1] === queryOpt) {
        return previousData;
      }
      return undefined;
    },
    queryFn: async ({ signal }) => {
      const params = new URLSearchParams({ q: query.trim() });
      const res = await fetch(`${ENDPOINTS[queryOpt]}?${params}`, { signal });

      if (!res.ok) {
        throw new Error(`Search failed with status ${res.status}`);
      }

      const data = await res.json();
      return data as SearchResponse<SearchUser | SearchPizzeria>;
    },
  });
};
