import type { PizzeriaWithVisit } from "../api/query-options/pizza-query-options";

export type VisitedPizzeria = PizzeriaWithVisit & {
  visitedAt: string;
  timeZone: string;
};
