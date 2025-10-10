import { fetchWithTokenRefresh } from "@/lib/utils/auth-utils";

export async function deleteVisit(pizzeriaId: number) {
  await fetchWithTokenRefresh(() =>
    fetch(`/api/visits/${pizzeriaId}`, {
      method: "DELETE",
      credentials: "include",
    }),
  );
}
