import type { UserProfile } from "@/lib/types/user.types";

export const fetchUserProfile = async (profileId: number) => {
  const res = await fetch(`/api/user/${profileId}`);

  if (res.status === 404) {
    return null;
  }

  if (!res.ok) {
    throw new Error(`Failed to fetch profile: ${res.status} ${res.statusText}`);
  }

  const data = await res.json();
  return data as UserProfile;
};
