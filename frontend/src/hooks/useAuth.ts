import { authQueryOptions } from "@/lib/api/query-options/auth-query-options";
import { useQuery } from "@tanstack/react-query";

export const useAuth = () => {
  const { data, isLoading, error } = useQuery(authQueryOptions);
  return { user: data, isLoading, error };
};
