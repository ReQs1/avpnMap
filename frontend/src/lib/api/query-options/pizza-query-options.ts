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

export const pizzeriasQuery = queryOptions({
  queryKey: ["pizzerias"],
  staleTime: Infinity,
  refetchOnWindowFocus: false,
  retry: false,
  queryFn: async () => {
    const res = await fetch("/api/pizzerias", {
      credentials: "include",
    });
    if (!res.ok) {
      throw new Error("Failed to fetch pizzerias");
    }
    return res.json() as Promise<Pizzeria[]>;
  },
});
