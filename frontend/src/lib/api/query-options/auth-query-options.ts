import { queryOptions } from "@tanstack/react-query";
import { fetchUserInfo } from "@/lib/api/fetch-user-info";

export const authQueryOptions = queryOptions({
  queryKey: ["auth"],
  staleTime: Infinity,
  retryOnMount: false,
  refetchOnMount: false,
  gcTime: Infinity,
  refetchOnWindowFocus: false,
  retry: false,
  queryFn: fetchUserInfo,
});
