import { queryOptions } from "@tanstack/react-query";

export type Pizzeria = {
  id: number;
  memberNumber?: number;
  name: string;
  nation: string;
  website: string;
  address: string;
  lat: number;
  lng: number;
};

export type PizzeriaWithVisit = Pizzeria & {
  rating: number | null;
  description: string | null;
  visitedAt: string | null;
  timeZone: string | null;
};

export const pizzeriasQuery = queryOptions({
  queryKey: ["pizzerias"],
  staleTime: Infinity,
  refetchOnWindowFocus: false,
  retry: false,
  queryFn: async ({ signal }) => {
    const res = await fetch("/api/pizzerias", {
      credentials: "include",
      signal,
    });
    if (!res.ok) {
      throw new Error("Failed to fetch pizzerias");
    }

    return res.json() as Promise<Pizzeria[] | PizzeriaWithVisit[]>;
  },
});
