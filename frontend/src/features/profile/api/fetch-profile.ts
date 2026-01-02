import type { UserProfile } from "@/features/auth/types/user.types";

export const fetchUserProfile = async (
  profileId: number,
  abortSignal?: AbortSignal,
) => {
  const res = await fetch(`/api/user/${profileId}`, {
    signal: abortSignal,
  });

  if (res.status === 404) {
    return null;
  }

  if (!res.ok) {
    throw new Error(`Failed to fetch profile: ${res.status} ${res.statusText}`);
  }

  const data = await res.json();
  return data as UserProfile;
};
