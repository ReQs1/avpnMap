import type {
  Pizzeria,
  PizzeriaWithVisit,
} from "@/features/map/api/pizza-query-options";

export function hasValidVisit(
  p: Pizzeria | PizzeriaWithVisit,
): p is PizzeriaWithVisit & {
  visitedAt: string;
  timeZone: string;
} {
  return isPizzeriaWithVisit(p) && p.visitedAt !== null && p.timeZone !== null;
}

function isPizzeriaWithVisit(
  pizzeria: Pizzeria | PizzeriaWithVisit,
): pizzeria is PizzeriaWithVisit {
  return (
    "rating" in pizzeria && "description" in pizzeria && "visitedAt" in pizzeria
  );
}
