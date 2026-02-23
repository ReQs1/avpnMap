import { authQueryOptions } from "@/features/auth/api/auth-query-options";
import { useQuery } from "@tanstack/react-query";

export const useAuth = () => {
  const { data, isLoading } = useQuery(authQueryOptions);

  return {
    user: data?.user ?? null,
    error: data?.error ?? null,
    isLoading,
  };
};
