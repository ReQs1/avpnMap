import { queryOptions } from "@tanstack/react-query";
import type { PizzeriaDetails } from "@/features/map/types/pizzeria.types";

export const pizzeriaQueryOptions = (pizzeriaId: number) => {
  return queryOptions({
    queryKey: ["pizzeria", pizzeriaId],
    queryFn: async ({ signal }) => {
      const res = await fetch(`/api/pizzerias/${pizzeriaId}`, { signal });
      if (!res.ok) throw new Error("Failed to fetch pizzeria details");
      return res.json() as Promise<PizzeriaDetails>;
    },
    staleTime: 1000 * 60 * 5,
  });
};
