import { fetchWithTokenRefresh } from "@/features/auth/utils/auth-utils";
import type { UserSummary } from "@/features/auth/types/user.types";

export const fetchUserSummary = async (): Promise<UserSummary> => {
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
