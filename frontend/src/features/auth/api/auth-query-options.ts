import { queryOptions } from "@tanstack/react-query";
import { fetchUserSummary } from "@/features/auth/api/fetch-user-summary";
import type { AuthResult } from "@/features/auth/types/user.types";

export const authQueryOptions = queryOptions<AuthResult>({
  queryKey: ["auth"],
  staleTime: Infinity,
  retryOnMount: false,
  refetchOnMount: false,
  gcTime: Infinity,
  refetchOnWindowFocus: false,
  retry: false,
  queryFn: fetchUserSummary,
});
