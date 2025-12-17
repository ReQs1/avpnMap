import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDate = (date: Date, timeZone: string) => {
  return new Intl.DateTimeFormat(navigator.language, {
    timeZone,
    dateStyle: "short",
  }).format(date);
};
