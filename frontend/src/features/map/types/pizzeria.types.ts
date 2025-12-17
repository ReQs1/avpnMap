import type { PizzeriaWithVisit } from "@/features/map/api/pizza-query-options";

export type VisitedPizzeria = PizzeriaWithVisit & {
  visitedAt: string;
  timeZone: string;
};
