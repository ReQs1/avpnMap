import { fetchWithTokenRefresh } from "@/features/auth/utils/auth-utils";
import type {
  CreateVisitBody,
  UpdateVisitBody,
} from "@/features/visits/types/visit-form.types";

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
