import { fetchWithTokenRefresh } from "@/features/auth/utils/auth-utils";

export async function deleteVisit(pizzeriaId: number) {
  await fetchWithTokenRefresh(() =>
    fetch(`/api/visits/${pizzeriaId}`, {
      method: "DELETE",
      credentials: "include",
    }),
  );
}
