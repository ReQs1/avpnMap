import { fetchWithTokenRefresh } from "@/lib/utils";
import { queryOptions, useQuery } from "@tanstack/react-query";

export type UserSummary = {
  id: number;
  username: string;
  avatarURL: string;
  rank: {
    name: string;
  };
} | null;

const fetchUserInfo = async (): Promise<UserSummary> => {
  try {
    const user = await fetchWithTokenRefresh<UserSummary>(() =>
      fetch("/api/user/me", { credentials: "include" }),
    );
    return user;
  } catch (error) {
    // If it's an auth error, return null (no user)
    if (
      error instanceof Error &&
      (error.message.includes("Authentication") ||
        error.message.includes("Unauthorized") ||
        error.message.includes("Failed to refresh"))
    ) {
      return null;
    }
    // Re-throw other errors
    throw error;
  }
};

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

export const useAuth = () => {
  const { data, isLoading, error } = useQuery(authQueryOptions);
  return { user: data, isLoading, error };
};
