import { queryOptions } from "@tanstack/react-query";
import { fetchUserSummary } from "@/lib/api/fetch-user-summary";

export const authQueryOptions = queryOptions({
  queryKey: ["auth"],
  staleTime: Infinity,
  retryOnMount: false,
  refetchOnMount: false,
  gcTime: Infinity,
  refetchOnWindowFocus: false,
  retry: false,
  queryFn: fetchUserSummary,
});
