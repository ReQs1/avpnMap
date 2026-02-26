import { isFuture } from "date-fns";

export function validateDateNotFuture(value: string): string | undefined {
  if (isFuture(value)) {
    return "Future dates are not allowed";
  }
  return undefined;
}
