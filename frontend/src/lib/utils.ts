import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
const isAuthMessage = (msg?: string) =>
  msg?.toLowerCase() === "unauthorized" || msg?.toLowerCase() === "jwt expired";

function extractMessage(data: unknown): string | undefined {
  if (
    data &&
    typeof data === "object" &&
    "message" in data &&
    typeof data.message === "string"
  ) {
    return data.message;
  }
  return undefined;
}

export async function fetchWithCredentials<T>(
  fetchFn: () => Promise<Response>,
): Promise<T> {
  try {
    // First attempt
    let res = await fetchFn();
    let data = await res.json();

    if (!res.ok && res.status === 401) {
      const message = extractMessage(data);
      if (message && isAuthMessage(message)) {
        try {
          const refresh = await fetch("/api/auth/refresh", {
            method: "POST",
            credentials: "include",
          });

          if (refresh.ok) {
            // Second attempt after refreshing token
            res = await fetchFn();
            data = await res.json();
          } else {
            throw new Error("Failed to refresh access token");
          }
        } catch (refreshError) {
          throw new Error(
            `Authentication refresh failed: ${refreshError instanceof Error ? refreshError.message : "Unknown error"}`,
          );
        }
      }
    }

    if (!res.ok) {
      const message = extractMessage(data) || "Failed to fetch";
      throw new Error(message);
    }

    return data as T;
  } catch (error) {
    // If it's already a formatted error, re-throw it
    if (error instanceof Error) {
      throw error;
    }

    // Handle unexpected errors (network issues, JSON parsing, etc.)
    throw new Error(`Request failed: ${String(error)}`);
  }
}
