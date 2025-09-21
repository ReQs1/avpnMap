import type { UserSummary } from "@/hooks/useAuth";
import { fetchWithTokenRefresh } from "@/lib/utils/auth-utils";

export const fetchUserInfo = async (): Promise<UserSummary> => {
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
