import { fetchWithTokenRefresh } from "@/features/auth/utils/auth-utils";
import type { AuthResult, User } from "@/features/auth/types/user.types";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const fetchUserSummary = async (retries = 10): Promise<AuthResult> => {
  try {
    const user = await fetchWithTokenRefresh<User>(() =>
      fetch("/api/user/me", { credentials: "include" }),
    );
    return { user, error: null };
  } catch (error) {
    // 401 / auth failure — server is up, user is just not logged in
    if (
      error instanceof Error &&
      (error.message.includes("Authentication") ||
        error.message.includes("Unauthorized") ||
        error.message.includes("Failed to refresh"))
    ) {
      return { user: null, error: null };
    }

    // network error / 5xx — likely a cold start, retry and keep the spinner up
    if (retries > 0) {
      await sleep(5000);
      return fetchUserSummary(retries - 1);
    }

    // out of retries, backend is genuinely down
    return {
      user: null,
      error: error instanceof Error ? error : new Error(String(error)),
    };
  }
};
