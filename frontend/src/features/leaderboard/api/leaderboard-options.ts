import { queryOptions } from "@tanstack/react-query";
import type { QueryOpt } from "../components/search-bar";
import type {
  LeaderboardMeta,
  LeaderboardPizzeria,
  LeaderboardUser,
} from "../types/leaderboard.types";

type LeaderboardResponse = {
  data: LeaderboardUser[] | LeaderboardPizzeria[];
  meta: LeaderboardMeta;
};

const ENDPOINTS: Record<QueryOpt, string> = {
  users: "/api/leaderboard/users",
  pizzerias: "/api/leaderboard/pizzerias",
};

export const leaderboardOptions = (page: number, queryOpt: QueryOpt) => {
  return queryOptions({
    queryKey: ["leaderboard", queryOpt, page],
    placeholderData: (previousData, previousQuery) => {
      if (queryOpt === previousQuery?.queryKey[1]) {
        return previousData;
      }
      return undefined;
    },
    queryFn: async (): Promise<LeaderboardResponse> => {
      const response = await fetch(`${ENDPOINTS[queryOpt]}?page=${page}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch ${queryOpt} leaderboard`);
      }

      return response.json();
    },
    staleTime: Infinity,
    gcTime: Infinity,
  });
};
