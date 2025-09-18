import { authQueryOptions } from "@/lib/api/query-options/auth-query-options";
import { useQuery } from "@tanstack/react-query";

export type UserSummary = {
  id: number;
  username: string;
  avatarURL: string;
  rank: {
    name: string;
  };
} | null;

export const useAuth = () => {
  const { data, isLoading, error } = useQuery(authQueryOptions);
  return { user: data, isLoading, error };
};
