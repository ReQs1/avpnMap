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
