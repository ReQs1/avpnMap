import type { LucideIcon } from "lucide-react";

export type LoginFeatureType = {
  icon: LucideIcon;
  mainColor: string;
  bgColor: string;
  text: string;
  subText: string;
};

export type NotFoundFeatureCard = {
  icon: LucideIcon;
  iconColorClass: string;
  bgColorClass: string;
  gradientClass: string;
  hoverBgClass: string;
  title: string;
  description: string;
  to: string;
};

export type CreateVisitBody = {
  pizzeriaId: number;
  visitedAt: string;
  timeZone: string;
  rating?: number;
  description?: string;
};

export type UpdateVisitBody = {
  rating?: number | null;
  description?: string | null;
  visitedAt?: string;
  timeZone?: string;
};
