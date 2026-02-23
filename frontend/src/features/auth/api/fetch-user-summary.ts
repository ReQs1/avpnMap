import { fetchWithTokenRefresh } from "@/features/auth/utils/auth-utils";
import type { AuthResult, User } from "@/features/auth/types/user.types";

export const fetchUserSummary = async (): Promise<AuthResult> => {
  try {
    const user = await fetchWithTokenRefresh<User>(() =>
      fetch("/api/user/me", { credentials: "include" }),
    );
    return { user, error: null };
  } catch (error) {
    // Auth errors (401, expired JWT, refresh failed)
    if (
      error instanceof Error &&
      (error.message.includes("Authentication") ||
        error.message.includes("Unauthorized") ||
        error.message.includes("Failed to refresh"))
    ) {
      return { user: null, error: null };
    }

    // Other errors (network, 500, etc.)
    return {
      user: null,
      error: error instanceof Error ? error : new Error(String(error)),
    };
  }
};
