import type {
  Pizzeria,
  PizzeriaWithVisit,
} from "@/features/map/api/pizza-query-options";

export type VisitedPizzeria = PizzeriaWithVisit & {
  visitedAt: string;
  timeZone: string;
};

export type PizzeriaDetails = Omit<Pizzeria, "lat" | "lng"> & {
  visits: {
    id: number;
    description: string | null;
    rating: number | null;
    visitedAt: string;
    timeZone: string;
    user: {
      firstName: string;
    };
  }[];
};
