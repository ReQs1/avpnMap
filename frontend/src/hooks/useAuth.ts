import { fetchWithCredentials } from "@/lib/utils";
import { queryOptions, useQuery } from "@tanstack/react-query";

export type UserSummary =
  | {
      id: number;
      username: string;
      avatarURL: string;
      rank: {
        name: string;
      };
    }
  | undefined;

export const authQueryOptions = queryOptions({
  queryKey: ["auth"],
  staleTime: Infinity,
  refetchOnWindowFocus: false,
  retry: false,
  queryFn: () => fetchWithCredentials<UserSummary>("/api/user/me"),
});

export const useAuth = () => {
  const { data, isLoading, error } = useQuery(authQueryOptions);
  return { user: data, isLoading, error };
};
