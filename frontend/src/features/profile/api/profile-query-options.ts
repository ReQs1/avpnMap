import { queryOptions } from "@tanstack/react-query";
import { fetchUserProfile } from "@/features/profile/api/fetch-profile";

export const profileQueryOptions = (profileId: number) => {
  return queryOptions({
    queryKey: ["profile", profileId],
    queryFn: ({ signal }) => fetchUserProfile(profileId, signal),
    staleTime: 1000 * 60 * 5,
  });
};
