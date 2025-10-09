import type { CreateVisitBody, UpdateVisitBody } from "@/lib/types";
import { fetchWithTokenRefresh } from "@/lib/utils/auth-utils";

export async function submitVisitForm(
  method: "POST" | "PATCH",
  url: string,
  body: CreateVisitBody | UpdateVisitBody,
): Promise<void> {
  await fetchWithTokenRefresh(() =>
    fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(body),
    }),
  );
}
