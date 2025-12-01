import { queryOptions } from "@tanstack/react-query";
import { fetchUserProfile } from "@/lib/api/fetch-profile";

export const profileQueryOptions = (profileId: number) => {
  return queryOptions({
    queryKey: ["profile", profileId],
    queryFn: () => fetchUserProfile(profileId),
    staleTime: 1000 * 60 * 5,
  });
};
